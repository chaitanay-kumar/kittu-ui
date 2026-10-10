import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Activity Feed',
  description: 'A developer telemetry and audit log stream featuring category filtering, live real-time event simulation with Framer Motion slide insertions, and expandable JSON payloads.',
  category: 'Feedback',
  tagline: 'Real-time telemetry event stream with expandable audit payloads',
  badges: ['Audit Logs', 'Live Stream', 'JSON Inspector'],
  createdAt: '2026-08-19',
  features: [
    'Real-time simulation toggle streaming live webhook/deploy events',
    'Framer Motion layout and AnimatePresence entry transitions',
    'Category filtering (Deploy, Security, API, System) with live count tags',
    'Integrated JSON payload inspector with syntax highlighting and copy',
    'One-click trace ID copying with animated validation feedback',
  ],
  props: [
    { name: 'events', type: 'ActivityEvent[]', default: '[]', description: 'Array of audit or telemetry activity events' },
    { name: 'enableLiveSimulation', type: 'boolean', default: 'true', description: 'Whether to show the interactive simulated live stream toggle' },
    { name: 'enableFilters', type: 'boolean', default: 'true', description: 'Whether to display category filter pill buttons' },
    { name: 'enableSearch', type: 'boolean', default: 'true', description: 'Whether to show the trace search input' },
    { name: 'maxEntries', type: 'number', default: '20', description: 'Maximum items retained in stream before pruning' },
    { name: 'onEventReplay', type: '(event: ActivityEvent) => void', default: 'undefined', description: 'Optional callback to replay a logged event' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Optional custom CSS class' },
  ],
  accessibility: [
    'Semantic region container with ARIA feed and log roles',
    'Accessible button controls for payload expansion and trace copy',
    'Screen reader compliant status indicators',
  ],
  usageCode: `import { ActivityFeed } from "@/components/ui/activity-feed";

const events = [
  {
    id: "evt-1",
    type: "deploy" as const,
    status: "success" as const,
    title: "Edge Lambda function deployed",
    timestamp: "2 mins ago",
    description: "Release v2.4.0 deployed to us-east-1 and eu-central-1.",
    duration: "240ms",
    traceId: "trc_98fa2",
    actor: { name: "DeployBot" },
    payload: { version: "2.4.0", sha: "8f3b2a" },
  },
  {
    id: "evt-2",
    type: "security" as const,
    status: "warning" as const,
    title: "MFA challenge requested",
    timestamp: "12 mins ago",
    actor: { name: "alex@company.com" },
  },
];

export function Demo() {
  return <ActivityFeed events={events} enableLiveSimulation={true} />;
}`,
};

export default meta;
