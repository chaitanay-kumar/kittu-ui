import { useEffect, useId, useRef, useState } from "react";
import "../../lib/kittu-controls.css";
export interface UploadContext {
  signal: AbortSignal;
  onProgress: (percent: number) => void;
}
export interface SmartUploadProps {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  upload?: (file: File, context: UploadContext) => Promise<void>;
}
interface UploadEntry {
  id: string;
  file: File;
  preview?: string;
  progress: number;
  state: "ready" | "pending" | "success" | "error" | "cancelled";
  error?: string;
}
function acceptsUpload(file: File, accept: string) {
  return (
    !accept.trim() ||
    accept.split(",").some((raw) => {
      const rule = raw.trim().toLowerCase();
      return rule.startsWith(".")
        ? file.name.toLowerCase().endsWith(rule)
        : rule.endsWith("/*")
          ? file.type.toLowerCase().startsWith(rule.slice(0, -1))
          : file.type.toLowerCase() === rule;
    })
  );
}
export function SmartUpload({
  accept = "image/*,.pdf",
  maxSize = 10 * 1024 * 1024,
  maxFiles = 5,
  disabled = false,
  upload,
}: SmartUploadProps) {
  const [entries, setEntries] = useState<UploadEntry[]>([]);
  const [message, setMessage] = useState("");
  const entriesRef = useRef(entries);
  const controllers = useRef(new Map<string, AbortController>());
  const urls = useRef(new Set<string>());
  const mounted = useRef(true);
  const id = useId();
  useEffect(() => {
    mounted.current = true;
    const activeControllers = controllers.current;
    const previewUrls = urls.current;
    return () => {
      mounted.current = false;
      activeControllers.forEach((c) => c.abort());
      activeControllers.clear();
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      previewUrls.clear();
    };
  }, []);
  function update(entryId: string, patch: Partial<UploadEntry>) {
    if (!mounted.current) return;
    setEntries((old) => {
      const next = old.map((e) => (e.id === entryId ? { ...e, ...patch } : e));
      entriesRef.current = next;
      return next;
    });
  }
  function add(files: File[]) {
    if (disabled) return;
    let count = entriesRef.current.length;
    const errors: string[] = [];
    const added: UploadEntry[] = [];
    for (const file of files) {
      if (count >= maxFiles) {
        errors.push(`Only ${maxFiles} files allowed.`);
        break;
      }
      if (file.size > maxSize) {
        errors.push(
          `${file.name} exceeds ${Math.round(maxSize / 1024 / 1024)} MB.`,
        );
        continue;
      }
      if (!acceptsUpload(file, accept)) {
        errors.push(`${file.name}: unsupported file type.`);
        continue;
      }
      const preview = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined;
      if (preview) urls.current.add(preview);
      added.push({
        id: crypto.randomUUID(),
        file,
        preview,
        progress: 0,
        state: "ready",
      });
      count++;
    }
    const next = [...entriesRef.current, ...added];
    entriesRef.current = next;
    setEntries(next);
    setMessage(errors.join(" ") || `${added.length} files ready.`);
  }
  async function send(entry: UploadEntry) {
    if (disabled || controllers.current.has(entry.id)) return;
    if (!upload) {
      setMessage("Connect an upload handler before sending files.");
      return;
    }
    const controller = new AbortController();
    controllers.current.set(entry.id, controller);
    update(entry.id, { state: "pending", progress: 0, error: undefined });
    try {
      await upload(entry.file, {
        signal: controller.signal,
        onProgress: (percent) => {
          if (
            !controller.signal.aborted &&
            controllers.current.get(entry.id) === controller
          )
            update(entry.id, {
              progress: Number.isFinite(percent)
                ? Math.max(0, Math.min(100, percent))
                : 0,
            });
        },
      });
      if (!controller.signal.aborted)
        update(entry.id, { state: "success", progress: 100 });
    } catch (error) {
      if (!controller.signal.aborted)
        update(entry.id, {
          state: "error",
          error: error instanceof Error ? error.message : "Upload failed.",
        });
    } finally {
      if (controllers.current.get(entry.id) === controller)
        controllers.current.delete(entry.id);
    }
  }
  function cancel(entry: UploadEntry) {
    controllers.current.get(entry.id)?.abort();
    controllers.current.delete(entry.id);
    update(entry.id, { state: "cancelled", progress: 0 });
  }
  function remove(entry: UploadEntry) {
    cancel(entry);
    if (entry.preview) {
      URL.revokeObjectURL(entry.preview);
      urls.current.delete(entry.preview);
    }
    const next = entriesRef.current.filter((e) => e.id !== entry.id);
    entriesRef.current = next;
    setEntries(next);
  }
  return (
    <section
      className="kittu-control kittu-surface kittu-stack"
      aria-label="Smart upload"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        add(Array.from(e.dataTransfer.files));
      }}
    >
      <label htmlFor={id}>Choose files or drop them here</label>
      <input
        id={id}
        type="file"
        multiple
        accept={accept}
        disabled={disabled}
        onChange={(e) => {
          add(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />
      <p className="kittu-muted">
        Up to {maxFiles} files · {Math.round(maxSize / 1024 / 1024)} MB each ·{" "}
        {accept || "Any file type"}
      </p>
      <ul className="kittu-list">
        {entries.map((entry) => (
          <li key={entry.id} className="kittu-stack kittu-surface">
            {entry.preview && (
              <img
                className="kittu-preview"
                src={entry.preview}
                alt={`Preview of ${entry.file.name}`}
              />
            )}
            <p>{entry.file.name}</p>
            <progress
              value={entry.progress}
              max={100}
              aria-label={`${entry.file.name} upload progress`}
            />
            <p className="kittu-status" role="status">
              {entry.error ?? entry.state}{" "}
              {entry.state === "pending"
                ? `${Math.round(entry.progress)}%`
                : ""}
            </p>
            <div className="kittu-row">
              {entry.state === "pending" ? (
                <button type="button" onClick={() => cancel(entry)}>
                  Cancel
                </button>
              ) : (
                entry.state !== "success" && (
                  <button
                    type="button"
                    disabled={disabled || !upload}
                    onClick={() => void send(entry)}
                  >
                    {entry.state === "ready" ? "Upload" : "Retry"}
                  </button>
                )
              )}
              <button
                type="button"
                disabled={disabled}
                onClick={() => remove(entry)}
              >
                Remove <span className="sr-only">{entry.file.name}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p role="status" className="kittu-status">
        {message}
      </p>
    </section>
  );
}
