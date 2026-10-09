import { test, expect, type Locator } from '@playwright/test';

for (const framework of ['react','angular']) {
 test(`${framework} table search, OR filters, sorting, selection, details and bulk actions`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`/components/advanced-data-table?framework=${framework}`);
  const surface=framework==='react'?page.getByRole('heading',{name:'Component Registry',exact:true}).locator('xpath=../../../../..'):page.frameLocator('iframe').locator('.k-dt-demo');
  await expect(surface.getByRole('heading',{name:'Component Registry',exact:true})).toBeVisible();
  const search=surface.getByPlaceholder('Search...').last();await search.fill('advanced');
  await expect(surface.getByText('Showing', {exact:false}).last()).toContainText('of 1 records');
  await search.fill('does not exist');await expect(surface.getByText('No matching records found',{exact:true})).toBeVisible();
  await surface.getByRole('button',{name:'Clear filters',exact:true}).click();await expect(search).toHaveValue('');
  await surface.getByRole('button',{name:'AI',exact:true}).click();await expect(surface.getByText('Showing',{exact:false}).last()).toContainText('of 3 records');
  await surface.getByRole('button',{name:'Motion',exact:true}).click();await expect(surface.getByText('Showing',{exact:false}).last()).toContainText('of 5 records');
  await surface.getByRole('button',{name:'Reset (2)',exact:true}).click();
  // Force table mode on narrow viewports to exercise the same sorting and page selection contract.
  if(!await surface.getByRole('table').isVisible())await surface.getByRole('button',{name:'Toggle view mode'}).click();
  const componentSort=surface.getByRole('button',{name:'Component',exact:true});
  await componentSort.click();await expect(surface.getByRole('row').nth(1)).toContainText('AI Agent Activity');
  await componentSort.click();await expect(surface.getByRole('row').nth(1)).toContainText('Spotlight Card');
  await componentSort.click();await expect(surface.getByRole('row').nth(1)).toContainText('AI Response');
  await surface.getByRole('checkbox',{name:'Select row comp_01',exact:true}).check();
  expect(await surface.getByRole('checkbox',{name:'Select all rows'}).evaluate((el:HTMLInputElement)=>el.indeterminate)).toBe(true);
  await surface.getByRole('checkbox',{name:'Select all rows'}).check();await expect(surface.getByText('5 selected',{exact:true})).toBeVisible();
  await surface.getByRole('button',{name:'Next page',exact:true}).click();await expect(surface.getByText('Showing',{exact:false}).last()).toContainText('6–10');
  await surface.getByRole('checkbox',{name:'Select all rows'}).check();await expect(surface.getByText('10 selected',{exact:true})).toBeVisible();
  await surface.getByRole('button',{name:'Export',exact:true}).click();await expect(surface.getByText('Exported 10 records as JSON payload.',{exact:true})).toBeVisible();
  await surface.getByRole('button',{name:'First page',exact:true}).click();await expect(surface.getByRole('row').nth(1)).toContainText('AI Response');
  const expand=surface.getByRole('button',{name:'Expand row details'}).first();await expand.focus();await expand.press('Enter');
  await expect(surface.getByText('AI Response Specifications',{exact:true})).toBeVisible();
  await surface.getByRole('button',{name:'Collapse row details'}).first().press('Space');await expect(surface.getByText('AI Response Specifications',{exact:true})).toBeHidden();
  await surface.getByRole('button',{name:'Toggle visible columns'}).click();await surface.getByRole('checkbox',{name:'Weekly Installs',exact:true}).uncheck();
  await expect(surface.getByRole('columnheader',{name:'Weekly Installs'})).toHaveCount(0);
  await surface.getByRole('button',{name:'Toggle visible columns'}).click();
  await surface.getByRole('combobox',{name:'Rows per page'}).selectOption('20');await expect(surface.getByText('Showing',{exact:false}).last()).toContainText('1–12');
  await surface.getByRole('button',{name:'Toggle view mode'}).click();await expect(surface.getByRole('table')).toHaveCount(0);
  await surface.getByRole('button',{name:'Expand row details'}).first().click();await expect(surface.getByText('AI Response Specifications',{exact:true})).toBeVisible();
  await surface.getByRole('button',{name:'Delete',exact:true}).click();await expect(surface.getByText('Removed 10 selected record(s) from table.',{exact:true})).toBeVisible();
  await expect(surface.getByText('Showing',{exact:false}).last()).toContainText('of 2 records');expect(errors).toEqual([]);
 });
}

async function metrics(root:Locator,selectors:Record<string,string>){return root.evaluate((el,selectors)=>{
 const properties=['fontFamily','fontSize','lineHeight','letterSpacing','paddingTop','paddingRight','paddingBottom','paddingLeft','borderRadius','color','backgroundColor'];
 return Object.fromEntries(Object.entries(selectors).map(([name,selector])=>{const node=selector?el.querySelector(selector):el;if(!node)return[name,null];const style=getComputedStyle(node);return[name,{width:node.getBoundingClientRect().width,height:node.getBoundingClientRect().height,...Object.fromEntries(properties.map(property=>[property,style[property as keyof CSSStyleDeclaration]]))}]}));
},selectors);}
for(const theme of ['light','dark'])test(`React and Angular table geometry/styles match in ${theme}`,async({page},testInfo)=>{
 await page.addInitScript(value=>localStorage.setItem('kittu-ui-theme',value),theme);
 await page.goto('/components/advanced-data-table?framework=react');
 const root=page.getByRole('heading',{name:'Component Registry',exact:true}).locator('xpath=../../../..');await expect(root).toBeVisible();
 const size=await root.boundingBox();const react=await metrics(root,{root:'',input:'input[type=text]',heading:'h3',filters:':scope>div:nth-child(2)',table:'table',header:'th',row:'tbody>tr',footer:':scope>div:last-child'});
 await root.screenshot({path:testInfo.outputPath(`react-table-${theme}.png`)});
 await page.goto(`/angular-demo/index.html?component=advanced-data-table&theme=${theme}`);await page.setViewportSize({width:Math.round(size!.width),height:1400});
 const angularRoot=page.locator('.k-data-table');await expect(angularRoot).toBeVisible();
 const angular=await metrics(angularRoot,{root:'',input:'input[type=text]',heading:'h3',filters:'.k-dt-filters',table:'table',header:'th',row:'tbody>tr',footer:'.k-dt-pagination'});
 for(const name of Object.keys(react)){if(react[name]===null){expect(angular[name]).toBeNull();continue;}for(const property of Object.keys(react[name]!)){const a=angular[name]![property],r=react[name]![property];if(typeof r==='number')expect(Math.abs((a as number)-r),`${name}.${property}`).toBeLessThanOrEqual(1);else expect(a,`${name}.${property}`).toEqual(r);}}
 await angularRoot.screenshot({path:testInfo.outputPath(`angular-table-${theme}.png`)});
});
