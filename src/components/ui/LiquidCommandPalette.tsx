import { useEffect, useId, useRef, useState } from "react";
import "../../lib/kit-controls.css";
export interface LiquidCommand {
  id: string;
  label: string;
  keywords?: string;
  disabled?: boolean;
  onSelect: () => void | Promise<void>;
}
export interface LiquidCommandPaletteProps {
  commands?: LiquidCommand[];
  disabled?: boolean;
}
const sample: LiquidCommand[] = [
  {
    id: "home",
    label: "Go to home",
    onSelect: () => {
      window.location.assign("/");
    },
  },
  {
    id: "components",
    label: "Browse components",
    keywords: "library catalog",
    onSelect: () => {
      window.location.assign("/components");
    },
  },
  {
    id: "docs",
    label: "Read the documentation",
    onSelect: () => {
      window.location.assign("/docs/introduction");
    },
  },
];
export function LiquidCommandPalette({
  commands = sample,
  disabled = false,
}: LiquidCommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const busy = useRef(false);
  const id = useId();
  const results = commands.filter((c) =>
    `${c.label} ${c.keywords ?? ""}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const selectable = results.filter((c) => !c.disabled);
  const current =
    selectable[Math.min(active, Math.max(0, selectable.length - 1))];
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      input.current?.focus();
    } else dialog.current?.close();
  }, [open]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === "k" &&
        !disabled
      ) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", key, true);
    return () => window.removeEventListener("keydown", key, true);
  }, [disabled]);
  useEffect(() => {
    if (open && current) document.getElementById(`${id}-${current.id}`)?.scrollIntoView?.({ block: 'nearest' });
  }, [open, current, id]);
  async function run(command: LiquidCommand) {
    if (command.disabled || busy.current) return;
    busy.current = true;
    setStatus("Running command…");
    try {
      await command.onSelect();
      setStatus("Command completed.");
      setOpen(false);
    } catch {
      setStatus("Command failed. Try again.");
    } finally {
      busy.current = false;
    }
  }
  return (
    <div className="kit-control">
      <button type="button" disabled={disabled} onClick={() => setOpen(true)}>
        Find a command <kbd>⌘ / Ctrl K</kbd>
      </button>
      <dialog
        ref={dialog}
        className="kit-dialog kit-control"
        aria-label="Command palette"
        onClose={() => setOpen(false)}
      >
        <div className="kit-stack">
          <div className="kit-row">
            <h3>Where next?</h3>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <input
            ref={input}
            role="combobox"
            aria-label="Search commands"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls={`${id}-list`}
            aria-activedescendant={current ? `${id}-${current.id}` : undefined}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                setActive(
                  (i) =>
                    (i +
                      (e.key === "ArrowDown" ? 1 : -1) +
                      Math.max(1, selectable.length)) %
                    Math.max(1, selectable.length),
                );
              }
              if (e.key === "Home") {
                e.preventDefault();
                setActive(0);
              }
              if (e.key === "End") {
                e.preventDefault();
                setActive(Math.max(0, selectable.length - 1));
              }
              if (e.key === "Enter" && current) {
                e.preventDefault();
                void run(current);
              }
            }}
            placeholder="Search commands…"
          />
          <ul
            id={`${id}-list`}
            role="listbox"
            aria-label="Commands"
            className="kit-list"
            style={{ maxHeight: "45dvh", overflow: "auto" }}
          >
            {results.map((c) => (
              <li
                role="option"
                id={`${id}-${c.id}`}
                key={c.id}
                aria-selected={current?.id === c.id}
                aria-disabled={c.disabled}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => void run(c)}
                style={{
                  padding: ".75rem",
                  borderRadius: ".75rem",
                  cursor: c.disabled ? "not-allowed" : "pointer",
                  opacity: c.disabled ? 0.5 : 1,
                  background: current?.id === c.id ? "#8883" : undefined,
                }}
              >
                {c.label}
              </li>
            ))}
          </ul>
          {!results.length && <p>No matching commands.</p>}
          <p role="status" className="kit-status">
            {status}
          </p>
        </div>
      </dialog>
    </div>
  );
}
