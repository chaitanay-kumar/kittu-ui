# Reveal Card parity

Reference: [React RevealCard](../../src/components/ui/RevealCard.tsx), the installed Framer Motion spring/easing implementations, and the Interactive 3D Tilt website showcase.

## Contract

Angular projects primary children and accepts `revealContent` as `TemplateRef<unknown>`, text, a number, a boolean, null or undefined. Templates preserve interactive markup without HTML-string injection. `maxTilt` defaults to 12 and `className` to an empty string, including undefined bindings. `className` applies to the inner card, matching React; native attributes and events apply to the Angular host. The former generic collection, selection, loading and disclosure API is removed.

Truthy reveal content stays mounted and occupies layout while opacity is zero, including keyboard-focusable projected controls. True renders an empty reveal container; false, null, undefined and an empty string omit it. Zero renders the source's bare zero text outside that container. These deliberately preserve the source's conditional rendering and accessibility behavior.

Pointer coordinates use the card's current transformed bounding rectangle. Tilt is unclamped, including negative and zero maxTilt and outside coordinates. Updating maxTilt waits for the next mouse move. Leaving returns rotation to zero without resetting the last glare location; entering before movement reuses it. Numeric zero glare coordinates are retained because React passes truthy MotionValue objects to useMotionTemplate.

Rotation uses the analytic spring with stiffness 260, damping 20, mass 1, rest delta .001 and rest speed .01. Retargets preserve velocity and use elapsed wall time, including delayed frames. Reveal opacity/translation follows the explicit 200ms easeOut cubic-bezier(0,0,.58,1), preserving the visible value when interrupted. Destruction cancels animation frames and Web Animations. Both implementations retain motion under reduced-motion preferences; no touch or keyboard hover behavior is added.

Shared Angular CSS excludes this authored port from generic component sizing/focus/motion rules. Card geometry, colors, clipping, typography, gradient, layers, and 200ms border transition match the source. The website projects the same heading, description and telemetry details; component-specific preview padding matches mobile sizing. At 1920px and 1280px viewports, source and Angular cards measure 346.8125 × 159px with matching horizontal placement; the intrinsic flex shrinkwrap is retained. Website page headers differ between frameworks, so whole-page vertical positions are not a component equivalence claim.

## Validation

Actual React source and built Angular package are loaded side by side with the distributed shared Angular stylesheet. Browser coverage includes desktop/mobile Chromium, both themes and both motion preferences; defaults and utility overrides; truthy/scalar/template updates; projected keyboard controls; transformed rectangle and unclamped tilt calculations; intermediate and interrupted opacity/rotation; delayed frames; maxTilt updates; exact zero glare at the actual transformed top-left; and active-animation destruction. Website tests compare computed geometry and hover styles, including a wide viewport placement check.

Packaged TestBed checks validate defaults, undefined bindings, class placement, scalar truthiness, glare updates and projected controls. Strict consuming applications compile optional inputs, scalar/template content and interactive projection with Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1. Library/demo build, TypeScript and lint pass; all 117 existing unit tests pass.

Exact frame-by-frame animation equality across browser engines, physical touch devices and SSR are unverified. Intermediate spring/opacity comparisons use bounded tolerances for differing scheduling. Chromium mobile emulation is not a physical-device test.

## Recorded checks (2026-10-11)

- 32 browser cases validated: 28 passed in the complete run; the two mobile website cases were rerun after replacing a fixed settled-opacity delay with completion polling, together with the two desktop website cases and two added wide-layout cases. Intermediate timing checks remain separate and passed.
- Packaged contract, library/demo build, four-version strict consumer matrix, TypeScript and lint passed. Lint retains existing repository warnings.
- All 117 unit tests passed. Generated Angular catalogs/components, shared-style exclusions and llms description are updated.

Reproduce browser checks with `npx playwright test --config playwright.reveal.config.ts`; package checks use `npm run test:reveal-card` and `npm run test:angular-package` after `npm run angular:build`.
