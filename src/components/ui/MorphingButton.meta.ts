import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Morphing Button',
  description: 'A layout-stable interactive action button that smoothly transitions between Idle, Loading, Success, and Error states without jarring jumps or dimension shifts.',
  category: 'Buttons',
  tagline: 'Dimension-preserving state morphing button with fluid icon transitions',
  badges: ['Buttons', 'Micro-interactions', 'State Morphing'],
  createdAt: '2026-08-21',
  features: [
    'Zero layout shift architecture preserving natural bounding dimensions across states',
    'Icon morphing with spring-based scale and translation transitions',
    'Multiple design presets (Primary, Secondary, Danger, and Ghost)',
    'Interactive spring tap physics (whileTap scale 0.97)',
    'Complete disabled and busy ARIA state compatibility',
  ],
  props: [
    { name: 'status', type: "'idle' | 'loading' | 'success' | 'error'", default: "'idle'", description: 'Current button lifecycle state' },
    { name: 'idleText', type: 'string', default: "'Save Changes'", description: 'Label shown in default resting state' },
    { name: 'loadingText', type: 'string', default: "'Saving...'", description: 'Label shown when operation is pending' },
    { name: 'successText', type: 'string', default: "'Saved'", description: 'Label shown upon successful completion' },
    { name: 'errorText', type: 'string', default: "'Failed'", description: 'Label shown when operation fails' },
    { name: 'variant', type: "'primary' | 'secondary' | 'danger' | 'ghost'", default: "'primary'", description: 'Visual surface styling preset' },
  ],
  accessibility: [
    'ARIA live role="button" with dynamic aria-busy during loading',
    'Focus-visible ring conforming to Kit UI accessibility tokens',
    'Screen readers announce state changes without losing focus target',
  ],
  usageCode: `import { MorphingButton } from "@/components/ui/morphing-button";

export function Demo() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleClick = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    }, 1500);
  };

  return (
    <MorphingButton
      status={status}
      idleText="Deploy Project"
      loadingText="Building Edge..."
      successText="Deployed ✓"
      onClick={handleClick}
    />
  );
}`,
};

export default meta;
