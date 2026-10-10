import {ButtonDemoComponent} from "./button-demo";
import {NeonEdgeButtonDemoComponent} from "./neon-edge-button-demo";
import {OrbitalLoadingRingDemoComponent} from "./orbital-loading-ring-demo";
import {SpotlightCardDemoComponent} from "./spotlight-card-demo";
import {MorphingIconDemoComponent} from "./morphing-icon-demo";
import { Component, HostListener, signal } from "@angular/core";
import { TableDemoComponent } from "./table-demo";
import { AgentDemoComponent } from "./agent-demo";
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
  ActivityEvent,
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
    ButtonDemoComponent,
    NeonEdgeButtonDemoComponent,
    OrbitalLoadingRingDemoComponent,
    SpotlightCardDemoComponent,
    MorphingIconDemoComponent,
    NgComponentOutlet,
    TableDemoComponent,
    AgentDemoComponent,
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
      @case ("advanced-data-table") { <kittu-table-demo/> }
      @case ("ai-agent-activity") { <kittu-agent-demo/> }
      @case("loader"){<kittu-loader-demo/>}
      @case("button"){<kittu-button-demo/>}
      @case("neon-edge-button"){<kittu-neon-edge-button-demo/>}
      @case("orbital-loading-ring"){<kittu-orbital-loading-ring-demo/>}
      @case("spotlight-card"){<kittu-spotlight-card-demo/>}
      @case("morphing-icon"){<kittu-morphing-icon-demo/>}
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
        <kittu-ai-prompt-composer [onSend]="send" />
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
          @if(component !== "activity-feed") {<p class="kittu-muted">
            Local demo data. Application actions are simulated; no account,
            payment, booking, or AI service is connected.
          </p>}
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
      )
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
    if (this.component === "activity-feed") return { events: this.activityEvents };
    if (this.component === "animated-file-upload")
      return { upload: this.upload };
    if (this.component === "chat") return { sendHandler: this.portChat };
    const kind = DEMO_PORT_KINDS[this.component];
    return kind === "action"
      ? { action: this.portAction }
      : kind === "collection"
        ? { action: this.portCollectionAction }
        : kind === "form"
          ? { submitHandler: this.portSubmit }
          : {};
  }
  readonly activityEvents: ActivityEvent[] = [
                {
                  id: 'evt-1',
                  type: 'deploy',
                  status: 'success',
                  title: 'Production release v2.4.0 verified',
                  timestamp: '2 mins ago',
                  duration: '380ms',
                  traceId: 'trc_98fa20',
                  description: 'All 32 edge clusters updated. Zero errors encountered.',
                  actor: { name: 'CI Pipeline', email: 'ci@example.com' },
                  payload: { version: '2.4.0', sha: '8f3b2a', regions: ['iad1', 'sfo1', 'fra1'] },
                },
                {
                  id: 'evt-2',
                  type: 'security',
                  status: 'warning',
                  title: 'Token rotation required for API key',
                  timestamp: '14 mins ago',
                  duration: '12ms',
                  traceId: 'trc_77b31c',
                  description: 'Secret key has exceeded 90-day recommended rotation window.',
                  actor: { name: 'Security Guard' },
                  payload: { keyId: 'key_prod_8819', ageDays: 92, action: 'notify' },
                },
                {
                  id: 'evt-3',
                  type: 'api',
                  status: 'success',
                  title: 'POST /v1/chat/completions 200 OK',
                  timestamp: '28 mins ago',
                  duration: '22ms',
                  traceId: 'trc_55e10a',
                  description: 'Streaming token generation handled with 0.12s first-byte latency.',
                  actor: { name: 'External Client' },
                  payload: { model: 'example-model', promptTokens: 140, completionTokens: 420 },
                },
              ];
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
