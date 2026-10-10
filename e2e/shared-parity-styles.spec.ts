import {test, expect} from '@playwright/test';

for (const component of ['button', 'neon-edge-button']) {
  for (const motion of ['reduce', 'no-preference'] as const) {
    test(`${component} retains source transitions and focus with shared styles under ${motion}`, async ({page}) => {
      await page.emulateMedia({reducedMotion: motion});
      const results: unknown[] = [];
      for (const framework of ['react', 'angular']) {
        await page.route('**/shared-style-contract.html*', route => route.fulfill({contentType:'text/html', body:`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><script type="module">import RefreshRuntime from "/@react-refresh";RefreshRuntime.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;</script><script type="module" src="/e2e/fixtures/${component}-contract.tsx"></script></body></html>`}));
        await page.goto(`/shared-style-contract.html?framework=${framework}&transitions=on`);
        const button=page.locator('#action');
        await expect(button).toBeVisible();
        await page.keyboard.press('Tab');
        await expect(button).toBeFocused();
        // Compare settled focus styles, not independently sampled animation frames.
        await page.waitForTimeout(200);
        results.push(await button.evaluate(el => {
          const root=getComputedStyle(el);
          const icon=el.querySelector('svg');
          const interior=icon?.parentElement;
          return {minWidth:root.minWidth,transitionDuration:root.transitionDuration,outline:root.outline,outlineOffset:root.outlineOffset,iconDuration:icon?getComputedStyle(icon).transitionDuration:null,interiorDuration:interior?getComputedStyle(interior).transitionDuration:null};
        }));
      }
      expect(results[1]).toEqual(results[0]);
      expect((results[1] as {transitionDuration:string}).transitionDuration).toBe('0.15s');
    });
  }
}
