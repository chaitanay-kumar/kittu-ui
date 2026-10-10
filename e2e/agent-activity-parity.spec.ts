import { test, expect, type Locator } from '@playwright/test';
for(const framework of ['react','angular']){
 test(`${framework} agent default details, independent expansion and controls`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`/components/ai-agent-activity?framework=${framework}`);
  const surface=framework==='react'?page.getByRole('heading',{name:'Activity',exact:true}).locator('xpath=../../../..'):page.frameLocator('iframe').locator('.k-ai-agent-activity');
  await expect(surface.getByText('Analyze request',{exact:true})).toBeVisible();
  await expect(surface.getByText('Parameters',{exact:true})).toHaveCount(1);
  await expect(surface.getByText('typescript',{exact:true})).toBeVisible();
  await expect(surface.getByText('Output Result',{exact:true})).toHaveCount(2);
  await surface.getByText('Analyze request',{exact:true}).click();
  await expect(surface.getByText('Parameters',{exact:true})).toHaveCount(0);
  await expect(surface.getByText('typescript',{exact:true})).toBeVisible();
  await surface.getByText('Search tokens',{exact:true}).click();
  await expect(surface.getByText('Parameters',{exact:true})).toHaveCount(1);
  await expect(surface.getByText('border, surface, radius, typography',{exact:true})).toBeVisible();
  await surface.getByRole('button',{name:'Expand all',exact:true}).click();
  await expect(surface.getByText('Parameters',{exact:true})).toHaveCount(3);
  await expect(surface.getByText('Output Result',{exact:true})).toHaveCount(4);
  await surface.getByRole('button',{name:'Collapse all',exact:true}).click();
  await expect(surface.getByText('Parameters',{exact:true})).toHaveCount(0);
  await expect(surface.getByText('Output Result',{exact:true})).toHaveCount(0);
  expect(errors).toEqual([]);
 });
 test(`${framework} restart reproduces the trace and completion count`,async({page})=>{
  await page.goto(`/components/ai-agent-activity?framework=${framework}`);
  const surface=framework==='react'?page.getByRole('button',{name:'Restart',exact:true}).locator('xpath=../..'):page.frameLocator('iframe').locator('.k-aa-demo');
  await surface.getByRole('button',{name:'Restart',exact:true}).click();
  await expect(surface.getByText('Running trace',{exact:true})).toBeVisible();
  await expect(surface.getByText('Completed',{exact:true})).toBeVisible({timeout:8500});
  await expect(surface.getByText('5 of 5 completed',{exact:true})).toBeVisible();
  await expect(surface.getByText('Analyze request',{exact:true})).toBeVisible();
 });
}

test('Angular agent details support Enter and Space, and exit panels are inert',async({page})=>{
 await page.goto('/components/ai-agent-activity?framework=angular');
 const agent=page.frameLocator('iframe').locator('.k-ai-agent-activity');
 const row=agent.locator('[data-activity-id="act-2"] [role=button]');
 await row.focus();await row.press('Enter');await expect(row).toHaveAttribute('aria-expanded','true');
 await expect(agent.getByText('border, surface, radius, typography',{exact:true})).toBeVisible();
 await row.press('Space');await expect(row).toHaveAttribute('aria-expanded','false');
 // AnimatePresence equivalents must be hidden from assistive navigation while leaving.
 for(const leaving of await agent.locator('[data-leaving]').all()){await expect(leaving).toHaveAttribute('aria-hidden','true');await expect(leaving).toHaveAttribute('inert','');}
 await expect(agent.locator('[data-leaving]')).toHaveCount(0,{timeout:2000});
});

async function metrics(root:Locator,selectors:Record<string,string>){return root.evaluate((el,selectors)=>{
 const properties=['fontFamily','fontSize','lineHeight','letterSpacing','paddingTop','paddingRight','paddingBottom','paddingLeft','borderRadius','color','backgroundColor'];
 return Object.fromEntries(Object.entries(selectors).map(([name,selector])=>{const node=selector?el.querySelector(selector):el;const style=getComputedStyle(node!);return[name,{width:node!.getBoundingClientRect().width,height:node!.getBoundingClientRect().height,...Object.fromEntries(properties.map(property=>[property,style[property as keyof CSSStyleDeclaration]]))}]}));
},selectors);}
for(const theme of ['light','dark'])test(`React and Angular agent geometry and typography match in ${theme}`,async({page},testInfo)=>{
 await page.addInitScript(value=>localStorage.setItem('kit-ui-theme',value),theme);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/components/ai-agent-activity?framework=react');
 const root=page.getByRole('heading',{name:'Activity',exact:true}).locator('xpath=../../../..');await expect(root).toBeVisible();
 const size=await root.boundingBox();const react=await metrics(root,{root:'',header:':scope>div:first-child',timeline:':scope>div:nth-child(2)',title:'.tracking-tight.truncate:not(h3)',description:'p',detail:'.overflow-hidden.mt-3',code:'code',parameters:'.overflow-x-auto.select-text:not(pre)'});
 await page.addStyleTag({content:'header.sticky{opacity:0!important;pointer-events:none!important}.fixed{display:none!important}'});
 await root.screenshot({path:testInfo.outputPath(`react-agent-${theme}.png`),animations:'disabled'});
 await page.goto(`/angular-demo/index.html?component=ai-agent-activity&theme=${theme}`);await page.setViewportSize({width:Math.round(size!.width),height:1500});
 const angularRoot=page.locator('.k-ai-agent-activity');await expect(angularRoot).toBeVisible();
 const angular=await metrics(angularRoot,{root:'',header:'.k-aa-header',timeline:'.k-aa-timeline',title:'.k-aa-title',description:'p',detail:'.k-aa-disclosure',code:'code',parameters:'.k-aa-detail-value:not(pre)'});
 for(const name of Object.keys(react))for(const property of Object.keys(react[name])){const a=angular[name][property],r=react[name][property];if(typeof r==='number')expect(Math.abs((a as number)-r),`${name}.${property}`).toBeLessThanOrEqual(1);else expect(a,`${name}.${property}`).toEqual(r);}
 await angularRoot.screenshot({path:testInfo.outputPath(`angular-agent-${theme}.png`),animations:'disabled'});
});

