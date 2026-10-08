import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Depth Corridor',
  description: 'A 3D spatial layer stack with receding perspective depth, progressive focal blurs, and pointer parallax motion.',
  category: 'Motion',
  tagline: 'CSS 3D perspective tunnel with progressive depth blur',
  badges: ['Framer Motion', '3D Perspective', 'Parallax', 'Motion'],
  createdAt: '2026-08-24',
  features: [
    'True 3D perspective translation (translateZ) and multi-layered receding depth geometry',
    'Progressive depth-of-field focal blurring and subtle mouse tracking parallax',
    'Keyboard arrow navigation (Left/Right/Up/Down) with smooth spring transitions',
    'Tactile indicator pills and interactive layer selection',
  ],
  props: [
    { name: 'layers', type: 'DepthLayer[]', description: 'Array of layer objects (id, title, subtitle, content, blurAmount)' },
    { name: 'activeLayerIndex', type: 'number', default: '0', description: 'Controlled active foreground layer index' },
    { name: 'onLayerChange', type: '(index: number) => void', default: 'undefined', description: 'Layer change event callback' },
    { name: 'perspectiveDepth', type: 'number', default: '1000', description: 'CSS 3D perspective container depth in pixels' },
    { name: 'enableParallax', type: 'boolean', default: 'true', description: 'Enables mouse coordinate responsive 3D tilt' },
  ],
  accessibility: [
    'Focusable region with role="region" and aria-label',
    'Arrow key support for rapid layer switching',
    'Respects reduced motion by calming perspective tilt and blur values',
  ],
  usageCode: `import { DepthCorridor } from "@/components/ui/depth-corridor";

export function Demo() {
  return (
    <DepthCorridor
      layers={[
        { id: '1', title: 'Edge Telemetry', subtitle: 'Real-time p99 latency', content: <div>12.4ms global response</div> },
        { id: '2', title: 'Cluster Workers', subtitle: 'Serverless nodes', content: <div>64 active workers</div> },
        { id: '3', title: 'Cache Invalidation', subtitle: 'Instant purge API', content: <div>0.4s TTL sync</div> },
      ]}
    />
  );
}`,
};

export default meta;
