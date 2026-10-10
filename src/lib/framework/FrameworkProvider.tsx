import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
export type Framework = "react" | "angular";
const KEY = "kit-ui-framework";
const Context = createContext<{
  framework: Framework;
  setFramework: (value: Framework) => void;
}>({ framework: "react", setFramework: () => {} });
export function FrameworkProvider({ children }: { children: ReactNode }) {
  // Keep the first client render identical to static HTML; restore preference after hydration.
  const [framework, setValue] = useState<Framework>("react");
  useEffect(() => {
    const restore = () => {
      const explicit = new URLSearchParams(window.location.search).get(
        "framework",
      );
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(KEY);
      } catch {
        /* Storage may be unavailable. */
      }
      setValue(
        explicit === "angular" || explicit === "react"
          ? explicit
          : saved === "angular"
            ? "angular"
            : "react",
      );
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  function setFramework(value: Framework) {
    setValue(value);
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* Preference still works for this session. */
    }
    const url = new URL(window.location.href);
    url.searchParams.set("framework", value);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }
  return (
    <Context.Provider value={{ framework, setFramework }}>
      {children}
    </Context.Provider>
  );
}
// The context and its hook intentionally share this small provider module.
// eslint-disable-next-line react-refresh/only-export-components
export function useFramework() {
  return useContext(Context);
}
