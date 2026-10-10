/** React activity contracts, with native Angular compound components. */
export type ActivityType = 'thinking' | 'searching' | 'reading' | 'writing' | 'tool_execution' | 'api_request' | 'database_query' | 'code_execution' | 'completed' | 'failed' | 'cancelled';
export type ActivityStatus = 'pending' | 'running' | 'success' | 'error' | 'cancelled';
export interface AgentActivityItemData {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  status: ActivityStatus;
  duration?: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
  details?: {
    input?: string | Record<string, unknown>;
    output?: string | Record<string, unknown>;
    codeSnippet?: string;
    language?: string;
  };
}
