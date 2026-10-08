import { Component, DestroyRef, inject, input, signal } from "@angular/core";
import type { SendHandler } from "./types";

@Component({
  selector: "kittu-ai-prompt-composer",
  standalone: true,
  host: { style: "display:block" },
  template: ` <form
    class="kittu-control kittu-surface kittu-stack"
    aria-label="AI prompt composer"
    [attr.aria-busy]="pending()"
    (submit)="submit($event)"
  >
    <label
      >What are you thinking?<textarea
        rows="4"
        maxlength="8000"
        [value]="text()"
        [disabled]="disabled() || pending()"
        (input)="edit($event)"
        (keydown)="keyDown($event)"
        placeholder="Start with a small idea…"
      ></textarea>
    </label>
    <div class="kittu-row" aria-label="Prompt suggestions">
      @for (suggestion of suggestions(); track $index) {
        <button
          type="button"
          [disabled]="disabled() || pending()"
          (click)="text.set(suggestion)"
        >
          {{ suggestion }}
        </button>
      }
    </div>
    <label
      >Attachments · up to {{ maxAttachments()
      }}<input
        type="file"
        multiple
        [disabled]="disabled() || pending()"
        (change)="attach($event)"
    /></label>
    <ul class="kittu-list">
      @for (file of files(); track $index) {
        <li class="kittu-row">
          <span style="overflow-wrap:anywhere">{{ file.name }}</span
          ><button
            type="button"
            [disabled]="disabled() || pending()"
            (click)="remove($index)"
          >
            Remove <span class="sr-only">{{ file.name }}</span>
          </button>
        </li>
      }
    </ul>
    <div class="kittu-row">
      <span class="kittu-muted"
        >{{ text().length }}/8000 · ⌘ / Ctrl Enter to send</span
      ><button
        type="submit"
        [disabled]="disabled() || pending() || !text().trim() || !sendHandler()"
      >
        {{ pending() ? "Sending…" : "Send prompt ↗" }}
      </button>
      @if (pending()) {
        <button type="button" (click)="cancel()">Cancel</button>
      }
    </div>
    <p role="status" class="kittu-status">
      {{
        status() ||
          (sendHandler()
            ? "Your draft stays here until sending succeeds."
            : "Connect a sendHandler to send prompts.")
      }}
    </p>
  </form>`,
})
export class KittuAIPromptComposerComponent {
  readonly suggestions = input<string[]>([
    "Explain this simply",
    "Help me find a direction",
    "Review my draft",
  ]);
  readonly sendHandler = input<SendHandler>();
  readonly disabled = input(false);
  readonly maxAttachments = input(4);
  readonly maxAttachmentSize = input(10 * 1024 * 1024);
  readonly text = signal("");
  readonly files = signal<File[]>([]);
  readonly status = signal("");
  readonly pending = signal(false);
  private controller: AbortController | null = null;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.controller?.abort();
      this.controller = null;
    });
  }
  edit(event: Event): void {
    this.text.set((event.target as HTMLTextAreaElement).value);
  }
  remove(index: number): void {
    this.files.update((files) => files.filter((_, i) => i !== index));
  }
  attach(event: Event): void {
    const input = event.target as HTMLInputElement;
    const incoming = Array.from(input.files ?? []);
    if (
      this.files().length + incoming.length > this.maxAttachments() ||
      incoming.some((file) => file.size > this.maxAttachmentSize())
    )
      this.status.set(
        `Choose up to ${this.maxAttachments()} attachments within the size limit.`,
      );
    else {
      this.files.update((files) => [...files, ...incoming]);
      this.status.set("Attachments added.");
    }
    input.value = "";
  }
  submit(event: Event): void {
    event.preventDefault();
    void this.send();
  }
  keyDown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      void this.send();
    }
  }
  cancel(): void {
    this.controller?.abort();
    this.controller = null;
    this.pending.set(false);
    this.status.set("Sending cancelled. Your draft is saved.");
  }
  async send(): Promise<void> {
    const handler = this.sendHandler();
    if (this.disabled() || this.controller || !this.text().trim() || !handler)
      return;
    const request = new AbortController();
    this.controller = request;
    this.pending.set(true);
    this.status.set("Sending…");
    try {
      await handler(
        { text: this.text().trim(), attachments: this.files() },
        request.signal,
      );
      if (!request.signal.aborted) {
        this.text.set("");
        this.files.set([]);
        this.status.set("Prompt sent.");
      }
    } catch {
      if (!request.signal.aborted)
        this.status.set("Sending failed. Your draft is saved; try again.");
    } finally {
      if (this.controller === request) {
        this.controller = null;
        this.pending.set(false);
      }
    }
  }
}
