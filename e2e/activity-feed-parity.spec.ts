import { test, expect, type Locator } from '@playwright/test';

const regionName = 'Activity and telemetry event feed';
const titles = ['Production release v2.4.0 verified', 'Token rotation required for API key', 'POST /v1/chat/completions 200 OK'];

for (const framework of ['react', 'angular']) {
  test(`${framework} Activity Feed filters, searches and inspects the same events`, async ({ page }) => {
    await page.goto(`/components/activity-feed?framework=${framework}`);
    const surface = framework === 'react' ? page : page.frameLocator('iframe');
    const feed = surface.getByRole('region', { name: regionName });
    await expect(feed).toBeVisible();
    for (const title of titles) await expect(feed.getByText(title, { exact: true })).toBeVisible();
    await feed.getByRole('button', { name: /Security\s*\(1\)/ }).click();
    await expect(feed.getByText(titles[0], { exact: true })).toBeHidden();
    await expect(feed.getByText(titles[1], { exact: true })).toBeVisible();
    await feed.getByRole('button', { name: /All\s*\(3\)/ }).click();
    const search = feed.getByPlaceholder('Search audit trace...');
    for (const query of ['TRC_55E10A', 'External Client', 'first-byte', 'completions']) {
      await search.fill(query);
      await expect(feed.getByText(titles[2], { exact: true })).toBeVisible();
      await expect(feed.getByText(titles[0], { exact: true })).toBeHidden();
    }
    await search.fill('no such event');
    await expect(feed.getByText('No activity events recorded matching filters.')).toBeVisible();
    await search.fill('');
    const toggle = feed.getByRole('button', { name: 'Toggle JSON payload' }).first();
    await toggle.focus();
    await toggle.press('Enter');
    await expect(feed.getByText('PAYLOAD SNAPSHOT (JSON)').first()).toBeVisible();
    await expect(feed.locator('pre').first()).toContainText('"version": "2.4.0"');
    await toggle.press('Space');
    await expect(feed.getByText('PAYLOAD SNAPSHOT (JSON)').first()).toBeHidden();
  });

  test(`${framework} Activity Feed live stream starts and stops`, async ({ page }) => {
    await page.goto(`/components/activity-feed?framework=${framework}`);
    const surface = framework === 'react' ? page : page.frameLocator('iframe');
    const feed = surface.getByRole('region', { name: regionName });
    const stream = feed.getByRole('button', { name: 'Start Live Stream' });
    await stream.click();
    await expect(feed.getByRole('button', { name: 'Live Stream Active' })).toBeVisible();
    await expect(feed.getByText('Just now', { exact: true }).first()).toBeVisible({ timeout: 7000 });
    await feed.getByRole('button', { name: 'Live Stream Active' }).click();
    const before = await feed.getByText('Just now', { exact: true }).count();
    // Wait beyond the simulation interval to catch an uncleared timer.
    await page.waitForTimeout(3700);
    expect(await feed.getByText('Just now', { exact: true }).count()).toBe(before);
  });
}

async function metrics(feed: Locator) {
  return feed.evaluate(root => {
    const styles = (node: Element) => {
      const css = getComputedStyle(node), box = node.getBoundingClientRect(), parent = root.getBoundingClientRect();
      return { x: box.x-parent.x, y: box.y-parent.y, width: box.width, height: box.height,
        radius: css.borderRadius, font: css.fontFamily, size: css.fontSize, weight: css.fontWeight,
        lineHeight: css.lineHeight, color: css.color, background: css.backgroundColor };
    };
    return { root: styles(root), search: styles(root.querySelector('input')!),
      stream: styles(Array.from(root.querySelectorAll('button')).find(el => el.textContent?.includes('Start Live'))!),
      titles: Array.from(root.querySelectorAll('span')).filter(el => ['Production release v2.4.0 verified', 'Token rotation required for API key', 'POST /v1/chat/completions 200 OK'].includes(el.textContent || '')).map(styles),
      descriptions: Array.from(root.querySelectorAll('p')).filter(el => el.textContent && !el.closest('[aria-hidden="true"]')).map(styles),
      categories: Array.from(root.querySelectorAll('button')).filter(el => /\(\d+\)/.test(el.textContent || '')).map(styles),
      iconStyles: Array.from(root.querySelectorAll('svg')).filter(el => !el.closest('[aria-hidden="true"].k-af-payload')).map(styles),
      icons: Array.from(root.querySelectorAll('svg')).filter(el => !el.closest('[aria-hidden="true"].k-af-payload')).map(el => el.innerHTML.replace(/\s+/g, ' ')) };
  });
}
for (const theme of ['light', 'dark']) {
  test(`Activity Feed React/Angular layout and typography match in ${theme}`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(value => localStorage.setItem('kittu-ui-theme', value), theme);
    await page.goto('/components/activity-feed?framework=react');
    const feed = page.getByRole('region', { name: regionName });
    await expect(feed).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const width = (await feed.boundingBox())!.width;
    const reference = await metrics(feed);
    await feed.screenshot({ path: testInfo.outputPath(`react-${theme}.png`) });
    await page.setViewportSize({ width: Math.round(width), height: 1000 });
    await page.goto(`/angular-demo/index.html?component=activity-feed&theme=${theme}`);
    await expect(feed).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const actual = await metrics(feed);
    // Position in the documentation shell is outside the component contract.
    reference.root.x = reference.root.y = actual.root.x = actual.root.y = 0;
    expect(actual).toEqual(reference);
    await feed.screenshot({ path: testInfo.outputPath(`angular-${theme}.png`) });
  });
}

test('Angular Activity Feed copies trace IDs and JSON, and handles clipboard rejection', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/angular-demo/index.html?component=activity-feed');
  const feed = page.getByRole('region', { name: regionName });
  await feed.getByTitle('Copy Trace ID').first().click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('trc_98fa20');
  await feed.getByRole('button', { name: 'Toggle JSON payload' }).first().click();
  await feed.getByRole('button', { name: 'Copy JSON' }).first().click();
  expect(JSON.parse(await page.evaluate(() => navigator.clipboard.readText()))).toEqual({ version: '2.4.0', sha: '8f3b2a', regions: ['iad1', 'sfo1', 'fra1'] });
  await page.evaluate(() => { navigator.clipboard.writeText = () => Promise.reject(new Error('Denied')); });
  await feed.getByTitle('Copy Trace ID').first().click();
  await expect(feed.getByRole('status')).toContainText('Copy failed.');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    document.execCommand = command => command === 'copy';
  });
  const trace = feed.getByTitle('Copy Trace ID').first();
  await trace.click();
  await expect(trace).toHaveClass(/k-af-copied/);
  await expect(feed.getByRole('status')).toHaveCount(0);
  await expect(page.locator('textarea')).toHaveCount(0);
});
