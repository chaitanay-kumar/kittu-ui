import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Density Lens',
  description: 'An interactive floating lens that tracks pointer movement to reveal high-density data, magnified details, or alternative views.',
  category: 'Motion',
  tagline: 'Cursor-tracking magnification & detail inspection lens',
  badges: ['Framer Motion', 'Spring Physics', 'Inspection', 'Interactive'],
  createdAt: '2026-08-24',
  features: [
    'Subtle spring lag cursor tracking for realistic tactile lens momentum',
    'Automatic coordinate interpolation with 2x magnification or custom overlay renderers',
    'Configurable lens geometry (circle, oval, rounded square), border glow, and zoom scale',
    'Zero layout shifts and smooth GPU-accelerated backdrop blur',
  ],
  props: [
    { name: 'children', type: 'ReactNode', description: 'Underlying background content being inspected' },
    { name: 'renderLensContent', type: '(pos: { x: number, y: number, scale: number }) => ReactNode', default: 'undefined', description: 'Custom overlay rendered inside lens' },
    { name: 'lensSize', type: 'number', default: '150', description: 'Diameter/width of lens in pixels' },
    { name: 'lensShape', type: "'circle' | 'oval' | 'square'", default: "'circle'", description: 'Geometric shape of lens' },
    { name: 'zoomScale', type: 'number', default: '2', description: 'Magnification factor' },
    { name: 'showBorder', type: 'boolean', default: 'true', description: 'Renders border and glass glow around perimeter' },
  ],
  accessibility: [
    'Non-destructive hover lens overlay preserves underlying semantic document tree',
    'Includes crosshair pointer hints and smooth fade transitions',
    'Touch fallbacks support direct inspection',
  ],
  usageCode: `import { DensityLens } from "@/components/ui/density-lens";

export function Demo() {
  return (
    <DensityLens lensSize={160} zoomScale={2}>
      <div className="p-8 bg-[#0C0C0C] rounded-2xl border border-[#222222]">
        <h3 className="text-sm font-semibold text-white">System Architecture</h3>
        <p className="text-xs text-[#808080] mt-2">
          Hover pointer across surface to inspect high-resolution telemetry nodes.
        </p>
      </div>
    </DensityLens>
  );
}`,
};

export default meta;
