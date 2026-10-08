/** Local development is the explicit fallback until a production domain exists. */
const configured =
  import.meta.env?.VITE_SITE_URL ||
  (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env?.VITE_SITE_URL;
export const SITE_URL = (configured || "http://localhost:5173").replace(
  /\/+$/,
  "",
);
export const IS_PUBLIC_SITE = !["localhost", "127.0.0.1", "[::1]"].includes(
  new URL(SITE_URL).hostname,
);
