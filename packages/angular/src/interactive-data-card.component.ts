import { Component, DestroyRef, inject, input, signal } from "@angular/core";

@Component({
  selector: "kit-interactive-data-card",
  standalone: true,
  host: { style: "display:block" },
  template: ` <article
    class="kit-control kit-surface kit-stack"
    [attr.aria-busy]="loading() || pending()"
  >
    <h3>{{ title() }}</h3>
    <p>{{ loading() ? "Loading summary…" : summary() }}</p>
    @if (error()) {
      <p role="alert">{{ error() }}</p>
    }
    <button
      type="button"
      [disabled]="disabled() || loading()"
      [attr.aria-expanded]="expanded()"
      (click)="expanded.set(!expanded())"
    >
      {{ expanded() ? "Less detail −" : "Explore details +" }}
    </button>
    <div [hidden]="!expanded()" class="kit-stack">
      <ng-content
        ><p class="kit-muted">
          Your team shipped 8 features and resolved 16 issues. Keep the next
          step small and intentional.
        </p></ng-content
      ><button
        type="button"
        [disabled]="disabled() || loading() || pending()"
        (click)="act()"
      >
        {{ pending() ? "Updating…" : actionLabel() }}
      </button>
    </div>
    <p role="status" class="kit-status">{{ status() }}</p>
  </article>`,
})
export class KitInteractiveDataCardComponent {
  readonly title = input("Weekly momentum");
  readonly summary = input("24 tasks completed · 12% ahead");
  readonly loading = input(false);
  readonly error = input("");
  readonly disabled = input(false);
  readonly actionLabel = input("Refresh report");
  readonly action = input<() => void | Promise<void>>();
  readonly expanded = signal(false);
  readonly pending = signal(false);
  readonly status = signal("");
  private destroyed = false;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
    });
  }
  async act(): Promise<void> {
    if (this.pending() || this.disabled() || this.loading()) return;
    this.pending.set(true);
    this.status.set("Updating report…");
    try {
      await this.action()?.();
      if (!this.destroyed) this.status.set("Report updated.");
    } catch {
      if (!this.destroyed) this.status.set("Unable to update. Try again.");
    } finally {
      if (!this.destroyed) this.pending.set(false);
    }
  }
}
