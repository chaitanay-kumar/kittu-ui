import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Expandable Data Row',
  description: 'A polished table component with fluid accordion row unfolding, revealing deep metadata, audit activity feeds, and quick actions, with automatic card restructuring on mobile viewports.',
  category: 'Motion',
  tagline: 'Smooth unfolding table row with deep metadata and responsive mobile conversion',
  badges: ['Tables', 'Accordion Motion', 'Responsive'],
  createdAt: '2026-08-21',
  features: [
    'Soft accordion expansion unfolding details directly beneath rows without modals',
    'Single or multi-row simultaneous expansion modes',
    'Full metadata breakdown with account metrics and historical activity timeline',
    'Adaptive layout engine transforming desktop table into touch cards on mobile devices',
    'Integrated quick actions with one-click email copying and callback hooks',
  ],
  props: [
    { name: 'items', type: 'DataRowItem[]', default: '[...]', description: 'Data records with user, status, revenue, and metadata' },
    { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Permit multiple expanded rows concurrently' },
    { name: 'defaultExpandedIds', type: 'string[]', default: "['usr_01']", description: 'Initially expanded row identifiers' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Displays pulse skeleton loaders during data fetch' },
    { name: 'onRowAction', type: '(action: string, row: DataRowItem) => void', default: 'undefined', description: 'Callback fired on row action buttons' },
  ],
  accessibility: [
    'Aria-expanded attributes and keyboard navigation (Enter, Space, Tab)',
    'Semantic table row and button hierarchy compliant with WCAG 2.1 AA',
    'Reduced motion support with instant height visibility toggle',
  ],
  usageCode: `import { ExpandableDataRow } from "@/components/ui/expandable-data-row";

export function Demo() {
  return (
    <ExpandableDataRow
      items={[
        {
          id: "usr_01",
          user: { name: "Sarah Connor", email: "sarah@cyberdyne.io" },
          status: "active",
          revenue: "$4,280",
          date: "Oct 24, 2026",
          metadata: { plan: "Enterprise Plus", sessions: 482 },
        }
      ]}
    />
  );
}`,
};

export default meta;
