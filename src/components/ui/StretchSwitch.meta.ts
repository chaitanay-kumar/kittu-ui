import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'StretchSwitch',
  description: 'A toggle switch whose thumb stretches slightly while dragging or pressing, then snaps naturally to its destination via a snappy spring.',
  category: 'Forms',
  tagline: 'Thumb stretches on press, then snaps',
  badges: ['Stretch Physics', 'Spring Snap', 'Accessible', 'Light & Dark'],
  createdAt: '2026-09-03',
  features: [
    'Thumb scaleX -> 1.18 / scaleY -> 0.86 while pointer is held for a tactile stretch',
    'Snappy spring (springSnappy) drives the snap to the new x position on release',
    'Press state is captured via pointerdown / pointerup, so it works for keyboard activations too',
    'Controlled / uncontrolled state, with onChange callback',
    'Light/dark theme aware via CSS variables — works in both palettes',
  ],
  props: [
    { name: 'checked', type: 'boolean', default: 'undefined', description: 'Controlled checked state' },
    { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial checked state (uncontrolled)' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction' },
    { name: 'onChange', type: '(checked: boolean) => void', default: 'undefined', description: 'Called when the switch toggles' },
    { name: 'label', type: 'React.ReactNode', default: 'undefined', description: 'Label text on the left' },
    { name: 'description', type: 'string', default: 'undefined', description: 'Helper text below the label' },
  ],
  accessibility: [
    'role="switch" with aria-checked for assistive technology',
    'Pointer-based stretch effect does not interfere with keyboard activation',
    'Disabled state communicated both visually and to AT',
  ],
  usageCode: `import { StretchSwitch } from "@/components/ui/stretch-switch";

export function Demo() {
  return (
    <div className="space-y-3 max-w-sm">
      <StretchSwitch
        label="Reduce motion"
        description="Disables parallax and large translations across the app."
        defaultChecked
      />
      <StretchSwitch
        label="Show pre-release features"
        description="Toggle to preview experiments in the dashboard."
      />
    </div>
  );
}`,
};

export default meta;
