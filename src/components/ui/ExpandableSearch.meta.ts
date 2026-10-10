import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Expandable Search',
  description: 'A compact search pill that smoothly widens on focus with shortcut hint pills and clear button.',
  category: 'Navigation',
  tagline: 'Compact spring width morphing search input',
  badges: ['Spring Expansion', 'Shortcuts', 'Compact'],
  createdAt: '2026-08-02',
  features: [
    'Spring physics width expansion',
    'Shortcut badge hint',
    'Instant clear button on input',
  ],
  props: [
    { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Input placeholder text' },
    { name: 'onSearch', type: '(query: string) => void', default: 'undefined', description: 'Search query callback' },
  ],
  accessibility: [
    'Accessible search input role',
    'Clear button accessible label',
  ],
  usageCode: `import { ExpandableSearch } from "@/components/ui/expandable-search";

export function Demo() {
  return <ExpandableSearch onSearch={(q) => console.log(q)} />;
}`,
};

export default meta;
