# Morphing Icon parity review

React reference: [MorphingIcon](../../src/components/ui/MorphingIcon.tsx) and MorphingIconShowcase in [ComponentDetailPage](../../src/components/docs/ComponentDetailPage.tsx).

## Contract and migration

The Angular component is a controlled two-template wrapper, not the former self-toggling menu button. Required from/to TemplateRefs replace React nodes. Active defaults to false, duration to 0.3 seconds and size to 20 pixels; undefined optional inputs restore defaults. There is no activeChange, disabled/label or built-in click action. Applications own interaction and wrapping controls.

The host follows React's inline-flex, shrinking, alignment and dimensions, with two absolutely positioned centered layers. Templates stay mounted during active changes. The inactive layer uses aria-hidden; no inert or focus-removal behavior is added beyond the reference. Native attributes/events/ref access remain available.

Style is spread after default dimensions in React. The native style input preserves complete override semantics: absent uses size, supplied objects replace size-based dimensions, and explicit undefined removes them. Numeric dimensional values receive pixels; browser style parsing distinguishes valid unitless values and custom properties. Native strings provide an Angular convenience. Individual Angular style-property bindings retain Angular's usual merge behavior.

Inactive/active opacity is 1/0, scale 1/0.65, and source/target rotations are -90/+90 degrees. Initial states render without an entry animation. Subsequent morphs use the declared duration and cubic-bezier(0.4,0,0.2,1), starting from current painted styles when interrupted. Duration zero settles directly. Destruction cancels owned browser animations. OS reduced motion does not change this reference's transitions.

The website has the same primary save action, five independent toggles, titles, status caption and SVG paths. Lucide ISC attribution is packaged. The demo installs the same compiled website CSS only while mounted and removes it on disposal; this does not introduce a React runtime into the native library.

## Validation coverage and limits

Chromium consuming-app comparisons cover both states, defaults/undefined optional inputs, sizes 16/20/32, duration zero/custom values, utility classes, styles with numeric dimensions/unitless values, whole-style replacement/removal, accessibility attributes and custom SVG content in both themes/motion preferences on desktop/mobile. Initial active/inactive rendering, native animation duration/easing, interruption endpoints and disposal are checked. Website comparisons measure the root's rendered offset within its parent content area instead of its automatic-margin serialization (Chromium reports zero used margins during morphs despite retaining its centered rectangle). They exercise all six actions twice and compare geometry, typography/colors, SVG paths, titles and accessibility layers.

Settled transforms/styles are compared; exact intermediate frames, reversal velocities and frame scheduling relative to Framer Motion are unverified. Physical devices, other browser engines and SSR remain unverified. The status is a validated baseline for recorded coverage, not universal parity.

## Recorded results (2026-10-10)

- 22 focused checks validated: 14 consuming-app/initial-state/native-motion checks passed, then all eight website-action/screenshot checks passed after the inherited-color correction. Four final screenshot checks passed again with the corrected square iframe edges. The consuming matrix exercises eight configurations in both frameworks across both themes/motion preferences on desktop/mobile.
- All 24 catalog/framework-navigation checks passed, including loading and disposing all ports across the demo's stylesheet installation/removal.
- Packaged contract passed. Strict Angular 20.0.0/20.3.33/21.2.25/22.2.1 consumers compiled all 116 selectors, required template bindings and undefined optional inputs.
- All 117 unit tests passed. Final production build and 289 SEO checks passed.
- Lint passed with 21 existing warnings and no new warnings.
- Desktop/mobile screenshot pairs were visually inspected, including the corrected iframe edges.

| View | React | Angular |
| --- | --- | --- |
| Desktop | [Screenshot](screenshots/morphing-icon-react-desktop.png) | [Screenshot](screenshots/morphing-icon-angular-desktop.png) |
| Mobile | [Screenshot](screenshots/morphing-icon-react-mobile.png) | [Screenshot](screenshots/morphing-icon-angular-mobile.png) |
