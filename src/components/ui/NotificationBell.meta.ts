import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Notification Bell',
  description: 'An interactive notification trigger with animated badge counter, arrival shake feedback, and dropdown panel.',
  category: 'Feedback',
  tagline: 'Adaptive notification badge & animated alert drawer',
  badges: ['Framer Motion', 'Spring Physics', 'Feedback', 'Overlays'],
  createdAt: '2026-08-24',
  features: [
    'Subtle rotational bell shake when new unread notifications arrive',
    'Spring-animated counter badge with overflow truncation (99+)',
    'Floating backdrop-blur panel with individual mark-as-read and mark-all-read controls',
    'Click-outside dismissal and accessible keyboard escape handling',
  ],
  props: [
    { name: 'notifications', type: 'Notification[]', description: 'Array of notification objects (id, message, timestamp, read)' },
    { name: 'onMarkAsRead', type: '(id: string) => void', description: 'Handler fired when an individual notification is marked read' },
    { name: 'onMarkAllAsRead', type: '() => void', default: 'undefined', description: 'Handler to clear all active badges' },
    { name: 'isOpen', type: 'boolean', default: 'undefined', description: 'Controlled open state of notification drawer' },
    { name: 'onOpenChange', type: '(isOpen: boolean) => void', default: 'undefined', description: 'Callback on panel open/close' },
    { name: 'showCount', type: 'boolean', default: 'true', description: 'Displays numeric badge instead of minimal red dot' },
  ],
  accessibility: [
    'Dynamic aria-expanded and descriptive aria-label with unread count',
    'Full keyboard navigation with Tab, Enter, and Escape shortcuts',
    'Contrast compliant with WCAG AA standards',
  ],
  usageCode: `import { useState } from "react";
import { NotificationBell } from "@/components/ui/notification-bell";

export function Demo() {
  const [items, setItems] = useState([
    { id: '1', message: 'Edge build deployment finished in 38s.', timestamp: 'Just now', read: false },
    { id: '2', message: 'New API token generated for production.', timestamp: '12m ago', read: false },
  ]);

  const handleMarkRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <NotificationBell
      notifications={items}
      onMarkAsRead={handleMarkRead}
      onMarkAllAsRead={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
    />
  );
}`,
};

export default meta;
