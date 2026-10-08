import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Stack Unfold Panel',
  description: 'A vertically stacked card deck that unfolds progressively with spring physics, shifting adjacent panels with zero layout jank.',
  category: 'Feedback',
  tagline: 'Progressive disclosure card stack with spring height animation',
  badges: ['Framer Motion', 'Spring Physics', 'Accordion', 'Accessible'],
  createdAt: '2026-08-24',
  features: [
    'Progressive vertical expansion with GPU-accelerated height calculation',
    'Automatic single-card accordion mode or multi-card unfolding',
    'Rotating chevron indicators with smooth 180-degree spring flip',
    'Full accessibility with aria-expanded, aria-controls, and keyboard triggers',
  ],
  props: [
    { name: 'cards', type: 'StackCard[]', description: 'Array of card items (id, title, subtitle, content, badge)' },
    { name: 'expandedIds', type: 'string[]', default: 'undefined', description: 'Controlled array of opened card IDs' },
    { name: 'onExpandedChange', type: '(ids: string[]) => void', default: 'undefined', description: 'Expansion event callback' },
    { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Allows simultaneous expansion of multiple cards' },
    { name: 'variant', type: "'default' | 'minimal'", default: "'default'", description: 'Bordered card or minimal underline layout' },
  ],
  accessibility: [
    'Interactive header buttons with aria-expanded and aria-controls',
    'Tab key navigable with Space and Enter expansion toggles',
    'Compliant with WCAG AA contrast guidelines',
  ],
  usageCode: `import { StackUnfoldPanel } from "@/components/ui/stack-unfold-panel";

export function Demo() {
  return (
    <StackUnfoldPanel
      cards={[
        { id: '1', title: 'Global Edge Runtime', subtitle: 'v2.4.0 Engine', content: 'Distributed across 320+ edge point-of-presence regions with instant failover.' },
        { id: '2', title: 'Zero-Copy Serialization', subtitle: 'Binary Protocol', content: 'High-speed Protobuf and FlatBuffers compression with minimal CPU overhead.' },
        { id: '3', title: 'Automated CI Verification', subtitle: 'GitHub Actions', content: 'Continuous testing and schema verification on every pull request.' },
      ]}
    />
  );
}`,
};

export default meta;
