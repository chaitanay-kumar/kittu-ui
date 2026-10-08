import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { ElasticSheet } from "./ElasticSheet";
import { SmartUpload } from "./SmartUpload";
import type { UploadContext } from "./SmartUpload";
import { LiquidCommandPalette } from "./LiquidCommandPalette";
import { HoldToConfirm } from "./HoldToConfirm";
import { SwipeActionList } from "./SwipeActionList";
import { InteractiveDataCard } from "./InteractiveDataCard";
import { TimelineScrubber } from "./TimelineScrubber";
import { AIPromptComposer } from "./AIPromptComposer";

beforeEach(() => {
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: {
      configurable: true,
      value: function (this: HTMLDialogElement) {
        this.setAttribute("open", "");
      },
    },
    close: {
      configurable: true,
      value: function (this: HTMLDialogElement) {
        this.removeAttribute("open");
      },
    },
  });
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("Kittu interactions", () => {
  it("snaps a sheet with keyboard controls and explicit snap buttons", () => {
    const change = vi.fn();
    render(<ElasticSheet onSnapChange={change} />);
    fireEvent.click(screen.getByRole("button", { name: /open elastic/i }));
    const handle = screen.getByRole("button", { name: /resize sheet/i });
    fireEvent.keyDown(handle, { key: "End" });
    expect(change).toHaveBeenLastCalledWith(90);
    fireEvent.keyDown(handle, { key: "ArrowDown" });
    expect(change).toHaveBeenLastCalledWith(65);
    fireEvent.click(screen.getByRole("button", { name: "35%" }));
    expect(change).toHaveBeenLastCalledWith(35);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("cancels an early keyboard hold and confirms exactly once after a complete hold", async () => {
    vi.useFakeTimers();
    const confirm = vi.fn();
    render(<HoldToConfirm duration={300} onConfirm={confirm} />);
    const button = screen.getByRole("button", { name: "Hold to confirm" });
    fireEvent.keyDown(button, { key: " " });
    act(() => vi.advanceTimersByTime(100));
    fireEvent.keyUp(button, { key: " " });
    act(() => vi.advanceTimersByTime(400));
    expect(confirm).not.toHaveBeenCalled();
    fireEvent.keyDown(button, { key: "Enter" });
    fireEvent.keyDown(button, { key: "Enter", repeat: true });
    await act(async () => {
      vi.advanceTimersByTime(350);
      await Promise.resolve();
    });
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Confirmed ✓" })).toBeDisabled();
  });
  it("allows retry after a rejected confirmation", async () => {
    vi.useFakeTimers();
    const confirm = vi
      .fn()
      .mockRejectedValueOnce(new Error("no"))
      .mockResolvedValueOnce(undefined);
    render(<HoldToConfirm duration={250} onConfirm={confirm} />);
    const button = screen.getByRole("button", { name: "Hold to confirm" });
    fireEvent.keyDown(button, { key: "Enter" });
    await act(async () => {
      vi.advanceTimersByTime(300);
      await Promise.resolve();
    });
    expect(screen.getByRole("status")).toHaveTextContent("failed");
    fireEvent.keyDown(button, { key: "Enter" });
    await act(async () => {
      vi.advanceTimersByTime(300);
      await Promise.resolve();
    });
    expect(confirm).toHaveBeenCalledTimes(2);
  });
  it("filters commands and skips disabled entries when navigating", async () => {
    const first = vi.fn();
    const last = vi.fn();
    render(
      <LiquidCommandPalette
        commands={[
          { id: "one", label: "Open first", onSelect: first },
          {
            id: "disabled",
            label: "Open disabled",
            disabled: true,
            onSelect: vi.fn(),
          },
          { id: "last", label: "Open last", onSelect: last },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /find a command/i }));
    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => expect(last).toHaveBeenCalledTimes(1));
    expect(first).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /find a command/i }));
    fireEvent.change(input, { target: { value: "missing" } });
    expect(screen.getByText("No matching commands.")).toBeInTheDocument();
  });
  it("preserves swipe items after failure and removes them after retry via keyboard-accessible buttons", async () => {
    const action = vi
      .fn()
      .mockRejectedValueOnce(new Error("no"))
      .mockResolvedValueOnce(undefined);
    render(
      <SwipeActionList
        items={[{ id: "a", title: "Keep my item" }]}
        onAction={action}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Show actions" }));
    fireEvent.click(screen.getByRole("button", { name: /Archive Keep/ }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Action failed"),
    );
    expect(
      screen.getByRole("heading", { name: "Keep my item" }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Archive Keep/ }));
    await waitFor(() =>
      expect(
        screen.getByText("All clear. No items to show."),
      ).toBeInTheDocument(),
    );
  });
  it("expands details and reports async card failure without discarding content", async () => {
    render(
      <InteractiveDataCard onAction={() => Promise.reject(new Error("no"))}>
        Persistent detail
      </InteractiveDataCard>,
    );
    const expand = screen.getByRole("button", { name: /Explore details/ });
    expect(expand).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(expand);
    expect(expand).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(screen.getByRole("button", { name: "Refresh report" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Unable to update"),
    );
    expect(screen.getByText("Persistent detail")).toBeVisible();
  });
  it("navigates timeline events, clamps a shrinking list, and renders an empty timeline", () => {
    const change = vi.fn();
    const events = [
      { id: "a", title: "First" },
      { id: "b", title: "Second" },
    ];
    const view = render(<TimelineScrubber events={events} onChange={change} />);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "1" } });
    expect(change).toHaveBeenLastCalledWith(events[1], 1);
    view.rerender(<TimelineScrubber events={[events[0]]} />);
    expect(screen.getByRole("slider")).toHaveValue("0");
    expect(screen.getByRole("slider")).toBeDisabled();
    view.rerender(<TimelineScrubber events={[]} />);
    expect(screen.getByText("No events yet.")).toBeInTheDocument();
  });
  it("validates file types and limits before queueing", () => {
    render(<SmartUpload maxSize={3} accept=".pdf" maxFiles={1} />);
    const input = screen.getByLabelText("Choose files or drop them here");
    fireEvent.change(input, {
      target: { files: [new File(["x"], "bad.txt", { type: "text/plain" })] },
    });
    expect(screen.getByRole("status")).toHaveTextContent("unsupported");
    fireEvent.change(input, {
      target: {
        files: [new File(["large"], "big.pdf", { type: "application/pdf" })],
      },
    });
    expect(screen.getByRole("status")).toHaveTextContent("exceeds");
    fireEvent.change(input, {
      target: {
        files: [
          new File(["x"], "ok.pdf", { type: "application/pdf" }),
          new File(["x"], "extra.pdf", { type: "application/pdf" }),
        ],
      },
    });
    expect(screen.getByText("ok.pdf", { selector: "p" })).toBeInTheDocument();
    expect(screen.queryByText("extra.pdf")).toBeNull();
  });
  it("aborts an upload, retries with a fresh signal, and ignores stale progress", async () => {
    const attempts: UploadContext[] = [];
    const upload = vi.fn((_file: File, context: UploadContext) => {
      attempts.push(context);
      return new Promise<void>(() => {});
    });
    const view = render(<SmartUpload upload={upload} />);
    fireEvent.change(screen.getByLabelText("Choose files or drop them here"), {
      target: {
        files: [new File(["x"], "report.pdf", { type: "application/pdf" })],
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Upload" }));
    act(() => attempts[0].onProgress(50));
    expect(screen.getByRole("progressbar")).toHaveValue(50);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(attempts[0].signal.aborted).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    act(() => attempts[0].onProgress(90));
    expect(screen.getByRole("progressbar")).toHaveValue(0);
    expect(attempts[1].signal.aborted).toBe(false);
    view.unmount();
    expect(attempts[1].signal.aborted).toBe(true);
  });
  it("revokes an image preview when removed", () => {
    const create = vi.fn(() => "blob:kittu-preview");
    const revoke = vi.fn();
    vi.stubGlobal(
      "URL",
      Object.assign(URL, { createObjectURL: create, revokeObjectURL: revoke }),
    );
    render(<SmartUpload />);
    fireEvent.change(screen.getByLabelText("Choose files or drop them here"), {
      target: { files: [new File(["x"], "ant.png", { type: "image/png" })] },
    });
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "blob:kittu-preview",
    );
    fireEvent.click(screen.getByRole("button", { name: "Remove ant.png" }));
    expect(revoke).toHaveBeenCalledWith("blob:kittu-preview");
  });
  it("preserves a prompt after failure, then clears it after a successful retry", async () => {
    const send = vi
      .fn()
      .mockRejectedValueOnce(new Error("no"))
      .mockResolvedValueOnce(undefined);
    render(<AIPromptComposer onSend={send} />);
    const textarea = screen.getByLabelText("What are you thinking?");
    fireEvent.change(textarea, { target: { value: "A careful draft" } });
    fireEvent.click(screen.getByRole("button", { name: /Send prompt/ }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Sending failed"),
    );
    expect(textarea).toHaveValue("A careful draft");
    fireEvent.keyDown(textarea, { key: "Enter", ctrlKey: true });
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Prompt sent"),
    );
    expect(textarea).toHaveValue("");
  });
  it("cancels a send, keeps attachments and draft, and ignores a late completion", async () => {
    let signal: AbortSignal | undefined;
    let finish: () => void = () => {};
    render(
      <AIPromptComposer
        onSend={(_payload, next) => {
          signal = next;
          return new Promise<void>((resolve) => {
            finish = resolve;
          });
        }}
      />,
    );
    const textarea = screen.getByLabelText("What are you thinking?");
    fireEvent.change(textarea, { target: { value: "Keep this" } });
    fireEvent.change(screen.getByLabelText(/Attachments ·/), {
      target: { files: [new File(["x"], "note.txt")] },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send prompt/ }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(signal?.aborted).toBe(true);
    await act(async () => finish());
    expect(textarea).toHaveValue("Keep this");
    expect(
      screen.getByRole("button", { name: "Remove note.txt" }),
    ).toBeInTheDocument();
  });
});
