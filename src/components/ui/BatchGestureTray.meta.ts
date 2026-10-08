import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Batch Gesture Tray',
  description: 'A touch-ready contextual tray that slides into view upon item selection, presenting bulk actions and real-time count telemetry.',
  category: 'Feedback',
  tagline: 'Spring floating tray with multi-select batch actions',
  badges: ['Framer Motion', 'Spring Physics', 'Batch Actions', 'Accessible'],
  createdAt: '2026-08-24',
  features: [
    'Spring slide-up bottom tray appearing automatically when 1 or more items are selected',
    'Integrated selection counter badge with Select-All / Deselect-All triggers',
    'Async action loading indicators preventing double-submission',
    'Dismissal via close button, escape key, or outside tap',
  ],
  props: [
    { name: 'items', type: 'BatchItem[]', description: 'Array of selectable list items (id, title, subtitle)' },
    { name: 'actions', type: 'BatchAction[]', description: 'Array of batch action buttons (id, label, icon, action, color)' },
    { name: 'selectedIds', type: 'string[]', default: 'undefined', description: 'Controlled array of selected item IDs' },
    { name: 'onSelectionChange', type: '(ids: string[]) => void', default: 'undefined', description: 'Selection state callback' },
    { name: 'onActionComplete', type: '(actionId: string) => void', default: 'undefined', description: 'Callback fired on action finish' },
  ],
  accessibility: [
    'Accessible checkbox toggle state and keyboard selection',
    'aria-live announcements when item selection counter changes',
    'Full keyboard tab access through tray action buttons',
  ],
  usageCode: `import { BatchGestureTray } from "@/components/ui/batch-gesture-tray";
import { Trash2, Archive, Download } from "lucide-react";

export function Demo() {
  const items = [
    { id: '1', title: 'serverless-edge-fn.ts', subtitle: 'Modified 4m ago' },
    { id: '2', title: 'redis-cache-layer.ts', subtitle: 'Modified 1h ago' },
    { id: '3', title: 'schema-validation.ts', subtitle: 'Modified 3h ago' },
  ];

  const actions = [
    { id: 'download', label: 'Export', icon: <Download className="w-3.5 h-3.5" />, action: async () => {} },
    { id: 'archive', label: 'Archive', icon: <Archive className="w-3.5 h-3.5" />, action: async () => {} },
    { id: 'delete', label: 'Delete', color: 'danger' as const, icon: <Trash2 className="w-3.5 h-3.5" />, action: async () => {} },
  ];

  return <BatchGestureTray items={items} actions={actions} />;
}`,
};

export default meta;
