import { Component, HostListener, signal } from "@angular/core";
import { NgComponentOutlet } from "@angular/common";
import {LoaderDemoComponent} from "./loader-demo";
import { DEMO_PORTS, DEMO_PORT_KINDS } from "./ports";
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
    NgComponentOutlet,
    LoaderDemoComponent,
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
      @case("loader"){<kittu-loader-demo/>}
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
        @if (port) {
          <ng-container *ngComponentOutlet="port; inputs: portInputs" />
          @if (asyncDemo) {
            <label class="kittu-row"
              ><input
                type="checkbox"
                [checked]="failRequests()"
                (change)="failRequests.set($any($event.target).checked)"
              />Simulate request failure</label
            >
          }
          <p class="kittu-muted">
            Local demo data. Application actions are simulated; no account,
            payment, booking, or AI service is connected.
          </p>
        } @else {
          <p role="alert">Select an available Angular component.</p>
        }
      }
    }
  </main>`,
})
export class DemoComponent {
  readonly componentId = signal(
    new URLSearchParams(window.location.search).get("component") ||
      "elastic-sheet",
  );
  get component() {
    return this.componentId();
  }
  @HostListener("window:popstate") restoreRoute(): void {
    this.componentId.set(
      new URLSearchParams(window.location.search).get("component") ||
        "elastic-sheet",
    );
  }
  get port() {
    return DEMO_PORTS[this.component];
  }
  readonly failRequests = signal(false);
  get asyncDemo() {
    return (
      ["action", "collection", "form"].includes(
        DEMO_PORT_KINDS[this.component],
      ) || this.component === "advanced-data-table"
    );
  }
  readonly portAction = async (signal: AbortSignal) => {
    await wait(600, signal);
    if (this.failRequests()) throw new Error("Demo action failed. Try again.");
  };
  readonly portCollectionAction = async (
    _items: unknown[],
    signal: AbortSignal,
  ) => {
    await wait(600, signal);
    if (this.failRequests())
      throw new Error("Demo batch action failed. Selection preserved.");
  };
  readonly portSubmit = async (
    values: Record<string, string>,
    signal: AbortSignal,
  ) => {
    await wait(700, signal);
    if (
      this.failRequests() ||
      Object.values(values).some((value) => value.includes("fail"))
    )
      throw new Error("Demo submission failed. Values are preserved.");
  };
  readonly portChat = async (text: string, signal: AbortSignal) => {
    await wait(700, signal);
    if (text.includes("fail"))
      throw new Error("Demo send failed. Draft preserved.");
    return "Local demo reply: " + text;
  };
  get portInputs(): Record<string, unknown> {
    if (this.component === "animated-file-upload")
      return { upload: this.upload };
    if (this.component === "chat") return { sendHandler: this.portChat };
    if (this.component === "advanced-data-table")
      return { bulkAction: this.portCollectionAction };
    const kind = DEMO_PORT_KINDS[this.component];
    return kind === "action"
      ? { action: this.portAction }
      : kind === "collection"
        ? { action: this.portCollectionAction }
        : kind === "form"
          ? { submitHandler: this.portSubmit }
          : {};
  }
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
