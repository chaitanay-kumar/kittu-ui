import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Interactive Timeline',
  description: 'A developer-focused milestone and deployment timeline featuring dynamic progress lines, pulsating status nodes, expandable telemetry cards, and commit hash copy.',
  category: 'Motion',
  tagline: 'Milestone & pipeline tracker with spring progress physics',
  badges: ['Milestones', 'Deployment Track', 'Spring Physics'],
  createdAt: '2026-08-19',
  features: [
    'Animated continuous progress line with spring physics',
    'Interactive status nodes (completed, in-progress, pending, failed) with breathing aura',
    'Collapsible details with metrics grid and commit metadata',
    'One-click commit hash copying with feedback state',
    'Accessible semantic list and keyboard navigation structure',
  ],
  props: [
    { name: 'items', type: 'TimelineItem[]', default: '[]', description: 'Array of timeline step items' },
    { name: 'defaultSelectedId', type: 'string', default: 'items[0]?.id', description: 'ID of the item initially expanded' },
    { name: 'collapsible', type: 'boolean', default: 'true', description: 'Whether cards can be expanded/collapsed on click' },
    { name: 'onItemSelect', type: '(item: TimelineItem) => void', default: 'undefined', description: 'Callback invoked when a timeline node or card is selected' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Optional CSS classes for outer container' },
  ],
  accessibility: [
    'Semantic role="region" and role="list" with listitem hierarchy',
    'Aria-expanded and aria-controls binding on interactive items',
    'Respects prefers-reduced-motion for smooth height and line transitions',
    'Visible focus rings for keyboard navigation',
  ],
  usageCode: `import { InteractiveTimeline } from "@/components/ui/interactive-timeline";

const deploymentSteps = [
  {
    id: "step-1",
    title: "Build & Artifact Verification",
    timestamp: "10:42 AM · 48s",
    status: "completed" as const,
    tag: "CI/CD",
    commitHash: "9f8a12bc",
    metrics: [{ label: "Bundle Size", value: "142 KB" }, { label: "Tree Shake", value: "99.4%" }],
  },
  {
    id: "step-2",
    title: "Global Edge Replication",
    timestamp: "10:43 AM · Active",
    status: "in-progress" as const,
    tag: "Infra",
    description: "Replicating immutable build layers across 32 regional edge locations.",
  },
  {
    id: "step-3",
    title: "Traffic Cutover & Smoke Test",
    timestamp: "Pending",
    status: "pending" as const,
    tag: "DNS",
  },
];

export function Demo() {
  return <InteractiveTimeline items={deploymentSteps} />;
}`,
};

export default meta;
