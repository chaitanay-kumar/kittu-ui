import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import "../../lib/kittu-controls.css";
export interface ElasticSheetProps {
  title?: string;
  children?: ReactNode;
  snapPositions?: number[];
  disabled?: boolean;
  onSnapChange?: (position: number) => void;
}
export function ElasticSheet({
  title = "Make room for the details",
  children,
  snapPositions = [35, 65, 90],
  disabled = false,
  onSnapChange,
}: ElasticSheetProps) {
  const snaps = [
    ...new Set(
      snapPositions.filter((n) => Number.isFinite(n) && n >= 20 && n <= 95),
    ),
  ].sort((a, b) => a - b);
  if (!snaps.length) snaps.push(35, 65, 90);
  const [height, setHeight] = useState(snaps[0]);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<{ y: number; height: number } | null>(null);
  const titleId = useId();
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);
  const snap = (value: number) => {
    const next = snaps.reduce((a, b) =>
      Math.abs(b - value) < Math.abs(a - value) ? b : a,
    );
    setHeight(next);
    onSnapChange?.(next);
  };
  return (
    <div className="kittu-control">
      <button type="button" disabled={disabled} onClick={() => setOpen(true)}>
        Open elastic sheet ↗
      </button>
      <dialog
        ref={dialog}
        className="kittu-dialog kittu-sheet kittu-control"
        style={{ height: `${height}dvh` }}
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          origin.current = null;
        }}
      >
        <div className="kittu-stack">
          <button
            type="button"
            className="kittu-sheet-handle"
            aria-label="Resize sheet. Use arrow keys to change snap position"
            onKeyDown={(e) => {
              if (["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const index = snaps.indexOf(height);
                snap(
                  e.key === "Home"
                    ? snaps[0]
                    : e.key === "End"
                      ? snaps.at(-1)!
                      : snaps[
                          Math.max(
                            0,
                            Math.min(
                              snaps.length - 1,
                              index + (e.key === "ArrowUp" ? 1 : -1),
                            ),
                          )
                        ],
                );
              }
            }}
            onPointerDown={(e) => {
              origin.current = { y: e.clientY, height };
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (origin.current)
                setHeight(
                  Math.max(
                    snaps[0],
                    Math.min(
                      snaps.at(-1)!,
                      origin.current.height +
                        ((origin.current.y - e.clientY) / window.innerHeight) *
                          100,
                    ),
                  ),
                );
            }}
            onPointerUp={() => {
              origin.current = null;
              snap(height);
            }}
            onPointerCancel={() => {
              origin.current = null;
              snap(height);
            }}
          >
            Drag to resize
          </button>
          <div
            className="kittu-row"
            style={{ justifyContent: "space-between" }}
          >
            <h3 id={titleId}>{title}</h3>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <div className="kittu-row" aria-label="Sheet size">
            {snaps.map((n) => (
              <button
                type="button"
                key={n}
                aria-pressed={height === n}
                onClick={() => snap(n)}
              >
                {n}%
              </button>
            ))}
          </div>
          {children ?? (
            <p className="kittu-muted">
              A little space to think. Drag the handle, use its arrow keys, or
              choose a snap position. Escape closes the sheet.
            </p>
          )}
        </div>
      </dialog>
    </div>
  );
}
