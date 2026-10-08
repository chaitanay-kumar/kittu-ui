import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Loader',
  description: 'A minimal, purpose-driven loading indicator with 4 calm, non-anxious motion variants.',
  category: 'Feedback',
  tagline: 'Calm, continuous feedback states with zero visual stress',
  badges: ['CSS & SVG', 'Calm Motion', 'Zero Deps', 'Accessible'],
  createdAt: '2026-08-24',
  features: [
    '4 refined motion variants: rotating arc, breathing dots, sliding line, and expanding concentric rings',
    'Configurable dimensions and stroke colors with seamless dark mode support',
    'Accessible role="status" and aria-busy telemetry without screen reader interruption',
    'Automatic reduced-motion adaptation for sensitive viewers',
  ],
  props: [
    { name: 'size', type: 'number', default: '32', description: 'Diameter or width scale in pixels' },
    { name: 'variant', type: "'arc' | 'dots' | 'line' | 'rings'", default: "'arc'", description: 'Visual animation mode' },
    { name: 'label', type: 'string', default: "'Loading...'", description: 'Accessible screen reader text label' },
    { name: 'reduceMotion', type: 'boolean', default: 'false', description: 'Disables high-velocity continuous spins' },
    { name: 'color', type: 'string', default: "'currentColor'", description: 'CSS color string for indicator strokes' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Additional CSS class names' },
  ],
  accessibility: [
    'Includes role="status" and aria-busy="true" on container',
    'Screen reader-only label announcement prevents repetitive speech spam',
    'Full prefers-reduced-motion compatibility with gentle opacity pulsing',
  ],
  usageCode: `import { Loader } from "@/components/ui/loader";

export function Demo() {
  return (
    <div className="flex items-center gap-6 p-8 bg-[#0A0A0A] rounded-2xl border border-[#222222]">
      <Loader variant="arc" size={32} />
      <Loader variant="dots" size={28} />
      <Loader variant="line" size={36} />
      <Loader variant="rings" size={32} />
    </div>
  );
}`,
};

export default meta;
