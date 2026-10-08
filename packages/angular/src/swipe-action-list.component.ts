import {
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import type { SwipeItem } from "./types";

@Component({
  selector: "kittu-swipe-action-list",
  standalone: true,
  host: { style: "display:block" },
  template: ` <section
    class="kittu-control kittu-stack"
    aria-label="Swipe actions"
    [attr.aria-busy]="loading() || !!pending()"
  >
    <p class="kittu-muted">Swipe left or use Show actions.</p>
    @if (loading()) {
      <p>Loading items…</p>
    } @else {
      <ul class="kittu-list">
        @for (item of visible(); track item.id) {
          <li class="kittu-surface kittu-stack" style="overflow:hidden">
            <div
              class="kittu-swipe"
              [style.transform]="
                'translateX(' + (dragId() === item.id ? offset() : 0) + 'px)'
              "
              (pointerdown)="start($event, item.id)"
              (pointermove)="move($event, item.id)"
              (pointerup)="end(item.id)"
              (pointercancel)="cancel()"
              (pointerleave)="cancel()"
            >
              <h3>{{ item.title }}</h3>
              <p class="kittu-muted">{{ item.description }}</p>
            </div>
            <div class="kittu-row">
              <button
                type="button"
                [disabled]="disabled() || !!pending()"
                [attr.aria-expanded]="revealed() === item.id"
                (click)="reveal(item.id)"
              >
                {{ revealed() === item.id ? "Hide actions" : "Show actions" }}
              </button>
              @if (revealed() === item.id) {
                <button
                  type="button"
                  [disabled]="disabled() || !!pending()"
                  (click)="act(item)"
                >
                  {{ pending() === item.id ? "Working…" : actionLabel() }}
                  <span class="sr-only">{{ item.title }}</span>
                </button>
              }
            </div>
          </li>
        }
      </ul>
      @if (!visible().length) {
        <p>All clear. No items to show.</p>
      }
    }
    <p role="status" class="kittu-status">{{ status() }}</p>
    @if (done().length) {
      <button
        type="button"
        [disabled]="disabled() || !!pending()"
        (click)="restore()"
      >
        Restore list
      </button>
    }
  </section>`,
})
export class KittuSwipeActionListComponent {
  readonly items = input<SwipeItem[]>([
    {
      id: "one",
      title: "Review the small details",
      description: "Design · Today",
    },
    {
      id: "two",
      title: "Ship something thoughtful",
      description: "Engineering · Tomorrow",
    },
  ]);
  readonly actionLabel = input("Archive");
  readonly action = input<(item: SwipeItem) => void | Promise<void>>();
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly done = signal<string[]>([]);
  readonly pending = signal<string | null>(null);
  readonly status = signal("");
  readonly revealed = signal<string | null>(null);
  readonly dragId = signal<string | null>(null);
  readonly offset = signal(0);
  readonly visible = computed(() =>
    this.items().filter((i) => !this.done().includes(i.id)),
  );
  private origin: { x: number; y: number } | null = null;
  private destroyed = false;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
    });
  }
  reveal(id: string): void {
    this.revealed.set(this.revealed() === id ? null : id);
  }
  start(event: PointerEvent, id: string): void {
    if (this.disabled() || this.pending() || event.button !== 0) return;
    this.origin = { x: event.clientX, y: event.clientY };
    this.dragId.set(id);
  }
  move(event: PointerEvent, id: string): void {
    if (!this.origin || this.dragId() !== id) return;
    if (Math.abs(event.clientY - this.origin.y) > 35) {
      this.cancel();
      return;
    }
    this.offset.set(Math.max(-96, Math.min(0, event.clientX - this.origin.x)));
  }
  end(id: string): void {
    if (this.dragId() === id)
      this.revealed.set(this.offset() < -40 ? id : null);
    this.cancel();
  }
  cancel(): void {
    this.origin = null;
    this.dragId.set(null);
    this.offset.set(0);
  }
  restore(): void {
    this.done.set([]);
    this.status.set("Items restored locally.");
  }
  async act(item: SwipeItem): Promise<void> {
    if (this.pending() || this.disabled()) return;
    this.pending.set(item.id);
    this.status.set(`${this.actionLabel()} in progress…`);
    try {
      await this.action()?.(item);
      if (!this.destroyed) {
        this.done.update((items) => [...items, item.id]);
        this.status.set(`${item.title}: action complete.`);
      }
    } catch {
      if (!this.destroyed)
        this.status.set("Action failed. Your item is unchanged; try again.");
    } finally {
      if (!this.destroyed) this.pending.set(null);
    }
  }
}
