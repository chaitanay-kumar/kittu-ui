import {test,expect,type Page,type Locator} from '@playwright/test';
async function consumer(page:Page,framework:string,theme='light'){
 await page.route('**/button-contract.html*',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><script type="module">import RefreshRuntime from "/@react-refresh";RefreshRuntime.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;</script><script type="module" src="/e2e/fixtures/button-contract.tsx"></script></body></html>'}));
 await page.goto(`/button-contract.html?framework=${framework}&theme=${theme}`);await page.waitForFunction(()=>typeof (window as unknown as {setButtonOptions:unknown}).setButtonOptions==='function');await expect(page.locator('#action')).toBeVisible();
}
async function update(page:Page,options:Record<string,unknown>){await page.evaluate(options=>(window as unknown as {setButtonOptions:(options:unknown)=>void}).setButtonOptions(options),options);await page.waitForTimeout(30);}
async function metrics(button:Locator){return button.evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return{width:r.width,height:r.height,color:s.color,background:s.backgroundColor,border:s.borderWidth==='0px'?'none':s.borderColor,borderWidth:s.borderWidth,radius:s.borderRadius,padding:s.padding,gap:s.columnGap,font:s.fontFamily,fontSize:s.fontSize,lineHeight:s.lineHeight,fontWeight:s.fontWeight,letterSpacing:s.letterSpacing,opacity:s.opacity,cursor:s.cursor,pointerEvents:s.pointerEvents,shadow:s.boxShadow.replace(/rgba\(0, 0, 0, 0\) 0px 0px 0px 0px(?:, )?/g,'')||'none',decoration:s.textDecorationLine,outline:s.outline,outlineOffset:s.outlineOffset,children:Array.from(el.children).filter(node=>getComputedStyle(node).display!=='none').map(node=>({tag:node.tagName,text:node.textContent,width:getComputedStyle(node).width,height:getComputedStyle(node).height,paths:Array.from(node.querySelectorAll('path')).map(path=>path.getAttribute('d'))}))};});}
function compare(angular:Awaited<ReturnType<typeof metrics>>,react:Awaited<ReturnType<typeof metrics>>){const{width:aw,height:ah,...a}=angular,{width:rw,height:rh,...r}=react;expect(a).toEqual(r);expect(Math.abs(aw-rw)).toBeLessThan(.2);expect(Math.abs(ah-rh)).toBeLessThan(.2);}
for(const theme of ['light','dark'])test(`button nine variants and four sizes match in ${theme}`,async({page})=>{
 const results:Record<string,Awaited<ReturnType<typeof metrics>>>={};for(const framework of ['react','angular']){
  await consumer(page,framework,theme);for(const variant of ['default','primary','secondary','outline','ghost','destructive','success','link','gradient'])for(const size of ['sm','md','lg','icon']){
   await update(page,{variant,size,icons:true});const button=page.locator('#action');await expect(button).toBeEnabled();const actual=await metrics(button);if(framework==='react')results[variant+size]=actual;else compare(actual,results[variant+size]);
  }
 }
});
test('button loading, empty content, disabled and full width match',async({page})=>{
 const cases=[{className:'h-12 px-0 rounded-none w-full'},{isLoading:true,loadingText:'Saving...',icons:true,size:'sm'},{isLoading:true,icons:true},{isLoading:true,content:false},{isLoading:true,loadingText:'',content:false},{disabled:true,icons:true},{fullWidth:true},{content:false},{variant:'link',isLoading:true,loadingText:'Sending'}];
 const results:Awaited<ReturnType<typeof metrics>>[]=[];for(const framework of ['react','angular']){await consumer(page,framework);for(const [index,options] of cases.entries()){await update(page,options);const button=page.locator('#action');await expect(button).toHaveAttribute('aria-busy',String(!!options.isLoading));if(options.isLoading||options.disabled)await expect(button).toBeDisabled();else await expect(button).toBeEnabled();const actual=await metrics(button);if(framework==='react')results.push(actual);else compare(actual,results[index]);}}
});
for(const framework of ['react','angular'])test(`${framework} button keyboard, native forms and press cleanup`,async({page})=>{
 await consumer(page,framework);const button=page.locator('#action');await button.focus();await page.keyboard.press('Enter');await expect.poll(()=>page.evaluate(()=>(window as unknown as {buttonEvents:string[]}).buttonEvents)).toEqual(['click']);await page.keyboard.press('Space');await expect.poll(()=>page.evaluate(()=>(window as unknown as {buttonEvents:string[]}).buttonEvents.length)).toBe(2);
 await update(page,{type:'submit'});await button.click();await expect.poll(()=>page.evaluate(()=>(window as unknown as {buttonEvents:string[]}).buttonEvents.slice(-2))).toEqual(['click','submit']);await update(page,{type:'reset'});await button.click();await expect.poll(()=>page.evaluate(()=>(window as unknown as {buttonEvents:string[]}).buttonEvents.at(-1))).toBe('reset');
 await update(page,{});await button.focus();await expect(button).toHaveCSS('outline-offset','1px');const box=await button.boundingBox();await page.mouse.move(box!.x+box!.width/2,box!.y+box!.height/2);await page.mouse.down();await page.waitForTimeout(550);const scale=await button.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a);expect(scale).toBeCloseTo(.97,2);await page.mouse.up();await page.waitForTimeout(550);expect(await button.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeCloseTo(1,2);
 if(framework==='angular'){const states=await button.evaluate(el=>{const animations=el.getAnimations();(window as unknown as {destroyButton:()=>void}).destroyButton();return animations.map(a=>a.playState);});expect(states.every(state=>state==='idle')).toBe(true);}
});
for(const framework of ['react','angular'])test(`${framework} button showcase`,async({page},info)=>{
 await page.goto(`/components/button?framework=${framework}`);const scope=framework==='react'?page:page.frameLocator('iframe');await expect(scope.getByRole('button',{name:'Processing...'})).toBeDisabled();await expect(scope.getByRole('button',{name:'Primary',exact:true})).toBeVisible();
 await page.addStyleTag({content:'header.sticky{opacity:0!important}.fixed{display:none!important}'});
 const card=framework==='react'?scope.getByText('Visual Variants',{exact:true}).locator('xpath=..'):scope.locator('.k-b-demo section').first();await card.screenshot({path:info.outputPath(`${framework}-button.png`),animations:'disabled'});
});

