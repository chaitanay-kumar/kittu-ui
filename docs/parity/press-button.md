# Press Button: Angular / React parity

React reference: `src/components/ui/PressButton.tsx`. Native implementation: `scripts/angular-press-button.ts`, with scoped component CSS and spring-motion helper in `packages/angular/src/press-button-*`.

## Changes

Replaced the generic async-action placeholder and its status paragraph with the source button API: `variant`, `size`, `pressStrength`, `fullWidth`, `disabled`, `type`, projected content and `className`. Optional undefined inputs use React defaults. Exported `PressButtonVariant` and `PressButtonSize`.

Use `<button kitPressButton>` for native HTML attributes, Angular event bindings, focus references and form ownership. `<kit-press-button>` provides a convenience wrapper with a real inner button. Both project arbitrary nested content.

Four variants and four sizes match the reference. The source intentionally skips size classes for `ghost`, including `icon`; Angular follows that behavior. Primary has no extra shadow. Small horizontal padding is 14px. Rounded corners follow the source `--radius` token. Consumer utility classes override component styling.

Press feedback matches the reference's 380 stiffness / 30 damping / 0.5 mass spring. The strength clamps to 0.01–0.06; layered compression multiplies scaleX by `(1-compression)` and scaleY by `(1-compression*1.6)`, alongside the source's 0.97 tap scale. Release, keyboard release and cancellation restore the resting size. Disable changes and component destruction cancel active animations and remove event listeners.

The React source retains tap compression under reduced motion; Angular follows it. Shared package styles exclude this component from generic focus and reduced-motion transition rules. Color transitions retain the source 150ms duration. Native HTML disabled semantics remain intact.

The docs preview now shows the same Save changes / Cancel controls as React, with no placeholder async callback or status UI. React source was unchanged.

## Validation

- 24 Playwright checks comparing actual React and built Angular package on desktop and mobile/reduced motion, in light and dark themes. Covers all variant/size combinations, full width, disabled, empty/nested content, utility overrides, undefined defaults, native click/submit/reset, keyboard activation, clamped compression, release/cancellation, hover/focus and real color transitions, animation cleanup and docs previews. Showcase screenshots are emitted as test artifacts.
- Four focused hover/focus checks pass after adding exact final transition-property, duration and timing assertions.
- Packaged native contract verifies both selectors, defaults, undefined inputs, native attributes, nested content, disabled state, variant classes and form types.
- Installed-tarball strict consumer compilation on Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1 retains all existing scenarios and adds native/custom Press Button consumers with undefined optional inputs.
- TypeScript build and lint pass; existing unrelated lint warnings remain.
- Existing unit suite: 117 tests pass.

Standard React DOM props map to native Angular bindings on `<button kitPressButton>`. Framer Motion's library-specific arbitrary animation overrides are not an Angular API; the component reproduces the reference's authored animation.
