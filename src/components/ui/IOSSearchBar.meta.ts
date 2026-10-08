import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'iOS-style Search Bar',
  description: 'A minimalist search pill that smoothly expands on focus and reveals quick-clear controls with spring animation.',
  category: 'Navigation',
  tagline: 'Spring expanding search pill & tactile clear button',
  badges: ['Framer Motion', 'Spring Physics', 'Search', 'Accessible'],
  createdAt: '2026-08-24',
  features: [
    'Smooth spring width expansion on input focus and auto-collapse on blur',
    'Conditional quick-clear button with spring scale entrance and exit',
    'Built-in keyboard hotkey indicator (⌘K) and Escape key blur support',
    'Semantic search input type with full WCAG AA accessibility',
  ],
  props: [
    { name: 'value', type: 'string', description: 'Current search query string' },
    { name: 'onChange', type: '(value: string) => void', description: 'Input change handler' },
    { name: 'onSubmit', type: '(value: string) => void', default: 'undefined', description: 'Fired when Enter is pressed' },
    { name: 'onClear', type: '() => void', default: 'undefined', description: 'Callback when clear button is clicked' },
    { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Placeholder label' },
    { name: 'collapsedWidth', type: 'number | string', default: "'220px'", description: 'Width before focus' },
    { name: 'expandedWidth', type: 'number | string', default: "'340px'", description: 'Width after focus' },
  ],
  accessibility: [
    'Standard <input type="search"> with clear descriptive aria-label',
    'Interactive clear button with accessible aria-label="Clear search"',
    'Supports Escape key to blur and Enter key to submit',
  ],
  usageCode: `import { useState } from "react";
import { IOSSearchBar } from "@/components/ui/ios-search-bar";

export function Demo() {
  const [query, setQuery] = useState("");

  return (
    <IOSSearchBar
      value={query}
      onChange={setQuery}
      placeholder="Search documentation..."
      onSubmit={(q) => console.log("Searching:", q)}
    />
  );
}`,
};

export default meta;
