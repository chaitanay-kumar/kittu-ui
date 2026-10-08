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
  vi.stubEnv('VITE_BASE_PATH', '/kittu-ui/');
  const { withBasePath, stripBasePath } = await import('./base-path');
  expect(withBasePath('/')).toBe('/kittu-ui/');
  expect(withBasePath('/angular-demo/index.html?component=button')).toBe('/kittu-ui/angular-demo/index.html?component=button');
  expect(withBasePath('/kittu-ui/source/button.json')).toBe('/kittu-ui/source/button.json');
  expect(withBasePath('//example.com/file')).toBe('//example.com/file');
  expect(stripBasePath('/kittu-ui/components/button/')).toBe('/components/button/');
  expect(stripBasePath('/kittu-ui')).toBe('/');
  expect(stripBasePath('/kittu-ui-other/components')).toBe('/kittu-ui-other/components');
});
