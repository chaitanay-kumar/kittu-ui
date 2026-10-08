import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const FONTS_DIR = path.join(ROOT_DIR, 'public', 'fonts');
const FONTS_CSS_PATH = path.join(ROOT_DIR, 'src', 'styles', 'fonts.css');

if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

async function fetchFontCss(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });
  return res.text();
}

async function downloadBinary(url: string, destPath: string): Promise<void> {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
}

async function main() {
  console.log('Downloading Google Fonts for self-hosting...');
  const css = await fetchFontCss(
    'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap'
  );

  // Parse latin subset font-faces
  const fontFaceRegex = /\/\* latin \*\/\s*@font-face\s*\{([^}]+)\}/g;
  let match;
  let localCss = '/* Self-hosted fonts: Geist, Inter, JetBrains Mono (latin subset) */\n\n';
  let count = 0;

  while ((match = fontFaceRegex.exec(css)) !== null) {
    const block = match[1];
    const familyMatch = /font-family:\s*['"]?([^'";]+)['"]?/.exec(block);
    const weightMatch = /font-weight:\s*(\d+)/.exec(block);
    const styleMatch = /font-style:\s*([^;]+)/.exec(block) || ['normal', 'normal'];
    const urlMatch = /url\((https:\/\/[^)]+\.woff2)\)/.exec(block);

    if (familyMatch && weightMatch && urlMatch) {
      const family = familyMatch[1].trim();
      const weight = weightMatch[1].trim();
      const style = styleMatch[1].trim();
      const remoteUrl = urlMatch[1].trim();

      const safeFamilyName = family.toLowerCase().replace(/\s+/g, '-');
      const filename = `${safeFamilyName}-${weight}-${style}.woff2`;
      const destPath = path.join(FONTS_DIR, filename);

      console.log(`  Downloading ${family} ${weight} ${style} -> ${filename}`);
      await downloadBinary(remoteUrl, destPath);

      localCss += `@font-face {
  font-family: '${family}';
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url('/fonts/${filename}') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

`;
      count++;
    }
  }

  fs.writeFileSync(FONTS_CSS_PATH, localCss, 'utf-8');
  console.log(`✓ Self-hosted ${count} font files in public/fonts/`);
  console.log(`✓ Generated ${FONTS_CSS_PATH}`);
}

main().catch(console.error);
