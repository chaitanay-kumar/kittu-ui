import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Hamburger Menu',
  description: 'An iconic three-line menu toggle that transforms smoothly into a symmetrical close symbol.',
  category: 'Navigation',
  tagline: 'Architectural line morphing & symmetrical spring motion',
  badges: ['Framer Motion', 'Spring Physics', 'Micro-interaction', 'Accessible'],
  createdAt: '2026-08-24',
  features: [
    'Symmetric line rotation and middle line dissolution with zero layout shift',
    'Customizable size, stroke thickness, and color tokens',
    'Keyboard accessible with Space and Enter triggers and Escape close support',
    'Integrated aria-expanded and dynamic aria-label status updates',
  ],
  props: [
    { name: 'isOpen', type: 'boolean', description: 'Active open/closed toggle state' },
    { name: 'onChange', type: '(isOpen: boolean) => void', description: 'Callback fired on user interaction' },
    { name: 'size', type: 'number', default: '24', description: 'Width and height of the icon bounding box in pixels' },
    { name: 'color', type: 'string', default: "'currentColor'", description: 'Color of the SVG/CSS line strokes' },
    { name: 'label', type: 'string', default: "'Menu'", description: 'Accessible name announced to assistive tech' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables button interactions' },
  ],
  accessibility: [
    'Proper <button> element with type="button"',
    'Dynamic aria-expanded="true|false" and aria-label updates',
    'Visible focus-visible ring for full keyboard accessibility',
  ],
  usageCode: `import { useState } from "react";
import { HamburgerMenu } from "@/components/ui/hamburger-menu";

export function Demo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HamburgerMenu
      isOpen={isOpen}
      onChange={setIsOpen}
      size={24}
    />
  );
}`,
};

export default meta;
