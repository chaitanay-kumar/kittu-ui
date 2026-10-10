import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Undo Toast',
  description: 'An advanced undo notification toast featuring an interactive progress countdown, pause-on-hover mechanics, action reversal animation, and versatile position anchoring.',
  category: 'Feedback',
  tagline: 'Refined undo notification with real-time countdown progress and reversal animation',
  badges: ['Notification', 'Feedback', 'Timer Physics'],
  createdAt: '2026-08-21',
  features: [
    'Real-time smooth countdown progress bar illustrating time window remaining',
    'Intelligent pause-on-hover physics so users never miss undo deadlines',
    'Visual state morphing upon clicking Undo before gentle dismissal',
    'Configurable multi-corner positioning (top, bottom, center, corners)',
    'Multiple semantically tinted variants: Default, Success, Warning, Error, and Info',
  ],
  props: [
    { name: 'open', type: 'boolean', default: 'true', description: 'Visibility state of the undo toast' },
    { name: 'title', type: 'string', default: "'Project archived'", description: 'Primary notification message title' },
    { name: 'description', type: 'string', default: "'Changes will be permanent in a few seconds'", description: 'Optional descriptive subtitle' },
    { name: 'undoLabel', type: 'string', default: "'Undo'", description: 'Label for undo action trigger' },
    { name: 'restoredMessage', type: 'string', default: "'Restored successfully'", description: 'Title displayed when action has been reversed' },
    { name: 'duration', type: 'number', default: '5000', description: 'Duration in milliseconds before auto-dismissal' },
    { name: 'variant', type: "'default' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: 'Semantic visual tone' },
    { name: 'position', type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'", default: "'bottom-center'", description: 'Screen placement' },
    { name: 'onUndo', type: '() => void', default: 'undefined', description: 'Callback fired when user clicks Undo' },
    { name: 'onDismiss', type: '() => void', default: 'undefined', description: 'Callback fired when toast closes or expires' },
    { name: 'showProgress', type: 'boolean', default: 'true', description: 'Whether to show the countdown bar' },
  ],
  accessibility: [
    'ARIA live role="status" announcements for screen readers',
    'Full keyboard accessibility for Undo and Close buttons',
    'Respects reduced motion preferences by bypassing entry translations',
  ],
  usageCode: `import { UndoToast } from "@/components/ui/undo-toast";

export function Demo() {
  const [show, setShow] = useState(true);

  return (
    <UndoToast
      open={show}
      title="File deleted"
      description="Item moved to trash"
      duration={5000}
      onUndo={() => console.log('Action reversed')}
      onDismiss={() => setShow(false)}
    />
  );
}`,
};

export default meta;
