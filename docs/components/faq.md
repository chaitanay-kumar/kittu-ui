# FAQ

An expandable accordion FAQ component with smooth spring height calculation, single/multi-open modes, category filtering, search, and full ARIA keyboard accessibility.

## Features

- **Spring-Physics Motion:** Zero layout jumpiness using Framer Motion `springGentle` height calculation and icon rotation.
- **Multi-Open or Single-Open:** Toggle between single accordion mode or multi-item simultaneous expansion.
- **Searchable:** Optional real-time search filter bar (`searchable={true}`).
- **Category Tabs:** Optional category filter pills for extensive documentation FAQs (`showCategories={true}`).
- **Two Visual Variants:** Unified grouped card (`unified`) or separated individual cards (`separated`).
- **Controlled & Uncontrolled:** Supports both `openIds` controlled state and `defaultOpen` uncontrolled state.

## Installation

```bash
npx shadcn@latest add chaitanay-kumar/kittu-ui/faq
```

## Basic Usage

```tsx
import React from 'react';
import { FAQ } from '@/components/ui/faq';

export function FAQSection() {
  return (
    <FAQ
      allowMultiple
      searchable
      items={[
        {
          id: '1',
          question: 'What is Kit UI?',
          answer: 'Kit UI is an open-source collection of micro-animated, tactile React components distributed via the shadcn-compatible GitHub registry.',
        },
        {
          id: '2',
          question: 'How do I install components?',
          answer: 'You can install components directly into your codebase using standard CLI commands like "npx shadcn@latest add chaitanay-kumar/kittu-ui/<component-name>".',
        },
        {
          id: '3',
          question: 'Can I customize the animations?',
          answer: 'All spring parameters are defined in "lib/motion-tokens.ts" so you can tune damping, mass, and stiffness globally or per component.',
        },
      ]}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `FAQItem[]` | `[]` | Array of FAQ items (`id`, `question`, `answer`, `category`, `badge`, `icon`). |
| `allowMultiple` | `boolean` | `false` | Allows multiple items to be expanded simultaneously. |
| `defaultOpen` | `string[] \| string` | `undefined` | Initial expanded item ID(s) on mount. |
| `openIds` | `string[]` | `undefined` | Controlled array of expanded item IDs. |
| `onOpenChange` | `(ids: string[]) => void` | `undefined` | Callback fired when expanded items change. |
| `iconStyle` | `'chevron' \| 'plus-minus' \| 'custom'` | `'chevron'` | Toggle indicator icon style. |
| `searchable` | `boolean` | `false` | Displays search bar above FAQ items. |
| `showCategories` | `boolean` | `false` | Displays category filter pills. |
| `variant` | `'unified' \| 'separated'` | `'unified'` | Visual presentation layout mode. |

## Accessibility

- Semantic buttons with `aria-expanded` and `aria-controls`.
- Accordion content panels have `role="region"` and `aria-labelledby`.
- Space and Enter keys expand and collapse items.
- Focus outline follows Kit UI's Sky-400 focus ring standard.
- Respects `prefers-reduced-motion`.
