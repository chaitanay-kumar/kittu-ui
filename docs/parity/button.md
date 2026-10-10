# Button parity review

React reference: [Button](../../src/components/ui/Button.tsx), its public ButtonProps and the Button detail showcase in [ComponentDetailPage](../../src/components/docs/ComponentDetailPage.tsx).

## Contract and migration

`KitButtonComponent` now supports the nine React variants and four sizes, with primary/md defaults. Explicit undefined bindings retain React defaults. Inputs follow React: variant, size, isLoading (false), loadingText (undefined), fullWidth (false), disabled (false), type (button), className (empty), and leftIcon/rightIcon as Angular TemplateRefs. Arbitrary child content is projected. Icons can also be projected using kitButtonLeftIcon/kitButtonRightIcon attributes.

Use `<button kitButton (click)="save()">Save</button>` for native form semantics, attributes, events and ElementRef access. The existing `<kit-button>` selector remains available and renders an internal native button. Put native HTML attributes on the actual button via the attribute selector. Native Angular bindings on that button provide equivalents for React's ordinary HTML props; Framer Motion configuration props are not exposed.

The former generic action/loading/status/cancellation API is removed. Applications own requests and supply isLoading/disabled state. Loading disables the button, exposes aria-busy, hides both icons, and shows the reference's Loader2 spinner. Truthy loadingText replaces children; empty text keeps children. Spinner size is 12px for sm, otherwise 16px. Link intentionally bypasses size styles.

Variants use the actual reference theme tokens and colors, including the reference’s dark-mode text precedence during destructive/success hover. Hover styling only applies to devices supporting hover. Disabled/loading states use opacity 0.3 and pointer-events:none. Native form submit/reset, keyboard activation, focus outline and fullWidth behavior are preserved.

Press feedback uses the source spring's stiffness 380, damping 30 and mass 0.5, targeting scale 0.97. Pointer release/cancellation and Enter release return to scale 1. Space still activates a native button but does not receive tap feedback, matching observed React behavior. Changing to a blocked state cancels feedback; destruction cancels animations and removes listeners. Spinner rotation remains active during loading, following the reference's behavior even in OS reduced-motion mode.

The gradient overlay requires an ancestor with class group for hover translation, as in the React source. The component does not silently add that class. The copied Lucide Loader2 path retains its bundled license.

## Verification coverage

Consuming-app comparisons cover all nine variants/four sizes in both themes, loading/disabled/fullWidth/empty content, custom template icons, child markup, utility class overrides, hover/focus and native forms. Static measurements disable color transitions in both fixtures, omit transparent zero-size shadow layers, and ignore border colors when border width is zero. Dimension comparison allows less than 0.2 CSS pixels for browser font rounding. Website comparisons measure both showcase cards and all eleven buttons in both themes and desktop/mobile emulation.

The package contract also exercises the existing custom selector, reactive input updates and projected icon/content preservation across loading transitions. Four strict consuming applications compile with Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1.

Exact frame-by-frame spring/transition trajectories, physical devices, other browser engines and SSR remain unverified. Framer Motion-specific animation overrides and React refs require application-level Angular equivalents. This is a validated baseline only for recorded coverage, not a claim of universal parity.

## Screenshots

| View | React | Angular |
| --- | --- | --- |
| Desktop | [Screenshot](screenshots/button-react-desktop.png) | [Screenshot](screenshots/button-angular-desktop.png) |
| Mobile | [Screenshot](screenshots/button-react-mobile.png) | [Screenshot](screenshots/button-angular-mobile.png) |

## Recorded results (2026-10-10)

- 22 focused Chromium browser checks passed on desktop/mobile emulation: nine variants/four sizes in both themes, loading/disabled/empty/fullWidth/custom classes, native keyboard/forms/press cleanup, showcase screenshots, hover/focus and both showcase-card layouts.
- Packaged custom-selector contract passed, including projected icon and child preservation across loading transitions.
- Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1 consuming applications compiled all 116 selectors and explicit native Button bindings.
- All 117 unit tests passed.
- Desktop/mobile screenshot pairs were visually inspected; the floating website navigation is hidden for evidence captures in both frameworks.
- All 24 catalog/framework-navigation browser checks passed, including rendering and disposal of the complete Angular catalog in both themes.
- Production build and 289 SEO checks passed. Lint passed with 21 existing warnings and no new warnings.
- Optional-input follow-up: direct undefined bindings retain variant/size/type/className defaults; packaged checks, all 22 focused browser checks and all four strict Angular consumer builds passed after the change.
