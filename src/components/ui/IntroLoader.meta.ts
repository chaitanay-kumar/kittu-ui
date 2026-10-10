import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Intro Loader',
  description: 'An Apple-inspired multilingual welcome splash and intro loader that rapidly cycles localized greetings with fluid blur transitions, progress tracking, and accessible skip controls.',
  category: 'Overlays',
  tagline: 'Apple-style multilingual greeting welcome splash',
  badges: ['Apple Welcome', 'Multilingual', 'Splash Screen', 'Fluid Blur', 'Accessible'],
  createdAt: '2026-08-28',
  features: [
    'Rapid multilingual greeting cycling inspired by Apple OS welcome splash',
    'Fluid blur, scale, and opacity entry transitions calibrated with cubic-bezier curves',
    'Apple-style hairline progress indicator tracking sequence completion',
    'Keyboard and tactile skip mechanism (ESC key or dedicated discrete button)',
    'Full accessibility support with aria-live announcements and reduced-motion fallbacks',
    'Supports both full-screen initial overlay and inline documentation preview modes',
  ],
  props: [
    { name: 'greetings', type: '(string | GreetingItem)[]', default: "['Hello', 'Hola', 'Bonjour', ...]", description: 'Array of localized greeting strings or objects with text and lang to cycle through' },
    { name: 'fullScreen', type: 'boolean', default: 'true', description: 'Whether to render as a fixed full-screen overlay or inline container' },
    { name: 'intervalMs', type: 'number', default: '240', description: 'Milliseconds per greeting cycle' },
    { name: 'showProgress', type: 'boolean', default: 'true', description: 'Whether to display the Apple-style hairline progress bar' },
    { name: 'showLangBadge', type: 'boolean', default: 'true', description: 'Whether to display country language badges' },
    { name: 'allowSkip', type: 'boolean', default: 'true', description: 'Whether to enable ESC key and Skip button dismissals' },
    { name: 'speedMultiplier', type: 'number', default: '1', description: 'Speed multiplier for the animation sequence' },
    { name: 'onComplete', type: '() => void', default: 'undefined', description: 'Callback fired when welcome sequence completes' },
  ],
  accessibility: [
    'Screen reader live region (aria-live="polite" and aria-atomic="true") for real-time announcements',
    'Full keyboard dismissibility with Escape key listener',
    'Complete prefers-reduced-motion fallback jumping directly to finish',
    'Dialog role with aria-label="Welcome intro screen" and clean tree unmounting upon finish',
  ],
  usageCode: `import { IntroLoader } from "@/components/ui/intro-loader";
import { useState } from "react";

export function Demo() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <IntroLoader
        allowSkip={true}
        showProgress={true}
        onComplete={() => setLoading(false)}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#FAFAFA] p-8">
      <h1>Welcome to the Application</h1>
    </main>
  );
}`,
};

export default meta;
