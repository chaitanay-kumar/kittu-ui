import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Wallet Card',
  description: 'A premium dark wallet card with a blue radial-gradient surface, live balance display, iOS-style toggle, and a primary action button. The card surface responds to the pointer with a soft cyan shine driven entirely by MotionValues.',
  category: 'Motion',
  tagline: 'Dark wallet card with pointer-driven cyan shine',
  badges: ['Pointer Shine', 'Spring Tap', 'Painted Surface'],
  createdAt: '2026-08-31',
  features: [
    'Live balance figure with iOS-style toggle and primary action button',
    'Painted blue radial-gradient surface with diagonal specular sweep and outer glow',
    'Pointer-driven cyan shine — same MotionValue architecture as SpotlightCard',
    'Spring-tap response on the action button (0.97 scale)',
    'Full keyboard support and visible focus outline on the button',
    'Respects prefers-reduced-motion — shine is skipped, button tap is disabled',
    'Responsive aspect ratio; surface adapts without layout shift',
  ],
  props: [
    { name: 'balance', type: 'string', default: "'$4,566.00'", description: 'Headline balance figure rendered as the dominant type' },
    { name: 'cardType', type: 'string', default: "'Mastercard'", description: 'Card brand label shown in the subtitle' },
    { name: 'cardLastFour', type: 'string', default: "'3040'", description: 'Last four digits of the underlying card' },
    { name: 'buttonLabel', type: 'string', default: "'Use Wallet'", description: 'Label for the primary action button' },
    { name: 'onUseWallet', type: '() => void', default: 'undefined', description: 'Click handler for the action button' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the action button' },
    { name: 'balanceLabel', type: 'string', default: "'Total Balance'", description: 'Small caption under the balance figure' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Additional Tailwind classes merged into the card root' },
  ],
  accessibility: [
    'Semantic <article> root with descriptive title and subtitle',
    'Native <button> for the action with aria-label and visible focus outline',
    'Pointer shine is purely decorative — aria-hidden on all glow layers',
    'prefers-reduced-motion fallback: shine is never tracked, button tap is skipped',
  ],
  usageCode: `import { WalletCard } from "@/components/ui/wallet-card";

export function Demo() {
  return (
    <div className="w-full max-w-md mx-auto">
      <WalletCard
        balance="$4,566.00"
        cardType="Mastercard"
        cardLastFour="3040"
        buttonLabel="Use Wallet"
        onUseWallet={() => console.log('wallet used')}
        balanceLabel="Total Balance"
      />
    </div>
  );
}`,
};

export default meta;
