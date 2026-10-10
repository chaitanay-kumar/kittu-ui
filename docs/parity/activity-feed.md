# Activity Feed parity review

Status: validated baseline. React source: `src/components/ui/ActivityFeed.tsx`. Angular authored template: `scripts/angular-activity-feed.ts`; native behavior: `packages/angular/src/activity-feed-controller.ts`; motion: `packages/angular/src/activity-feed-motion.ts`.

[Full tracker](../ANGULAR_REACT_PARITY.md) · [React implementation](../../src/components/ui/ActivityFeed.tsx) · [Angular authored template](../../scripts/angular-activity-feed.ts)

## Replaced implementation

The previous Angular component was a generic collection timeline using `KittuItem[]`, an Inspect event button and native details elements. It lacked the React telemetry contract, category counts, trace copying, replay controls, JSON inspector and live simulation.

## Current contract

Angular exports `ActivityEvent`, `ActivityActor`, `ActivityEventType` and `ActivityEventStatus`. Inputs follow React: `events`, `enableLiveSimulation` (true), `enableFilters` (true), `enableSearch` (true), `maxEntries` (20), `onEventReplay` and `className`. Replay invokes the callback with the original event; `eventReplay` additionally supports Angular subscribers. Replace old `items` records with `events`, mapping `label` to `title` and supplying the event type, status and timestamp.

The implementation follows React's case-insensitive title, description, trace and actor-name search, category counts, independently expanded payloads, 3.5 second simulation interval and retention limit. It responds to replacement events and disposes timers and animations. Clipboard copying includes the secure API and React's textarea fallback, with failure feedback and focus restoration.

## Visual and interaction checks

Both demos use the same three React events. Control geometry, typography, icons, fixed dark palette and event text are compared at matching widths in light/dark themes. The documentation preview padding also produces the same component width when switching frameworks. Initial and expanded screenshots were inspected on desktop/mobile.

Native Web Animations sample React's snappy spring constants for insertion, removal and layout movement. JSON disclosure uses CSS. Frame-by-frame spring equivalence has not been established; this remains a motion review item if exact animation trajectories are required. Reduced motion suppresses native motion.

## Validation

- `npm run test:activity-feed`: packaged inputs, flags, replacement events, callback/output replay, entry limits and timer disposal pass.
- `e2e/activity-feed-parity.spec.ts`: 14 desktop/mobile checks pass for both frameworks, themes, filters/search, keyboard payload controls, clipboard success/failure/fallback and stream start/stop.
- Angular catalog and sidebar suites: 24 checks pass, including all 108 generated ports mounting and disposing in both themes.
- Existing unit suite: 117 tests pass. Production build and all 289 SEO checks pass.
- Angular 20.0, 20.3, 21 and 22 consumers compile the package and event-specific bindings.
- Lint retains 21 inherited warnings.

CI runs the packaged contract check after the production build. Lucide SVG notices are preserved in source and the Angular tarball.
