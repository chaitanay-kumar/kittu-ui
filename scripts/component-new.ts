import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const UI_DIR = path.join(ROOT_DIR, 'src', 'components', 'ui');

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
    .replace(/^-+|-+$/g, '');
}

function toTitleCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: npm run component:new <ComponentName>');
    console.error('Example: npm run component:new AuroraCard');
    process.exit(1);
  }

  const rawName = args[0].replace(/\.(tsx?|jsx?)$/, '');
  const componentName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const slug = toKebabCase(componentName);
  const title = toTitleCase(componentName);

  const componentPath = path.join(UI_DIR, `${componentName}.tsx`);
  const metaPath = path.join(UI_DIR, `${componentName}.meta.ts`);

  if (fs.existsSync(componentPath)) {
    console.error(`❌ Component file already exists: ${componentPath}`);
    process.exit(1);
  }

  const componentTemplate = `import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface ${componentName}Props extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
  className?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={motionTransitions.springSnappy}
      className={cn(
        'p-6 rounded-xl border border-[#222222] bg-[#0E0E0E] text-[#F5F5F5]',
        className
      )}
      {...props}
    >
      <h3 className="text-sm font-semibold mb-2">${title}</h3>
      {children || <p className="text-xs text-[#8E8E8E]">Component content goes here.</p>}
    </motion.div>
  );
};
`;

  const metaTemplate = `import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: '${title}',
  description: 'A responsive, accessible ${title.toLowerCase()} component for React applications built with Tailwind CSS and Framer Motion.',
  category: 'Motion',
  tagline: 'Responsive interactive ${title.toLowerCase()}',
  badges: ['Motion', 'Tailwind', 'Interactive'],
  createdAt: '${new Date().toISOString()}',
  features: [
    'Responsive design for modern web applications',
    'Hardware accelerated layout animations',
    'Customizable appearance with standard Tailwind utility classes',
  ],
  props: [
    { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Content rendered inside the component' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Optional custom Tailwind styling' },
  ],
  accessibility: [
    'Respects prefers-reduced-motion media query',
    'Semantic HTML structure with standard keyboard support',
  ],
  usageCode: \`import { ${componentName} } from "@/components/ui/${slug}";

export function Demo() {
  return (
    <${componentName}>
      <span>Content goes here</span>
    </${componentName}>
  );
}\`,
};

export default meta;
`;

  fs.writeFileSync(componentPath, componentTemplate, 'utf-8');
  fs.writeFileSync(metaPath, metaTemplate, 'utf-8');

  console.log(`✨ Created component boilerplate:`);
  console.log(`  - ${path.relative(ROOT_DIR, componentPath)}`);
  console.log(`  - ${path.relative(ROOT_DIR, metaPath)}`);
  console.log(`\nNext step: Run "npm run build" or "npm run component:sync" to automatically register component & SEO.`);
}

main();
