import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Button',
  description: 'A versatile, production-ready button system with 8 visual variants, 4 sizes, loading spinner states, icon slots, and spring tap feedback.',
  category: 'Buttons',
  tagline: 'Multi-variant button system with tactile physics',
  badges: ['Multi-variant', 'Spring Tap', 'Micro-interactions', 'Accessible'],
  featured: true,
  createdAt: '2026-08-19',
  features: [
    '8 visual variants: Primary, Secondary, Outline, Ghost, Destructive, Success, Link, Gradient',
    '4 size dimensions: Small (sm), Medium (md), Large (lg), and square Icon',
    'Spring tap micro-interaction (whileTap 0.97) via Framer Motion',
    'Accessible loading state with integrated monochrome spinner & aria-busy',
    'Left and right icon slots with automatic sizing and gap alignment',
    'Full width layout support (fullWidth)',
    'Strictly adheres to Kittu UI monochrome dark palette and sky focus ring',
  ],
  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'link' | 'gradient'", default: "'primary'", description: 'Visual presentation style' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", default: "'md'", description: 'Dimensions and typography scale' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Displays an animated spinner and disables user interaction' },
    { name: 'loadingText', type: 'string', default: 'undefined', description: 'Optional text displayed alongside the loading spinner' },
    { name: 'leftIcon', type: 'React.ReactNode', default: 'undefined', description: 'Icon element placed before children' },
    { name: 'rightIcon', type: 'React.ReactNode', default: 'undefined', description: 'Icon element placed after children' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches button to 100% width of parent container' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction and applies 30% disabled opacity' },
  ],
  accessibility: [
    'Native <button> semantics with explicit type="button" default',
    'Standard focus-ring outline with Sky-400 accent on keyboard :focus-visible',
    'Proper aria-busy and disabled accessibility states',
    'Respects prefers-reduced-motion media query',
  ],
  usageCode: `import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
        Get Started
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}`,
};

export default meta;
