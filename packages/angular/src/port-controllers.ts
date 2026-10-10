import {
  Directive,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from "@angular/core";
import type {
  KitAction,
  KitCollectionAction,
  KitItem,
  KitField,
  KitSubmitHandler,
} from "./port-types";

let nextId = 0;
export function portId(prefix: string): string {
  return `kit-${prefix}-${++nextId}`;
}

@Directive()
export abstract class KitActionController {
  readonly label = input("");
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly action = input<KitAction>();
  readonly activated = output<void>();
  readonly busy = signal(false);
  readonly status = signal("");
  readonly error = signal("");
  readonly blocked = computed(
    () => this.disabled() || this.loading() || this.busy(),
  );
  protected destroyed = false;
  protected controller?: AbortController;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.controller?.abort();
    });
  }
  async run(): Promise<void> {
    if (this.blocked()) return;
    this.error.set("");
    this.status.set("");
    this.activated.emit();
    const action = this.action();
    if (!action) {
      this.status.set("Action requested.");
      return;
    }
    const controller = new AbortController();
    this.controller = controller;
    this.busy.set(true);
    try {
      await action(controller.signal);
      if (!this.destroyed && !controller.signal.aborted)
        this.status.set("Completed.");
    } catch (error) {
      if (!this.destroyed && !controller.signal.aborted)
        this.error.set(
          error instanceof Error ? error.message : "Action failed. Try again.",
        );
    } finally {
      if (this.controller === controller) {
        if (!this.destroyed) this.busy.set(false);
        this.controller = undefined;
      }
    }
  }
  cancel(): void {
    this.controller?.abort();
    this.controller = undefined;
    this.busy.set(false);
    this.status.set("Cancelled.");
  }
}

