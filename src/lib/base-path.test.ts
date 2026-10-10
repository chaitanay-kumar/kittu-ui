import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

it('keeps local root hosting and external URLs intact', async () => {
  vi.stubEnv('VITE_BASE_PATH', '/');
  const { withBasePath, stripBasePath } = await import('./base-path');
  expect(withBasePath('/components/button?framework=angular')).toBe('/components/button?framework=angular');
  expect(stripBasePath('/components/button')).toBe('/components/button');
  expect(withBasePath('https://github.com/example')).toBe('https://github.com/example');
});

it('prefixes project URLs once and strips only the matching route prefix', async () => {
  vi.stubEnv('VITE_BASE_PATH', '/kit-ui/');
  const { withBasePath, stripBasePath } = await import('./base-path');
  expect(withBasePath('/')).toBe('/kit-ui/');
  expect(withBasePath('/angular-demo/index.html?component=button')).toBe('/kit-ui/angular-demo/index.html?component=button');
  expect(withBasePath('/kit-ui/source/button.json')).toBe('/kit-ui/source/button.json');
  expect(withBasePath('//example.com/file')).toBe('//example.com/file');
  expect(stripBasePath('/kit-ui/components/button/')).toBe('/components/button/');
  expect(stripBasePath('/kit-ui')).toBe('/');
  expect(stripBasePath('/kit-ui-other/components')).toBe('/kit-ui-other/components');
});
