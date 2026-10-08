import { useId, useState } from "react";
import "../../lib/kittu-controls.css";
export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  time?: string;
}
export interface TimelineScrubberProps {
  events?: TimelineEvent[];
  onChange?: (event: TimelineEvent, index: number) => void;
  disabled?: boolean;
  loading?: boolean;
}
const sample: TimelineEvent[] = [
  {
    id: "idea",
    title: "A small beginning",
    time: "09:00",
    description: "Sketch the idea.",
  },
  {
    id: "build",
    title: "Find the rhythm",
    time: "11:30",
    description: "Build a working prototype.",
  },
  {
    id: "ship",
    title: "Ready to share",
    time: "16:00",
    description: "Bring the details together.",
  },
];
export function TimelineScrubber({
  events = sample,
  onChange,
  disabled = false,
  loading = false,
}: TimelineScrubberProps) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const index = Math.min(selected, Math.max(0, events.length - 1));
  const event = events[index];
  function select(next: number) {
    setSelected(next);
    if (events[next]) onChange?.(events[next], next);
  }
  return (
    <section
      className="kittu-control kittu-surface kittu-stack"
      aria-busy={loading}
    >
      <label htmlFor={id}>Timeline · {events.length} events</label>
      <input
        id={id}
        type="range"
        min={0}
        max={Math.max(0, events.length - 1)}
        step={1}
        value={index}
        disabled={disabled || loading || events.length < 2}
        aria-valuetext={
          event ? `${event.time ?? ""} ${event.title}` : "No events"
        }
        onChange={(e) => select(Number(e.target.value))}
      />
      <div role="status" className="kittu-stack">
        {loading ? (
          <p>Loading timeline…</p>
        ) : event ? (
          <>
            <p className="kittu-muted">
              {event.time} · {index + 1} of {events.length}
            </p>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </>
        ) : (
          <p>No events yet.</p>
        )}
      </div>
      <div className="kittu-row">
        <button
          type="button"
          disabled={disabled || loading || index === 0}
          onClick={() => select(index - 1)}
        >
          ← Previous
        </button>
        <button
          type="button"
          disabled={disabled || loading || index >= events.length - 1}
          onClick={() => select(index + 1)}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
