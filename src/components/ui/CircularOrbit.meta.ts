import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Circular Orbit',
  description: 'A circular gallery of image tiles orbiting around a centered title. All motion runs on a single MotionValue driven by useAnimationFrame, so no React renders per frame.',
  category: 'Motion',
  tagline: 'Continuous circular orbit gallery with depth-aware tiles',
  badges: ['MotionValue', 'Spatial Animation', 'Depth Field', 'Gallery'],
  createdAt: '2026-08-31',
  features: [
    'Single shared rotation MotionValue drives every tile — no React state per frame',
    'True circular orbit: x and y use the same radius so tiles trace a perfect circle',
    'Depth field derived from cos(angle): scale, opacity, blur, and z-index stay internally consistent',
    'Smooth ease-in / ease-out on hover-pause instead of a hard stop',
    'Configurable speed, radius, items, and pause-on-hover behaviour',
    'Respects prefers-reduced-motion: animation loop short-circuits to a static rest pose',
    'Light and dark surface variants',
  ],
  props: [
    { name: 'items', type: 'OrbitItem[]', default: '14 Unsplash tiles', description: 'Tiles to place around the orbit' },
    { name: 'title', type: 'string', default: "'Push'", description: 'Centered headline rendered above the orbit' },
    { name: 'speed', type: 'number', default: '0.00022', description: 'Radians per millisecond. Smaller = slower' },
    { name: 'radius', type: 'number', default: '270', description: 'Pixel radius of the orbit on the desktop layout' },
    { name: 'pauseOnHover', type: 'boolean', default: 'true', description: 'Smoothly stop the orbit when the pointer enters the gallery' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Additional Tailwind classes merged into the section root' },
  ],
  accessibility: [
    'role="region" with aria-label so the gallery is announced as a single landmark',
    'Decorative tiles and the centered headline are aria-hidden — content is conveyed by the label',
    'Images use loading="lazy" and decoding="async" and a neutral alt for screen readers',
    'prefers-reduced-motion short-circuits the animation loop — the gallery rests in place',
  ],
  usageCode: `import { CircularOrbit } from "@/components/ui/circular-orbit";

export function Demo() {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-[#1F1F1F] overflow-hidden">
      <CircularOrbit
        title="Push"
        speed={0.00022}
        radius={240}
        pauseOnHover
      />
    </div>
  );
}`,
};

export default meta;
