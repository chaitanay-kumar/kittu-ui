import {test,expect,type Locator} from '@playwright/test';
async function metrics(root:Locator){return root.evaluate(el=>[el,...el.querySelectorAll('div,svg,circle,span')].map(node=>{const s=getComputedStyle(node);return{tag:node.tagName==='KIT-LOADER'?'DIV':node.tagName,width:parseFloat(s.width),height:parseFloat(s.height),gap:s.gap,background:s.backgroundColor,color:s.color,border:s.borderWidth==='0px'?null:s.borderColor,radius:s.borderRadius,position:s.position,stroke:node.getAttribute('stroke'),strokeWidth:node.getAttribute('stroke-width'),dash:node.getAttribute('stroke-dasharray'),offset:node.getAttribute('stroke-dashoffset'),circle:node.tagName==='circle'?[node.getAttribute('cx'),node.getAttribute('cy'),node.getAttribute('r')]:null};}));}
for(const variant of ['arc','dots','line','rings'])test(`loader ${variant} dimensions, color, accessibility and reduced-motion options match`,async({page})=>{
 await page.route('**/loader-contract.html*',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><script type="module">import RefreshRuntime from "/@react-refresh";RefreshRuntime.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;</script><script type="module" src="/e2e/fixtures/loader-contract.tsx"></script></body></html>'}));
 for(const reduce of [false,true])for(const size of [16,48]){
  const result:Record<string,unknown>={};for(const framework of ['react','angular']){
   await page.goto(`/loader-contract.html?framework=${framework}&variant=${variant}&size=${size}&reduce=${reduce}&color=%23ff8800`);const root=page.locator('.consumer-loader');await expect(root).toBeVisible();await expect(root).toHaveAttribute('role','status');await expect(root).toHaveAttribute('aria-busy','true');await expect(root).toHaveAttribute('aria-label','Loading...');await expect(root).toHaveAttribute('data-consumer','loader');
   result[framework]=await metrics(root);
   if(framework==='angular'){
    const animation=await root.evaluate(el=>el.getAnimations({subtree:true}).map(a=>({duration:a.effect!.getTiming().duration,delay:a.effect!.getTiming().delay,frames:(a.effect as KeyframeEffect).getKeyframes().map(f=>({opacity:f.opacity,transform:f.transform,left:f.left,easing:f.easing}))})));
    if(variant==='arc')expect(animation).toHaveLength(reduce?0:1);else{expect(animation).toHaveLength(variant==='dots'?3:variant==='rings'?2:1);for(const a of animation){expect(a.duration).toBe(variant==='dots'?1400:variant==='line'?1800:2200);if(reduce)for(const f of a.frames){expect(f.transform).toBeUndefined();expect(f.left).toBeUndefined();}}}
    const states=await root.evaluate(el=>{const animations=el.getAnimations({subtree:true});(window as unknown as {destroyLoader:()=>void}).destroyLoader();return animations.filter(a=>a.effect instanceof KeyframeEffect&&a.effect.target instanceof HTMLElement).map(a=>a.playState);});expect(states.every(state=>state==='idle')).toBe(true);
   }
  }expect(result.angular).toEqual(result.react);
 }
});
for(const framework of ['react','angular'])test(`${framework} loader showcase variant and size controls`,async({page},testInfo)=>{
 await page.goto(`/components/loader?framework=${framework}`);const scope=framework==='react'?page:page.frameLocator('iframe');const status=scope.getByRole('status',{name:'Loading...',exact:true});await expect(status).toBeVisible();
 for(const variant of ['arc','dots','line','rings']){await scope.getByRole('button',{name:variant,exact:true}).click();await scope.getByRole('button',{name:'48px',exact:true}).click();const first=status.locator(':scope>div');await expect(first).toHaveCSS('width',variant==='dots'?'72px':variant==='line'?'96px':'48px');}
 await scope.getByRole('button',{name:'arc',exact:true}).click();await scope.getByRole('button',{name:'32px',exact:true}).click();await expect(status.locator('svg')).toHaveCSS('width','32px');
 if(framework==='react')await page.addStyleTag({content:'header.sticky{opacity:0!important}.fixed{display:none!important}'});
 const card=framework==='react'?status.locator('xpath=..'):scope.locator('.k-l-card');await card.screenshot({path:testInfo.outputPath(`${framework}-loader.png`),animations:'disabled'});
});
for(const theme of ['light','dark'])test(`loader showcase geometry and controls match in ${theme}`,async({page})=>{
 await page.addInitScript(value=>localStorage.setItem('kit-ui-theme',value),theme);
 const results:Record<string,Array<{width:number;height:number;[key:string]:string|number}>>={};for(const framework of ['react','angular']){
  await page.goto(`/components/loader?framework=${framework}`);const scope=framework==='react'?page:page.frameLocator('iframe');const status=scope.getByRole('status',{name:'Loading...',exact:true});await expect(status).toBeVisible();const card=framework==='react'?status.locator('xpath=..'):scope.locator('.k-l-card');
  results[framework]=await card.evaluate(el=>[el,...el.querySelectorAll('button')].map(node=>{const s=getComputedStyle(node),r=node.getBoundingClientRect();return{width:r.width,height:r.height,font:s.fontFamily,fontSize:s.fontSize,lineHeight:s.lineHeight,fontWeight:s.fontWeight,letterSpacing:s.letterSpacing,padding:s.padding,radius:s.borderRadius,border:s.borderWidth==='0px'?'none':s.borderColor,color:s.color,background:s.backgroundColor}}));
 }for(let i=0;i<results.react.length;i++){const {width:rw,height:rh,...react}=results.react[i],{width:aw,height:ah,...angular}=results.angular[i];expect(angular).toEqual(react);expect(Math.abs(aw-rw)).toBeLessThan(.1);expect(Math.abs(ah-rh)).toBeLessThan(.1);}
});
