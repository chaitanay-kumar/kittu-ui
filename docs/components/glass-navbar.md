# Glass Navbar

A modern, responsive glassmorphic navbar with smooth spring navigation pills, mobile menu drawer, customizable brand logo, and keyboard accessibility.

## Features

- **Glassmorphism Aesthetics:** Backdrop blur surface (`bg-[#050505]/85 backdrop-blur-md`) with 1px border (`#1D1D1D`).
- **Spring Physics Indicators:** Shared layout animation pills for hover spotlights and active items using Framer Motion springs.
- **Mobile Menu Drawer:** Smooth slide-down mobile menu drawer with zero layout pop.
- **Responsive Layout:** Automatically adapts from desktop horizontal links to a clean hamburger menu on mobile.
- **Dual Layout Variants:** Supports both `floating` pill style and `full-width` edge-to-edge sticky bar.
- **Full Keyboard Accessibility:** Supports Tab navigation, Space/Enter activation, and Escape key dismissal.

## Installation

Add the component to your project using the shadcn CLI:

```bash
npx shadcn@latest add chaitanay-kumar/kit-ui/glass-navbar
```

## Basic Usage

```tsx
import React from 'react';
import { GlassNavbar } from '@/components/ui/glass-navbar';

export function Header() {
  return (
    <GlassNavbar
      items={[
        { label: 'Overview', href: '#overview' },
        { label: 'Components', href: '#components', badge: '20+' },
        { label: 'Showcase', href: '#showcase' },
        { label: 'Docs', href: '#docs' },
      ]}
      cta={
        <a
          href="#get-started"
          className="px-3.5 py-1.5 rounded-lg bg-[#F5F5F5] text-[#050505] text-xs font-medium hover:bg-white transition-colors"
        >
          Get Started
        </a>
      }
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `brand` | `React.ReactNode` | `<Kit UILogo />` | Custom logo/brand element or text rendered on the left. |
| `brandHref` | `string` | `'/'` | Destination URL for the brand link. |
| `items` | `NavItem[]` | `Default items` | Array of navigation links (`label`, `href`, `icon`, `badge`, `external`, `onClick`). |
| `cta` | `React.ReactNode` | `<GetStartedButton />` | Action slot or button rendered on the right side. |
| `activeId` | `string` | `undefined` | Controlled active item identifier. |
| `variant` | `'floating' \| 'full-width'` | `'floating'` | Layout mode: floating centered container vs edge-to-edge navbar. |
| `sticky` | `boolean` | `true` | Pins the navbar to the top of the viewport (`sticky top-0`). |
| `glass` | `boolean` | `true` | Enables glassmorphic backdrop blur and transparency. |
| `className` | `string` | `undefined` | Additional CSS classes for the outer wrapper. |
| `onItemSelect` | `(item: NavItem) => void` | `undefined` | Callback fired when any navigation item is selected. |

## Variants

- **Floating (`variant="floating"`):** Floating card container with `max-w-5xl`, rounded-2xl edges, and ambient drop shadow.
- **Full Width (`variant="full-width"`):** Edge-to-edge navigation bar with a subtle bottom divider border (`#141414`).

## Customization

You can pass custom icons, badges, and external links in the `items` array:

```tsx
<GlassNavbar
  brand={<span className="font-bold text-sm text-white">Acme Corp</span>}
  items={[
    { label: 'Products', href: '/products' },
    { label: 'Changelog', href: '/changelog', badge: 'v2.4' },
    { label: 'GitHub', href: 'https://github.com', external: true },
  ]}
/>
```

## Responsive Behavior

- **Desktop (`>= 768px`):** Horizontal link row with hover indicator spotlight and active pill transition.
- **Mobile (`< 768px`):** Hamburger button opens an accessible mobile drawer with full touch targets and clean vertical layout.

## Accessibility

- Semantic `<header>` and `<nav>` with `aria-label="Main Navigation"`.
- `aria-expanded` and `aria-label` attributes on the mobile menu toggle.
- Escape key listener automatically closes the open mobile menu.
- Keyboard `:focus-visible` states use Kit UI's restrained Sky-400 focus ring.

## Notes

Requires `framer-motion` and `lucide-react` (automatically installed by the CLI).
