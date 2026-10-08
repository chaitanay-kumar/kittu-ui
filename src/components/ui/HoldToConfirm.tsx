import { useEffect, useRef, useState } from "react";
import "../../lib/kittu-controls.css";
export interface HoldToConfirmProps {
  label?: string;
  duration?: number;
  disabled?: boolean;
  onConfirm?: () => void | Promise<void>;
}
export function HoldToConfirm({
  label = "Hold to confirm",
  duration = 1200,
  disabled = false,
  onConfirm,
}: HoldToConfirmProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "holding" | "pending" | "success" | "error"
  >("idle");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const running = useRef(false);
  const mounted = useRef(true);
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    running.current = false;
  };
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      stop();
    };
  }, []);
  useEffect(() => {
    if (disabled) {
      stop();
      setProgress(0);
      setStatus((s) => (s === "holding" ? "idle" : s));
    }
  }, [disabled]);
  const cancel = () => {
    if (running.current) {
      stop();
      setProgress(0);
      setStatus("idle");
    }
  };
  const start = () => {
    if (
      disabled ||
      running.current ||
      status === "pending" ||
      status === "success"
    )
      return;
    running.current = true;
    setStatus("holding");
    setProgress(0);
    const startTime = Date.now();
    timer.current = setInterval(() => {
      const value = Math.min(
        1,
        (Date.now() - startTime) / Math.max(250, duration),
      );
      setProgress(value);
      if (value === 1) {
        stop();
        setStatus("pending");
        Promise.resolve()
          .then(() => onConfirm?.())
          .then(
            () => {
              if (mounted.current) setStatus("success");
            },
            () => {
              if (mounted.current) {
                setStatus("error");
                setProgress(0);
              }
            },
          );
      }
    }, 16);
  };
  return (
    <div className="kittu-control kittu-stack">
      <button
        type="button"
        className="kittu-hold"
        disabled={disabled || status === "pending" || status === "success"}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          start();
        }}
        onPointerUp={cancel}
        onPointerCancel={cancel}
        onLostPointerCapture={cancel}
        onBlur={cancel}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            if (!e.repeat) start();
          }
          if (e.key === "Escape") cancel();
        }}
        onKeyUp={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            cancel();
          }
        }}
      >
        <span
          className="kittu-hold-fill"
          style={{ transform: `scaleX(${progress})` }}
        />
        {status === "pending"
          ? "Confirming…"
          : status === "success"
            ? "Confirmed ✓"
            : label}
      </button>
      <progress
        aria-label="Confirmation hold progress"
        max={1}
        value={progress}
      />
      <p className="kittu-status" role="status">
        {status === "error"
          ? "Confirmation failed. Hold again to retry."
          : status === "success"
            ? "Action completed."
            : status === "pending"
              ? "Waiting for confirmation…"
              : "Hold with a pointer, Space, or Enter. Release early to cancel."}
      </p>
      {status === "success" && (
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setProgress(0);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
}
