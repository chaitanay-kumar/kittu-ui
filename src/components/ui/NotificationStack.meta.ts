import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Notification Stack',
  description: 'A stacked notification card system with physical spring stacking elevation, swipe-to-dismiss drag, and simulation triggers.',
  category: 'Feedback',
  tagline: 'Physics swipe-to-dismiss toast stack',
  badges: ['Drag Physics', 'Elevation Stacking', 'Interactive'],
  createdAt: '2026-08-04',
  features: [
    'Interactive drag-to-dismiss with spring rebound',
    'Dynamic stacking elevation offset and scale',
    'Expandable history view',
  ],
  props: [
    { name: 'initialNotifications', type: 'NotificationItem[]', default: '[]', description: 'Initial items' },
    { name: 'maxVisible', type: 'number', default: '3', description: 'Max stacked cards in compact view' },
  ],
  accessibility: [
    'Polite aria-live region announcements',
    'Dismiss button with accessible label',
  ],
  usageCode: `import { NotificationStack } from "@/components/ui/notification-stack";

export function Demo() {
  return <NotificationStack maxVisible={3} />;
}`,
};

export default meta;
