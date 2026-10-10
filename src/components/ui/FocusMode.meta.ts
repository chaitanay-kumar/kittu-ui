import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Focus Mode',
  description: 'An atmospheric focus-mode interaction that isolates selected cards or sections by smoothly dimming surrounding distractions with zero layout shift, tactile spring scaling, and Escape key dismissal.',
  category: 'Motion',
  tagline: 'Atmospheric UI isolation dimming background distractions without layout shifts',
  badges: ['Focus Mode', 'Motion Physics', 'Overlays'],
  createdAt: '2026-08-21',
  features: [
    'Subtle background opacity dampening bringing selected components into focus',
    'Zero layout shift architecture keeping existing dashboard grid geometry intact',
    'Tactile spring scaling and border elevation on active focused target',
    'Keyboard Escape key listener and explicit exit controls',
    'Reduced motion support with instant opacity transitions',
  ],
  props: [
    { name: 'items', type: 'FocusModeItem[]', default: '[...]', description: 'List of dashboard cards or sections' },
    { name: 'focusedId', type: 'string | null', default: 'null', description: 'Controlled focused card ID' },
    { name: 'onFocusChange', type: '(id: string | null) => void', default: 'undefined', description: 'Callback fired when focused element changes' },
    { name: 'dimOpacity', type: 'number', default: '0.2', description: 'Opacity applied to unfocused background cards' },
  ],
  accessibility: [
    'Escape key listener automatically dismisses focus mode and restores full viewport opacity',
    'Focus rings remain strictly compliant with Kit UI sky-400 tokens',
  ],
  usageCode: `import { FocusMode } from "@/components/ui/focus-mode";

export function Demo() {
  return (
    <FocusMode
      items={[
        {
          id: "mrr",
          title: "Monthly Recurring Revenue",
          metric: "$148,290",
          delta: "+18.4%",
          content: <p>Enterprise plan renewals</p>
        }
      ]}
    />
  );
}`,
};

export default meta;
