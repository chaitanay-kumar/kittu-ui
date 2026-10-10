import { Directive, DestroyRef, ElementRef, afterEveryRender, computed, effect, inject, input, output, signal } from '@angular/core';
import { ActivityFeedMotion } from './activity-feed-motion';
import type { ActivityEvent, ActivityEventType } from './activity-feed-types';

/** Dedicated controller: input names, defaults and event shape follow React. */
@Directive()
export class KitActivityFeedController {
  readonly events = input<ActivityEvent[]>([]);
  readonly enableLiveSimulation = input(true);
  readonly enableFilters = input(true);
  readonly enableSearch = input(true);
  readonly maxEntries = input(20);
  readonly className = input('');
  readonly onEventReplay = input<((event: ActivityEvent) => void) | undefined>();
  readonly eventReplay = output<ActivityEvent>();
  readonly selectedType = signal('all');
  readonly searchQuery = signal('');
  readonly isLiveStreaming = signal(false);
  readonly displayedEvents = signal<ActivityEvent[]>([]);
  readonly expandedPayloadIds = signal(new Set<string>());
  readonly copiedTraceId = signal<string | null>(null);
  readonly copyError = signal('');
  private copyTimer?: ReturnType<typeof setTimeout>;
  private destroyed = false;
  readonly filteredEvents = computed(() => {
    const type = this.selectedType();
    const query = this.searchQuery().toLowerCase();
    return this.displayedEvents().filter(event =>
      (type === 'all' || event.type === type) &&
      (!query.trim() || [event.title, event.description, event.traceId, event.actor?.name]
        .some(value => value?.toLowerCase().includes(query))));
  });
  readonly categories = computed(() => {
    const events = this.displayedEvents();
    return [['all', 'All'], ['deploy', 'Deploy'], ['security', 'Security'], ['api', 'API'], ['system', 'System']]
      .map(([id, label]) => ({ id, label, count: id === 'all' ? events.length : events.filter(event => event.type === id).length }));
  });
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef);
    const motion = new ActivityFeedMotion();
    afterEveryRender(() => motion.update(host.nativeElement));
    effect(() => this.displayedEvents.set(this.events()));
    effect(onCleanup => {
      if (!this.isLiveStreaming()) return;
      const max = this.maxEntries();
      const interval = setInterval(() => {
        this.displayedEvents.update(events => [this.simulatedEvent(), ...events.slice(0, max - 1)]);
      }, 3500);
      onCleanup(() => clearInterval(interval));
    });
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      motion.destroy();
      clearTimeout(this.copyTimer);
    });
  }
  togglePayload(id: string): void {
    this.expandedPayloadIds.update(ids => {
      const next = new Set(ids);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }
  replay(event: ActivityEvent): void {
    this.onEventReplay()?.(event);
    this.eventReplay.emit(event);
  }
  json(event: ActivityEvent): string { return JSON.stringify(event.payload, null, 2); }
  async copy(value: string): Promise<void> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        // Match React's fallback for browsers without the secure clipboard API.
        const focus = document.activeElement as HTMLElement | null;
        const textarea = document.createElement('textarea');
        textarea.value = value;
        Object.assign(textarea.style, { position: 'fixed', left: '-999999px', top: '-999999px' });
        document.body.appendChild(textarea);
        try {
          textarea.focus(); textarea.select();
          if (!document.execCommand('copy')) throw new Error('Copy failed');
        } finally { textarea.remove(); focus?.focus(); }
      }
      if (this.destroyed) return;
      this.copyError.set('');
      this.copiedTraceId.set(value);
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copiedTraceId.set(null), 2000);
    } catch {
      if (!this.destroyed) this.copyError.set('Copy failed. Select the text and copy it manually.');
    }
  }
  private simulatedEvent(): ActivityEvent {
    const types: ActivityEventType[] = ['deploy', 'api', 'security', 'system'];
    const type = types[Math.floor(Math.random() * types.length)];
    const base = { id: `live-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, timestamp: 'Just now', traceId: `trc_${Math.random().toString(36).slice(2, 8)}` };
    if (type === 'deploy') return { ...base, type, status: 'success', title: 'Vercel Edge function deployed', description: 'Production branch merged into main. SSL cert auto-renewed.', duration: '412ms', actor: { name: 'Bot Pipeline', email: 'ci@example.com' }, payload: { commit: '7a29e1f', region: 'iad1', buildTimeMs: 1420 } };
    if (type === 'api') return { ...base, type, status: 'success', title: 'POST /v1/auth/session 200 OK', description: 'JWT token rotation completed for client.', duration: '18ms', actor: { name: 'User session' }, payload: { method: 'POST', status: 200, ip: '192.168.1.1' } };
    return { ...base, type, status: type === 'security' ? 'warning' : 'info', title: type === 'security' ? 'Rate limit throttle triggered' : 'Cache purged across edge', description: type === 'security' ? 'IP exceeded 100 req/s bucket window.' : 'Global CDN stale cache invalidated.', duration: '4ms', payload: { action: 'throttle', limit: 100, window: '60s' } };
  }
}
