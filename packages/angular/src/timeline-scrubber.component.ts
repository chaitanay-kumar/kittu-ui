import { Component, computed, input, output, signal } from "@angular/core";
import type { TimelineEvent } from "./types";

@Component({
  selector: "kittu-timeline-scrubber",
  standalone: true,
  host: { style: "display:block" },
  template: ` <section
    class="kittu-control kittu-surface kittu-stack"
    [attr.aria-busy]="loading()"
  >
    <label
      >Timeline · {{ events().length }} events<input
        aria-label="Timeline event"
        type="range"
        min="0"
        [max]="maxIndex()"
        step="1"
        [value]="index()"
        [disabled]="disabled() || loading() || events().length < 2"
        [attr.aria-valuetext]="event()?.title || 'No events'"
        (input)="scrub($event)"
    /></label>
    <div role="status" class="kittu-stack">
      @if (loading()) {
        <p>Loading timeline…</p>
      } @else if (event(); as item) {
        <p class="kittu-muted">
          {{ item.time }} · {{ index() + 1 }} of {{ events().length }}
        </p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      } @else {
        <p>No events yet.</p>
      }
    </div>
    <div class="kittu-row">
      <button
        type="button"
        [disabled]="disabled() || loading() || index() === 0"
        (click)="select(index() - 1)"
      >
        ← Previous</button
      ><button
        type="button"
        [disabled]="disabled() || loading() || index() >= maxIndex()"
        (click)="select(index() + 1)"
      >
        Next →
      </button>
    </div>
  </section>`,
})
export class KittuTimelineScrubberComponent {
  readonly events = input<TimelineEvent[]>([
    {
      id: "idea",
      title: "A small beginning",
      time: "09:00",
      description: "Sketch the idea.",
    },
    {
      id: "build",
      title: "Find the rhythm",
      time: "11:30",
      description: "Build a working prototype.",
    },
    {
      id: "ship",
      title: "Ready to share",
      time: "16:00",
      description: "Bring the details together.",
    },
  ]);
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly eventChange = output<{ event: TimelineEvent; index: number }>();
  private readonly selected = signal(0);
  readonly maxIndex = computed(() => Math.max(0, this.events().length - 1));
  readonly index = computed(() => Math.min(this.selected(), this.maxIndex()));
  readonly event = computed(() => this.events()[this.index()]);
  select(next: number): void {
    if (this.disabled() || this.loading()) return;
    const index = Math.max(0, Math.min(this.maxIndex(), next));
    this.selected.set(index);
    const event = this.events()[index];
    if (event) this.eventChange.emit({ event, index });
  }
  scrub(event: Event): void {
    this.select(Number((event.target as HTMLInputElement).value));
  }
}
