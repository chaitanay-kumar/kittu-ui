import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Magnetic Button',
  description: 'A responsive button with subtle proximity-based physics that pulls towards the cursor on hover and snaps back on departure.',
  category: 'Buttons',
  tagline: 'Cursor-aware spring translation physics',
  badges: ['Spring Physics', 'Micro-interaction', 'Tailwind'],
  featured: true,
  createdAt: '2026-08-18',
  features: [
    'Spring physics coordinate tracking via Framer Motion',
    'Configurable pull strength and threshold',
    'Subtle ambient glow gradient reflection',
    'Four restrained surface styles: Primary, Secondary, Outline, Ghost',
  ],
  props: [
    { name: 'strength', type: 'number', default: '0.35', description: 'Cursor pull distance multiplier' },
    { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost'", default: "'primary'", description: 'Visual surface presentation' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button dimensions and typography' },
    { name: 'glow', type: 'boolean', default: 'true', description: 'Enable subtle background glow on hover' },
  ],
  accessibility: [
    'Focus visible ring with restrained cyan accent',
    'Standard native button semantics & keyboard Enter/Space activation',
    'Respects prefers-reduced-motion media query',
  ],
  usageCode: `import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowUpRight } from "lucide-react";

export function Demo() {
  return (
    <MagneticButton strength={0.4} variant="primary">
      <span>Get Started</span>
      <ArrowUpRight className="w-4 h-4" />
    </MagneticButton>
  );
}`,
};

export default meta;
