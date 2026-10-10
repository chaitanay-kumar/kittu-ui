import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Profile Card',
  description: 'A premium dark social profile card with a painted blue cover-art panel, action row, and a detail panel with avatar, verified name, bio, follower stats, and outbound website link.',
  category: 'Motion',
  tagline: 'Dark social profile card with painted blue cover art',
  badges: ['Spring Tap', 'Tailwind', 'Painted Artwork', 'Responsive'],
  createdAt: '2026-08-31',
  features: [
    'Painted blue cover-art surface built from layered radial / linear gradients — no image assets required',
    'Spring-tap response on the primary action button (0.97 scale) via framer-motion',
    'Avatar and outbound link are keyboard-focusable with visible focus rings',
    'Outbound link uses rel="noreferrer noopener" for safe new-tab behaviour',
    'Responsive: cover height, padding, avatar size, and type scale all collapse cleanly under 600px',
    'Decorative artwork and icons are aria-hidden; the section semantics are conveyed by the visible name and labels',
    'Respects prefers-reduced-motion: spring tap is skipped entirely on the action button',
  ],
  props: [
    { name: 'name', type: 'string', default: "'Kit UI contributors'", description: 'Display name shown in the detail panel header' },
    { name: 'username', type: 'string', default: "'@kit-ui'", description: 'Handle rendered as the small caption under the name' },
    { name: 'description', type: 'string', default: "'Building Kit UI. Engineer.'", description: 'Biographical text shown under the name' },
    { name: 'followers', type: 'string', default: "'200K'", description: 'Pre-formatted follower count' },
    { name: 'posts', type: 'string', default: "'72'", description: 'Pre-formatted post count' },
    { name: 'website', type: 'string', default: "'github.com/chaitanay-kumar/kit-ui'", description: 'Website domain — link href is auto-prefixed with https://' },
    { name: 'actionLabel', type: 'string', default: "'Follow'", description: 'Label for the primary action button' },
    { name: 'onAction', type: '() => void', default: 'undefined', description: 'Click handler for the primary action button' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Additional Tailwind classes merged into the card root' },
  ],
  accessibility: [
    'Semantic <article> root with heading hierarchy (h2 for the name)',
    'Native <button> and <a> for the interactive controls — no <div onClick>',
    'All decorative artwork and icons are aria-hidden; the card content is conveyed by the visible labels',
    'Visible focus rings on the action button, secondary button, and outbound link (focus-visible)',
    'Outbound link announces "(opens in a new tab)" via aria-label',
    'prefers-reduced-motion fallback: spring tap on the action button is disabled',
  ],
  usageCode: `import { ProfileCard } from "@/components/ui/profile-card";

export function Demo() {
  return (
    <div className="w-full max-w-md mx-auto">
      <ProfileCard
        name="Kit UI contributors"
        username="@kit-ui"
        description="Building Kit UI. Engineer."
        followers="200K"
        posts="72"
        website="github.com/chaitanay-kumar/kit-ui"
        onAction={() => console.log('Follow clicked')}
      />
    </div>
  );
}`,
};

export default meta;
