# Implementation handoff — 2026-10-08

Work is on `feat/kittu-ui-library`, based on the destination's original `main` history. The upstream working tree was imported without its history from commit `214cda979c52cb740856b0de029b8c956a3df5b9`. The destination license is unchanged; the upstream MIT notice is preserved verbatim in `licenses/UPSTREAM-MIT.txt`. See `ATTRIBUTION.md`.

## Delivered

- Kittu UI identity throughout source, documentation, metadata, manifests, registry commands, internal prefixes, and generated outputs.
- Original vector Kittu Ant with replacement logo, favicon, install icons, footer mascot, and social card.
- Eight new components, metadata, live directory/detail demos, prop documentation, and a transport integration guide in `docs/KITTU_COMPONENTS.md`.
- Registry/source output regeneration, stale source pruning, sitemap, llms.txt, and 136 statically rendered routes.
- Shared responsive light/dark styles, focus indicators, reduced motion, keyboard alternatives, and cancellation/retry handling.
- Upstream analytics credentials and sponsorship claims removed. Error reporting stays in the local browser console.

## Validation

Validated using Node 22.23.3 on Windows:

- `npm run component:sync`: 116 components pass registry validation.
- `npm test -- --maxWorkers=2`: 12 files, 111 tests pass.
- `npm run test:browser` with `PLAYWRIGHT_CHANNEL=msedge`: 22 checks pass across desktop and mobile emulation; light/dark and reduced motion are covered. Includes modal focus restoration, command navigation, upload cancellation/retry, and failed prompt draft recovery.
- `npm run lint`: passes, with 21 warnings remaining in inherited components/application code.
- `npm run build`: passes TypeScript, production bundling, 136-route static rendering, and 289 SEO audit checks.
- Brand audit: upstream identity remains only in required legal attribution/license text.
- Upstream license file hash matches the original; destination LICENSE has no changes.

## Remaining constraints

No production domain or npm package is published. Site URLs explicitly default to local development, with indexing disabled. Configure `VITE_SITE_URL` in the shell or production environment file before generating a hosted build. Angular support now requires Node 22.22.3+, 24.15+, or 26+ within the supported major versions.

Smart Upload and AI Prompt Composer demos simulate transport locally. Applications supply their own handlers and server-side validation; no storage or AI service is included. Example-client snippets and `example.com` URLs are illustrations.

Browser validation used Microsoft Edge with mobile emulation. Physical-device and Safari/Firefox verification remain outside this session's coverage. JSDOM emits expected canvas-not-implemented messages for inherited canvas previews, while the tests pass.

GitHub CLI is installed but unauthenticated. A real Git push access check failed with `Invalid username or token`; no successful remote write has been claimed. Complete `gh auth login` and `gh auth setup-git`, then push the local branch. GitHub-registry install commands targeting the default branch become available after merge to `main`.

## Angular extension

Added native Angular 22 standalone ports of all eight Kittu originals under `packages/angular`. The React catalog still includes 116 components. The website header now switches between React and Angular, persists preferences, supports explicit framework links, and displays framework-specific catalogs, demos, source, setup, and input/output documentation. Other React components explicitly indicate unavailable Angular ports.

`npm run angular:build` generates the Angular Package Format library, native demo frames, source JSON, and `public/downloads/kittu-ui-angular-0.1.0.tgz`. The website and package include shared styles and MIT notices. `npm run dev` runs this generation automatically. See `docs/ANGULAR.md` for integration details and limitations.

Validation now includes 115 passing unit tests across 13 files, strict Angular library/demo compilation, and a separate consumer installation of the tarball that compiles all eight selectors with strict templates. Lint passes with the same 21 inherited warnings. Production rendering and all 289 SEO checks pass. All 48 browser checks pass across both frameworks on desktop and mobile emulation.

Angular previews run actual Angular components in isolated frames; the site shell stays React. Angular documentation is client-rendered. Preview bundles currently include the Angular compiler; consuming applications use their own production linker. The tarball is local and has not been published to npm. Transport demos remain local simulations.

## Angular 20 compatibility

The package now builds with Angular 20.3.33, ng-packagr 20.3.2, and TypeScript 5.9.3. Peer dependencies support Angular 20, 21, and 22. Website previews run Angular 20.3 with explicit zoneless change detection; consuming applications retain their own zone-based or zoneless configuration. Setup documentation, package README, metadata, and llms.txt reflect this support.

The same tarball installs and compiles all eight selectors with strict templates using independent consumer compilers: Angular 20.0.0 / TypeScript 5.8.3, Angular 20.3.33 / TypeScript 5.9.3, Angular 21.2.25 / TypeScript 5.9.3, and Angular 22.2.1 / TypeScript 6.0.2. The website typecheck, 115 unit tests, lint (21 inherited warnings), production build, and 289 SEO checks pass.

Browser regression checks covered all 48 desktop/mobile scenarios. An Angular keyboard check was interrupted by a dev-server rebuild reload and passed on rerun. An inherited React mobile upload pointer check repeatedly timed out waiting for layout stability; the cancellation/retry test now explicitly exercises native keyboard activation. All four affected desktop/mobile interaction checks pass in the final focused run. React component implementation was unchanged.
