import {test,expect,type Page} from '@playwright/test';

async function consumer(page:Page,framework:string,theme='light',initial=''){
  await page.goto(`/e2e/fixtures/stretch-switch-contract.html?framework=${framework}&theme=${theme}&initial=${initial}`);
  await page.waitForFunction(()=>typeof (window as any).setStretchOptions==='function');
  await expect(page.getByRole('switch')).toBeVisible();await page.evaluate(()=>document.fonts.ready);
}
async function update(page:Page,options:Record<string,unknown>,delay=600){await page.evaluate(options=>(window as any).setStretchOptions(options),options);if(delay)await page.waitForTimeout(delay);}
async function motion(page:Page){return page.getByRole('switch').locator('span').evaluate(el=>{const m=new DOMMatrixReadOnly(getComputedStyle(el).transform);return {x:m.e,scaleX:m.a,scaleY:m.d};});}
async function metrics(page:Page){return page.locator('#fixture').evaluate(el=>{
  const root=el.lastElementChild!,button=root.querySelector('button')!,thumb=button.firstElementChild!;
  const read=(node:Element)=>{const s=getComputedStyle(node),r=node.getBoundingClientRect();return {width:r.width,height:r.height,display:s.display,font:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,lineHeight:s.lineHeight,letterSpacing:s.letterSpacing,color:s.color,background:s.backgroundColor,border:s.border,borderRadius:s.borderRadius,padding:s.padding,gap:s.gap,opacity:s.opacity,cursor:s.cursor,shadow:s.boxShadow};};
  const matrix=new DOMMatrixReadOnly(getComputedStyle(thumb).transform);
  return {root:read(root),button:read(button),thumb:read(thumb),copy:button.previousElementSibling?Array.from(button.previousElementSibling.children).map(read):[],translation:matrix.e,scaleX:matrix.a,scaleY:matrix.d,checked:button.getAttribute('aria-checked'),disabled:(button as HTMLButtonElement).disabled,type:(button as HTMLButtonElement).type,label:root.querySelector('button')!.previousElementSibling?.textContent??null};
});}
for(const theme of ['light','dark'])for(const reducedMotion of ['reduce','no-preference'] as const)test(`stretch visuals and options match ${theme}/${reducedMotion}`,async({page})=>{
  await page.emulateMedia({reducedMotion});const reference:unknown[]=[];
  const cases=[{}, {checked:true,label:'Enabled',description:'Switch description'}, {checked:false,label:'Off',className:'consumer-class'}, {checked:true,disabled:true,label:'Disabled',description:'Details'}, {checked:false,label:0}, {label:true,description:'Boolean content'}, {label:false,description:'Only description'}];
  for(const framework of ['react','angular']){await consumer(page,framework,theme);for(let i=0;i<cases.length;i++){await update(page,cases[i]);const result=await metrics(page);if(framework==='react')reference.push(result);else expect(result).toEqual(reference[i]);}}
});
for(const delayed of [false,true])test(`stretch spring reversals and disposal match ${delayed?'delayed':'normal'} frames`,async({page})=>{
  if(delayed)await page.addInitScript(()=>{
    const pending=new Map<number,ReturnType<typeof setTimeout>>();let id=0;
    window.requestAnimationFrame=callback=>{const next=++id;pending.set(next,setTimeout(()=>{pending.delete(next);callback(performance.now());},80));return next;};
    window.cancelAnimationFrame=frame=>{const timer=pending.get(frame);if(timer!==undefined){clearTimeout(timer);pending.delete(frame);}};
    (window as any).stretchPendingFrames=()=>pending.size;
  });
  type Sample={time:number;value:number};
  type Trace={on:Sample[];off:Sample[];reversal:{before:number;after:number};settled:number};
  const traces:Trace[]=[];
  for(const framework of ['react','angular']){
    await consumer(page,framework);await update(page,{checked:false});
    const trace=await page.evaluate(async()=>{
      const api=window as any,thumb=document.querySelector('[role="switch"] span')!;
      const x=()=>new DOMMatrixReadOnly(getComputedStyle(thumb).transform).e;
      const on:{time:number;value:number}[]=[],off:{time:number;value:number}[]=[];
      let samples=on,started=performance.now();
      const record=()=>samples.push({time:performance.now()-started,value:x()});
      // Observe committed transform frames, rather than sampling an arbitrary side
      // of an 80ms frame boundary independently in each framework.
      const observer=new MutationObserver(record);
      observer.observe(thumb,{attributes:true,attributeFilter:['style']});
      record();api.setStretchOptions({checked:true});
      await new Promise(resolve=>setTimeout(resolve,300));record();
      const before=x();samples=off;started=performance.now();record();
      api.setStretchOptions({checked:false});const after=x();record();
      await new Promise(resolve=>setTimeout(resolve,700));record();
      const settled=x();observer.disconnect();
      api.setStretchOptions({checked:true});await new Promise(resolve=>setTimeout(resolve,30));api.destroyStretch();
      return {on,off,reversal:{before,after},settled};
    });traces.push(trace);await expect(page.getByRole('switch')).toHaveCount(0);await page.waitForTimeout(250);
    if(delayed&&framework==='angular')expect(await page.evaluate(()=>(window as any).stretchPendingFrames())).toBe(0);
  }
  const interpolate=(samples:Sample[],time:number)=>{
    const index=samples.findIndex(sample=>sample.time>=time);
    expect(index,'a recorded frame must bracket each comparison time').toBeGreaterThan(0);
    const before=samples[index-1],after=samples[index];
    return before.value+(after.value-before.value)*(time-before.time)/(after.time-before.time);
  };
  for(const phase of ['on','off'] as const){
    for(const time of phase==='on'?[100,200]:[100,200,300,650]){
      const source=interpolate(traces[0][phase],time),native=interpolate(traces[1][phase],time);
      expect(Math.abs(source-native),JSON.stringify({phase,time,source,native,traces})).toBeLessThan(delayed?5:3);
    }
  }
  for(const trace of traces){
    expect(Math.abs(trace.reversal.after-trace.reversal.before)).toBeLessThan(.5);
    expect(trace.settled).toBe(0);
  }

});
test('stretch website demos match layout, copy and interactive initial state',async({page})=>{
  const values:unknown[]=[];
  for(const framework of ['react','angular']){
    await page.goto(`/components/stretch-switch?framework=${framework}`);
    const demo=framework==='angular'?page.frameLocator('iframe'):page;await expect(demo.getByRole('switch')).toHaveCount(2);
    await page.waitForTimeout(600);
    values.push(await demo.getByRole('switch').evaluateAll(buttons=>buttons.map(button=>{
      const root=button.parentElement!,r=root.getBoundingClientRect(),s=getComputedStyle(root),copy=button.previousElementSibling!;
      return {width:r.width,height:r.height,gap:s.gap,text:copy.textContent,checked:button.getAttribute('aria-checked'),copy:Array.from(copy.children).map(node=>{const css=getComputedStyle(node);return [css.fontSize,css.fontFamily,css.fontWeight,css.lineHeight,css.color];})};
    })));
    await expect(demo.getByRole('switch').first()).toBeChecked();await demo.getByRole('switch').last().click();await expect(demo.getByRole('switch').last()).toBeChecked();
  }expect(values[1]).toEqual(values[0]);
});
test('stretch quick repeated reversals retain continuous position',async({page})=>{
  const traces:number[][]=[];
  for(const framework of ['react','angular']){
    await consumer(page,framework);await update(page,{checked:false});
    traces.push(await page.evaluate(async()=>{
      const api=window as any,values:number[]=[];
      const read=()=>new DOMMatrixReadOnly(getComputedStyle(document.querySelector('[role="switch"] span')!).transform).e;
      for(const checked of [true,false,true]){
        const before=read();api.setStretchOptions({checked});values.push(Math.abs(read()-before));
        await new Promise(resolve=>setTimeout(resolve,80));values.push(read());
      }
      await new Promise(resolve=>setTimeout(resolve,700));values.push(read());return values;
    }));
  }
  for(const trace of traces){for(const index of [0,2,4])expect(trace[index]).toBeLessThan(.5);expect(trace[6]).toBe(18);}
  for(const index of [1,3,5])expect(Math.abs(traces[0][index]-traces[1][index]),JSON.stringify(traces)).toBeLessThan(3);
});
for(const framework of ['react','angular'])test(`${framework} stretch controlled callbacks and native keyboard forms`,async({page})=>{
  await consumer(page,framework);await update(page,{checked:false,label:'Toggle',description:'Details'});const button=page.getByRole('switch');
  await button.click();await button.click();await expect(button).toHaveAttribute('aria-checked','false');await expect.poll(()=>page.evaluate(()=>(window as any).stretchEvents)).toEqual([['change',true],['change',true]]);
  await update(page,{checked:false,reflect:true,label:'Toggle',description:'Details'});await button.focus();await page.keyboard.press('Space');await expect(button).toBeChecked();await page.keyboard.press('Enter');await expect(button).not.toBeChecked();await page.getByText('Details',{exact:true}).click();await expect(button).toBeChecked();
  await update(page,{disabled:true,label:'Toggle',description:'Details'});await page.getByText('Details',{exact:true}).click();await expect(button).toBeDisabled();expect(await page.evaluate(()=>(window as any).stretchEvents.length)).toBe(5);expect(await page.evaluate(()=>(window as any).stretchEvents.includes('submit'))).toBe(false);
});
for(const framework of ['react','angular'])test(`${framework} stretch default state initializes once and controlled fallback persists`,async({page})=>{
  await consumer(page,framework,'light','default');const button=page.getByRole('switch');await expect(button).toBeChecked();expect((await motion(page)).x).toBe(18);
  await update(page,{defaultChecked:false});await expect(button).toBeChecked();await button.click();await expect(button).not.toBeChecked();await update(page,{checked:true});await expect(button).toBeChecked();await update(page,{defaultChecked:true});await expect(button).not.toBeChecked();
});
for(const framework of ['react','angular'])test(`${framework} stretch pointer deformation, cancellation and disabled updates`,async({page})=>{
  await consumer(page,framework);const button=page.getByRole('switch');await button.dispatchEvent('pointerdown',{button:2,pointerType:'mouse',isPrimary:true});await page.waitForTimeout(80);expect((await motion(page)).scaleX).toBeCloseTo(1.18,2);expect((await motion(page)).scaleY).toBeCloseTo(.86,2);
  await update(page,{disabled:true},80);expect((await motion(page)).scaleX).toBeCloseTo(1.18,2);await button.dispatchEvent('pointercancel',{pointerType:'mouse'});await page.waitForTimeout(80);expect((await motion(page)).scaleX).toBeCloseTo(1,2);
  await update(page,{},80);await button.dispatchEvent('pointerdown',{pointerType:'touch',isPrimary:false,button:0});await page.waitForTimeout(80);expect((await motion(page)).scaleX).toBeCloseTo(1.18,2);await button.dispatchEvent('pointercancel',{pointerType:'touch'});await page.waitForTimeout(80);expect((await motion(page)).scaleX).toBeCloseTo(1,2);const rect=await button.boundingBox();await page.mouse.move(rect!.x+rect!.width/2,rect!.y+rect!.height/2);await page.mouse.down();await page.waitForTimeout(80);expect((await motion(page)).scaleX).toBeCloseTo(1.18,2);await page.mouse.move(0,0);await page.waitForTimeout(80);expect((await motion(page)).scaleX).toBeCloseTo(1,2);await page.mouse.up();
});
for(const framework of ['react','angular'])test(`${framework} stretch label content persists and no keyboard press deformation`,async({page})=>{
  await consumer(page,framework);await update(page,{rich:true,label:'Ignored'});await page.getByLabel('Label draft').fill('Edited');await update(page,{rich:true,description:'Updated'});await expect(page.getByLabel('Label draft')).toHaveValue('Edited');const button=page.getByRole('switch');await button.focus();await page.keyboard.down('Space');await page.waitForTimeout(80);expect((await motion(page)).scaleX).toBeCloseTo(1,2);await page.keyboard.up('Space');await expect(button).toBeChecked();
});
for(const theme of ['light','dark'])test(`stretch keyboard focus matches ${theme}`,async({page})=>{
  const values:unknown[]=[];for(const framework of ['react','angular']){await consumer(page,framework,theme);await page.getByRole('switch').focus();await page.waitForTimeout(300);values.push(await page.getByRole('switch').evaluate(el=>{const s=getComputedStyle(el);return [s.outline,s.outlineOffset];}));}expect(values[1]).toEqual(values[0]);
});

for(const framework of ['react','angular'])test(`${framework} stretch same-call activations request the last rendered state`,async({page})=>{
  await consumer(page,framework);await page.evaluate(()=>{const button=document.querySelector<HTMLButtonElement>('[role="switch"]')!;button.click();button.click();});
  await expect(page.getByRole('switch')).toBeChecked();expect(await page.evaluate(()=>(window as any).stretchEvents)).toEqual([['change',true],['change',true]]);
  await page.getByRole('switch').click();await expect(page.getByRole('switch')).not.toBeChecked();
});
