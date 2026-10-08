import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Nimbu Mirchi',
  description: 'A hanging lemon-and-green-chilli charm that swings with realistic inertia in response to the pointer, built from layered physical springs rather than a single rigid illustration.',
  category: 'Motion',
  tagline: 'Pointer-driven hanging charm with layered spring physics',
  badges: ['Spring Physics', 'Pointer Tracking', 'Layered Motion'],
  createdAt: '2026-08-31',
  features: [
    'Pointer position drives a normalized MotionValue pipeline (no React renders per frame)',
    'Layered secondary motion — chillies, lemon, and trailing strings each swing independently',
    'Configurable spring stiffness, damping, and max rotation for tuning the physical feel',
    'Geometry-aware normalization that adapts to the actual container size',
    'Respects prefers-reduced-motion with a clean static rest pose',
    'Graceful degradation when pointer events are unavailable',
  ],
  props: [
    { name: 'maxRotation', type: 'number', default: '13', description: 'Maximum rotation in degrees at full pointer offset' },
    { name: 'stiffnessX', type: 'number', default: '55', description: 'Pointer X spring stiffness (higher = snappier follow)' },
    { name: 'stiffnessY', type: 'number', default: '45', description: 'Pointer Y spring stiffness' },
    { name: 'damping', type: 'number', default: '9', description: 'Spring damping (higher = less swing overshoot)' },
    { name: 'caption', type: 'string', default: 'undefined', description: 'Optional screen-reader caption for the charm' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Additional Tailwind classes merged into the container' },
  ],
  accessibility: [
    'role="img" with descriptive aria-label for screen readers',
    'Touch-none and select-none to avoid stray text selection while interacting',
    'Complete prefers-reduced-motion fallback: pointer listeners are never wired, charm rests in place',
    'Decorative SVG and dot textures marked aria-hidden',
  ],
  usageCode: `import { NimbuMirchi } from "@/components/ui/nimbu-mirchi";

export function Demo() {
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-[#1F1F1F] overflow-hidden">
      <NimbuMirchi
        maxRotation={13}
        stiffnessX={55}
        stiffnessY={45}
        damping={9}
        caption="Hanging nimbu-mirchi charm"
      />
    </div>
  );
}`,
};

export default meta;
