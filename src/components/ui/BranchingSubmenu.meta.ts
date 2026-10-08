import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Branching Submenu',
  description: 'A spatial submenu that connects parent options to child actions with staged branch motion.',
  category: 'Navigation',
  tagline: 'Animated tree navigation with keyboard support',
  badges: ['Navigation', 'Keyboard Friendly', 'Reduced Motion'],
  createdAt: '2026-08-28',
  features: [
    'Parent and child panels communicate hierarchy through position and stagger',
    'Arrow keys, Enter, and Escape support menu exploration',
    'Responsive layout stacks cleanly on narrow screens',
  ],
  props: [
    { name: 'items', type: 'BranchingSubmenuItem[]', default: 'demo items', description: 'Parent items and optional child branches' },
    { name: 'label', type: 'string', default: "'Branching navigation'", description: 'Accessible navigation label' },
  ],
  accessibility: [
    'Uses a labeled navigation region and focus-visible rings',
    'Supports Escape to close the branch panel and arrow-key parent navigation',
    'Reduced motion replaces branch movement with a simple fade',
  ],
  usageCode: `import { BranchingSubmenu } from "@/components/ui/branching-submenu";

export function Demo() {
  return <BranchingSubmenu />;
}`,
};

export default meta;
