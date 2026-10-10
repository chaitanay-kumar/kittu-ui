# Morphing Button React / Angular parity

React `src/components/ui/MorphingButton.tsx` is the reference. Angular previously used the generic asynchronous action controller: its label, action callback, busy feedback and extra cancel button did not represent React's controlled status button.

## Implemented contract

- `status`: `idle | loading | success | error`, application controlled; default `idle`.
- `variant`: `primary | secondary | danger | ghost`, default `primary`.
- `idleText`, `loadingText`, `successText`, `errorText` retain React defaults, including explicit undefined handling.
- `idleIcon`, `successIcon`, `errorIcon`: Angular template references replace React nodes; undefined selects the same Lucide glyph and null removes the icon.
- `disabled`, `className`, and native `type`, attrs, form submission/reset, click and keyboard events. Use `button[kitMorphingButton]` to put arbitrary native attributes/events directly on the button, or `kit-morphing-button` for the custom element wrapper. Omitted type is native HTML `submit`, matching React.
- Loading immediately disables activation without applying the opacity applied by explicit `disabled`.
- Matched responsive typography, minimum geometry, all four tones and status colors, focus ring, hover, 200ms color transition, default icon geometry and loading spinner. The actual design token produces a 14px corner radius despite React's `rounded-lg` class.
- Presence mode waits for outgoing content before entering the new controlled state, using the 380/30/0.5 spring. Pointer and Enter press use the existing native button spring and cancel on destruction.
- The documentation demo renders the same four statuses, labels, danger failure tone and explanatory caption as React. Generic shared Angular styles are excluded from this component.

## Verification

The packaged runtime contract covers both selectors, defaults/undefined, four variants, four statuses, null/template icons, attributes, disabled/loading, native form types, and event delivery. A retained typed consumer compiles the published tarball under Angular 20.0, 20.3, 21 and 22 with strict templates.

Browser comparisons import the actual React source and built native Angular package with its shared stylesheet. The matrix covers all sixteen status/tone combinations in light/dark, desktop/mobile and both motion preferences, plus controlled transitions, interrupted states, native forms, keyboard activation, custom/removed icons, press/release, cleanup and documentation renders. Screenshot artifacts are retained for the four-status documentation checks.

## Platform mapping and limits

TemplateRef is Angular's equivalent to ReactNode for custom icons; native DOM events replace React synthetic events. The custom element's native attrs belong on its internal button only through the attribute selector; this follows the already reviewed Button convention. React remains unchanged. Browser animation sampling and framework scheduling can differ between renderers; both implementations use the same physical spring and outgoing-before-incoming sequence. The source does not suppress its status/press/spinner animations under reduced motion; the port follows that existing behavior.

## Recorded results

- Initial full browser matrix: **20 passed** in 3.0 minutes.
- After spring settling thresholds were aligned with Framer, the final status/tone matrix, controlled/form/keyboard/cleanup, interrupted-state and newly added focus/hover checks: **14 passed** in 1.6 minutes.
- Packaged runtime contract: passed. Strict installed consumers: Angular **20.0.0, 20.3.33, 21.2.25, 22.2.1**, all passed.
- Full production/native build, **289 SEO checks**, **117 unit tests**, TypeScript and lint: passed; lint retains the existing catalog warnings.
