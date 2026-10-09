/** Matches the React Activity Feed data contract. */
export type ActivityEventType = 'deploy' | 'security' | 'api' | 'system' | 'error';
export type ActivityEventStatus = 'success' | 'warning' | 'error' | 'info';
export interface ActivityActor { name: string; avatar?: string; email?: string; }
export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  status: ActivityEventStatus;
  title: string;
  timestamp: string;
  isoTimestamp?: string;
  description?: string;
  actor?: ActivityActor;
  traceId?: string;
  duration?: string;
  payload?: Record<string, unknown>;
}
