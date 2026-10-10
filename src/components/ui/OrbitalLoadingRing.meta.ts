import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Orbital Loading Ring',
  description: 'A lightweight loading indicator with layered rings and orbiting particles that communicate active processing.',
  category: 'Feedback',
  tagline: 'Layered orbital processing indicator',
  badges: ['CSS Motion', 'Accessible', 'Lightweight'],
  createdAt: '2026-08-28',
  features: [
    'Two coordinated orbital rhythms with a subtle center pulse',
    'Size, speed, and density variants',
    'No external runtime beyond React',
  ],
  props: [
    { name: 'size', type: 'number', default: '72', description: 'Rendered width and height in pixels' },
    { name: 'speed', type: 'number', default: '1', description: 'Multiplier for orbital animation speed' },
    { name: 'variant', type: "'default' | 'dense' | 'minimal'", default: "'default'", description: 'Particle density around the secondary orbit' },
    { name: 'label', type: 'string', default: "'Loading'", description: 'Accessible status label' },
  ],
  accessibility: [
    'Uses role="status" with a screen-reader label',
    'Reduced motion freezes the orbital movement while preserving the loading affordance',
  ],
  usageCode: `import { OrbitalLoadingRing } from "@/components/ui/orbital-loading-ring";

export function Demo() {
  return <OrbitalLoadingRing size={84} variant="dense" label="Syncing registry" />;
}`,
};

export default meta;
