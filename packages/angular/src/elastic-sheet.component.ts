import {
  Component,
  ElementRef,
  computed,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";

@Component({
  selector: "kit-elastic-sheet",
  standalone: true,
  template: ` <div class="kit-control">
    <button type="button" [disabled]="disabled()" (click)="open()">
      Open elastic sheet ↗
    </button>
    <dialog
      #dialog
      class="kit-dialog kit-sheet kit-control"
      [style.height]="height() + 'dvh'"
      aria-label="Elastic sheet"
      (close)="origin = null"
    >
      <div class="kit-stack">
        <button
          type="button"
          class="kit-sheet-handle"
          aria-label="Resize sheet. Use arrow keys to change snap position"
          (keydown)="resizeKey($event)"
          (pointerdown)="start($event)"
          (pointermove)="drag($event)"
          (pointerup)="settle()"
          (pointercancel)="settle()"
        >
          Drag to resize
        </button>
        <div class="kit-row" style="justify-content:space-between">
          <h3>{{ title() }}</h3>
          <button type="button" (click)="close()">Close</button>
        </div>
        <div class="kit-row" aria-label="Sheet size">
          @for (position of positions(); track position) {
            <button
              type="button"
              [attr.aria-pressed]="height() === position"
              (click)="snap(position)"
            >
              {{ position }}%
            </button>
          }
        </div>
        <ng-content
          ><p class="kit-muted">
            Drag the handle, use its arrow keys, or choose a snap position.
            Escape closes the sheet.
          </p></ng-content
        >
      </div>
    </dialog>
  </div>`,
  host: { style: "display:block" },
})
export class KitElasticSheetComponent {
  readonly title = input("Make room for the details");
  readonly disabled = input(false);
  readonly snapPositions = input<number[]>([35, 65, 90]);
  readonly snapChange = output<number>();
  readonly positions = computed(() => {
    const values = [
      ...new Set(
        this.snapPositions().filter(
          (n) => Number.isFinite(n) && n >= 20 && n <= 95,
        ),
      ),
    ].sort((a, b) => a - b);
    return values.length ? values : [35, 65, 90];
  });
  readonly height = signal(35);
  readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>("dialog");
  origin: { y: number; height: number } | null = null;
  open(): void {
    this.snap(this.positions()[0]);
    this.dialog().nativeElement.showModal();
  }
  close(): void {
    this.dialog().nativeElement.close();
    this.origin = null;
  }
  snap(value: number): void {
    const next = this.positions().reduce((a, b) =>
      Math.abs(b - value) < Math.abs(a - value) ? b : a,
    );
    this.height.set(next);
    this.snapChange.emit(next);
  }
  start(event: PointerEvent): void {
    if (event.button !== 0) return;
    this.origin = { y: event.clientY, height: this.height() };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }
  drag(event: PointerEvent): void {
    if (this.origin)
      this.height.set(
        Math.max(
          this.positions()[0],
          Math.min(
            this.positions().at(-1)!,
            this.origin.height +
              ((this.origin.y - event.clientY) / window.innerHeight) * 100,
          ),
        ),
      );
  }
  settle(): void {
    this.origin = null;
    this.snap(this.height());
  }
  resizeKey(event: KeyboardEvent): void {
    const positions = this.positions();
    const index = positions.indexOf(this.height());
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    this.snap(
      event.key === "Home"
        ? positions[0]
        : event.key === "End"
          ? positions.at(-1)!
          : positions[
              Math.max(
                0,
                Math.min(
                  positions.length - 1,
                  index + (event.key === "ArrowUp" ? 1 : -1),
                ),
              )
            ],
    );
  }
}
