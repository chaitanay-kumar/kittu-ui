import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Dependency Trace',
  description: 'An interactive SVG node graph that maps and dynamically traces relationship connections with directional bezier curves.',
  category: 'Motion',
  tagline: 'Interactive SVG node relationship & dependency tracer',
  badges: ['SVG', 'Framer Motion', 'Graph Visualization', 'Motion'],
  createdAt: '2026-08-24',
  features: [
    'Interactive bezier curve paths with animated glow pulses on hover',
    'Automatic dimming of unrelated network branches and nodes',
    'Configurable node placement or radial auto-layout geometry',
    'Accessible region landmark with hover & click selection telemetry',
  ],
  props: [
    { name: 'nodes', type: 'TraceNode[]', description: 'Array of graph nodes (id, label, type, x, y)' },
    { name: 'connections', type: 'TraceConnection[]', description: 'Array of directional or undirected link connections (from, to, label)' },
    { name: 'onNodeSelect', type: '(id: string) => void', default: 'undefined', description: 'Node click event callback' },
    { name: 'onNodeHover', type: '(id: string | null) => void', default: 'undefined', description: 'Hover event callback' },
    { name: 'nodeSize', type: 'number', default: '36', description: 'Node diameter in pixels' },
  ],
  accessibility: [
    'Semantic role="region" and descriptive aria-label',
    'Full contrast ratio compliance across connected and dimmed states',
    'Keyboard and touch-friendly target radius',
  ],
  usageCode: `import { DependencyTrace } from "@/components/ui/dependency-trace";

export function Demo() {
  return (
    <DependencyTrace
      nodes={[
        { id: 'gateway', label: 'Gateway' },
        { id: 'auth', label: 'Auth Svc' },
        { id: 'database', label: 'Postgres' },
        { id: 'cache', label: 'Redis' },
        { id: 'queue', label: 'Kafka' },
      ]}
      connections={[
        { from: 'gateway', to: 'auth' },
        { from: 'auth', to: 'database' },
        { from: 'auth', to: 'cache' },
        { from: 'gateway', to: 'queue' },
      ]}
    />
  );
}`,
};

export default meta;
