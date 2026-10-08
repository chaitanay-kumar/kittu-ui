import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'PressButton',
  description: 'A button that compresses slightly on press and settles with a tiny natural overshoot for a tactile, physical feel.',
  category: 'Buttons',
  tagline: 'Compresses slightly on press, then settles',
  badges: ['Spring Press', 'Squash Physics', 'Accessible', 'Light & Dark'],
  createdAt: '2026-09-03',
  features: [
    'Layered scaleX + scaleY squash for an organic compression on press',
    'Tunable pressStrength (0-1) to control how much the button compresses',
    'Snappy spring with a tiny overshoot so the button "settles" instead of snapping',
    '4 visual variants: Primary, Secondary, Outline, Ghost — light/dark theme aware',
    '4 size dimensions: Small (sm), Medium (md), Large (lg), and square Icon',
    'Full keyboard accessibility with focus-ring and disabled state',
  ],
  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost'", default: "'primary'", description: 'Visual presentation style' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", default: "'md'", description: 'Dimensions and typography scale' },
    { name: 'pressStrength', type: 'number', default: '0.04', description: 'Compression amount on press (0-1, clamped 0.01-0.06)' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches button to 100% width of parent container' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction and applies 30% disabled opacity' },
  ],
  accessibility: [
    'Native <button> semantics with explicit type="button" default',
    'Standard focus-ring outline with restrained accent on keyboard :focus-visible',
    'Disabled state is communicated both visually and via pointer-events',
    'Respects prefers-reduced-motion via the system spring config',
  ],
  usageCode: `import { PressButton } from "@/components/ui/press-button";

export function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PressButton variant="primary">Save changes</PressButton>
      <PressButton variant="secondary" pressStrength={0.05}>Cancel</PressButton>
      <PressButton variant="outline">Learn more</PressButton>
      <PressButton variant="ghost">Skip</PressButton>
    </div>
  );
}`,
};

export default meta;
