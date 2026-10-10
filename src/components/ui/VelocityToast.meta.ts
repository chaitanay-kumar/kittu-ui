import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'VelocityToast',
  description: 'A toast that enters with velocity and settles, with a progress indicator that responds naturally — pauses on hover, resumes with no jump, and eases slightly in the final 10% so dismissal feels intentional.',
  category: 'Feedback',
  tagline: 'Enters with velocity, settles naturally',
  badges: ['Velocity Entry', 'Natural Progress', 'Accessible', 'Light & Dark'],
  createdAt: '2026-09-03',
  features: [
    'Entry animation starts further out (y: 22px) for higher perceived velocity, then springs to rest',
    'Progress indicator uses a slight ease-in (pow 1.05) so the final 10% feels decisive',
    'Hover pauses progress without visual jump; resume picks up from the remaining time',
    '6 position presets, 5 variant tones, optional custom icon',
    'Light/dark theme aware — works in both palettes',
  ],
  props: [
    { name: 'open', type: 'boolean', default: 'undefined', description: 'Whether the toast is visible' },
    { name: 'onDismiss', type: '() => void', default: 'undefined', description: 'Called when toast is dismissed (auto or manual)' },
    { name: 'title', type: 'string', default: 'undefined', description: 'Toast title' },
    { name: 'description', type: 'string', default: 'undefined', description: 'Secondary description' },
    { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss duration in ms' },
    { name: 'variant', type: "'default' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: 'Visual tone' },
    { name: 'position', type: 'VelocityToastPosition', default: "'bottom-center'", description: 'Screen placement' },
    { name: 'showProgress', type: 'boolean', default: 'true', description: 'Show countdown progress bar' },
  ],
  accessibility: [
    'role="status" with aria-live="polite" for screen readers',
    'Hover pause is non-disruptive — no focus traps or input blocking',
    'Visual close button is keyboard-reachable with focus-ring',
  ],
  usageCode: `import { useState } from "react";
import { VelocityToast } from "@/components/ui/velocity-toast";
import { PressButton } from "@/components/ui/press-button";

export function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PressButton onClick={() => setOpen(true)}>Show toast</PressButton>
      <VelocityToast
        open={open}
        onDismiss={() => setOpen(false)}
        title="File uploaded"
        description="kit-ui-2026-09.zip is ready."
        variant="success"
        position="bottom-right"
      />
    </>
  );
}`,
};

export default meta;
