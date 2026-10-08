import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Typewriter Button',
  description: 'An interactive button that reveals its label character-by-character with optional synthesized mechanical audio feedback.',
  category: 'Buttons',
  tagline: 'Character-by-character reveal with mechanical sound feedback',
  badges: ['Web Audio API', 'Framer Motion', 'Tactile Audio', 'Accessible'],
  createdAt: '2026-08-24',
  features: [
    'Progressive character-by-character typewriter reveal with blinking cursor',
    'Synthesized mechanical click sound generated dynamically via Web Audio API (zero audio file assets)',
    'Configurable typing speed, sound volume, variants, and auto-start mode',
    'Full accessibility with complete aria-label announcement and keyboard triggers',
  ],
  props: [
    { name: 'children', type: 'string', description: 'Label text to type out' },
    { name: 'charDuration', type: 'number', default: '75', description: 'Milliseconds per character reveal' },
    { name: 'soundEnabled', type: 'boolean', default: 'false', description: 'Enables mechanical keystroke sound cues' },
    { name: 'soundVolume', type: 'number', default: '0.25', description: 'Web Audio synthesizer output volume (0 to 1)' },
    { name: 'variant', type: "'primary' | 'secondary' | 'outline'", default: "'primary'", description: 'Styling appearance' },
    { name: 'autoStart', type: 'boolean', default: 'false', description: 'Begins typing immediately upon mounting' },
    { name: 'onComplete', type: '() => void', default: 'undefined', description: 'Callback on typing completion' },
  ],
  accessibility: [
    'Always contains full text in aria-label to prevent truncated screen reader speech',
    'Respects reduced motion by immediately rendering full text if desired',
    'Interactive <button> element with standard keyboard activation',
  ],
  usageCode: `import { TypewriterButton } from "@/components/ui/typewriter-button";

export function Demo() {
  return (
    <div className="flex items-center gap-4">
      <TypewriterButton soundEnabled variant="primary">
        npx shadcn@latest add chaitanay-kumar/kittu-ui/typewriter-button
      </TypewriterButton>
    </div>
  );
}`,
};

export default meta;
