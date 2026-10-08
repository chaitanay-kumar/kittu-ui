# Button

A unified, production-ready Button component supporting 8 visual variants, 4 sizes, loading spinner states, icon slots, and spring tap feedback.

## Features

- **8 Visual Variants:** Primary, Secondary, Outline, Ghost, Destructive, Success, Link, and Gradient.
- **4 Size Options:** Small (`sm`), Medium (`md`), Large (`lg`), and square Icon (`icon`).
- **Tactile Physics:** `whileTap={{ scale: 0.97 }}` spring feedback via Framer Motion `springSnappy`.
- **Loading State:** Integrated monochrome spinner (`isLoading`) with `aria-busy="true"` and customizable loading text.
- **Icon Slots:** First-class support for `leftIcon`, `rightIcon`, and icon-only buttons.
- **Full Width:** `fullWidth` prop expands the button to 100% width of parent containers.
- **Monochrome Dark Palette:** Adheres strictly to Kit UI's dark slate elevation system and focus tokens.

## Installation

```bash
npx shadcn@latest add chaitanay-kumar/kittu-ui/button
```

## Basic Usage

```tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
        Get Started
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive' \| 'success' \| 'link' \| 'gradient'` | `'primary'` | Visual surface style. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Height, padding, and typography scale. |
| `isLoading` | `boolean` | `false` | Displays loading spinner and disables user interaction. |
| `loadingText` | `string` | `undefined` | Optional text displayed while in loading state. |
| `leftIcon` | `React.ReactNode` | `undefined` | Icon element placed before children. |
| `rightIcon` | `React.ReactNode` | `undefined` | Icon element placed after children. |
| `fullWidth` | `boolean` | `false` | Stretches button across parent width. |
| `disabled` | `boolean` | `false` | Disables button and applies 30% opacity. |

## Variants

- `primary`: High-contrast `#F5F5F5` surface with white hover and subtle ambient glow.
- `secondary`: `#151515` raised surface with `#1D1D1D` border.
- `outline`: Transparent background with `#2A2A2A` border.
- `ghost`: Transparent background with `#A1A1A1` text, highlighting on hover.
- `destructive`: Restrained dark red surface (`#1A0A0A`) with `#FF7A7A` text for destructive actions.
- `success`: Restrained dark emerald surface (`#0A160F`) with `#6EE7B7` text.
- `link`: Clean text link with underline-on-hover.
- `gradient`: `#121212` base with subtle shimmer reflection.

## Examples

### Loading State

```tsx
<Button isLoading loadingText="Deploying...">
  Deploy
</Button>
```

### Icon Button

```tsx
import { Plus } from 'lucide-react';

<Button size="icon" variant="secondary" aria-label="Add item">
  <Plus className="w-4 h-4" />
</Button>
```

## Accessibility

- Semantic `<button>` element with explicit default `type="button"`.
- Keyboard focusable with `focus-ring` (Sky-400 focus outline strictly on `:focus-visible`).
- Accessible `aria-busy="true"` state when `isLoading` is active.
- Disabled buttons disable pointer events and keyboard triggers.
- Respects `prefers-reduced-motion`.
