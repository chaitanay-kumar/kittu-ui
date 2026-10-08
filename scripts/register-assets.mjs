import { registerHooks } from "node:module";

// Vite emits imported styles into the client bundle. Static HTML rendering only
// needs the JS tree, so ignore CSS modules in this Node-only rendering process.
registerHooks({
  load(url, context, nextLoad) {
    if (url.endsWith(".css"))
      return { format: "module", source: "export {};", shortCircuit: true };
    return nextLoad(url, context);
  },
});