for(const theme of ['light','dark'])test(`consumer status, metadata and empty states match in ${theme}`,async({page},testInfo)=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.route('**/agent-contract.html*',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><script type="module">import RefreshRuntime from "/@react-refresh";RefreshRuntime.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;</script><script type="module" src="/e2e/fixtures/agent-contract.tsx"></script></body></html>'}));
 const results:Record<string,unknown>={};
 for(const framework of ['react','angular']){
  await page.goto(`/agent-contract.html?framework=${framework}&theme=${theme}`);
  const root=page.locator('.consumer-agent');await expect(root).toBeVisible();
  await expect(root.getByText('1 of 5 completed',{exact:true})).toBeVisible();
  await expect(root.getByText('attempt:',{exact:true})).toBeVisible();
  await expect(root.getByText('cached:',{exact:true})).toBeVisible();
  await expect(root.getByText('Code',{exact:true})).toBeVisible();
  await expect(root.getByText('const result = true;',{exact:true})).toBeVisible();
  await root.getByText('Request failed',{exact:true}).click();await expect(root.getByText(/Forbidden/)).toBeVisible();
  const symbols=framework==='react'?'.relative.z-10 > div':'.k-aa-status';
  results[framework]=await root.evaluate((el,selector)=>Array.from(el.querySelectorAll(selector)).map(node=>{const icon=node.querySelector('svg'),style=getComputedStyle(node);return{width:node.getBoundingClientRect().width,height:node.getBoundingClientRect().height,background:style.backgroundColor,border:style.borderWidth==='0px'?null:style.borderColor,icon:icon&&{color:getComputedStyle(icon).color,width:getComputedStyle(icon).width,height:getComputedStyle(icon).height,stroke:getComputedStyle(icon).strokeWidth,paths:icon.innerHTML}};}),symbols);
  await root.screenshot({path:testInfo.outputPath(`consumer-${framework}-${theme}.png`),animations:'disabled'});
  await page.goto(`/agent-contract.html?framework=${framework}&theme=${theme}&state=empty`);
  await expect(page.getByText('No activity recorded',{exact:true})).toBeVisible();await expect(page.getByText('0 of 0 completed',{exact:true})).toBeVisible();
 }
 expect(results.angular).toEqual(results.react);
});

test('Angular packaged consumer retains light defaults without host theme styles',async({page})=>{
 await page.route('**/agent-contract.html*',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><script type="module">import RefreshRuntime from "/@react-refresh";RefreshRuntime.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;</script><script type="module" src="/e2e/fixtures/agent-contract.tsx"></script></body></html>'}));
 await page.goto('/agent-contract.html?framework=angular&theme=light');
 const root=page.locator('.consumer-agent');await expect(root).toBeVisible();
 await page.evaluate(()=>{for(const style of Array.from(document.querySelectorAll('style[data-vite-dev-id]')))style.remove();});
 const style=await root.evaluate(el=>{const s=getComputedStyle(el);return{border:s.borderTopWidth,color:s.color,background:s.backgroundColor,radius:s.borderRadius,sourceBorder:s.getPropertyValue('--border'),width:el.getBoundingClientRect().width,parentWidth:el.parentElement!.getBoundingClientRect().width};});
 expect(style.width).toBe(style.parentWidth);expect(style.sourceBorder).toBe('');expect(style.border).toBe('1px');expect(style.radius).toBe('25.2px');expect(style.color).toBe('oklch(0.141 0.005 285.823)');expect(style.background).not.toBe('rgba(0, 0, 0, 0)');
 await expect(root.getByText('Inspect metadata',{exact:true})).toBeVisible();
});
