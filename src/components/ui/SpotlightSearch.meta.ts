import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Spotlight Search',
  description: 'A global command palette and search overlay triggered by ⌘K featuring real-time fuzzy filtering, moving active highlight springs, kbd shortcuts, and full keyboard navigation.',
  category: 'Overlays',
  tagline: 'Global ⌘K search overlay with moving highlight spring physics',
  badges: ['Command Palette', 'Search', 'Overlays'],
  createdAt: '2026-08-21',
  features: [
    'Global keyboard listener for ⌘K / Ctrl+K and Escape dismissal',
    'Animated active highlight tracking item selection with layoutId spring physics',
    'Categorized search results with contextual icons and technical kbd badges',
    'Dimmed backdrop with subtle blur preserving focus on command box',
    'Full arrow key navigation and Enter selection execution',
  ],
  props: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Controlled visibility state' },
    { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Callback fired when modal visibility toggles' },
    { name: 'items', type: 'SpotlightSearchItem[]', default: '[...]', description: 'List of searchable actions and components' },
    { name: 'placeholder', type: 'string', default: "'Search components, actions...'", description: 'Input placeholder text' },
    { name: 'onSelect', type: '(item: SpotlightSearchItem) => void', default: 'undefined', description: 'Callback fired when item is chosen' },
  ],
  accessibility: [
    'Aria-expanded and aria-autocomplete attributes on input',
    'Complete keyboard control (Up/Down arrows, Enter, Escape)',
    'Traps focus within dialog while active and restores focus on close',
  ],
  usageCode: `import { SpotlightSearch } from "@/components/ui/spotlight-search";

export function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Press ⌘K to search</button>
      <SpotlightSearch open={open} onOpenChange={setOpen} />
    </div>
  );
}`,
};

export default meta;
