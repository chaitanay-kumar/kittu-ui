import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Scroll Progress Navigation',
  description: 'A floating table-of-contents navigation pill that tracks scroll depth, dynamically morphs between resting and floating states, highlights active sections, and enables smooth scrolling.',
  category: 'Navigation',
  tagline: 'Floating progress navigation pill tracking scroll depth and active document headings',
  badges: ['Navigation', 'Scroll Physics', 'Floating'],
  createdAt: '2026-08-21',
  features: [
    'Real-time document scroll progress bar integrated along the pill boundary',
    'Shared layout pill indicator smoothly moving between active headings',
    'Seamless transition from static page banner to compact floating island',
    'Smooth scroll anchoring with customizable offset threshold',
    'Mobile-optimized responsive compact menu preventing content obstruction',
  ],
  props: [
    { name: 'sections', type: 'NavSectionItem[]', default: '[...]', description: 'Navigation links with IDs, index numbers, and labels' },
    { name: 'scrollThreshold', type: 'number', default: '150', description: 'Scroll distance in px before morphing into floating pill' },
    { name: 'activeId', type: 'string', default: 'undefined', description: 'Controlled active section ID override' },
    { name: 'onSectionClick', type: '(id: string) => void', default: 'undefined', description: 'Callback fired when user selects a section' },
    { name: 'position', type: "'top-center' | 'bottom-center' | 'top-right'", default: "'top-center'", description: 'Screen anchor position' },
  ],
  accessibility: [
    'Semantic nav element with aria-label="Table of contents"',
    'Keyboard navigable tab order and focus-visible outlines',
    'Smooth scroll honors prefers-reduced-motion settings',
  ],
  usageCode: `import { ScrollProgressNav } from "@/components/ui/scroll-progress-nav";

export function Demo() {
  return (
    <ScrollProgressNav
      sections={[
        { id: "overview", index: "01", label: "Overview" },
        { id: "features", index: "02", label: "Features" },
        { id: "components", index: "03", label: "Components" },
        { id: "docs", index: "04", label: "Documentation" }
      ]}
    />
  );
}`,
};

export default meta;