@Directive()
export abstract class KitCollectionController {
  readonly items = input<KitItem[]>([
    {
      id: "design",
      label: "Design",
      description: "Find the small details.",
      children: [
        { id: "tokens", label: "Design tokens" },
        { id: "motion", label: "Motion study" },
      ],
    },
    {
      id: "build",
      label: "Build",
      description: "Make something useful.",
      children: [
        { id: "components", label: "Components" },
        { id: "docs", label: "Documentation" },
      ],
    },
    { id: "ship", label: "Ship", description: "Share it with your team." },
  ]);
  readonly label = input("");
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly error = input("");
  readonly selected = model("");
  readonly selectedIds = model<string[]>([]);
  readonly itemSelect = output<KitItem>();
  readonly query = signal("");
  readonly open = signal(false);
  readonly expanded = signal<string[]>([]);
  readonly busy = signal(false);
  readonly status = signal("");
  readonly actionError = signal("");
  readonly dismissed = signal<string[]>([]);
  readonly action = input<KitCollectionAction>();
  readonly actionComplete = output<KitItem[]>();
  readonly actionRequested = output<KitItem[]>();
  readonly uid = portId("collection");
  readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly visible = computed(() =>
    this.items().filter(
      (i) =>
        !this.dismissed().includes(i.id) &&
        `${i.label} ${i.description ?? ""}`
          .toLowerCase()
          .includes(this.query().toLowerCase()),
    ),
  );
  readonly current = computed(
    () => this.items().find((i) => i.id === this.selected()) ?? this.items()[0],
  );
  protected destroyed = false;
  protected controller?: AbortController;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.controller?.abort();
    });
  }
  select(item: KitItem): void {
    if (this.disabled() || item.disabled || this.loading()) return;
    this.selected.set(item.id);
    this.itemSelect.emit(item);
  }
  toggle(id: string): void {
    if (this.disabled() || this.loading()) return;
    this.expanded.update((a) =>
      a.includes(id) ? a.filter((x) => x !== id) : [...a, id],
    );
  }
  choose(item: KitItem): void {
    if (this.disabled() || this.loading() || item.disabled || this.busy())
      return;
    this.selectedIds.update((a) =>
      a.includes(item.id) ? a.filter((x) => x !== item.id) : [...a, item.id],
    );
  }
  search(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
  keys(event: KeyboardEvent): void {
    if (
      ![
        "ArrowRight",
        "ArrowLeft",
        "ArrowDown",
        "ArrowUp",
        "Home",
        "End",
      ].includes(event.key) ||
      this.disabled()
    )
      return;
    const buttons = Array.from(
      (event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>(
        "button[data-item]:not(:disabled)",
      ),
    );
    if (!buttons.length) return;
    event.preventDefault();
    const index = buttons.indexOf(event.target as HTMLButtonElement);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? buttons.length - 1
          : (index +
              (["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 1) +
              buttons.length) %
            buttons.length;
    buttons[next].focus();
    buttons[next].click();
  }
  dismiss(item: KitItem): void {
    if (this.disabled() || this.busy()) return;
    this.dismissed.update((a) => [...a, item.id]);
    this.status.set(`${item.label} dismissed.`);
  }
  undo(): void {
    this.dismissed.set([]);
    this.status.set("Restored.");
  }
  async execute(
    items: KitItem[] = this.items().filter((i) =>
      this.selectedIds().includes(i.id),
    ),
  ): Promise<void> {
    if (this.disabled() || this.busy() || !items.length) return;
    this.actionError.set("");
    const action = this.action();
    this.actionRequested.emit(items);
    if (!action) {
      this.status.set("Action requested.");
      return;
    }
    const controller = new AbortController();
    this.controller = controller;
    this.busy.set(true);
    try {
      await action(items, controller.signal);
      if (!this.destroyed && !controller.signal.aborted) {
        this.actionComplete.emit(items);
        this.status.set("Completed.");
      }
    } catch (error) {
      if (!this.destroyed && !controller.signal.aborted)
        this.actionError.set(
          error instanceof Error ? error.message : "Action failed. Try again.",
        );
    } finally {
      if (this.controller === controller) {
        if (!this.destroyed) this.busy.set(false);
        this.controller = undefined;
      }
    }
  }
}

@Directive()
export abstract class KitFormController {
  readonly fields = input<KitField[]>([
    { key: "email", label: "Email", type: "email", required: true },
    {
      key: "password",
      label: "Password",
      type: "password",
      required: true,
      minLength: 8,
    },
  ]);
  readonly label = input("");
  readonly disabled = input(false);
  readonly submitHandler = input<KitSubmitHandler>();
  readonly submitted = output<Record<string, string>>();
  readonly values = signal<Record<string, string>>({});
  readonly busy = signal(false);
  readonly status = signal("");
  readonly error = signal("");
  readonly showPassword = signal(false);
  readonly uid = portId("form");
  private controller?: AbortController;
  private destroyed = false;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.controller?.abort();
    });
  }
  change(key: string, event: Event): void {
    this.values.update((v) => ({
      ...v,
      [key]: (event.target as HTMLInputElement).value,
    }));
  }
  async submit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    if (this.disabled() || this.busy()) return;
    const form = event.target as HTMLFormElement;
    if (!form.reportValidity()) return;
    this.error.set("");
    this.status.set("");
    const values = { ...this.values() };
    this.submitted.emit(values);
    const handler = this.submitHandler();
    if (!handler) {
      this.status.set("Form submitted. Connect your application handler.");
      return;
    }
    const controller = new AbortController();
    this.controller = controller;
    this.busy.set(true);
    try {
      await handler(values, controller.signal);
      if (!this.destroyed && !controller.signal.aborted)
        this.status.set("Submission completed.");
    } catch (error) {
      if (!this.destroyed && !controller.signal.aborted)
        this.error.set(
          error instanceof Error
            ? error.message
            : "Submission failed. Your values are preserved.",
        );
    } finally {
      if (this.controller === controller) {
        if (!this.destroyed) this.busy.set(false);
        this.controller = undefined;
      }
    }
  }
  cancel(): void {
    this.controller?.abort();
    this.controller = undefined;
    this.busy.set(false);
    this.status.set("Cancelled. Your values are preserved.");
  }
}
