# Loader parity review

React reference: [Loader](../../src/components/ui/Loader.tsx) and LoaderShowcase in [ComponentDetailPage](../../src/components/docs/ComponentDetailPage.tsx).

## Contract and migration

Explicitly undefined optional bindings retain React’s defaults. An explicitly undefined `aria-label` removes the host attribute; omitting that override uses `label`. This precedence and strict optional-input compilation were verified during integration review.

Keep `KittuLoaderComponent` and `kittu-loader`. Inputs now follow React: `size` (32), `variant` (arc/dots/line/rings; default arc), `label` (Loading...), `reduceMotion` (false), `color` (currentColor), and `className` (empty). The old generic `loading`/`paused` API and visible Ready state are removed. Mount or unmount the indicator for loading state; use `reduceMotion` for the reference’s calmer opacity animations.

The native host is the status element, so ordinary HTML attributes, styles and bubbling DOM events apply directly. `aria-label` can override the accessible name while `label` remains the screen-reader text, matching React’s spread-prop precedence. The host exposes role=status and aria-busy=true. Empty label omits the hidden text.

All four variants reproduce reference dimensions, minimum dot/line/center sizes, colors, SVG circle geometry and rounded styling. Arc rotation lasts 2.5 seconds. Dots use a 1.4-second scale/opacity cycle staggered by 220 ms; the line uses a 1.8-second slide; rings use a 2.2-second expansion staggered by 900 ms. Native Web Animations use the corresponding easing curves and keyframe segments. Reduced mode stops arc rotation and keeps the reference’s gentle opacity pulses in the other variants. Changing size/color preserves the running cycle; switching variant/reduced mode recreates the relevant animation. Destruction cancels native animations.

React’s implementation uses its explicit `reduceMotion` prop for this behavior; it does not read the OS preference itself. Angular follows that behavior. Applications can bind their media-query preference to the input. No runtime dependency was added.

## Validation

Browser consuming-app comparisons cover all four variants, small/large dimensions, custom color, normal/reduced modes, SVG details, accessible attributes and animation cleanup. The actual website showcase has the same variant and size controls. Additional comparisons cover card/control geometry and typography in both themes on desktop/mobile emulation.

The packaged contract verifies defaults, minimum dimensions, color/size updates, reduced arc, classes, empty labels and aria-label override. Strict Angular 20.0, 20.3, 21 and 22 consumers compile the typed bindings. See the final recorded results below.

Verification uses Chromium desktop/mobile emulation. Exact frame-by-frame timing, physical devices, other browser engines and SSR remain unverified; this is a validated baseline for recorded coverage.

## Screenshots

| View | React | Angular |
| --- | --- | --- |
| Desktop | [Screenshot](screenshots/loader-react-desktop.png) | [Screenshot](screenshots/loader-angular-desktop.png) |
| Mobile | [Screenshot](screenshots/loader-react-mobile.png) | [Screenshot](screenshots/loader-angular-mobile.png) |

## Recorded results (2026-10-09)

- 16 focused browser checks passed: 8 variant comparisons, 4 showcase interactions/screenshots and 4 light/dark geometry comparisons on desktop/mobile. Geometry allows less than 0.1 CSS pixel of font rasterization rounding; visible colors, borders, typography and spacing match exactly.
- 22 catalog browser checks and 2 framework/sidebar navigation checks passed.
- Packaged Loader contract passed; strict consuming applications compiled with Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1.
- All 117 unit tests passed. Production build and 289 SEO checks passed.
- Lint passed with 21 existing warnings; no new warnings.
- Desktop/mobile screenshot pairs were visually inspected.
