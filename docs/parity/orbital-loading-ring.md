# Orbital Loading Ring parity review

React reference: [OrbitalLoadingRing](../../src/components/ui/OrbitalLoadingRing.tsx), its public props and the detail showcase in [ComponentDetailPage](../../src/components/docs/ComponentDetailPage.tsx).

## Contract and migration

`KitOrbitalLoadingRingComponent` follows React's size (72), speed (1), variant (default/dense/minimal; default default), label (Loading) and className defaults. Explicit undefined values preserve those defaults. The component host is the status element, so native HTML attributes, styles and events apply directly without an extra wrapper. Template style bindings can override width as the reference's style prop does.

The accessible name follows label unless aria-label is supplied. An explicit undefined aria-label removes that attribute, matching React's spread-prop precedence; the hidden label text still follows label. Empty labels keep an empty hidden span. The reference does not add aria-busy; Angular follows it. Projected children are ignored, as in React's explicit internal children.

The former generic loading/paused/Ready API and visible generic footer are removed. Applications mount/unmount the indicator for loading state. The default has three satellites, dense adds a fourth, and minimal removes the small outer satellite. Both SVG circles, radii/dashes/strokes, fixed satellite dimensions, shadows, positioning and core match the reference. The SVG scales with size; satellite/core dimensions remain fixed.

Outer rotation lasts 2.4/speed seconds (linear), inner counter-rotation 1.6/speed (cubic-bezier 0.4/0/0.2/1), and core pulse 1.2/speed (ease-in-out). Keyframes match the reference's rotations and opacity/scale pulse. OS reduced motion stops all three animations and leaves the static underlying presentation. Browser disposal cancels CSS animations. Scoped component-layer styles allow utility class overrides.

The website uses the same 96px dense ring, Syncing registry label and caption, including the same centered content width and spacing. No runtime dependency was added.

## Validation coverage

Consuming apps compare all three variants, sizes 24/48/72/96, speeds 0.5/1/2, defaults/undefined inputs, empty/custom/overridden labels, aria-label removal, custom classes and width styles in both themes/motion preferences on desktop/mobile emulation. They compare rendered geometry, colors/fonts, SVG details, positions, reduced-motion state and CSS animation durations/easing/keyframes. Website comparisons cover the actual ring, caption and parent layout in both themes. Package checks exercise defaults, reactive updates and accessible attribute precedence; strict Angular 20.0/20.3/21/22 consumers compile explicit and optional bindings.

CSS animations are paused at time zero for deterministic visual/style comparisons; their timing/keyframes are checked separately. Transparent zero-size shadow layers are normalized. Screenshots disable animations in both frameworks. Exact frame-by-frame phase, physical devices, other browser engines and SSR remain unverified. This is a validated baseline for recorded coverage.

## Screenshots

| View | React | Angular |
| --- | --- | --- |
| Desktop | [Screenshot](screenshots/orbital-loading-ring-react-desktop.png) | [Screenshot](screenshots/orbital-loading-ring-angular-desktop.png) |
| Mobile | [Screenshot](screenshots/orbital-loading-ring-react-mobile.png) | [Screenshot](screenshots/orbital-loading-ring-angular-mobile.png) |

## Recorded results (2026-10-10)

- 22 focused Chromium desktop/mobile checks passed: consuming-app variants/size/speed/labels/styles in both themes/motion preferences, CSS timing/keyframes, disposal, website geometry and caption/layout, and screenshots.
- All 24 catalog/framework-navigation checks passed, including rendering and disposal of the complete catalog in both themes.
- Packaged contract passed, including defaults/undefined bindings and aria-label override/removal.
- Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1 strict consumers compiled all 116 selectors and explicit/optional ring bindings.
- All 117 unit tests passed; production build and 289 SEO checks passed.
- Lint passed with 21 existing warnings and no new warnings.
- Desktop/mobile screenshot pairs were visually inspected.
