import { useId, useState } from "react";
import type { ReactNode } from "react";
import "../../lib/kit-controls.css";
export interface InteractiveDataCardProps {
  title?: string;
  summary?: ReactNode;
  children?: ReactNode;
  actionLabel?: string;
  onAction?: () => void | Promise<void>;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
}
export function InteractiveDataCard({
  title = "Weekly momentum",
  summary = "24 tasks completed · 12% ahead",
  children,
  actionLabel = "Refresh report",
  onAction,
  loading = false,
  error,
  disabled = false,
}: InteractiveDataCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState("");
  const id = useId();
  async function act() {
    setState("pending");
    try {
      await onAction?.();
      setState("Report updated.");
    } catch {
      setState("Unable to update. Try again.");
    }
  }
  return (
    <article
      className="kit-control kit-surface kit-stack"
      aria-busy={loading || state === "pending"}
    >
      <h3>{title}</h3>
      <div>{loading ? "Loading summary…" : summary}</div>
      {error && <p role="alert">{error}</p>}
      <button
        type="button"
        disabled={disabled || loading}
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Less detail −" : "Explore details +"}
      </button>
      <div id={id} hidden={!expanded} className="kit-stack">
        {children ?? (
          <p className="kit-muted">
            Your team shipped 8 features and resolved 16 issues. Keep the next
            step small and intentional.
          </p>
        )}
        <button
          type="button"
          disabled={disabled || loading || state === "pending"}
          onClick={act}
        >
          {state === "pending" ? "Updating…" : actionLabel}
        </button>
      </div>
      <p className="kit-status" role="status">
        {state === "pending" ? "Updating report…" : state}
      </p>
    </article>
  );
}
