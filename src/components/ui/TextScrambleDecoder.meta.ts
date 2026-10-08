import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Text Scramble Decoder',
  description: 'A controlled text reveal that resolves scrambled glyphs into readable copy without changing the text semantics.',
  category: 'Motion',
  tagline: 'Controlled technical typography reveal',
  badges: ['Typography', 'Reduced Motion', 'Interactive'],
  createdAt: '2026-08-28',
  features: [
    'Position-staged character resolution with a stable final state',
    'Mount, hover, and manual replay trigger modes',
    'Configurable glyph set and duration',
  ],
  props: [
    { name: 'text', type: 'string', description: 'Final readable text announced to assistive technology' },
    { name: 'characters', type: 'string', default: 'A-Z, 0-9, symbols', description: 'Characters used during the temporary scramble phase' },
    { name: 'duration', type: 'number', default: '900', description: 'Decode duration in milliseconds' },
    { name: 'trigger', type: "'mount' | 'hover' | 'manual'", default: "'mount'", description: 'When the decode sequence should run' },
  ],
  accessibility: [
    'The readable text is exposed through aria-label while animated glyphs are hidden from assistive technology',
    'Reduced motion renders the final text immediately',
  ],
  usageCode: `import { TextScrambleDecoder } from "@/components/ui/text-scramble-decoder";

export function Demo() {
  return (
    <TextScrambleDecoder
      text="KITTU_UI.REGISTRY.SYNCED"
      trigger="manual"
      duration={1000}
    />
  );
}`,
};

export default meta;
