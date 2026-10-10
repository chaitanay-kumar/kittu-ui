import type { AgentActivityItemData } from 'kit-ui-angular';
// Keep aligned with the React live showcase.
export const INITIAL_ACTIVITIES: AgentActivityItemData[] = [
  {
    id: 'act-1',
    type: 'thinking',
    title: 'Analyze request',
    description: 'Resolve intent, dependencies, and token references.',
    status: 'success',
    duration: '42ms',
    details: {
      input: { query: 'Build a minimal agent activity timeline' },
      output: { status: 'Verified', steps: 5 },
    },
  },
  {
    id: 'act-2',
    type: 'searching',
    title: 'Search tokens',
    description: 'Resolve design tokens for border, surface, and motion.',
    status: 'success',
    duration: '94ms',
    details: {
      input: 'border, surface, radius, typography',
      output: { font: 'Geist', spacing: 'spacious' },
    },
  },
  {
    id: 'act-3',
    type: 'database_query',
    title: 'Check registry',
    description: 'Verify component schema against local catalog.',
    status: 'success',
    duration: '142ms',
    details: {
      input: { table: 'components', id: 'ai-agent-activity' },
      output: { collision: false, status: 'Ready' },
    },
  },
  {
    id: 'act-4',
    type: 'code_execution',
    title: 'Type check',
    description: 'Validate TypeScript types and strict null checks.',
    status: 'success',
    duration: '310ms',
    details: {
      codeSnippet: `export interface AgentActivityItemData {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'success';
  duration?: string;
}`,
      language: 'typescript',
      output: { errors: 0, warnings: 0 },
    },
  },
  {
    id: 'act-5',
    type: 'tool_execution',
    title: 'Generate output',
    description: 'Format output and render interactive view.',
    status: 'running',
    duration: 'Active',
  },
];
