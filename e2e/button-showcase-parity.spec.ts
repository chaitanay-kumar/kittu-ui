import {test,expect} from '@playwright/test';
for(const theme of ['light','dark'])test(`button showcase cards and controls match in ${theme}`,async({page})=>{
 await page.addInitScript(value=>localStorage.setItem('kit-ui-theme',value),theme);
 const results:Record<string,Array<{width:number;height:number;[key:string]:number|string}>>={};for(const framework of ['react','angular']){
  await page.goto(`/components/button?framework=${framework}`);const scope=framework==='react'?page:page.frameLocator('iframe');await expect(scope.getByRole('button',{name:'Processing...'})).toBeVisible();
  const cards=framework==='react'?scope.getByText('Visual Variants',{exact:true}).locator('xpath=..').locator('xpath=..'):scope.locator('.k-b-demo');
  results[framework]=await cards.evaluate(el=>Array.from(el.children).flatMap(card=>[card,...card.querySelectorAll('button')]).map(node=>{const s=getComputedStyle(node),r=node.getBoundingClientRect();return{width:r.width,height:r.height,font:s.fontFamily,fontSize:s.fontSize,lineHeight:s.lineHeight,fontWeight:s.fontWeight,letterSpacing:s.letterSpacing,padding:s.padding,radius:s.borderRadius,border:s.borderColor,color:s.color,background:s.backgroundColor,opacity:s.opacity}}));
 }expect(results.angular.length).toBe(results.react.length);for(let i=0;i<results.react.length;i++){const{width:rw,height:rh,...react}=results.react[i],{width:aw,height:ah,...angular}=results.angular[i];expect(angular).toEqual(react);expect(Math.abs(aw-rw)).toBeLessThan(.2);expect(Math.abs(ah-rh)).toBeLessThan(.2);}
});