for(const theme of ['light','dark'])test(`button hover and focus styles match in ${theme}`,async({page})=>{
 const results:Record<string,Awaited<ReturnType<typeof metrics>>>={};for(const framework of ['react','angular']){
  await consumer(page,framework,theme);await page.keyboard.press('Tab');
  for(const variant of ['primary','secondary','outline','ghost','destructive','success','link','gradient']){
   await update(page,{variant});const button=page.locator('#action');await button.hover();await button.focus();const actual=await metrics(button);if(framework==='react')results[variant]=actual;else compare(actual,results[variant]);
  }
 }
});
for(const framework of ['react','angular'])test(`${framework} button holds press outside until global release and ignores secondary touch`,async({page})=>{
 await consumer(page,framework);await update(page,{type:'button'});const button=page.locator('#action');await button.hover();await page.mouse.down();await page.waitForTimeout(550);
 expect(await button.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeCloseTo(.97,2);await page.evaluate(()=>{const field=document.createElement('input');document.body.append(field);field.focus();});await page.waitForTimeout(550);expect(await button.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeCloseTo(.97,2);
 await page.mouse.move(500,500);await page.waitForTimeout(550);
 expect(await button.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeCloseTo(.97,2);await page.mouse.up();await page.waitForTimeout(550);
 expect(await button.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeCloseTo(1,2);await button.dispatchEvent('pointerdown',{pointerType:'touch',button:0,isPrimary:false});await page.waitForTimeout(550);
 expect(await button.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeCloseTo(1,2);
 await button.focus();await page.keyboard.down('Enter');await page.waitForTimeout(550);expect(await button.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeCloseTo(.97,2);await page.evaluate(()=>{const field=document.createElement('input');document.body.append(field);field.focus();});await page.waitForTimeout(550);expect(await button.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeCloseTo(1,2);await page.keyboard.up('Enter');
});
