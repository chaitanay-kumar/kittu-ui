import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Metric HUD',
  description: 'An interactive developer telemetry card featuring hardware-accelerated SVG sparklines, pointer-scrubbing point inspection, spring-animated time range morphing, and delta indicators.',
  category: 'Motion',
  tagline: 'Interactive telemetry & sparkline HUD with live scrubbing',
  badges: ['SVG Sparklines', 'Telemetry HUD', 'Pointer Scrubbing'],
  createdAt: '2026-08-19',
  features: [
    'Zero-dependency hardware-accelerated SVG sparkline rendering',
    'Interactive pointer crosshair scrubbing with dynamic coordinate inspection',
    'Spring-animated time-range switching (1h, 24h, 7d, 30d)',
    'Real-time delta trend badges (up / down / neutral) with status aura',
    'One-click metric value copying with validation feedback',
  ],
  props: [
    { name: 'metrics', type: 'MetricItem[]', default: '[]', description: 'Array of telemetry metric definitions with time-series data' },
    { name: 'timeRanges', type: 'string[]', default: "['1h', '24h', '7d', '30d']", description: 'Available time window filters' },
    { name: 'defaultTimeRange', type: 'string', default: "'24h'", description: 'Initial active time range' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Custom CSS container styling' },
  ],
  accessibility: [
    'Semantic region container with ARIA telemetry roles',
    'Min and max values clearly labeled for assistive technologies',
    'Keyboard accessible time range selection controls',
  ],
  usageCode: `import { MetricHUD } from "@/components/ui/metric-hud";

const metrics = [
  {
    id: "latency",
    label: "p99 Latency",
    value: "14.2",
    unit: "ms",
    delta: { value: "-18.4%", trend: "down" as const, isPositiveGood: true },
    status: "normal" as const,
    timeSeries: {
      "1h": [18, 17, 16, 15, 14, 14.2],
      "24h": [24, 21, 19, 18, 16, 14.2],
      "7d": [32, 28, 22, 19, 15, 14.2],
    },
  },
  {
    id: "throughput",
    label: "API Throughput",
    value: "84.5k",
    unit: "req/s",
    delta: { value: "+12.1%", trend: "up" as const, isPositiveGood: true },
    status: "normal" as const,
    timeSeries: {
      "1h": [60, 65, 72, 78, 81, 84.5],
      "24h": [40, 52, 68, 74, 80, 84.5],
      "7d": [30, 45, 60, 70, 80, 84.5],
    },
  },
];

export function Demo() {
  return <MetricHUD metrics={metrics} defaultTimeRange="24h" />;
}`,
};

export default meta;
