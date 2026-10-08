import { useFramework } from "../../lib/framework/FrameworkProvider";
export function FrameworkSwitch() {
  const { framework, setFramework } = useFramework();
  return (
    <div
      role="group"
      aria-label="Component framework"
      className="flex items-center gap-1 rounded-full border border-border bg-surface p-1 text-xs pointer-events-auto"
    >
      {(["react", "angular"] as const).map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={framework === value}
          onClick={() => setFramework(value)}
          className={`rounded-full px-3 py-1.5 font-medium transition-colors focus-ring cursor-pointer ${framework === value ? "bg-text-primary text-background" : "text-text-secondary hover:bg-surface-hover"}`}
        >
          {value === "react" ? "React" : "Angular"}
        </button>
      ))}
    </div>
  );
}
