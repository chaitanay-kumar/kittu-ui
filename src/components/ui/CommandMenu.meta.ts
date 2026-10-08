import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Command Menu',
  description: 'A global keyboard-first command palette with fuzzy filtering, category badges, and keyboard arrow controls.',
  category: 'Overlays',
  tagline: 'Global ⌘K fuzzy palette with category grouping',
  badges: ['Keyboard First', '⌘K / Ctrl+K', 'Fuzzy Filtering'],
  createdAt: '2026-08-01',
  features: [
    'Global hotkey listener (⌘K / Ctrl+K)',
    'Arrow key navigation with wrapping',
    'Category badges and action shortcuts',
  ],
  props: [
    { name: 'isOpen', type: 'boolean', default: 'false', description: 'Control visibility' },
    { name: 'onClose', type: '() => void', default: 'Required', description: 'Close handler callback' },
  ],
  accessibility: [
    'ARIA combobox pattern',
    'Keyboard-only navigation',
  ],
  usageCode: `import { CommandMenu } from "@/components/ui/command-menu";
import { useState } from "react";

export function Demo() {
  const [open, setOpen] = useState(false);
  return <CommandMenu isOpen={open} onClose={() => setOpen(false)} />;
}`,
};

export default meta;
