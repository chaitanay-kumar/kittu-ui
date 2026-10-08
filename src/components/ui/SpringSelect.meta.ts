import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'SpringSelect',
  description: 'A select dropdown whose menu follows the trigger with a tiny spring. The chevron rotates a hair past 180° before settling, and the panel slides down with a subtle overshoot.',
  category: 'Forms',
  tagline: 'Menu follows the trigger with a tiny spring',
  badges: ['Origin Spring', 'Keyboard', 'Accessible', 'Light & Dark'],
  createdAt: '2026-09-03',
  features: [
    'Dropdown panel springs from the trigger with a subtle scale: 0.98 -> 1 overshoot',
    'Chevron rotates to 192° (slightly past 180°) and settles back via snappy spring',
    'Keyboard navigation: ArrowUp/Down to move, Enter to select, Escape to close',
    'Hover and active item highlight via tracked activeIndex state',
    'Selected item checkmark that follows selection through the spring motion',
    'Light/dark theme aware via CSS variables — works in both palettes',
  ],
  props: [
    { name: 'options', type: 'SpringSelectOption[]', default: '[]', description: 'Array of options with value, label, optional description, and disabled' },
    { name: 'value', type: 'string', default: 'undefined', description: 'Controlled value' },
    { name: 'defaultValue', type: 'string', default: 'undefined', description: 'Initial value (uncontrolled)' },
    { name: 'placeholder', type: 'string', default: "'Select…'", description: 'Placeholder text when no value is selected' },
    { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Called when a new value is selected' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Visible label rendered above the trigger' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction' },
    { name: 'error', type: 'string', default: 'undefined', description: 'Error message; presence triggers danger styling' },
  ],
  accessibility: [
    'aria-haspopup / aria-expanded / aria-selected / aria-disabled on appropriate elements',
    'Full keyboard navigation with proper focus restoration to trigger on close',
    'Escape key dismisses the panel without changing the value',
    'Disabled state is conveyed to assistive tech',
  ],
  usageCode: `import { SpringSelect } from "@/components/ui/spring-select";

export function Demo() {
  return (
    <div className="max-w-sm">
      <SpringSelect
        label="Workspace"
        placeholder="Choose a workspace"
        defaultValue="design"
        options={[
          { value: "design", label: "Design Team", description: "12 members" },
          { value: "eng", label: "Engineering", description: "34 members" },
          { value: "ops", label: "Operations", description: "8 members" },
          { value: "labs", label: "R&D Labs", description: "5 members", disabled: true },
        ]}
      />
    </div>
  );
}`,
};

export default meta;
