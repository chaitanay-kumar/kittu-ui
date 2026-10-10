import { PhilosophySection } from '../sections/PhilosophySection';
import { withBasePath } from '../../lib/base-path';
import { useEffect, useState } from "react";
import { Container } from "../layout/Container";
import {
  ANGULAR_COMPONENTS,
  angularUsage,
} from "../../lib/framework/angular-catalog";
import { useFramework } from "../../lib/framework/FrameworkProvider";
import { copyToClipboard } from "../../lib/utils";
import { AngularPreview } from "./AngularPreview";
import { ComponentContentTabs, type ComponentContentTab } from "../docs/ComponentContentTabs";

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [status, setStatus] = useState("");
  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
        <span className="text-xs text-text-secondary">{label}</span>
        <button
          type="button"
          className="text-xs rounded px-2 py-1 focus-ring cursor-pointer"
          onClick={() => {
            void copyToClipboard(code).then((ok) =>
              setStatus(ok ? "Copied" : "Copy failed"),
            );
          }}
        >
          {status || "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SetupGuide() {
  return (
    <section className="space-y-5" aria-label="Angular installation">
      <h2 className="text-xl font-semibold">Use in your Angular app</h2>
      <p className="text-sm text-text-secondary leading-relaxed">
        Supports Angular 20, 21, and 22 with RxJS 7.8+. These are native standalone
        Angular components. The package is available as a local tarball; it has
        not been published to npm.
      </p>
      <a
        href={withBasePath('/downloads/kittu-ui-angular-0.1.0.tgz')}
        download
        className="inline-flex rounded-full bg-text-primary text-background px-5 py-2 text-sm font-medium focus-ring"
      >
        Download Angular package ↓
      </a>
      <CodeBlock
        label="Terminal · install the downloaded file"
        code="npm install ./kittu-ui-angular-0.1.0.tgz"
      />
      <CodeBlock
        label="Your global styles.css"
        code="@import 'kittu-ui-angular/styles.css';"
      />
      <p className="text-sm text-text-secondary">
        Import a component in your Angular component's <code>imports</code>{" "}
        array, then use its selector in the template. Styles accept your{" "}
        <code>--bg</code>, <code>--border</code>, and{" "}
        <code>--text-primary</code> theme tokens. No React runtime is required.
      </p>
      <p className="text-sm text-text-secondary">Angular APIs use data inputs, projected content, and output events. Consult each API table when migrating React code. Visual effects use native CSS or Canvas 2D and may look different from their React counterparts.</p>
      <CodeBlock
        label="Optional dark theme · global styles.css"
        code={`.dark {\n  --bg: #101010;\n  --border: #303030;\n  --text-primary: #fafafa;\n  --text-secondary: #a1a1aa;\n  --surface-hover: #242424;\n}`}
      />
      <p className="text-sm text-text-secondary">
        Upload and AI prompt handlers belong to your application. Honor their
        AbortSignal, reject on failure, and validate files on your server. Demos
        on this site use local simulations.
      </p>
    </section>
  );
}

function AngularSource({ id }: { id: string }) {
  const [source, setSource] = useState<{
    sourceCode: string;
    types: string;
    styles: string;
    dependencies?: Record<string,string>;
  } | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setSource(null);
    setError(false);
    fetch(withBasePath(`/angular-source/${id}.json`), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Source unavailable");
        return response.json();
      })
      .then(setSource)
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, [id, attempt]);
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Angular source</h2>
      {error ? (
        <div role="alert">
          Source could not load.{" "}
          <button
            type="button"
            className="underline focus-ring"
            onClick={() => setAttempt((n) => n + 1)}
          >
            Retry
          </button>
        </div>
      ) : source ? (
        <>
          <CodeBlock label={`${id}.component.ts`} code={source.sourceCode} />
          <details className="rounded-xl border border-border p-4">
            <summary className="cursor-pointer focus-ring text-sm">
              Shared TypeScript types and styles
            </summary>
            <div className="mt-4 space-y-4">
              <CodeBlock label="types.ts" code={source.types} />
              {Object.entries(source.dependencies??{}).map(([file,code])=><CodeBlock key={file} label={file} code={code} />)}
              <CodeBlock label="styles.css" code={source.styles} />
            </div>
          </details>
        </>
      ) : (
        <p role="status">Loading Angular source…</p>
      )}
    </section>
  );
}

