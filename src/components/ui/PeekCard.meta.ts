import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Peek Card',
  description: 'An origin-anchored contextual preview popover that emerges directly from target triggers on hover or tap with smart collision edge detection and rich metadata summaries.',
  category: 'Overlays',
  tagline: 'Origin-anchored contextual preview card with edge-aware collision detection',
  badges: ['Popovers', 'Overlays', 'Context Preview'],
  createdAt: '2026-08-21',
  features: [
    'Origin-anchored emergence animation feeling connected to source elements',
    'Automatic edge collision detection preventing viewport bounding overflow',
    'Rich preset layout for transactions, user profiles, invoices, and metrics',
    'Mobile tap toggle and desktop hover/focus dual interaction model',
    'Integrated copy actions and status indicators with reduced-motion support',
  ],
  props: [
    { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Trigger target element wrapped by peek card' },
    { name: 'data', type: 'PeekCardData', default: '[...]', description: 'Structured preview dataset' },
    { name: 'delay', type: 'number', default: '200', description: 'Hover activation delay in milliseconds' },
    { name: 'placement', type: "'top' | 'bottom' | 'auto'", default: "'auto'", description: 'Preferred emergence direction' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Renders skeleton placeholder during async lookup' },
  ],
  accessibility: [
    'Keyboard accessible through native onFocus and onBlur handlers',
    'Closes automatically on Escape key press or outside click',
  ],
  usageCode: `import { PeekCard } from "@/components/ui/peek-card";

export function Demo() {
  return (
    <PeekCard
      data={{
        title: "Payment #3948",
        amount: "$249.00",
        customer: { name: "Alexander Wright", email: "alex@acme.com" },
        status: "Succeeded",
      }}
    >
      <span className="underline decoration-dotted cursor-pointer">
        Payment #3948
      </span>
    </PeekCard>
  );
}`,
};

export default meta;
