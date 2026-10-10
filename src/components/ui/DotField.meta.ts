import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Dot Field',
  description: 'High-performance lightweight static Canvas dot matrix background with dynamic gradient coloring and responsive density scaling.',
  category: 'Motion',
  tagline: 'Lightweight static Canvas particle matrix background',
  badges: ['HTML5 Canvas', 'Static Visual', 'Zero Overhead'],
  createdAt: '2026-08-08',
  features: [
    'Hardware-accelerated HTML5 Canvas rendering',
    'Zero CPU overhead — renders once and updates only on resize',
    'Clean linear gradient coloring with custom stops',
    'Responsive ResizeObserver layout support',
  ],
  props: [
    { name: 'dotRadius', type: 'number', default: '1.5', description: 'Radius of each individual dot (px)' },
    { name: 'dotSpacing', type: 'number', default: '14', description: 'Spacing between adjacent dots in the grid (px)' },
    { name: 'gradientFrom', type: 'string', default: "'rgba(56, 189, 248, 0.35)'", description: 'Start gradient color' },
    { name: 'gradientTo', type: 'string', default: "'rgba(168, 85, 247, 0.25)'", description: 'End gradient color' },
    { name: 'className', type: 'string', default: "''", description: 'Optional container CSS class' },
  ],
  accessibility: [
    'Canvas decorative element',
    'Aria-hidden/pointer-events safe layer',
  ],
  usageCode: `import { DotField } from "@/components/ui/dot-field";

export function Demo() {
  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-xl bg-[#0A0A0A]">
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        gradientFrom="rgba(56, 189, 248, 0.35)"
        gradientTo="rgba(168, 85, 247, 0.25)"
      />
    </div>
  );
}`,
};

export default meta;
