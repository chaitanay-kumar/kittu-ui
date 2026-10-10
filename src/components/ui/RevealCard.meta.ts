import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Reveal Card',
  description: 'A high-definition product card with smooth cursor-driven 3D perspective rotation, dynamic glare, and revealed content.',
  category: 'Motion',
  tagline: '3D cursor physics tilt with interactive glare reveal',
  badges: ['3D Tilt', 'Dynamic Glare', 'Micro-interaction'],
  createdAt: '2026-08-06',
  features: [
    'Cursor-aware 3D perspective rotation springs',
    'Dynamic radial glare reflection overlay',
    'Hidden metadata section revealed on hover',
  ],
  props: [
    { name: 'maxTilt', type: 'number', default: '12', description: 'Max tilt angle in degrees' },
    { name: 'revealContent', type: 'ReactNode', default: 'undefined', description: 'Content shown on hover' },
  ],
  accessibility: [
    'Subtle tilt respects reduced-motion settings',
    'All content accessible via DOM',
  ],
  usageCode: `import { RevealCard } from "@/components/ui/reveal-card";

export function Demo() {
  return (
    <RevealCard revealContent={<div>Expanded analytics & telemetry</div>}>
      <h4>Cloud Engine</h4>
    </RevealCard>
  );
}`,
};

export default meta;
