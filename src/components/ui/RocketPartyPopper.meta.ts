import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Rocket Party Popper',
  description: 'An interactive black rocket launch that blasts into a colorful party popper confetti shower to reveal celebratory milestones.',
  category: 'Feedback',
  tagline: 'Lift-off milestone celebration with colorful confetti blast',
  badges: ['Party Popper', 'Confetti Blast', 'Interactive Motion', 'Milestones'],
  createdAt: '2026-08-28',
  features: [
    'Sleek matte black rocket capsule with thruster ember anticipation',
    'Smooth lift-off acceleration trailing thruster flame and smoke',
    '360° Colorful party popper confetti explosion with physics gravity and flutter',
    'Apple-grade fluid spring reveal for celebratory milestone cards',
    'Built-in replay and reset support for repeatable celebratory interactions',
  ],
  props: [
    { name: 'title', type: 'string', default: "'Mission Accomplished'", description: 'Primary celebration headline' },
    { name: 'description', type: 'string', default: "'All checks passed and your release is ready to deploy.'", description: 'Supporting celebration description' },
    { name: 'metric', type: 'string', default: "'100% Production Ready'", description: 'Metadata badge shown on milestone card' },
    { name: 'triggerLabel', type: 'string', default: "'Launch celebration'", description: 'Label for the launch button' },
    { name: 'confettiCount', type: 'number', default: '50', description: 'Total confetti particles spawned on blast' },
    { name: 'defaultLaunched', type: 'boolean', default: 'false', description: 'Initial launched/revealed state' },
    { name: 'onLaunch', type: '() => void', default: 'undefined', description: 'Callback fired on launch trigger' },
    { name: 'onReset', type: '() => void', default: 'undefined', description: 'Callback fired on reset' },
  ],
  accessibility: [
    'Revealed milestone card uses role="status" and aria-live="polite"',
    'Supports prefers-reduced-motion with instant graceful celebration transition',
    'Full keyboard interaction via Enter and Spacebar',
  ],
  usageCode: `import { RocketPartyPopper } from "@/components/ui/rocket-party-popper";

export function Demo() {
  return (
    <RocketPartyPopper
      title="Release Shipped"
      description="All registry, lint, and SEO checks passed."
      metric="v2.4.0 Live"
      onLaunch={() => console.log('Rocket Launched!')}
    />
  );
}`,
};

export default meta;
