import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Selection Basket',
  description: 'A floating bulk-action toolbar that smoothly rises from the bottom of the screen when multiple dataset items are selected, supporting batch operations, horizontal scrolling, and clear triggers.',
  category: 'Overlays',
  tagline: 'Floating bulk-action toolbar for multi-item batch operations and export flows',
  badges: ['Bulk Actions', 'Toolbars', 'Overlays'],
  createdAt: '2026-08-21',
  features: [
    'Appears naturally with spring rise physics as soon as selected count > 0',
    'Responsive horizontal scrolling action container preventing mobile cutoff',
    'Integrated batch action buttons (Delete, Move, Export, Share)',
    'Dynamic select all / clear all selection toggle synchronization',
    'Accessible role="toolbar" keyboard navigation and focus rings',
  ],
  props: [
    { name: 'selectedCount', type: 'number', default: '0', description: 'Current number of selected items' },
    { name: 'totalCount', type: 'number', default: 'undefined', description: 'Total item universe count' },
    { name: 'actions', type: 'SelectionActionItem[]', default: '[...]', description: 'List of bulk action definitions' },
    { name: 'onClearSelection', type: '() => void', default: 'undefined', description: 'Callback fired when user clears selection' },
    { name: 'onSelectAll', type: '() => void', default: 'undefined', description: 'Callback fired when user selects all' },
  ],
  accessibility: [
    'ARIA role="toolbar" and aria-label="Bulk actions toolbar"',
    'Keyboard navigable action items with tab and arrow keys',
  ],
  usageCode: `import { SelectionBasket } from "@/components/ui/selection-basket";

export function Demo() {
  const [selected, setSelected] = useState<string[]>(['item-1', 'item-2']);

  return (
    <SelectionBasket
      selectedCount={selected.length}
      totalCount={10}
      onClearSelection={() => setSelected([])}
      actions={[
        { id: 'export', label: 'Export', onClick: () => console.log('Exporting') },
        { id: 'delete', label: 'Delete', variant: 'danger', onClick: () => console.log('Deleting') }
      ]}
    />
  );
}`,
};

export default meta;
