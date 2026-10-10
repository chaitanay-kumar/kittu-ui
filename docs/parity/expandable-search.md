# Expandable Search: Angular / React parity

Reference: `src/components/ui/ExpandableSearch.tsx`. The React implementation is unchanged. Angular now uses an authored native port instead of the generic searchable collection.

## API and demo

| React prop | Angular input | Behavior |
| --- | --- | --- |
| `placeholder?: string` | `[placeholder]` | Defaults to `Search components, props...`, including explicit `undefined`. Collapsed input displays `Quick search...`. |
| `onSearch?: (query: string) => void` | `[onSearch]` | Receives every input value, preserving whitespace; clearing calls it with `''`. |
| `className?: string` | `[className]` | Applied to the outer wrapper, with utility overrides preserved. |

`ExpandableSearchHandler` is exported for typed callbacks. Import `KitExpandableSearchComponent` and `kit-ui-angular/styles.css`, then use:

```html
<kit-expandable-search
  placeholder="Search components, tokens..."
  [onSearch]="search"
  className="my-search"
/>
```

The old generic collection inputs and selection events are removed from this component. The website preview uses the React demo's placeholder, spacing and explanatory footer.

## Source behavior retained

- Inner clicks expand and schedule input focus after 100 ms. Focus expands immediately; empty blur collapses; nonempty blur retains expansion.
- Clear stops click propagation, empties the query and collapses. Input and clear updates commit synchronously, matching React's discrete updates before subsequent native browser actions.
- The clear button retains the source's omitted `type`. Although its native type is submit, clear removes it before the browser's default activation can submit the form. Enter on an empty input submits normally; Enter with a clear button activates clear and does not submit.
- Existing delayed focus callbacks can reopen the control after clear. They are canceled on Angular teardown, with no post-destruction focus or animation work.
- Search, clear and command SVG geometry, 160/280 px widths, colors, padding, responsive typography and shortcut visibility match the source. The shortcut is replaced immediately when typing, then fades back in using the source's 300 ms default easing.
- Motion follows the 380/30/0.5 spring, retaining width velocity on interruption. Background uses sampled native animation keyframes; border retains the source's CSS color transition. Source animation behavior is preserved for the tested reduced-motion browser preference.

The source clear button has no accessible name. This port retains that behavior; this parity check does not establish accessibility compliance.

## Verification

The browser fixture runs actual React and the built Angular package with shared Angular styles loaded in both consumers, detecting global style collisions. Chromium desktop and Pixel 7 mobile projects cover light/dark settled states, callbacks, whitespace, overrides, empty/nonempty blur, click propagation, forms, delayed-focus races, teardown, shortcut replacement/fade and the actual website demos. Demo screenshots are emitted as Playwright artifacts.

Settled geometry and computed styles are compared exactly. Interrupted motion is compared at equal spring phase and equal time after reversal, with bounded tolerances of 10 px width, 3 background channel units and 10 border channel units. Shortcut intermediate opacity tolerance is 0.12. These are frame-sampled browser checks, not a claim of identical raster pixels at every animation frame.

Validation commands:

- `npm run angular:build`
- `npm run test:expandable-search` (built-package runtime contract)
- `node scripts/verify-angular-package.mjs` (installed tarball, strict consumers using Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1; existing scenarios retained)
- `npx playwright test e2e/expandable-search-parity.spec.ts --workers 1` (24 desktop/mobile cases)
- `npx tsc -b`, `npm run lint`, `npm test -- --run` (117 tests in 14 files)

The local browser run used an isolated configuration on port 5207. Existing lint warnings and Angular demo font/chunk warnings remain unrelated to this component.
