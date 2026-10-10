import { expect, test } from '@playwright/test';

test('component search navigation survives framework switching', async ({ page }, testInfo) => {
  await page.goto('/components/typewriter-button?framework=react');
  await expect(page.getByRole('heading', { name: 'Typewriter Button', exact: true })).toBeVisible();
  const mobile = testInfo.project.name === 'mobile';
  const toggle = page.getByRole('button', { name: 'Toggle sidebar', exact: true });
  if (mobile) await toggle.click();
  const search = page.getByRole('textbox', { name: 'Search components', exact: true }).filter({ visible: true });
  await search.fill('Button');
  if (mobile) await page.getByRole('button', { name: 'Close component navigation' }).click();

  const switches = page.getByRole('group', { name: 'Component framework' });
  await switches.getByRole('button', { name: 'Angular', exact: true }).click();
  await expect(page).toHaveURL(/typewriter-button\?framework=angular/);
  await expect(page.frameLocator('iframe').locator('kit-typewriter-button')).toBeVisible();
  if (mobile) await toggle.click();
  await expect(search).toHaveValue('Button');
  await expect(search).toBeVisible();
  if (!mobile) await expect(page.getByRole('complementary', { name: 'Component navigation' })).toBeVisible();

  await search.fill('Magnetic');
  const target = mobile
    ? page.getByRole('button', { name: 'Magnetic Button', exact: true })
    : page.getByRole('complementary', { name: 'Component navigation' }).getByRole('link', { name: 'Magnetic Button', exact: true });
  await target.click();
  await expect(page).toHaveURL(/magnetic-button\?framework=angular/);
  await expect(page.frameLocator('iframe').getByRole('button', {name:'Magnetic Button',exact:true})).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Magnetic Button', exact: true })).toBeVisible();

  await switches.getByRole('button', { name: 'React', exact: true }).click();
  await expect(page).toHaveURL(/magnetic-button\?framework=react/);
  await expect(page.locator('iframe')).toHaveCount(0);
  if (mobile) await toggle.click();
  await expect(search).toHaveValue('Magnetic');
  if (!mobile) {
    await expect(target).toHaveAttribute('aria-current', 'page');
    await expect(target).toHaveAttribute('href', /framework=react/);
  }
});
