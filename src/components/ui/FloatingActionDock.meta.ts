import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Floating Action Dock',
  description: 'A floating quick-action toolbar inspired by macOS dock physics with smooth magnification and subtle tooltips.',
  category: 'Navigation',
  tagline: 'Magnification curve with physical spring feedback',
  badges: ['Pointer Physics', 'Magnification Curve', 'Tooltips'],
  createdAt: '2026-08-12',
  features: [
    'Continuous distance interpolation curve',
    'Tooltips with instant spring opacity',
    'Active status indicator dot',
  ],
  props: [
    { name: 'items', type: 'DockItem[]', default: '[]', description: 'Dock icons with labels, actions, and icons' },
    { name: 'activeId', type: 'string', default: 'undefined', description: 'Current active item identifier' },
  ],
  accessibility: [
    'Standard aria-labels for every button item',
    'Accessible keyboard focus',
  ],
  usageCode: `import { FloatingActionDock } from "@/components/ui/floating-action-dock";
import { Terminal, Code2, Sparkles, Settings } from "lucide-react";

export function Demo() {
  const items = [
    { id: 'terminal', label: 'Terminal', icon: <Terminal /> },
    { id: 'editor', label: 'Editor', icon: <Code2 /> },
    { id: 'ai', label: 'AI Assistant', icon: <Sparkles /> },
  ];
  return <FloatingActionDock items={items} activeId="terminal" />;
}`,
};

export default meta;
