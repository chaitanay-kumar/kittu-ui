import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Morphing Dialog',
  description: 'An expandable card trigger that fluidly morphs into a centered dialog without jarring popup animations.',
  category: 'Overlays',
  tagline: 'Seamless shared layoutId card to modal transition',
  badges: ['Shared Layout', 'Spring Physics', 'Zero Layout Shift'],
  createdAt: '2026-08-14',
  features: [
    'Framer Motion layoutId continuous surface expansion',
    'Esc key dismissal and backdrop click support',
    'Body scroll lock handling during active state',
  ],
  props: [
    { name: 'title', type: 'string', default: 'Required', description: 'Dialog header title' },
    { name: 'subtitle', type: 'string', default: 'undefined', description: 'Secondary header description' },
    { name: 'trigger', type: '(open: () => void) => ReactNode', default: 'Required', description: 'Render trigger button or card' },
  ],
  accessibility: [
    'Traps focus and sets aria-modal="true"',
    'Closes on Escape key press with focus restoration',
  ],
  usageCode: `import { MorphingDialog } from "@/components/ui/morphing-dialog";

export function Demo() {
  return (
    <MorphingDialog
      title="API Key Configuration"
      subtitle="Manage fine-grained token permissions"
      trigger={(open) => (
        <button onClick={open} className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm">
          Configure Keys
        </button>
      )}
    >
      <p className="text-sm text-neutral-300">Set read/write boundaries for automation tasks.</p>
    </MorphingDialog>
  );
}`,
};

export default meta;
