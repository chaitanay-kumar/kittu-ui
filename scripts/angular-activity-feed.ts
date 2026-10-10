import { readFileSync } from 'node:fs';

/** Activity Feed is authored independently of the generic collection ports. */
export const activityFeedPort = {
  controller: 'KittuActivityFeedController',
  imports: "import { KittuActivityFeedController } from './activity-feed-controller';\n/*\n" + readFileSync(new URL("../licenses/LUCIDE.txt", import.meta.url), "utf8") + "\n*/\n",
  description: 'React-matched telemetry cards, category counts, search, trace copying, replay, JSON inspection and optional live simulation.',
  inputs: ['events: ActivityEvent[]', 'enableLiveSimulation: boolean', 'enableFilters: boolean', 'enableSearch: boolean', 'maxEntries: number', 'onEventReplay: (event: ActivityEvent) => void', 'className: string'],
  outputs: ['eventReplay: ActivityEvent'],
  template: `
<div role="region" aria-label="Activity and telemetry event feed" [class]="'k-activity-feed '+className()">
  <div class="k-af-controls">
    <div class="k-af-search-wrap">
      @if (enableSearch()) {
        <div class="k-af-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
          <input type="text" aria-label="Search audit trace" placeholder="Search audit trace..." [value]="searchQuery()" (input)="searchQuery.set($any($event.target).value)" />
        </div>
      }
    </div>
    @if (enableLiveSimulation()) {
      <button type="button" class="k-af-stream" [class.k-af-live]="isLiveStreaming()" [attr.aria-pressed]="isLiveStreaming()" (click)="isLiveStreaming.set(!isLiveStreaming())">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16.247 7.761a6 6 0 0 1 0 8.478" /><path d="M19.075 4.933a10 10 0 0 1 0 14.134" /><path d="M4.925 19.067a10 10 0 0 1 0-14.134" /><path d="M7.753 16.239a6 6 0 0 1 0-8.478" /><circle cx="12" cy="12" r="2" /></svg><span>{{isLiveStreaming()?'Live Stream Active':'Start Live Stream'}}</span>
      </button>
    }
  </div>
  @if (enableFilters()) {
    <div class="k-af-filters" aria-label="Event categories">
      @for (category of categories(); track category.id) {
        <button type="button" [class.k-af-selected]="selectedType()===category.id" [attr.aria-pressed]="selectedType()===category.id" (click)="selectedType.set(category.id)"><span>{{category.label}}</span><span class="k-af-count">({{category.count}})</span></button>
      }
    </div>
  }
  <div class="k-af-events">
    @for (event of filteredEvents(); track event.id) {
      <div class="k-af-event" [attr.data-event-id]="event.id">
        <div class="k-af-main">
          <div class="k-af-summary">
            <div [class]="'k-af-icon k-af-'+event.type">
              @switch (event.type) {
                @case ('deploy') { <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" /><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" /></svg> }
                @case ('security') { <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg> }
                @case ('api') { <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" /></svg> }
                @case ('system') { <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></svg> }
                @case ('error') { <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg> }
              }
            </div>
            <div class="k-af-text">
              <div class="k-af-heading"><span class="k-af-title">{{event.title}}</span><span [class]="'k-af-dot k-af-status-'+event.status" [attr.aria-label]="event.status" role="img"></span></div>
              @if (event.description) { <p class="k-af-description">{{event.description}}</p> }
              <div class="k-af-meta"><span>{{event.timestamp}}</span>@if(event.duration){<span>•</span><span>{{event.duration}}</span>}@if(event.actor){<span>•</span><span class="k-af-actor">{{event.actor.name}}</span>}</div>
            </div>
          </div>
          <div class="k-af-actions">
            @if (event.traceId) {
              <button type="button" class="k-af-trace" [class.k-af-copied]="copiedTraceId()===event.traceId" title="Copy Trace ID" (click)="copy(event.traceId)"><span>{{event.traceId}}</span>@if(copiedTraceId()===event.traceId){ <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg> }@else{ <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg> }</button>
            }
            @if (onEventReplay()) {
              <button type="button" class="k-af-replay" title="Replay event" (click)="replay(event)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg></button>
            }
            @if (event.payload) {
              <button type="button" class="k-af-toggle" title="Toggle JSON payload" [attr.aria-expanded]="expandedPayloadIds().has(event.id)" (click)="togglePayload(event.id)"><span [class.k-af-open]="expandedPayloadIds().has(event.id)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></span></button>
            }
          </div>
        </div>
        <div class="k-af-payload" [class.k-af-expanded]="expandedPayloadIds().has(event.id)" [attr.inert]="expandedPayloadIds().has(event.id)?null:''" [attr.aria-hidden]="!expandedPayloadIds().has(event.id)">
          <div class="k-af-payload-inner">
            @if(event.payload){
              <div class="k-af-inspector">
                <div class="k-af-payload-heading"><span>PAYLOAD SNAPSHOT (JSON)</span><button type="button" class="k-af-copy-json" (click)="copy(json(event))"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg><span>Copy JSON</span></button></div>
                <pre><code>{{json(event)}}</code></pre>
              </div>
            }
          </div>
        </div>
      </div>
    } @empty {
      <div class="k-af-empty">No activity events recorded matching filters.</div>
    }
  </div>
  @if(copyError()){<p role="status" class="k-af-copy-error">{{copyError()}}</p>}
</div>`
};
