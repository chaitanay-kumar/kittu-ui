# Magnetic Button parity

React source: `src/components/ui/MagneticButton.tsx`. Angular source is authored in `scripts/angular-magnetic-button.ts`; `npm run angular:sync` retains the native implementation and catalog/API metadata.

The previous generic action implementation has been replaced with the React button contract: `strength=.35`, `variant='primary'`, `size='md'`, `glow=true`, projected content, native disabled state and DOM events. Four variants and three sizes preserve the reference's fixed palette, measurements, hover styles, focus ring and 150ms color transitions. Public `MagneticButtonVariant` and `MagneticButtonSize` types are exported.

Use `<button kitMagneticButton ...>` for arbitrary HTML attributes, native event handlers and form participation. `<kit-magnetic-button>` remains available for projected content and declared inputs. The source has no explicit default `type`, so the default is native **submit**; set `type="button"` for an action inside a form. `label`, `loading`, `action`, `activated`, status messages and artificial movement bounds were removed because React does not expose them.

Pointer translation uses the reference's spring stiffness 280, damping 20 and mass 1. Press scale `.96` uses its 380/30/.5 spring. Native spring values are advanced analytically and retain velocity when the target changes. Mouse leave returns translation to zero. Enter and pointer press release the scale on release/cancel/blur. Leaving the button while a pointer remains held preserves the press scale until the global release; secondary touch contacts do not start a press. Strength changes affect the next mouse move, as in React, rather than retargeting an existing translation. Frame callbacks and listeners are removed on destruction. Strength is not clamped; zero, negative and values greater than one follow the same formula as React.

The reference does not suppress these springs for reduced motion, and does not add disabled opacity or a disabled cursor. Angular preserves that behavior. Changing accessibility/motion policy would require a separately agreed change to the React source.

The website demo uses the same large primary button, `.4` strength, content, installed Lucide Sparkles geometry and hint as React. Existing distributed Lucide notices cover the copied icon geometry.

Validation:

- 28 Playwright tests passed in desktop Chromium and Pixel 7 emulation. Tests compare actual React/native consumers with the distributed shared Angular stylesheet, all variant/size combinations, light/dark and both motion preferences, hover/glow, focus, color-transition timing, native Enter/Space and form events, spring movement/return, tap scale, teardown and website geometry.
- Independent review identified premature release on pointer leave; corrected it and matched primary-pointer filtering and capture-phase global release/cancel handling. Twelve focused spring/strength/held-outside cases passed on desktop/mobile, plus four additional held-strength-update cases.
- Four website comparisons additionally passed after synchronizing the exact installed Sparkles paths/circle.
- Packaged contract passed, including optional/undefined defaults, native default submit/reset, disabled, className, variants, sizes and unclamped strength.
- Installed tarball compiled a retained dedicated strict consumer with public type imports in Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1.
- 117 unit tests passed; lint passed with the existing warnings; TypeScript build passed.

Reproduce with `npm run angular:build`, `npm run test:magnetic-button`, `npm run test:angular-package` and `npx playwright test --config playwright.magnetic.config.ts` (isolated port 5193).

Motion checks compare physical settings, settled translation, press scale and reset. They do not promise frame-for-frame scheduler identity with Framer Motion. Real-device Safari and the owner's final full-catalog QA remain outside this Chromium desktop/mobile run.