export default function AngularExperience({
  view,
  id,
  onSelect,
  onBrowse,
  embedded = false,
  activeTab: controlledTab,
  onTabChange,
}: {
  view: string;
  id?: string | null;
  onSelect: (id: string) => void;
  onBrowse: () => void;
  embedded?: boolean;
  activeTab?: ComponentContentTab;
  onTabChange?: (tab: ComponentContentTab) => void;
}) {
  const [query, setQuery] = useState("");
  const [internalTab, setInternalTab] = useState<ComponentContentTab>('preview');
  const activeTab = controlledTab ?? internalTab;
  const selectTab = onTabChange ?? setInternalTab;
  const { setFramework } = useFramework();
  const entry = ANGULAR_COMPONENTS.find((c) => c.id === id);
  const unsupported =
    (view === "component-detail" || view === "component-not-found") && !entry;
  const Wrapper = embedded ? "div" : "main";
  const Content = embedded ? "div" : Container;
  return (
    <Wrapper className={embedded ? "" : "pt-10 sm:pt-16 pb-28"}>
      <Content>
        <div className={embedded ? "space-y-10" : "max-w-4xl mx-auto space-y-10"}>
          {view === "docs" ? (
            <>
              <header className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-text-muted">
                  Angular · Getting started
                </p>
                <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
                  Build with Angular.
                </h1>
                <p className="text-text-secondary">
                  116 standalone components, precise by design.
                </p>
              </header>
              <SetupGuide />
              <PhilosophySection />
              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Native interactions</h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Signals manage local state, signal inputs accept
                  configuration, and outputs report snap positions, timeline
                  selection, and confirmation. Native dialogs contain focus;
                  keyboard alternatives accompany drag and swipe interactions.
                  Reduced-motion preferences disable decorative transitions.
                </p>
                <button
                  type="button"
                  onClick={onBrowse}
                  className="underline focus-ring cursor-pointer"
                >
                  Explore Angular components →
                </button>
              </section>
            </>
          ) : unsupported ? (
            <section className="kittu-surface kittu-stack">
              <h1 className="text-2xl">
                Component not found.
              </h1>
              <p className="text-text-secondary">
                Choose a component from the Angular catalog.
              </p>
              <div className="kittu-row">
                <button
                  type="button"
                  className="kittu-button"
                  onClick={() => setFramework("react")}
                >
                  Switch to React
                </button>
                <button
                  type="button"
                  className="kittu-button"
                  onClick={onBrowse}
                >
                  Browse Angular components
                </button>
              </div>
            </section>
          ) : view === "route-not-found" ? (
            <section className="space-y-4">
              <h1 className="text-2xl">Page not found</h1>
              <button type="button" onClick={onBrowse}>
                Browse Angular components
              </button>
            </section>
          ) : entry && view === "component-detail" ? (
            <>
              <header className="space-y-4">
                <button
                  type="button"
                  onClick={onBrowse}
                  className="text-sm underline focus-ring cursor-pointer"
                >
                  ← Angular components
                </button>
                <p className="text-xs uppercase tracking-widest text-text-muted">
                  Native Angular · Standalone
                </p>
                <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
                  {entry.name}
                </h1>
                <p className="text-text-secondary max-w-2xl">
                  {entry.description}
                </p>
              </header>
              <ComponentContentTabs activeTab={activeTab} onChange={selectTab} />
              {activeTab === 'preview' && <section id="component-panel-preview" role="tabpanel" aria-labelledby="component-tab-preview" tabIndex={0} className="space-y-3 focus-ring">
                <h2 className="text-xl font-semibold">Try it</h2>
                <p className="text-xs text-text-muted">
                  Running the Angular component. Demos with requests simulate
                  them locally.
                </p>
                <div className={entry.id === "activity-feed" ? "rounded-[26px] border border-border bg-background overflow-hidden p-[22px] sm:p-11" : entry.id === "advanced-data-table" ? "rounded-2xl border border-border bg-[#F1F1F2] dark:bg-[#18181B] overflow-hidden px-[22px] sm:px-[44px]" : entry.id === "ai-agent-activity" ? "rounded-2xl border border-border bg-[#F1F1F2] dark:bg-[#18181B] overflow-hidden px-[22px] sm:px-[44px]" : entry.id === "ai-prompt-composer" ? "w-full max-w-xl mx-auto px-[23px] sm:px-0" : entry.id === "loader" ? "px-[22px] sm:px-[44px] bg-[#F1F1F2] dark:bg-[#18181B]" : "rounded-2xl border border-border bg-background overflow-hidden"}>
                  <AngularPreview
                    key={entry.id}
                    id={entry.id}
                    name={entry.name}
                  />
                </div>
              </section>}
              {activeTab === 'usage' && <section id="component-panel-usage" role="tabpanel" aria-labelledby="component-tab-usage" tabIndex={0} className="space-y-4 focus-ring">
                <h2 className="text-xl font-semibold">Usage</h2>
                <CodeBlock
                  label="example.component.ts"
                  code={angularUsage(entry)}
                />
              </section>}
              {activeTab === 'code' && <section id="component-panel-code" role="tabpanel" aria-labelledby="component-tab-code" tabIndex={0} className="focus-ring">
                <AngularSource key={entry.id} id={entry.id} />
              </section>}
              <SetupGuide />
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Inputs and outputs</h2>
                <ul className="space-y-2 text-sm">
                  {entry.inputs.map((input) => (
                    <li
                      key={input}
                      className="rounded-lg border border-border px-4 py-3"
                    >
                      <code>{input}</code>
                    </li>
                  ))}
                  {entry.outputs?.map((output) => (
                    <li
                      key={output}
                      className="rounded-lg border border-border px-4 py-3"
                    >
                      <span className="text-text-muted">Output · </span>
                      <code>{output}</code>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <>
              <header className="space-y-5 text-center max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-widest text-text-muted">
                  Kit UI · Angular
                </p>
                <h1 className="text-4xl sm:text-6xl font-medium tracking-tight">
                  Nimble by nature.
                  <br />
                  Native Angular.
                </h1>
                <p className="text-text-secondary">
                  {ANGULAR_COMPONENTS.length} native Angular components, built with signals
                  and standalone templates. Explore the full catalog in either framework.
                </p>
              </header>
              {view === 'showcase' && <PhilosophySection />}
              <section
                className="space-y-6"
                aria-label="Angular component catalog"
              >
                <label className="block text-sm">
                  <span className="sr-only">Search Angular components</span>
                  <input
                    type="search"
                    aria-label="Search Angular components"
                    placeholder="Find an Angular component…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 focus-ring"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  {ANGULAR_COMPONENTS.filter((c) =>
                    `${c.name} ${c.description}`
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                  ).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => onSelect(c.id)}
                      className="text-left rounded-2xl border border-border bg-surface p-6 space-y-3 hover:bg-surface-hover transition-colors focus-ring cursor-pointer"
                    >
                      <span className="text-[10px] uppercase tracking-widest text-text-muted">
                        Angular · Standalone
                      </span>
                      <h2 className="text-lg font-semibold">{c.name} ↗</h2>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {c.description}
                      </p>
                    </button>
                  ))}
                </div>
                {!ANGULAR_COMPONENTS.some((c) =>
                  `${c.name} ${c.description}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
                ) && (
                  <p role="status">No Angular components match your search.</p>
                )}
              </section>
            </>
          )}
        </div>
      </Content>
    </Wrapper>
  );
}
