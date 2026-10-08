import { expect, test } from '@playwright/test';

for (const theme of ['light', 'dark']) {
  test(`Kit Fox branding in ${theme} theme`, async ({ page }, testInfo) => {
    await page.addInitScript(value => localStorage.setItem('kittu-ui-theme', value), theme);
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('style', new RegExp(`color-scheme: ${theme}`));
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Nimble by nature.');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Precise by design.');
    for (const name of ['Nimble', 'Precise', 'Adaptable', 'Alert']) {
      await expect(page.locator('#philosophy').getByRole('heading', { name, exact: true })).toHaveCount(1);
    }
    const logo = page.getByRole('link', { name: 'Kit UI Home', exact: true }).first().locator('img');
    await expect(logo).toBeVisible();
    await expect.poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(96);
    await expect(page.locator('footer .kit-ui-fox-mark')).toHaveCount(1);
    await expect(page).toHaveTitle(/Kit UI/);
    const manifest = await page.request.get('/site.webmanifest');
    const installedBrand = await manifest.json();
    expect(installedBrand.name).toContain('Kit UI');
    expect(installedBrand.short_name).toBe('Kit UI');
    const favicon = await page.request.get('/favicon.svg');
    expect(await favicon.text()).toContain('prefers-color-scheme');
    await page.screenshot({ path: testInfo.outputPath(`kit-ui-${theme}.png`), fullPage: true });
    await page.goto('/?framework=angular');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Native Angular.');
    for (const name of ['Nimble', 'Precise', 'Adaptable', 'Alert']) {
      await expect(page.locator('#philosophy').getByRole('heading', { name, exact: true })).toHaveCount(1);
    }
    await expect(page.getByRole('link', { name: 'Kit UI Home', exact: true }).first()).toBeVisible();
  });
}
