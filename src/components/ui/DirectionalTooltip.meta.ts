import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'DirectionalTooltip',
  description: 'A tooltip that appears from the direction it originates — it starts a small distance outside the trigger in its preferred direction and springs inward, so it feels like it materializes from the trigger.',
  category: 'Overlays',
  tagline: 'Appears from its origin direction',
  badges: ['Directional', 'Spring In', 'Accessible', 'Light & Dark'],
  createdAt: '2026-09-03',
  features: [
    'Entry motion originates from the chosen side (top/right/bottom/left)',
    'Snappy spring (springSnappy) settles the tooltip into place',
    'Alignment per side: start / center / end',
    'Configurable delay, offset, and optional arrow indicator',
    'Light/dark theme aware via CSS variables',
  ],
  props: [
    { name: 'content', type: 'React.ReactNode', default: 'undefined', description: 'Tooltip body content' },
    { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Preferred side for the tooltip' },
    { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alignment along the chosen side' },
    { name: 'delayDuration', type: 'number', default: '150', description: 'Delay before showing, in ms' },
    { name: 'showArrow', type: 'boolean', default: 'true', description: 'Show the arrow indicator' },
    { name: 'offset', type: 'number', default: '8', description: 'Spacing from the trigger in px' },
    { name: 'forceOpen', type: 'boolean', default: 'false', description: 'Force the tooltip open (for previews)' },
  ],
  accessibility: [
    'role="tooltip" with aria-describedby on the trigger when open',
    'Hover and focus both show the tooltip; blur / mouseleave hide it',
    'Configurable delay so accidental hovers do not flood the UI',
  ],
  usageCode: `import { DirectionalTooltip } from "@/components/ui/directional-tooltip";
import { PressButton } from "@/components/ui/press-button";

export function Demo() {
  return (
    <div className="flex flex-wrap gap-4">
      <DirectionalTooltip content="Save your changes" side="top">
        <PressButton>Save</PressButton>
      </DirectionalTooltip>
      <DirectionalTooltip content="Open command palette ⌘K" side="bottom" align="end">
        <PressButton variant="secondary">Search</PressButton>
      </DirectionalTooltip>
    </div>
  );
}`,
};

export default meta;
