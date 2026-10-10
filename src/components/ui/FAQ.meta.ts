import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'FAQ',
  description: 'An expandable accordion FAQ component with smooth spring height calculation, single/multi-open modes, category filtering, search, and full ARIA keyboard accessibility.',
  category: 'Feedback',
  tagline: 'Expandable spring-physics accordion with search & category filtering',
  badges: ['FAQ', 'Accordion', 'Spring Physics', 'Searchable', 'Accessible'],
  featured: true,
  createdAt: '2026-08-19',
  features: [
    'Smooth height calculation and rotation via Framer Motion springGentle',
    'Single-open accordion or multi-open simultaneous expansion modes',
    'Controlled and uncontrolled state management (openIds / defaultOpen)',
    'Integrated search filter bar and optional category filter pills',
    'Two layout modes: Unified grouped card or separated individual cards',
    'Full keyboard accessibility (Space, Enter, Tab) and ARIA attributes',
  ],
  props: [
    { name: 'items', type: 'FAQItem[]', default: '[]', description: 'Array of FAQ items with id, question, answer, category, badge, icon' },
    { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Allows multiple accordion items to remain open simultaneously' },
    { name: 'defaultOpen', type: 'string[] | string', default: 'undefined', description: 'Default expanded item ID(s) on initial mount' },
    { name: 'openIds', type: 'string[]', default: 'undefined', description: 'Controlled list of currently expanded item IDs' },
    { name: 'onOpenChange', type: '(ids: string[]) => void', default: 'undefined', description: 'Callback fired when open item selection changes' },
    { name: 'iconStyle', type: "'chevron' | 'plus-minus' | 'custom'", default: "'chevron'", description: 'Indicator icon style' },
    { name: 'searchable', type: 'boolean', default: 'false', description: 'Displays search filter bar above FAQ items' },
    { name: 'showCategories', type: 'boolean', default: 'false', description: 'Displays category filter pills above items' },
    { name: 'variant', type: "'unified' | 'separated'", default: "'unified'", description: 'Visual presentation layout' },
  ],
  accessibility: [
    'aria-expanded state and aria-controls linking button headers to content regions',
    'Semantic role="region" and aria-labelledby on accordion content panels',
    'Keyboard activation via Space and Enter with sky focus ring',
    'Respects prefers-reduced-motion media query',
  ],
  usageCode: `import { FAQ } from "@/components/ui/faq";

export function Demo() {
  return (
    <FAQ
      allowMultiple
      searchable
      items={[
        {
          id: "1",
          question: "What makes Kit UI different?",
          answer: "Kit UI is distributed directly into your codebase via the official shadcn CLI, powered by spring physics rather than rigid ease-in-out transitions."
        },
        {
          id: "2",
          question: "Can I customize the styling?",
          answer: "Yes! All components are built with standard Tailwind CSS utility classes and clean React TypeScript code with zero proprietary wrappers."
        }
      ]}
    />
  );
}`,
};

export default meta;
