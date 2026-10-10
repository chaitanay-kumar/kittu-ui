# Neon Edge Button parity review

React reference: [NeonEdgeButton](../../src/components/ui/NeonEdgeButton.tsx), its public props and the detail showcase in [ComponentDetailPage](../../src/components/docs/ComponentDetailPage.tsx).

## Contract and migration

Explicit undefined bindings retain React defaults, including glow=true. The native `KittuNeonEdgeButtonComponent` follows React's speed (1), glow (true), className (empty), default button type and projected content (Deploy preview when absent). It also supports disabled and type inputs for native HTML behavior. `<button kittuNeonEdgeButton>` puts ordinary HTML attributes, events, form semantics and ElementRef access on the button itself. The existing `<kittu-neon-edge-button>` selector remains available with an internal native button.

The former generic label/action/loading/status/cancellation API and generic footer are removed. Applications own requests. Arbitrary content is projected, and reactive speed/glow changes update the effect. Source-specific native class names isolate the styles; the reference's group/focus-ring classes are retained for consumer descendant styling. Component-layer styles permit utility class overrides.

The effect matches the reference's minimum 44px button height, 42px interior, 10/9px radii, padding, gap, colors, Zap SVG, optional static glow and conic-gradient beam. Beam duration is 3/speed seconds, rotating linearly. Reduced motion stops rotation and keeps the beam at opacity 0.4. Hover changes the interior color and icon scale only on hover-capable devices; an ancestor group also triggers those styles, matching React's selector behavior. Active feedback scales to 0.98. Disabled buttons retain the reference's presentation while native activation is blocked. Removing the component lets the browser cancel its CSS animations.

The copied Lucide Zap path retains the bundled ISC license. No runtime dependency was added.

## Validation coverage

Consuming applications compare default and custom projected markup, speeds 0.5/1/2, glow on/off, disabled state, native attributes, utility overrides and all rendered element styles/geometry in both themes and motion preferences on desktop/mobile emulation. Functional checks cover keyboard activation, submit/reset, hover including ancestor groups, active scale and destruction. Website checks compare the actual showcase geometry/styles in both themes; screenshot pairs capture the same component with navigation hidden.

Measurements normalize animation names and transparent zero-size shadow layers, and ignore outline color when outline style is none. Visible geometry, colors, fonts, padding, SVG path and animation durations/easing must otherwise match. Static comparisons disable transitions in both consuming-app fixtures. Browser engines still determine animation phase and rasterization.

The packaged custom-selector contract checks defaults, fallback/projected content, speeds, glow, disabled/type updates, classes and icon accessibility. Strict consuming applications compile native bindings with Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1.

Exact frame-by-frame phase and hover/press transition timing, physical devices, other browser engines and SSR remain unverified. This is a validated baseline for recorded coverage.

## Screenshots

| View | React | Angular |
| --- | --- | --- |
| Desktop | [Screenshot](screenshots/neon-edge-button-react-desktop.png) | [Screenshot](screenshots/neon-edge-button-angular-desktop.png) |
| Mobile | [Screenshot](screenshots/neon-edge-button-react-mobile.png) | [Screenshot](screenshots/neon-edge-button-angular-mobile.png) |

## Recorded results (2026-10-10)

- 20 focused Chromium desktop/mobile checks passed, covering both themes/motion preferences, speed/glow, defaults including undefined bindings, custom content/classes, HTML attributes, keyboard/forms, hover including ancestor groups, active feedback, cleanup, screenshots and website geometry.
- All 24 catalog/framework-navigation checks passed, including rendering and disposal of the complete catalog in both themes.
- Packaged custom-selector contract and projected markup checks passed.
- Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1 strict consumers compiled all 116 selectors, explicit native bindings and optional undefined values.
- All 117 unit tests passed; production build and 289 SEO checks passed.
- Lint passed with 21 existing warnings and no new warnings.
- Desktop/mobile screenshot pairs were visually inspected.
