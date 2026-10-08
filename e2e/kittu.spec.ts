import { expect, test } from '@playwright/test';

const components = [
  ['elastic-sheet','Elastic Sheet'], ['smart-upload','Smart Upload'],
  ['liquid-command-palette','Liquid Command Palette'], ['hold-to-confirm','Hold-to-Confirm'],
  ['swipe-action-list','Swipe Action List'], ['interactive-data-card','Interactive Data Card'],
  ['timeline-scrubber','Timeline Scrubber'], ['ai-prompt-composer','AI Prompt Composer'],
];

for (const [slug,title] of components) {
  test(`${title} renders in both themes without horizontal overflow`,async({page},testInfo)=>{
    const errors:string[]=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`/components/${slug}`);
    await expect(page.getByRole('heading',{name:title,exact:true}).first()).toBeVisible();
    await expect(page.locator('.kittu-control').first()).toBeVisible();
    expect(await page.locator('.kittu-control').first().evaluate(root=>root.scrollWidth<=root.clientWidth+1)).toBe(true);
    for(const theme of ['light','dark']) {
      await page.evaluate(value=>document.documentElement.classList.toggle('dark',value==='dark'),theme);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
    }
    await page.locator('.kittu-control').first().screenshot({path:testInfo.outputPath(`${slug}.png`)});
    expect(errors).toEqual([]);
  });
}

test('sheet contains focus, resizes with keys, closes with Escape and returns focus',async({page})=>{
  await page.goto('/components/elastic-sheet');
  const open=page.getByRole('button',{name:/Open elastic sheet/}).first();await open.click();
  const dialog=page.getByRole('dialog',{name:'Make room for the details'});await expect(dialog).toBeVisible();
  const handle=dialog.getByRole('button',{name:/Resize sheet/});await handle.focus();await handle.press('End');
  await expect(dialog.getByRole('button',{name:'90%'})).toHaveAttribute('aria-pressed','true');
  await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(open).toBeFocused();
});

test('palette searches and navigates commands without opening the site search',async({page})=>{
  await page.goto('/components/liquid-command-palette');
  await page.getByRole('button',{name:/Find a command/}).first().click();
  const dialog=page.getByRole('dialog',{name:'Command palette'});const input=dialog.getByRole('combobox');
  await input.fill('documentation');await expect(dialog.getByRole('option')).toHaveCount(1);
  await input.press('ArrowDown');await input.press('Enter');await expect(page).toHaveURL(/docs\/introduction/);
});

test('upload cancellation and prompt failure preserve useful state',async({page})=>{
  await page.goto('/components/smart-upload');
  const upload=page.locator('.kittu-control').first();
  await upload.getByLabel('Choose files or drop them here').setInputFiles({name:'report.pdf',mimeType:'application/pdf',buffer:Buffer.from('sample')});
  // Exercise the keyboard alternative without racing the moving mobile preview.
  await upload.getByRole('button',{name:'Upload',exact:true}).press('Enter');await upload.getByRole('button',{name:'Cancel',exact:true}).press('Enter');
  await expect(upload.getByRole('button',{name:'Retry'})).toBeVisible();await upload.getByRole('button',{name:'Retry'}).press('Enter');
  await expect(upload.getByText('success',{exact:true})).toBeVisible();
  await page.goto('/components/ai-prompt-composer');
  const composer=page.getByRole('form',{name:'AI prompt composer'}).first();await composer.getByRole('textbox').fill('fail with my draft');
  await composer.getByRole('button',{name:/Send prompt/}).click();await expect(composer.getByRole('status')).toContainText('Sending failed');
  await expect(composer.getByRole('textbox')).toHaveValue('fail with my draft');
});
