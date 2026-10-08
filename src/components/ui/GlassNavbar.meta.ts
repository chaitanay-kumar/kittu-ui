import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Glass Navbar',
  description: 'A modern, responsive glassmorphic navbar with smooth spring navigation pills, mobile menu drawer, and keyboard accessibility.',
  category: 'Navigation',
  tagline: 'Refined glass navigation with spring physics',
  badges: ['Glassmorphism', 'Responsive', 'Spring Physics', 'Tailwind'],
  featured: true,
  createdAt: '2026-08-19',
  features: [
    'Subtle glassmorphic blur backdrop (bg-[#050505]/85 backdrop-blur-md)',
    'Dual layout modes: Floating pill or full-width sticky bar',
    'Shared layout spring animations for hover spotlight & active indicators',
    'Responsive mobile menu drawer with smooth Framer Motion spring transition',
    'Customizable brand logo, navigation items, badges, and CTA action slot',
    'Full keyboard navigation, Escape key dismiss, and aria-expanded accessibility',
  ],
  props: [
    { name: 'brand', type: 'React.ReactNode', default: '<Kit UILogo />', description: 'Brand / Logo element or text component' },
    { name: 'brandHref', type: 'string', default: "'/'", description: 'Root link destination for the brand logo' },
    { name: 'items', type: 'NavItem[]', default: 'Default items array', description: 'Array of navigation links with label, href, badge, icon' },
    { name: 'cta', type: 'React.ReactNode', default: '<GetStartedButton />', description: 'Right-hand side action slot / CTA button' },
    { name: 'activeId', type: 'string', default: 'undefined', description: 'Explicit active item identifier or label' },
    { name: 'variant', type: "'floating' | 'full-width'", default: "'floating'", description: 'Visual style layout structure' },
    { name: 'sticky', type: 'boolean', default: 'true', description: 'Pins the navigation bar to the top of the viewport' },
    { name: 'glass', type: 'boolean', default: 'true', description: 'Enables backdrop-blur glassmorphism background' },
    { name: 'onItemSelect', type: '(item: NavItem) => void', default: 'undefined', description: 'Callback fired when any nav item is selected' },
  ],
  accessibility: [
    'Semantic <header> and <nav> elements with aria-label="Main Navigation"',
    'Keyboard focusable with restrained cyan focus-ring on :focus-visible',
    'Escape key dismisses the mobile navigation drawer',
    'aria-expanded and aria-current attributes on interactive items',
  ],
  usageCode: `import { GlassNavbar } from "@/components/ui/glass-navbar";
import { Sparkles } from "lucide-react";

export function Demo() {
  return (
    <GlassNavbar
      items={[
        { label: "Overview", href: "#overview" },
        { label: "Components", href: "#components", badge: "20+" },
        { label: "Pricing", href: "#pricing" },
      ]}
      cta={
        <button className="px-3.5 py-1.5 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium hover:bg-white transition-colors">
          Get Started
        </button>
      }
    />
  );
}`,
};

export default meta;
