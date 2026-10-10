import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Spotlight Card',
  description: 'A dark elevated surface that illuminates border and inner surfaces dynamically based on mouse pointer coordinates.',
  category: 'Motion',
  tagline: 'Radial pointer tracking over dark layered surface',
  badges: ['Shader Feel', 'Pointer Physics', 'Dark Elevation'],
  createdAt: '2026-08-15',
  features: [
    'Hardware-accelerated dynamic radial mask',
    'Dual illumination (border beam + ambient inner glow)',
    'Near-black layered background preservation',
  ],
  props: [
    { name: 'spotlightColor', type: 'string', default: "'rgba(56, 189, 248, 0.08)'", description: 'Inner ambient radial color' },
    { name: 'spotlightSize', type: 'number', default: '350', description: 'Radius of spotlight effect in pixels' },
  ],
  accessibility: [
    'Accessible contrast ratio for all nested text and actions',
    'No reliance on animation for critical content reading',
  ],
  usageCode: `import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Demo() {
  return (
    <SpotlightCard className="max-w-sm">
      <h3 className="text-base font-semibold text-white">Edge Computing</h3>
      <p className="text-sm text-neutral-400 mt-2">
        Deploy globally distributed stateful workloads in 35 regions.
      </p>
    </SpotlightCard>
  );
}`,
};

export default meta;
