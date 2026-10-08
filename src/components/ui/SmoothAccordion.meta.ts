import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Smooth Accordion',
  description: 'An accordion component with physics height transition, rotating chevron indicators, and accessible keyboard toggles.',
  category: 'Feedback',
  tagline: 'Zero-jank spring collapsible content panels',
  badges: ['Spring Height', 'Zero Layout Shift', 'Multi or Single'],
  createdAt: '2026-08-05',
  features: [
    'Spring physics height interpolation',
    'Zero content clipping or layout jumps',
    'Single or multi-panel open mode',
  ],
  props: [
    { name: 'items', type: 'AccordionItem[]', default: '[]', description: 'Accordion items' },
    { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Allow multiple open panels' },
    { name: 'defaultOpen', type: 'string[]', default: '[]', description: 'Default open item ids' },
  ],
  accessibility: [
    'WAI-ARIA accordion pattern',
    'aria-expanded and aria-controls attributes',
  ],
  usageCode: `import { SmoothAccordion } from "@/components/ui/smooth-accordion";

export function Demo() {
  const items = [
    { id: '1', title: 'How does ownership work?', content: 'You copy the full code directly into your repository.' },
    { id: '2', title: 'Can I customize the springs?', content: 'Yes, all motion tokens are standard Framer Motion props.' }
  ];
  return <SmoothAccordion items={items} defaultOpen={['1']} />;
}`,
};

export default meta;
