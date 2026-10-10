# Stretch Switch React / Angular parity

React `src/components/ui/StretchSwitch.tsx` is the source of truth. The Angular port is authored in `scripts/angular-stretch-switch.ts`; the previous generic switch's `value`/`valueChange` interface is replaced with `checked`, `defaultChecked`, `disabled`, `onChange`, `label`, `description` and `className`.

`checked` is optional and controls the switch when defined. Activating a controlled switch requests the next value without mutating it; an uncontrolled switch owns its state. `defaultChecked` initializes that state once, including while initially controlled. Returning to undefined `checked` restores the retained internal state. Same-call activations request the last rendered state, matching React’s event closure instead of toggling twice against immediately updated internal signals. `[onChange]` accepts the React-equivalent callback, and `(checkedChange)` supplies the Angular output equivalent. Label supports text, numbers, booleans or `TemplateRef`; boolean nodes retain React’s empty rendering and truthy/falsy wrapper behavior. A truthy label or description creates the clickable copy block. Template labels retain their input state during unrelated changes. Both `kit-stretch-switch` and `div[kitStretchSwitch]` are supported.

The track is 36×20px, its thumb 14×14px, horizontal padding 2px and travel 18px. Theme variables, typography, rounded geometry, disabled opacity, focus outline, color transition and shadow match the source. Dedicated styles exclude the component from generic catalog focus/motion rules. Fixtures import the actual React component, built Angular package and distributed Angular shared styles.

Pointer down deforms the thumb to 1.18×.86. Source behavior includes right-button and secondary-touch pointer events; cancellation, release and leave restore it. Keyboard activation does not deform the thumb. Disabling an already pressed switch leaves the deformation until a release/cancel/leave, as React does. The translation uses springSnappy (380/30/.5), retaining velocity across reversals and using elapsed time from each new target. Destruction cancels pending animation callbacks. Reduced-motion settings follow the React source, which retains this spring.

The live Angular demo matches React's two switches, copy, initial state, layout and typography. The generic catalog keyboard test now exercises its existing Liquid Toggle fixture because the Stretch demo has two real source examples; the dedicated Stretch suite independently covers keyboard behavior and forms.

## Verification

- Actual React / Angular browser comparisons cover desktop Chromium and Pixel 7 emulation, light/dark, both motion preferences, checked/default initialization, controlled callbacks, fallback, disabled behavior, numeric falsy labels, rich template persistence, focus, Enter/Space, native non-submit form behavior and pointer feedback.
- Intermediate spring reversal checks require matching positions within 3px under normal frames and 5px under injected 80ms frames; settled state matches exactly. Timing fixtures synchronize framework commits and compare timestamped transform traces at equal elapsed phase time, avoiding fixed wall-clock samples landing on opposite sides of delayed frames. Same-call activation regressions also preserve React’s last-rendered event state. Active destruction verifies callback cancellation.
- Website checks compare both live demos' layout, copy, initial checked states, typography and interaction.
- `npm run test:stretch-switch` checks the built package's controlled requests/output, initial default, fallback, disabled copy, optional defaults and native/template consumption.
- Installed tarball strict-template consumers compile with Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1, including all 116 selectors and both Stretch selectors.
- Library/demo build, production build and 289 SEO checks, TypeScript, lint and 117 unit tests pass. Existing catalog lint warnings remain.

The retained browser tests are `e2e/stretch-switch-parity.spec.ts`; run them after `npm run angular:build`. Real-device Safari and the owner's final catalog QA remain outside these Chromium checks.

## Recorded results

- Independent review and full browser sweep: **40 passed** in 2.6 minutes.
- Final boolean-label rendering update: **8 visual/options matrix cases passed**, covering desktop/mobile, both themes and both motion preferences. Existing label cases were retained in each matrix.
- Final packaged contract and fresh production build: passed, including **289 SEO checks**.
- Final installed tarball compiled with all four strict Angular consumer versions and all 116 selectors: passed.
- TypeScript, lint and **117 unit tests**: passed; existing catalog warnings remain.

Reproduce the isolated browser suite with `npx playwright test e2e/stretch-switch-parity.spec.ts --config playwright.stretch.config.ts` after building the Angular package.
