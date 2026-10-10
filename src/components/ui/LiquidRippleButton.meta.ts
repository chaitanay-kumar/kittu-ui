import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Liquid Ripple Button',
  description: 'A tactile button whose pointer-origin ripple and subtle wave layer make press feedback feel fluid.',
  category: 'Buttons',
  tagline: 'Pointer-origin liquid press feedback',
  badges: ['Button', 'Pointer Feedback', 'Reduced Motion'],
  createdAt: '2026-08-28',
  features: [
    'Ripple originates from the actual press point',
    'Slow secondary wave remains below the label and icon',
    'Primary and secondary variants match Kit UI button surfaces',
  ],
  props: [
    { name: 'children', type: 'ReactNode', default: "'Run interaction'", description: 'Button content' },
    { name: 'variant', type: "'primary' | 'secondary'", default: "'primary'", description: 'Visual style variant' },
  ],
  accessibility: [
    'Uses a semantic button and preserves native keyboard activation',
    'Reduced motion removes ripple and wave animation while retaining press state',
  ],
  usageCode: `import { LiquidRippleButton } from "@/components/ui/liquid-ripple-button";

export function Demo() {
  return <LiquidRippleButton variant="secondary">Generate preview</LiquidRippleButton>;
}`,
};

export default meta;
