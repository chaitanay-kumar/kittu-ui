import { useRef, useState } from "react";
import "../../lib/kit-controls.css";
export interface SwipeItem {
  id: string;
  title: string;
  description?: string;
}
export interface SwipeActionListProps {
  items?: SwipeItem[];
  actionLabel?: string;
  onAction?: (item: SwipeItem) => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
}
const samples: SwipeItem[] = [
  {
    id: "one",
    title: "Review the small details",
    description: "Design · Today",
  },
  {
    id: "two",
    title: "Ship something thoughtful",
    description: "Engineering · Tomorrow",
  },
];
function SwipeRow({
  item,
  actionLabel,
  onAction,
  disabled,
}: {
  item: SwipeItem;
  actionLabel: string;
  onAction: () => Promise<void>;
  disabled: boolean;
}) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const [offset, setOffset] = useState(0);
  const [revealed, setRevealed] = useState(false);
  return (
    <li className="kit-surface kit-stack" style={{ overflow: "hidden" }}>
      <div
        className="kit-swipe"
        style={{ transform: `translateX(${offset}px)` }}
        onPointerDown={(e) => {
          if (disabled || e.button !== 0) return;
          start.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          if (!start.current) return;
          if (Math.abs(e.clientY - start.current.y) > 35) {
            start.current = null;
            setOffset(0);
            return;
          }
          setOffset(Math.max(-96, Math.min(0, e.clientX - start.current.x)));
        }}
        onPointerUp={() => {
          setRevealed(offset < -40);
          start.current = null;
          setOffset(0);
        }}
        onPointerCancel={() => {
          start.current = null;
          setOffset(0);
        }}
        onPointerLeave={() => {
          start.current = null;
          setOffset(0);
        }}
      >
        <h3>{item.title}</h3>
        <p className="kit-muted">{item.description}</p>
      </div>
      <div className="kit-row">
        <button
          type="button"
          disabled={disabled}
          aria-expanded={revealed}
          onClick={() => setRevealed(!revealed)}
        >
          {revealed ? "Hide actions" : "Show actions"}
        </button>
        {revealed && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => void onAction()}
          >
            {actionLabel} <span className="sr-only">{item.title}</span>
          </button>
        )}
      </div>
    </li>
  );
}
export function SwipeActionList({
  items = samples,
  actionLabel = "Archive",
  onAction,
  disabled = false,
  loading = false,
}: SwipeActionListProps) {
  const [done, setDone] = useState<string[]>([]);
  const [pending, setPending] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const busy = useRef(false);
  async function act(item: SwipeItem) {
    if (busy.current) return;
    busy.current = true;
    setPending(item.id);
    setStatus(`${actionLabel} in progress…`);
    try {
      await onAction?.(item);
      setDone((d) => [...d, item.id]);
      setStatus(`${item.title}: ${actionLabel.toLowerCase()} complete.`);
    } catch {
      setStatus("Action failed. Your item is unchanged; try again.");
    } finally {
      setPending(null);
      busy.current = false;
    }
  }
  const visible = items.filter((i) => !done.includes(i.id));
  return (
    <section
      className="kit-control kit-stack"
      aria-label="Swipe actions"
      aria-busy={loading || !!pending}
    >
      <p className="kit-muted">Swipe left or use Show actions.</p>
      {loading ? (
        <p>Loading items…</p>
      ) : (
        <ul className="kit-list">
          {visible.map((item) => (
            <SwipeRow
              key={item.id}
              item={item}
              actionLabel={pending === item.id ? "Working…" : actionLabel}
              onAction={() => act(item)}
              disabled={disabled || !!pending}
            />
          ))}
        </ul>
      )}
      {!loading && !visible.length && <p>All clear. No items to show.</p>}
      <p role="status" className="kit-status">
        {status}
      </p>
      {done.length > 0 && (
        <button
          type="button"
          disabled={disabled || !!pending}
          onClick={() => {
            setDone([]);
            setStatus("Items restored locally.");
          }}
        >
          Restore list
        </button>
      )}
    </section>
  );
}
