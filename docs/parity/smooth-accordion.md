# Smooth Accordion parity

React source of truth: `src/components/ui/SmoothAccordion.tsx`, `src/lib/motion-tokens.ts`, and its documentation preview in `ComponentDetailPage.tsx`. Angular is authored in `scripts/angular-smooth-accordion.ts` plus dedicated row, motion, types and stylesheet files; the generator regenerates component/catalog/framework exports. The former generic collection API and demo are replaced.

## Matched contract

- Required `items` with stable `id`, `title`, optional truthy `subtitle` and rich `content`. Text/numeric content renders directly; null/undefined/boolean content renders empty; Angular `TemplateRef` maps rich React nodes to ordinary Angular templates and events.
- `allowMultiple=false`, `defaultOpen=[]`, optional `className`. Explicit undefined restores optional defaults. `defaultOpen` initializes once, retaining the original array reference just as React useState does, including multiple initial IDs in single mode. Changing it later has no effect. Changing `allowMultiple` does not normalize existing open IDs. Removing/reordering items retains open IDs, as React does.
- Native header buttons, `aria-expanded`, Enter/Space, click bubbling and the source's omitted `type` (therefore submit inside a form). No extra generated label, disabled, selected, selectedIds or collection callback API remains.
- Root background/borders/dividers/radius; header padding, typography/subtitle spacing, hover/focus; exact Lucide ChevronDown path/stroke/16px geometry; responsive content typography and padding. Existing Lucide attribution files remain in the package.
- Initial-open panels skip entry animation while the chevron still rotates. Later opening/closing uses the source's 170/26/0.9 height/opacity and 380/30/0.5 rotation springs. Exiting content stays mounted, preserves template state on rapid reopen and freezes its item content during exit; a completed exit destroys and remounts it normally. Resting height returns to `auto`, and a dynamically enlarged panel closes from its current rendered height.
- Measured keyframe resolution follows installed Motion's 40ms start-time rule. Subsequent RAF updates consume full elapsed time. Interrupted JS axes sample wall-clock progress before retargeting and use MotionValue's 30ms velocity delta cap; accelerated opacity samples wall-clock progress with the source's 10ms finite difference. Opacity uses native WAAPI when available, mirroring React's accelerated path; JS fallback is available. Frames and active native animations are cancelled on destroy.
- Shared package styles exclude this component from generic focus/reduced-motion resets. Reduced-motion browser preferences follow the reference's default behavior rather than adding a new component override. Tailwind utility classes on the root override component-layer defaults.
- Angular website preview uses the same two titles, descriptions, first initially open ID and centered 448px/24px vertical wrapper as React.

## Verification

The actual React component and built Angular APF package are mounted in `e2e/fixtures/smooth-accordion-contract.tsx`, including the shared Angular stylesheet and website styles. `playwright.smooth-accordion.config.ts` uses port 5211, Desktop Chrome and Pixel 7 Chromium projects.

Timing probes synchronously commit native header clicks through React `flushSync` or Angular `ApplicationRef.tick`, then compare the actual component animations; functionality/form/website cases use ordinary browser input. Content/header font weights are loaded before measuring auto-height, and initial idle frames are allowed to settle before recording.

`e2e/smooth-accordion-parity.spec.ts` covers light/dark and both motion preferences; exact style/icon properties and settled dimensions (0.2px tolerance); initialization/dynamic IDs/allowMultiple; keyboard/form submission; rich template callbacks/state; exit snapshots; open content resizing; initial presence; hover/focus/root utility overrides; website behavior; teardown RAF/WAAPI cancellation; opening/closing/reversal traces and artificial 80ms delayed frames. Intermediate trace comparisons explicitly allow browser scheduling phase differences (one frame of temporal phase: 24ms normally or 100ms with artificial delayed frames, plus 6px/0.12 opacity normally or 12px/0.25 with delayed frames); this is not a claim of frame-for-frame identity.

- Browser suite: 46 desktop/mobile cases.
- `npm run test:smooth-accordion`: built APF contract verified through Angular TestBed.
- `npm run test:angular-package`: tarball installed separately and all 116 selectors plus a retained rich-template AccordionItem consumer compiled under strict templates with Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1, each using its own compiler/TypeScript version.
- Production/APF/demo build, TypeScript, lint, 117 unit tests and 289 SEO checks pass. Package contract runs in registry CI.

## Limits

Browser evidence is Chromium desktop/mobile emulation, not every browser or a physical device. Native Angular templates are the documented rich-node mapping; React-specific element/ref types are not Angular inputs. Arbitrary consumer template styling and embedded content accessibility remain owned by the application, as in React. Spring traces are compared with explicit temporal tolerances; platform paint/frame scheduling can differ.
