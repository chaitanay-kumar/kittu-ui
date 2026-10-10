import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Gravity Particle Burst',
  description: 'A pointer-triggered canvas particle burst with velocity, gravity, friction, and short-lived physical follow-through.',
  category: 'Motion',
  tagline: 'Pointer-driven gravity particle feedback',
  badges: ['Canvas', 'Pointer Physics', 'Reduced Motion'],
  createdAt: '2026-08-28',
  features: [
    'Particles inherit a shared origin from the pointer location',
    'Canvas rendering keeps the effect performant without many DOM nodes',
    'Gravity and friction make particles arc and settle naturally',
  ],
  props: [
    { name: 'label', type: 'string', default: "'Create particle burst'", description: 'Default button label and accessible text' },
    { name: 'particleCount', type: 'number', default: '34', description: 'Number of canvas particles emitted per burst' },
    { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Custom button content' },
  ],
  accessibility: [
    'The canvas overlay is aria-hidden and does not intercept pointer input',
    'Reduced motion disables the particle burst while keeping the button usable',
  ],
  usageCode: `import { GravityParticleBurst } from "@/components/ui/gravity-particle-burst";

export function Demo() {
  return <GravityParticleBurst>Commit release</GravityParticleBurst>;
}`,
};

export default meta;
