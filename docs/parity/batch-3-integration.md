# Batch 3 integration review

Base: `8ced430` on `feat/kit-ui-library`, after the first 15 validated component baselines merged. This batch contains Expandable Search, Hamburger Menu, Smooth Accordion, Stretch Switch and Reveal Card. React remains the source of truth. This report is in progress; no batch-3 components are counted as merged baselines yet.

## Independent component review

### Hamburger Menu — PR #20, `241c7b4`

The React component is a controlled icon button, while the previous generic Angular implementation was a menu with its own state and items. The new implementation preserves required `isOpen`, request-only state changes, accessible open/close labels, size-derived line geometry and the source's final native props-spread precedence. Reviewed both native and custom selectors, disabled behavior, nullable/undefined click overrides, ARIA removals and type defaults. No blocking findings from source review.

Independent checks on this integration branch: native library/demo build and packaged contract pass; **10 actual React / Angular browser cases pass** on desktop and mobile. These cover controlled requests, keyboard/form behavior, click and ARIA overrides, delayed frames, active destruction, hover/focus and both website themes. The component's own broader **26-case suite** and strict compiler matrix are recorded in [its report](hamburger-menu.md). Final union regeneration and batch regression checks remain pending.

### Expandable Search — PR #21, `55b5d1c`

Reviewed the source’s uncontrolled query, truthy whitespace behavior, delayed focus, empty-only blur collapse, optional callback and source clear-button form behavior. The clear button intentionally omits its type, but its synchronous removal prevents submission; the Angular view now commits this update before the native default action. Both unkeyed presence branches use the same child key, so the shortcut is removed immediately rather than retained for exit. String-color springs report zero velocity in the installed Motion version, while numeric width retains its interrupted velocity.

Independent checks on the integration branch: native build and packaged contract pass, and **24 actual React / Angular browser cases pass** on desktop/mobile. The PR subsequently strengthened immediate shortcut removal and phase-aligned fade checks; those focused cases are being independently rerun. Shared-file merge conflicts were resolved by retaining both native component registrations, demo cases, contract scripts and CSS exclusions, then regenerating catalog outputs.

## Remaining batch work

Smooth Accordion, Stretch Switch and Reveal Card are still finishing implementation or review. After all five dedicated PR heads are integrated, regenerate the catalog and demo sources, validate the combined package and consuming apps, run the relevant browser regressions, and update the central tracker only from recorded evidence. Merge the batch before starting the next five.
