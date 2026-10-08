import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Evil Eye',
  description: 'A hanging navy amulet disc with concentric sky-blue and white rings that swings with realistic inertia in response to the pointer, painted as a layered SVG and driven by a single spring pipeline.',
  category: 'Motion',
  tagline: 'Pointer-driven hanging amulet with layered spring physics',
  badges: ['Spring Physics', 'Pointer Tracking', 'Layered Motion', 'Painted SVG'],
  createdAt: '2026-08-31',
  features: [
    'Pointer position drives a normalized MotionValue pipeline (no React renders per frame)',
    'Layered secondary motion — braided cord, metallic cap, and amulet disc each swing independently',
    'Painted SVG with radial gradients for the navy disc, sky-blue ring, and the signature pupil glint',
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
    { name: 'caption', type: 'string', default: 'undefined', description: 'Optional screen-reader caption for the amulet' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Additional Tailwind classes merged into the container' },
  ],
  accessibility: [
    'role="img" with descriptive aria-label for screen readers',
    'Touch-none and select-none to avoid stray text selection while interacting',
    'Complete prefers-reduced-motion fallback: pointer listeners are never wired, amulet rests in place',
    'Decorative SVG marked aria-hidden',
  ],
  usageCode: `import { EvilEye } from "@/components/ui/evil-eye";

export function Demo() {
  return (
    <EvilEye
      maxRotation={13}
      stiffnessX={55}
      stiffnessY={45}
      damping={9}
      caption="Hanging evil eye amulet"
    />
  );
}`,
};

export default meta;
