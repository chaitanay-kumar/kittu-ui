import fs from 'node:fs';

const base = '/' + (process.env.VITE_BASE_PATH || '/').replace(/^\/+|\/+$/g, '');
const prefix = base === '/' ? '/' : base + '/';
const publicPath = value => prefix + value.replace(/^\/+/, '');
const manifestPath = new URL('../dist/site.webmanifest', import.meta.url);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
manifest.start_url = prefix;
manifest.scope = prefix;
manifest.icons = manifest.icons.map(icon => ({ ...icon, src: publicPath(icon.src) }));
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
fs.writeFileSync(new URL('../dist/.nojekyll', import.meta.url), '');
fs.writeFileSync(new URL('../dist/404.html', import.meta.url), `<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Page not found — Kittu UI</title><style>body{font:16px system-ui;max-width:40rem;margin:15vh auto;padding:2rem}a{color:inherit}</style>
<h1>Page not found</h1><p>This Kittu UI page could not be found.</p><a href="${prefix}">Go to Kittu UI</a></html>`);
console.log(`Prepared GitHub Pages artifact for ${prefix}`);
