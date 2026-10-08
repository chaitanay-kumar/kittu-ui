import fs from 'node:fs';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const directory = new URL('../public/', import.meta.url);
const canonical = fs.readFileSync(new URL('kit-fox.svg', directory), 'utf8');
const white = canonical.replace('#1d241f', '#fafafa');
await sharp(Buffer.from(white)).resize(96, 96).png().toFile(fileURLToPath(new URL('logo.png', directory)));
for (const size of [192, 512]) {
  const markSize = Math.round(size * 0.74);
  const mark = await sharp(Buffer.from(white)).resize(markSize, markSize).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#1d241f' } })
    .composite([{ input: mark, gravity: 'centre' }]).png().toFile(fileURLToPath(new URL(`icon-${size}x${size}.png`, directory)));
}
const favicon = canonical.replace('<title>', '<style>path{fill:#1d241f}@media(prefers-color-scheme:dark){path{fill:#fafafa}}</style><title>');
fs.writeFileSync(new URL('favicon.svg', directory), favicon);
const png = await sharp(Buffer.from(canonical)).resize(256, 256).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4); ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12); ico.writeUInt32LE(png.length, 14); ico.writeUInt32LE(22, 18);
fs.writeFileSync(new URL('favicon.ico', directory), Buffer.concat([ico, png]));
const count = JSON.parse(fs.readFileSync(new URL('../registry.json', import.meta.url), 'utf8')).items.length;
const fox = canonical.replace(/<svg[^>]*>|<\/svg>|<title>.*?<\/title>/g, '').replace('#1d241f', '#b95636');
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f5f2e9"/>
<path d="M840 0V630M0 510H1200" stroke="#1d241f" stroke-opacity=".12"/>
<text x="80" y="123" fill="#1d241f" font-family="monospace" font-weight="600" font-size="42">Kit UI</text>
<text x="80" y="280" fill="#1d241f" font-family="sans-serif" font-weight="600" font-size="68">Nimble by nature.</text>
<text x="80" y="365" fill="#1d241f" font-family="sans-serif" font-weight="600" font-size="68">Precise by design.</text>
<svg x="884" y="181" width="252" height="252" viewBox="0 0 96 96">${fox}</svg>
<text x="80" y="568" fill="#596258" font-family="monospace" font-size="23">${count} components · React + Angular</text>
<text x="884" y="568" fill="#b95636" font-family="monospace" font-size="22">THE KIT FOX</text>
</svg>`;
fs.writeFileSync(new URL('og-image.svg', directory), social);
for (const format of ['png', 'webp']) {
  const output = await sharp(Buffer.from(social)).toFormat(format).toBuffer();
  fs.writeFileSync(new URL(`og-image.${format}`, directory), output);
}
console.log('Generated Kit Fox logos, adaptive favicon, install icons, and social cards.');
