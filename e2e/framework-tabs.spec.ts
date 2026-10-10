import { expect, test } from '@playwright/test';

test('documentation tabs preserve selection and show framework-specific content', async ({ page, context }, testInfo) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/components/elastic-sheet?framework=react');
  const switches = page.getByRole('group', { name: 'Component framework' });
  const preview = page.getByRole('tab', { name: 'Preview', exact: true });
  const usage = page.getByRole('tab', { name: 'Usage', exact: true });
  const code = page.getByRole('tab', { name: 'Code', exact: true });
  await code.click();
  await expect(page.getByRole('tabpanel', { name: 'Code' }).locator('pre')).toContainText('function ElasticSheet');
  await switches.getByRole('button', { name: 'Angular', exact: true }).click();
  await expect(code).toHaveAttribute('aria-selected', 'true');
  const source = page.getByRole('tabpanel', { name: 'Code' });
  await expect(source.getByText('elastic-sheet.component.ts', { exact: true })).toBeVisible();
  await expect(source.locator('pre').first()).toContainText('class KitElasticSheetComponent');
  await expect(page.locator('iframe')).toHaveCount(0);
  await source.getByRole('button', { name: 'Copy', exact: true }).first().click();
  await expect(source.getByRole('button', { name: 'Copied', exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('class KitElasticSheetComponent');
  await source.getByText('Shared TypeScript types and styles').click();
  await expect(source.getByText('styles.css', { exact: true })).toBeVisible();

  await usage.click();
  await expect(page.getByRole('tabpanel', { name: 'Usage' })).toContainText("from 'kit-ui-angular'");
  await expect(page.getByRole('tabpanel', { name: 'Usage' })).toContainText('<kit-elastic-sheet');
  await usage.press('ArrowRight');
  await expect(code).toBeFocused();
  await expect(code).toHaveAttribute('aria-selected', 'true');
  await code.press('Home');
  await expect(preview).toBeFocused();
  await expect(page.frameLocator('iframe').locator('kit-elastic-sheet')).toBeVisible();
  await expect(page.getByRole('tabpanel', { name: 'Preview' })).toBeVisible();
  await usage.click();
  await switches.getByRole('button', { name: 'React', exact: true }).click();
  await expect(usage).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Usage' })).not.toContainText('kit-ui-angular');
  await expect(page.getByRole('tabpanel', { name: 'Usage' })).toContainText('ElasticSheet');
  if (testInfo.project.name === 'desktop') await expect(page.getByRole('complementary', { name: 'Component navigation' })).toBeVisible();
});

test('Angular Code tab retries a failed source request', async ({ page }) => {
  let fail = true;
  await page.route('**/angular-source/elastic-sheet.json', async route => {
    if (fail) { await route.fulfill({ status: 503, body: 'Unavailable' }); }
    else await route.continue();
  });
  await page.goto('/components/elastic-sheet?framework=angular');
  await expect(page.frameLocator('iframe').locator('kit-elastic-sheet')).toBeVisible();
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  const panel = page.getByRole('tabpanel', { name: 'Code' });
  await expect(panel.getByRole('alert')).toContainText('Source could not load');
  fail = false;
  await panel.getByRole('button', { name: 'Retry', exact: true }).click();
  await expect(panel.getByText('elastic-sheet.component.ts', { exact: true })).toBeVisible();
});
