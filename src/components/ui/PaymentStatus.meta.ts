import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Payment Status',
  description: 'A calm, Apple-grade payment confirmation card with animated SVG path checkmark drawing, staged verification lifecycle transitions, receipt inspection, and failure recovery.',
  category: 'Feedback',
  tagline: 'Refined transaction status card with self-drawing checkmark and receipt actions',
  badges: ['Payment', 'Feedback', 'SVG Motion'],
  createdAt: '2026-08-21',
  features: [
    '5 clear lifecycle states: Processing, Verifying, Success, Failed, and Refunded',
    'Self-drawing SVG stroke checkmark animation upon payment confirmation',
    'Staggered metadata reveal for amount, transaction hash, timestamp, and card info',
    'Unfolding itemized receipt accordion with instant text-file receipt download',
    'One-click transaction ID copying with instant checkmark feedback',
    'Non-aggressive error state with instant retry and payment method alternatives',
  ],
  props: [
    { name: 'status', type: "'processing' | 'verifying' | 'success' | 'failed' | 'refunded'", default: "'processing'", description: 'Current lifecycle state of payment' },
    { name: 'amount', type: 'string | number', default: "'$149.00'", description: 'Transaction total amount formatted or numeric' },
    { name: 'currency', type: 'string', default: "'$'", description: 'Currency symbol prepended to amount' },
    { name: 'transactionId', type: 'string', default: "'tx_9842a8d11c7f'", description: 'Unique transaction identifier' },
    { name: 'date', type: 'string | Date', default: "'Today at 3:42 PM'", description: 'Date/time timestamp of payment' },
    { name: 'paymentMethod', type: 'string', default: "'Apple Pay'", description: 'Payment gateway or card provider' },
    { name: 'last4', type: 'string', default: "'4242'", description: 'Last 4 digits of card or account' },
    { name: 'items', type: 'PaymentReceiptItem[]', default: '[...]', description: 'Itemized purchase items for detailed receipt view' },
    { name: 'merchantName', type: 'string', default: "'Kit UI Cloud'", description: 'Merchant or brand organization name' },
    { name: 'onRetry', type: '() => void', default: 'undefined', description: 'Callback fired when user clicks Try Again' },
    { name: 'onChangePaymentMethod', type: '() => void', default: 'undefined', description: 'Callback fired when user changes card method' },
  ],
  accessibility: [
    'Aria-live region alerts assistive technology on status transition updates',
    'Keyboard accessible receipt toggle and transaction ID copy buttons',
    'Compliant contrast ratio on dark monochrome surface',
    'Full reduced-motion compatibility with zero stroke animation lag',
  ],
  usageCode: `import { PaymentStatus } from "@/components/ui/payment-status";

export function Demo() {
  return (
    <PaymentStatus
      status="success"
      amount="$149.00"
      transactionId="tx_8830192a"
      paymentMethod="Apple Pay"
      last4="4242"
    />
  );
}`,
};

export default meta;
