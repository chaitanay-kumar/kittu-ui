import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Payment Receipt Printer',
  description: 'An animated payment and order receipt printer component for React featuring realistic thermal paper extrusion, chassis micro-vibration, customizable receipt itemization, and replay controls.',
  category: 'Feedback',
  tagline: 'Animated thermal receipt printer with smooth paper extrusion motion',
  badges: ['Spring Physics', 'Feedback', 'Interactive'],
  createdAt: '2026-08-20',
  features: [
    'Authentic thermal paper extrusion animation emerging downward from printer slot',
    'Subtle chassis vibration physics during active printing phase',
    'Multiple receipt items support with automatic dynamic height calculation',
    'Customizable merchant brand, order number, payment method, taxes, barcode, and message',
    'Interactive Replay, Copy Order Number, and Print action controls',
    'Light, dark, and cream paper themes with serrated paper perforation cuts',
    'Full accessibility support with aria-live status and prefers-reduced-motion detection',
  ],
  props: [
    { name: 'status', type: "'idle' | 'printing' | 'completed' | 'success'", default: "'idle'", description: 'Current lifecycle state of payment and printing' },
    { name: 'merchant', type: 'string', default: "'Kit UI Store'", description: 'Store or company name on receipt header' },
    { name: 'merchantSubtext', type: 'string', default: "'Source Component Registry'", description: 'Location or subtitle below merchant name' },
    { name: 'merchantLogo', type: 'ReactNode', default: 'undefined', description: 'Custom logo icon rendered in receipt header' },
    { name: 'orderNumber', type: 'string', default: "'#4821'", description: 'Unique order or invoice tracking reference' },
    { name: 'date', type: 'string | Date', default: 'Current date', description: 'Transaction timestamp string or Date object' },
    { name: 'items', type: 'ReceiptItem[]', default: '[]', description: 'List of purchased items with prices, quantities, and descriptions' },
    { name: 'item', type: 'ReceiptItem', default: 'undefined', description: 'Shorthand for single item receipt' },
    { name: 'subtotal', type: 'string | number', default: 'undefined', description: 'Subtotal price before tax and discounts' },
    { name: 'tax', type: 'string | number', default: 'undefined', description: 'Tax amount displayed on receipt' },
    { name: 'discount', type: 'string | number', default: 'undefined', description: 'Discount or coupon amount deducted' },
    { name: 'total', type: 'string | number', default: "'$200.00'", description: 'Final total payment amount' },
    { name: 'currency', type: 'string', default: "'$'", description: 'Currency symbol prepended to numeric prices' },
    { name: 'paymentMethod', type: 'string', default: "'Apple Pay •••• 4242'", description: 'Payment method or card description' },
    { name: 'message', type: 'string', default: "'Thank you for your order!'", description: 'Footer message printed at bottom of receipt' },
    { name: 'autoPrint', type: 'boolean', default: 'true', description: 'Whether to automatically begin printing extrusion on mount' },
    { name: 'printDuration', type: 'number', default: '2.4', description: 'Extrusion animation duration in seconds' },
    { name: 'showStatusCard', type: 'boolean', default: 'true', description: 'Whether to display the top status card banner' },
    { name: 'statusTitle', type: 'string', default: "'Payment Complete'", description: 'Heading for the top status banner' },
    { name: 'statusSubtitle', type: 'string', default: "'Receipt has been issued'", description: 'Subtitle description for status banner' },
    { name: 'showActions', type: 'boolean', default: 'true', description: 'Whether to render Replay and Copy action buttons' },
    { name: 'showBarcode', type: 'boolean', default: 'true', description: 'Whether to render the thermal barcode block' },
    { name: 'showCutEffect', type: 'boolean', default: 'true', description: 'Whether to render jagged serrated paper edges' },
    { name: 'paperTheme', type: "'light' | 'dark' | 'cream'", default: "'light'", description: 'Receipt paper visual theme styling' },
    { name: 'onPrintStart', type: '() => void', default: 'undefined', description: 'Callback fired when paper printing begins' },
    { name: 'onPrintComplete', type: '() => void', default: 'undefined', description: 'Callback fired when paper printing finishes' },
    { name: 'onReplay', type: '() => void', default: 'undefined', description: 'Callback fired when animation replay is triggered' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Custom CSS classes for outer container' },
  ],
  accessibility: [
    'ARIA live region for dynamic payment and printing status announcements',
    'Respects prefers-reduced-motion media query with instantaneous completion',
    'Keyboard accessible interactive replay and copy controls with focus-visible rings',
    'Semantic document structure with compliant contrast ratios',
  ],
  usageCode: `import { PaymentReceiptPrinter } from "@/components/ui/payment-receipt-printer";

export function Demo() {
  return (
    <PaymentReceiptPrinter
      merchant="Kit UI Store"
      orderNumber="#4821"
      items={[
        { name: "Kit UI Pro License", price: "$200.00", quantity: 1 },
        { name: "Framer Motion Pack", price: "$20.00", quantity: 1 },
      ]}
      subtotal="$220.00"
      total="$220.00"
      paymentMethod="Apple Pay •••• 4242"
      message="Thank you for your order!"
    />
  );
}`,
};

export default meta;
