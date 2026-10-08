/** Public paths support both root hosting and GitHub project Pages. */
const configured = import.meta.env?.VITE_BASE_PATH ||
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.VITE_BASE_PATH || '/';
export const BASE_PATH = '/' + configured.replace(/^\/+|\/+$/g, '') + (configured.replace(/\//g, '') ? '/' : '');
export function withBasePath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//') || BASE_PATH === '/') return path;
  if (path === BASE_PATH.slice(0, -1) || path.startsWith(BASE_PATH)) return path;
  return BASE_PATH + path.slice(1);
}
export function stripBasePath(path: string): string {
  if (BASE_PATH === '/') return path;
  if (path === BASE_PATH.slice(0, -1)) return '/';
  return path.startsWith(BASE_PATH) ? '/' + path.slice(BASE_PATH.length) : path;
}
