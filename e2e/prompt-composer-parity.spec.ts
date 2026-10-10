import {test,expect,type Locator} from '@playwright/test';
for(const framework of ['react','angular']){
 test(`${framework} prompt attachments, failure, cancellation and keyboard success`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`/components/ai-prompt-composer?framework=${framework}`);
  const root=framework==='react'?page.locator('form[aria-label="AI prompt composer"]'):page.frameLocator('iframe').locator('form[aria-label="AI prompt composer"]');
  const text=root.getByLabel('What are you thinking?',{exact:true});const files=root.getByLabel('Attachments · up to 4',{exact:true});
  await expect(root.getByRole('button',{name:'Send prompt ↗'})).toBeDisabled();
  await root.getByRole('button',{name:'Explain this simply',exact:true}).click();await expect(text).toHaveValue('Explain this simply');
  await files.setInputFiles({name:'notes.txt',mimeType:'text/plain',buffer:Buffer.from('notes')});
  await expect(root.getByRole('status')).toHaveText('Attachments added.');await root.getByRole('button',{name:'Remove notes.txt'}).click();await expect(root.locator('li')).toHaveCount(0);
  await files.setInputFiles(Array.from({length:5},(_,index)=>({name:`file-${index}.txt`,mimeType:'text/plain',buffer:Buffer.from('x')})));
  await expect(root.getByRole('status')).toHaveText('Choose up to 4 attachments, each under 10 MB.');await expect(root.locator('li')).toHaveCount(0);
  await text.fill('fail and keep draft');await files.setInputFiles({name:'draft.txt',mimeType:'text/plain',buffer:Buffer.from('draft')});
  await root.getByRole('button',{name:'Send prompt ↗'}).click();await expect(root).toHaveAttribute('aria-busy','true');await expect(text).toBeDisabled();await expect(files).toBeDisabled();
  await expect(root.getByRole('status')).toHaveText('Sending failed. Your draft is saved; try again.');await expect(text).toHaveValue('fail and keep draft');await expect(root.locator('li')).toHaveCount(1);
  await text.fill('keep cancelled');await root.getByRole('button',{name:'Send prompt ↗'}).click();await root.getByRole('button',{name:'Cancel',exact:true}).click();await expect(root.getByRole('status')).toHaveText('Sending cancelled. Your draft is saved.');await expect(text).toHaveValue('keep cancelled');
  await text.fill('  successful request  ');await text.press('Control+Enter');await expect(root.getByRole('status')).toHaveText('Prompt sent.');await expect(text).toHaveValue('');await expect(root.locator('li')).toHaveCount(0);expect(errors).toEqual([]);
 });
}
async function metrics(root:Locator){return root.evaluate(el=>[el,...el.querySelectorAll('label,textarea,input,button,p,ul,div,span')].map(node=>{const s=getComputedStyle(node),r=node.getBoundingClientRect();return {tag:node.tagName,width:r.width,height:r.height,font:s.fontFamily,fontSize:s.fontSize,lineHeight:s.lineHeight,letterSpacing:s.letterSpacing,padding:s.padding,borderRadius:s.borderRadius,borderWidth:s.borderWidth,border:s.borderWidth==='0px'?null:s.borderColor,color:s.color,background:s.backgroundColor,gap:s.gap,placeholder:node.tagName==='TEXTAREA'?getComputedStyle(node,'::placeholder').color:null,fileButton:node.tagName==='INPUT'?{margin:getComputedStyle(node,'::file-selector-button').margin,padding:getComputedStyle(node,'::file-selector-button').padding,border:getComputedStyle(node,'::file-selector-button').border,background:getComputedStyle(node,'::file-selector-button').backgroundColor}:null};}));}
async function interactionStyles(root:Locator){
 const suggestion=root.getByRole('button',{name:'Explain this simply',exact:true});await suggestion.hover();
 const hover=await suggestion.evaluate(el=>{const s=getComputedStyle(el);return {background:s.backgroundColor,transform:s.transform};});
 const textarea=root.getByLabel('What are you thinking?',{exact:true});await textarea.focus();
 const focus=await textarea.evaluate(el=>{const s=getComputedStyle(el);return {outline:s.outline,offset:s.outlineOffset};});
 return {hover,focus};
}
for(const theme of ['light','dark'])test(`prompt geometry and typography match in ${theme}`,async({page},testInfo)=>{
 await page.addInitScript(value=>localStorage.setItem('kit-ui-theme',value),theme);await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/components/ai-prompt-composer?framework=react');const reactRoot=page.locator('form[aria-label="AI prompt composer"]');await expect(reactRoot).toBeVisible();await page.evaluate(()=>document.fonts.ready);
 const box=await reactRoot.boundingBox(),react=await metrics(reactRoot);await page.addStyleTag({content:'header.sticky{opacity:0!important}.fixed{display:none!important}'});await reactRoot.screenshot({path:testInfo.outputPath('react-prompt.png'),animations:'disabled'});const reactInteraction=await interactionStyles(reactRoot);
 await page.goto('/components/ai-prompt-composer?framework=angular');const previewRoot=page.frameLocator('iframe').locator('form');await expect(previewRoot).toBeVisible();expect(Math.abs((await previewRoot.boundingBox())!.width-box!.width)).toBeLessThanOrEqual(1);
 await page.goto(`/angular-demo/index.html?component=ai-prompt-composer&theme=${theme}`);await page.setViewportSize({width:Math.round(box!.width)+32,height:1400});const angularRoot=page.locator('form');await expect(angularRoot).toBeVisible();await page.evaluate(()=>document.fonts.ready);const angular=await metrics(angularRoot);
 expect(angular).toHaveLength(react.length);for(let i=0;i<react.length;i++)for(const property of Object.keys(react[i])){const a=angular[i][property as keyof typeof angular[number]],r=react[i][property as keyof typeof react[number]];if(typeof r==='number')expect(Math.abs((a as number)-r),`${i}.${property}`).toBeLessThanOrEqual(1);else expect(a,`${i}.${property}`).toEqual(r);}
 await angularRoot.screenshot({path:testInfo.outputPath('angular-prompt.png'),animations:'disabled'});
 expect(await interactionStyles(angularRoot)).toEqual(reactInteraction);
});
