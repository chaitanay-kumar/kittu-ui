import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Morphing Shape Loader',
  description: 'A loading indicator that continuously morphs between configurable SVG shapes via real path interpolation. The transition is a genuine geometric morph — never a fade out / in.',
  category: 'Feedback',
  tagline: 'Continuously morphing SVG shape loader',
  badges: ['SVG Morph', 'Configurable', 'Loop'],
  createdAt: '2026-09-02',
  features: [
    'Continuous morph between matched-control-point shapes',
    'Configurable shape list, duration, hold time, and loop behavior',
    'Stroke and filled variants with optional gradient',
    'Subtle dashed backdrop ring for visual context',
    'Respects prefers-reduced-motion (renders a single static shape)',
  ],
  props: [
    { name: 'shapes', type: 'ShapeKind[]', default: "['circle','square','triangle','circle']", description: 'Ordered list of shapes to cycle through' },
    { name: 'duration', type: 'number', default: '1.6', description: 'Morph duration per shape change in seconds' },
    { name: 'holdDuration', type: 'number', default: '0.4', description: 'Hold duration at each shape in seconds' },
    { name: 'loop', type: 'boolean', default: 'true', description: 'Loop the shape sequence' },
    { name: 'size', type: 'number', default: '96', description: 'Loader size in pixels (square)' },
    { name: 'color', type: 'string', default: "'#FAFAFA'", description: 'Stroke or fill color' },
    { name: 'filled', type: 'boolean', default: 'false', description: 'Filled variant instead of stroke' },
  ],
  accessibility: [
    'role="status" with aria-busy on the loader',
    'Visually hidden text label for screen readers',
    'Respects prefers-reduced-motion media query',
  ],
  usageCode: `import { MorphingShapeLoader } from "@/components/ui/morphing-shape-loader";

export function Demo() {
  return (
    <MorphingShapeLoader
      shapes={['circle', 'square', 'triangle', 'hexagon', 'star']}
      duration={1.4}
      holdDuration={0.3}
    />
  );
}`,
};

export default meta;
