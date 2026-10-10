# Rainbow Button parity review

Status: validated baseline for the coverage below. React source: `src/components/ui/RainbowButton.tsx`. Angular authored definition: `scripts/angular-rainbow-button.ts`; native styles and style serialization are in `packages/angular/src/rainbow-button*`.

The generic asynchronous action API and unrelated conic-gradient border are replaced with the source's rainbow gradient, five color stops, pan animation and ambient glow. Two variants (`default`, `outline`), four sizes (`default`, `sm`, `lg`, `icon`), defaults, speed, glow, disabled state, projected nested content, native form behavior, SVG sizing, focus ring, active scale and color/geometry/shadows match the recorded React cases. Optional undefined values use source defaults. CSS style objects override generated color/speed variables, with dimensional and unitless numeric properties handled separately.

Use `<button kitRainbowButton>` for native DOM attributes, events, refs and forms, or `<kit-rainbow-button>` for a wrapper projecting content into an inner button. The reference does not set a default button type: omission means native `submit`, which Angular preserves. Consumer utility classes can override component styling.

React `asChild` maps to the native Angular attribute selector: put `kitRainbowButton` directly on the chosen child element, for example `<a kitRainbowButton href="/docs">Documentation</a>`. The element keeps its own Angular bindings, attributes and events. Angular does not expose a boolean `asChild` input or clone projected children; parent/child prop-merging precedence is expressed through bindings on this single native host. This explicit framework mapping avoids a partial emulation of React's Slot semantics.

The source pan/glow animation is disabled under reduced motion; the color and glow transitions retain their source durations. Source touch-hover behavior is retained for the glow pseudo-element. Shared package styles exclude both Rainbow hosts from generic focus/min-width/reduced-motion overrides. Dynamic style updates clear previous managed styles; component-owned reactive effects are disposed with the component.

The website now uses the same variant/size controls, ambient glow checkbox, speed range, two action labels and click counter as React. Theme tokens, typography, letter spacing, corner radii and outline color match the actual computed source values. Demo SVGs derive from Lucide; its notices remain in the package.

## Evidence

- 20 desktop/mobile Chromium checks pass: actual React and built Angular package comparisons across light/dark, reduced/no-preference motion, all variant/size pairs, colors/speed/glow, styles and disabled state; native clicks, default submit and reset, Enter/Space, arbitrary element composition, custom wrapper updates and disposal; real hover/focus/press behavior; default and changed website demo state and controls.
- Eight final style-comparison checks pass after adding numeric dimensional/unitless overrides (`width`, opacity, aspect ratio, animation iteration count).
- Packaged runtime contract verifies defaults, optional undefined inputs, variants, sizes, glow, native types and disabled state.
- All 116 selectors and a dedicated Rainbow consumer with optional inputs, style object, native button/link and custom projection compile from an installed tarball under Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1.
- 117 unit tests, production build and 289 SEO checks pass. Lint retains inherited warnings.
- Paired changed-state screenshots: [React desktop](screenshots/rainbow-button-react-desktop-light.png), [Angular desktop](screenshots/rainbow-button-angular-desktop-light.png), [React mobile](screenshots/rainbow-button-react-mobile-light.png), [Angular mobile](screenshots/rainbow-button-angular-mobile-light.png); dark variants are stored alongside them.

Pan animations are paused for deterministic style comparisons; names, duration, timing, colors and reduced-motion behavior are checked separately. Physical devices, other browser engines, exhaustive assistive-technology testing and every possible consumer CSS override are outside this recorded coverage.
