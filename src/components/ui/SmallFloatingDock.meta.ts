import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Small Floating Dock',
  description: 'A minimal, gesture-responsive floating dock for quick access to 3-5 primary actions.',
  category: 'Navigation',
  tagline: 'Hover proximity scale & tactile action pills',
  badges: ['Framer Motion', 'Spring Physics', 'Navigation', 'Accessible'],
  createdAt: '2026-08-24',
  features: [
    'Proximity-aware hover scale with elastic spring snap-back physics',
    'Supports 3 to 5 actions with numeric unread badges and contextual tooltips',
    'Configurable screen positioning (bottom-right, bottom-center, bottom-left)',
    'Optional hide-on-scroll behavior with smooth viewport transitions',
    'Full keyboard tab navigation and WCAG AA focus rings',
  ],
  props: [
    { name: 'items', type: 'DockItem[]', default: '[]', description: 'Array of 3 to 5 action items with icon, label, action, and badge' },
    { name: 'position', type: "'bottom-right' | 'bottom-center' | 'bottom-left'", default: "'bottom-right'", description: 'Screen placement' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button sizing scale' },
    { name: 'hideOnScroll', type: 'boolean', default: 'false', description: 'Auto-hides dock during downward scroll' },
    { name: 'variant', type: "'icon-only' | 'icon-label'", default: "'icon-only'", description: 'Icon only with tooltips or labeled buttons' },
    { name: 'activeId', type: 'string', default: 'undefined', description: 'Selected active item ID' },
  ],
  accessibility: [
    'Semantic <nav> landmark with role="navigation"',
    'aria-label on all action buttons and aria-current="page" on active item',
    'Keyboard focus and tooltip synchronization on Tab / Escape',
  ],
  usageCode: `import { SmallFloatingDock } from "@/components/ui/small-floating-dock";
import { Sparkles, Terminal, Code2, Bell } from "lucide-react";

export function Demo() {
  return (
    <SmallFloatingDock
      position="bottom-right"
      items={[
        { id: '1', label: 'AI Assistant', icon: <Sparkles className="w-4 h-4" />, action: () => {} },
        { id: '2', label: 'Terminal', icon: <Terminal className="w-4 h-4" />, action: () => {} },
        { id: '3', label: 'Editor', icon: <Code2 className="w-4 h-4" />, action: () => {} },
        { id: '4', label: 'Notifications', icon: <Bell className="w-4 h-4" />, action: () => {}, badge: 3 },
      ]}
    />
  );
}`,
};

export default meta;
