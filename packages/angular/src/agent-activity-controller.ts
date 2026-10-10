import { Directive, effect, input, signal, untracked } from '@angular/core';
import type { AgentActivityItemData } from './agent-activity-types';

/** Native equivalent of the React AgentActivity context. */
@Directive()
export class KitAgentActivityController {
  readonly activities = input<AgentActivityItemData[]>([]);
  readonly isRunning = input(false);
  readonly title = input('Activity');
  readonly agentName = input<string>();
  readonly accentColor = input<string>();
  readonly defaultExpandedIds = input<string[]>([]);
  readonly className = input('');
  readonly expandedIds = signal(new Set<string>());
  constructor() {
    let initialized = false;
    effect(() => {
      const ids = this.defaultExpandedIds();
      if (!initialized) { initialized = true; untracked(() => this.expandedIds.set(new Set(ids))); }
    });
  }
  toggleExpand(id: string): void {
    this.expandedIds.update(ids => { const next = new Set(ids); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }
  expandAll(): void { this.expandedIds.set(new Set(this.activities().map(activity => activity.id))); }
  collapseAll(): void { this.expandedIds.set(new Set()); }
}
