import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Animated Number Morph',
  description: 'An Apple-grade smooth rolling digit counter that independently morphs individual numerical columns with physics-based springs, locale commas, currencies, and compact notation.',
  category: 'Motion',
  tagline: 'Independent column digit rolling physics for metrics and financial dashboards',
  badges: ['Metrics', 'Motion Physics', 'Typography'],
  createdAt: '2026-08-21',
  features: [
    'Independent digit column spring animation preventing layout jitter',
    'Automatic thousand grouping (e.g. 12,450) and fixed decimal formatting',
    'Compact notation support for large values (1.2M, 45K)',
    'Configurable prefixes, suffixes, and spring stiffness parameters',
    'Full accessibility with aria-label text narration',
  ],
  props: [
    { name: 'value', type: 'number', default: '0', description: 'The numeric target value to morph towards' },
    { name: 'decimals', type: 'number', default: '0', description: 'Number of decimal places to preserve' },
    { name: 'prefix', type: 'string', default: "''", description: 'Text or currency prepended to number (e.g. "$")' },
    { name: 'suffix', type: 'string', default: "''", description: 'Text or unit appended to number (e.g. "%", "ms")' },
    { name: 'useGrouping', type: 'boolean', default: 'true', description: 'Formats with comma separators' },
    { name: 'compact', type: 'boolean', default: 'false', description: 'Formats using compact abbreviations (K, M, B)' },
    { name: 'stiffness', type: 'number', default: '170', description: 'Spring transition stiffness' },
    { name: 'damping', type: 'number', default: '22', description: 'Spring transition damping' },
  ],
  accessibility: [
    'Screen readers read the complete rendered string via aria-label attribute',
    'Bypasses motion if user has reduced-motion preference enabled',
  ],
  usageCode: `import { AnimatedNumber } from "@/components/ui/animated-number";

export function Demo() {
  const [revenue, setRevenue] = useState(12450);

  return (
    <div className="text-3xl font-bold">
      <AnimatedNumber value={revenue} prefix="$" useGrouping />
    </div>
  );
}`,
};

export default meta;
