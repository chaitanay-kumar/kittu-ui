# Hamburger Menu React / Angular parity

React `src/components/ui/HamburgerMenu.tsx` is the reference. Angular's previous generic collection menu rendered a panel, menu items and status messages; React renders only a controlled three-line icon button. The authored implementation is `scripts/angular-hamburger-menu.ts`.

`isOpen` is required. React's `onChange(nextOpen)` maps to Angular `(change)="open = $event"`; activating the button requests the opposite value without changing its own state. Defaults are size 24, color `currentColor`, label `Menu`, disabled false and native type `button`. Stroke height is `max(2, size * .08)` and closed line spacing is `size * .28`. Open lines rotate ±45 degrees; the middle line fades to zero and scales horizontally to .3.

Use `button[kitHamburgerMenu]` for arbitrary native attrs, event handlers and form participation; `kit-hamburger-menu` renders an internal button. Native `type`, `aria-label`, `aria-expanded` and `className` overrides are supported. `[onClick]` replaces the internal toggle callback, preserving React's final props-spread precedence; a null override suppresses the callback. Angular DOM `(click)` handlers observe activation alongside `(change)`, while the `[onClick]` input explicitly replaces the toggle. Optional undefined size/color/label values resolve to the React defaults. Explicit undefined type/ARIA overrides remove their attributes, as React’s final props spread does; null ARIA values also remove the attribute. An explicitly undefined click override suppresses the callback.

The 380/30/.5 spring uses analytic advancement over the full elapsed frame time, retaining position and velocity during controlled interruptions and size updates. Initial state animates from the untransformed default pose, including an initially open icon. Pending animation callbacks are canceled on destruction. There is no tap spring, menu panel or internal open state. The React source keeps its transforms under reduced motion; Angular follows that behavior. Both the fixed light-colored stroke palette and the source's disabled hover behavior are retained.

The Angular website demo uses the same 28px icon, dark bordered card and controlled “Click to morph” caption. Dedicated component styles exclude the port from shared generic focus and motion rules. Browser fixtures import the actual React source, built Angular package, and distributed shared Angular stylesheet.

## Verification

The browser suite covers desktop Chromium and Pixel 7 emulation, light/dark and both motion preferences, sizes 12/24/28/64, controlled open/closed states, custom color, disabled appearance, initial open animation, callbacks without state mutation, Enter/Space, click override, native submit/reset, ARIA override/removal, hover/focus, intermediate interrupted springs, delayed frames, destruction and website demo geometry. The packaged contract covers defaults, explicit undefined inputs, the custom selector, controlled callbacks, null click override, native types and wrapped-button form submission. A retained consuming-app scenario compiles both selectors with strict templates against the installed package.

Run `npm run angular:build`, `npm run test:hamburger-menu`, `npm run test:angular-package` and `npx playwright test --config playwright.hamburger.config.ts` (isolated port 5209).

Frame sampling can differ slightly between framework schedulers; the tests compare intermediate physical movement with tolerance and require matching settled geometry. Real-device Safari and final owner catalog QA remain outside this Chromium run.

## Recorded results

- Full browser suite: **26 passed** in 2.7 minutes.
- Strengthened delayed-frame simulation installed before React/Angular imports, with cancellation of an active native callback: **2 passed** on desktop/mobile.
- Packaged contract and native library/demo build: passed.
- Installed tarball consuming apps compiled with their own strict Angular **20.0.0, 20.3.33, 21.2.25 and 22.2.1** compilers: all passed.
- **117 unit tests**, TypeScript and lint: passed; lint retains existing catalog warnings.
