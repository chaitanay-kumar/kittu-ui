import { ElasticSheet } from "../ui/ElasticSheet";
import { SmartUpload } from "../ui/SmartUpload";
import { LiquidCommandPalette } from "../ui/LiquidCommandPalette";
import { HoldToConfirm } from "../ui/HoldToConfirm";
import { SwipeActionList } from "../ui/SwipeActionList";
import { InteractiveDataCard } from "../ui/InteractiveDataCard";
import { TimelineScrubber } from "../ui/TimelineScrubber";
import { AIPromptComposer } from "../ui/AIPromptComposer";

/** Explicit demo transport: no bytes or prompts leave the browser. */
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
export function ElasticSheetDemo() {
  return <ElasticSheet />;
}
export function SmartUploadDemo() {
  return (
    <div className="kit-stack">
      <p className="kit-muted">
        Local simulation. Files stay on your device. A filename containing
        “fail” demonstrates retry errors.
      </p>
      <SmartUpload
        upload={async (file, { signal, onProgress }) => {
          for (let i = 10; i <= 100; i += 10) {
            await wait(120, signal);
            onProgress(i);
          }
          if (file.name.includes("fail"))
            throw new Error("Demo upload rejected. Remove this file or retry.");
        }}
      />
    </div>
  );
}
export function LiquidCommandPaletteDemo() {
  return <LiquidCommandPalette />;
}
export function HoldToConfirmDemo() {
  return <HoldToConfirm onConfirm={() => wait(600)} />;
}
export function SwipeActionListDemo() {
  return <SwipeActionList onAction={() => wait(500)} />;
}
export function InteractiveDataCardDemo() {
  return <InteractiveDataCard onAction={() => wait(600)} />;
}
export function TimelineScrubberDemo() {
  return <TimelineScrubber />;
}
export function AIPromptComposerDemo() {
  return (
    <div className="kit-stack">
      <p className="kit-muted">
        Local simulation. No AI service is connected. Include “fail” to
        demonstrate draft recovery.
      </p>
      <AIPromptComposer
        onSend={async (payload, signal) => {
          await wait(1200, signal);
          if (payload.text.includes("fail")) throw new Error("Demo error");
        }}
      />
    </div>
  );
}
