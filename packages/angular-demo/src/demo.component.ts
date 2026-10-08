import { Component, signal } from "@angular/core";
import {
  KittuElasticSheetComponent,
  KittuSmartUploadComponent,
  KittuLiquidCommandPaletteComponent,
  KittuHoldToConfirmComponent,
  KittuSwipeActionListComponent,
  KittuInteractiveDataCardComponent,
  KittuTimelineScrubberComponent,
  KittuAIPromptComposerComponent,
} from "kittu-ui-angular";
import type {
  LiquidCommand,
  UploadHandler,
  SendHandler,
} from "kittu-ui-angular";

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Cancelled", "AbortError"));
      return;
    }
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException("Cancelled", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", abort, { once: true });
  });
}

@Component({
  selector: "kittu-angular-demo",
  standalone: true,
  imports: [
    KittuElasticSheetComponent,
    KittuSmartUploadComponent,
    KittuLiquidCommandPaletteComponent,
    KittuHoldToConfirmComponent,
    KittuSwipeActionListComponent,
    KittuInteractiveDataCardComponent,
    KittuTimelineScrubberComponent,
    KittuAIPromptComposerComponent,
  ],
  template: `<main class="kittu-stack" aria-label="Native Angular demo">
    @switch (component) {
      @case ("elastic-sheet") {
        <kittu-elastic-sheet />
      }
      @case ("smart-upload") {
        <p class="kittu-muted">
          Local simulation. Files stay on your device. A filename containing
          “fail” demonstrates retry errors.
        </p>
        <kittu-smart-upload [upload]="upload" />
      }
      @case ("liquid-command-palette") {
        <kittu-liquid-command-palette [commands]="commands" />
        <p role="status" class="kittu-status">{{ commandStatus() }}</p>
      }
      @case ("hold-to-confirm") {
        <kittu-hold-to-confirm [confirm]="confirm" />
      }
      @case ("swipe-action-list") {
        <kittu-swipe-action-list [action]="action" />
      }
      @case ("interactive-data-card") {
        <kittu-interactive-data-card [action]="action" />
      }
      @case ("timeline-scrubber") {
        <kittu-timeline-scrubber />
      }
      @case ("ai-prompt-composer") {
        <p class="kittu-muted">
          Local simulation. No AI service is connected. Include “fail” to
          demonstrate draft recovery.
        </p>
        <kittu-ai-prompt-composer [sendHandler]="send" />
      }
      @default {
        <p role="alert">Select an available Angular component.</p>
      }
    }
  </main>`,
})
export class DemoComponent {
  readonly component =
    new URLSearchParams(window.location.search).get("component") ||
    "elastic-sheet";
  readonly commandStatus = signal("");
  readonly commands: LiquidCommand[] = [
    {
      id: "new",
      label: "Create a new project",
      keywords: "start",
      onSelect: () => {
        this.commandStatus.set("New project selected.");
      },
    },
    {
      id: "docs",
      label: "Read documentation",
      keywords: "help",
      onSelect: () => {
        this.commandStatus.set("Documentation selected.");
      },
    },
    {
      id: "locked",
      label: "Locked workspace",
      disabled: true,
      onSelect: () => {},
    },
    {
      id: "fail",
      label: "Demonstrate command failure",
      onSelect: () => Promise.reject(new Error("Demo error")),
    },
  ];
  readonly confirm = () => wait(600);
  readonly action = () => wait(500);
  readonly upload: UploadHandler = async (file, { signal, onProgress }) => {
    for (let i = 10; i <= 100; i += 10) {
      await wait(120, signal);
      onProgress(i);
    }
    if (file.name.includes("fail"))
      throw new Error(
        "Demo upload rejected. Retry or choose a different file.",
      );
  };
  readonly send: SendHandler = async (payload, signal) => {
    await wait(1200, signal);
    if (payload.text.includes("fail")) throw new Error("Demo error");
  };
}
