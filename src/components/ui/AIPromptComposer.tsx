import { useEffect, useId, useRef, useState } from "react";
import "../../lib/kittu-controls.css";
export interface PromptPayload {
  text: string;
  attachments: File[];
}
export interface AIPromptComposerProps {
  suggestions?: string[];
  onSend?: (payload: PromptPayload, signal: AbortSignal) => Promise<void>;
  disabled?: boolean;
  maxAttachments?: number;
  maxAttachmentSize?: number;
}
export function AIPromptComposer({
  suggestions = [
    "Explain this simply",
    "Help me find a direction",
    "Review my draft",
  ],
  onSend,
  disabled = false,
  maxAttachments = 4,
  maxAttachmentSize = 10 * 1024 * 1024,
}: AIPromptComposerProps) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const id = useId();
  useEffect(
    () => () => {
      controller.current?.abort();
      controller.current = null;
    },
    [],
  );
  async function send() {
    if (disabled || controller.current || !text.trim() || !onSend) return;
    const request = new AbortController();
    controller.current = request;
    setPending(true);
    setStatus("Sending…");
    try {
      await onSend({ text: text.trim(), attachments: files }, request.signal);
      if (!request.signal.aborted) {
        setText("");
        setFiles([]);
        setStatus("Prompt sent.");
      }
    } catch {
      if (!request.signal.aborted)
        setStatus("Sending failed. Your draft is saved; try again.");
    } finally {
      if (controller.current === request) {
        controller.current = null;
        setPending(false);
      }
    }
  }
  function cancel() {
    controller.current?.abort();
    controller.current = null;
    setPending(false);
    setStatus("Sending cancelled. Your draft is saved.");
  }
  return (
    <form
      className="kittu-control kittu-surface kittu-stack"
      aria-label="AI prompt composer"
      aria-busy={pending}
      onSubmit={(e) => {
        e.preventDefault();
        void send();
      }}
    >
      <label htmlFor={id}>What are you thinking?</label>
      <textarea
        id={id}
        rows={4}
        maxLength={8000}
        value={text}
        disabled={disabled || pending}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            void send();
          }
        }}
        placeholder="Start with a small idea…"
      />
      <div className="kittu-row" aria-label="Prompt suggestions">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            disabled={disabled || pending}
            onClick={() => setText(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <label htmlFor={`${id}-files`}>
        Attachments · up to {maxAttachments}
      </label>
      <input
        id={`${id}-files`}
        type="file"
        multiple
        disabled={disabled || pending}
        onChange={(e) => {
          const incoming = Array.from(e.target.files ?? []);
          if (
            files.length + incoming.length > maxAttachments ||
            incoming.some((f) => f.size > maxAttachmentSize)
          ) {
            setStatus(
              `Choose up to ${maxAttachments} attachments, each under ${Math.round(maxAttachmentSize / 1024 / 1024)} MB.`,
            );
          } else {
            setFiles((old) => [...old, ...incoming]);
            setStatus("Attachments added.");
          }
          e.target.value = "";
        }}
      />
      <ul className="kittu-list">
        {files.map((file, index) => (
          <li key={`${file.name}-${index}`} className="kittu-row">
            <span style={{ overflowWrap: "anywhere" }}>{file.name}</span>
            <button
              type="button"
              disabled={disabled || pending}
              onClick={() =>
                setFiles((old) => old.filter((_, i) => i !== index))
              }
            >
              Remove <span className="sr-only">{file.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="kittu-row">
        <span className="kittu-muted">
          {text.length}/8000 · ⌘ / Ctrl Enter to send
        </span>
        <button
          type="submit"
          disabled={disabled || pending || !text.trim() || !onSend}
        >
          {pending ? "Sending…" : "Send prompt ↗"}
        </button>
        {pending && (
          <button type="button" onClick={cancel}>
            Cancel
          </button>
        )}
      </div>
      <p role="status" className="kittu-status">
        {status ||
          (!onSend
            ? "Connect an onSend handler to send prompts."
            : "Your draft stays here until sending succeeds.")}
      </p>
    </form>
  );
}
