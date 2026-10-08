import { expect, test } from '@playwright/test';

test.use({ baseURL: process.env.PAGES_PREVIEW_URL || 'http://127.0.0.1:4173' });
test.skip(!process.env.PAGES_PREVIEW_URL, 'Run against a GitHub Pages artifact or the deployed site.');

test('project Pages supports deep links, frameworks, navigation and downloads', async ({ page, request }, testInfo) => {
  const failures: string[] = [];
  page.on('response', response => {
    if (response.status() >= 400 && response.url().startsWith(process.env.PAGES_PREVIEW_URL!)) failures.push(response.url());
  });
  await page.goto('/kittu-ui/components/typewriter-button/?framework=angular');
  await expect(page.getByRole('heading', { name: 'Typewriter Button', exact: true })).toBeVisible();
  await expect(page.frameLocator('iframe').locator('kittu-typewriter-button')).toBeVisible();
  await expect(page.locator('iframe')).toHaveAttribute('src', /^\/kittu-ui\/angular-demo\//);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://chaitanay-kumar.github.io/kittu-ui/components/typewriter-button/?framework=angular');
  const toggle = page.getByRole('group', { name: 'Component framework' });
  await toggle.getByRole('button', { name: 'React', exact: true }).click();
  await expect(page.locator('iframe')).toHaveCount(0);
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Toggle sidebar', exact: true }).click();
  const search = page.getByRole('textbox', { name: 'Search components' }).filter({ visible: true });
  await search.fill('Elastic Sheet');
  const target = testInfo.project.name === 'mobile'
    ? page.getByRole('button', { name: /^Elastic Sheet/ })
    : page.getByRole('complementary', { name: 'Component navigation' }).getByRole('link', { name: /^Elastic Sheet/ });
  await target.click();
  await expect(page).toHaveURL(/\/kittu-ui\/components\/elastic-sheet\?framework=react/);
  await page.reload();
  await expect(page.getByRole('button', { name: /Open elastic sheet/ })).toBeVisible();
  await toggle.getByRole('button', { name: 'Angular', exact: true }).click();
  await expect(page.frameLocator('iframe').locator('kittu-elastic-sheet')).toBeVisible();
  await expect(page.getByText('elastic-sheet.component.ts', { exact: true })).toBeVisible();
  for (const resource of ['/kittu-ui/source/elastic-sheet.json', '/kittu-ui/angular-source/elastic-sheet.json', '/kittu-ui/downloads/kittu-ui-angular-0.1.0.tgz']) {
    expect((await request.get(resource)).status()).toBe(200);
  }
  const manifest = await (await request.get('/kittu-ui/site.webmanifest')).json();
  expect(manifest.start_url).toBe('/kittu-ui/');
  expect(manifest.icons.every((icon: { src: string }) => icon.src.startsWith('/kittu-ui/'))).toBe(true);
  expect(failures).toEqual([]);
});
