# Kittu UI

Small details. Lasting impressions. An independent collection of tactile React and native Angular components with TypeScript and motion-aware interactions.

## Run locally

Use Node 22.22.3 or newer within Node 22, Node 24.15+, or Node 26+.

```sh
npm ci
npm run dev
```

Browse http://localhost:5173. No production domain or npm package has been published. Copy component source or, after this branch is merged to main, use the destination GitHub registry:

```sh
npx shadcn@latest add chaitanay-kumar/kittu-ui/elastic-sheet
```

## Kittu originals

Use the **React / Angular** switch in the website header. The choice persists across reloads; share Angular links with `?framework=angular`. React includes 116 components; Angular currently includes the eight Kittu originals below, with native Angular previews, source, input/output documentation, and usage examples. Other components explicitly indicate that an Angular port is unavailable.

The Angular package supports Angular 20, 21, and 22 with RxJS 7.8+. The development server builds the package and Angular 20 demos before starting. Download `kittu-ui-angular-0.1.0.tgz` from the Angular setup page, or find it in `public/downloads/`. It is a local distribution artifact, not a published npm package. See [Angular integration](docs/ANGULAR.md).

Elastic Sheet, Smart Upload, Liquid Command Palette, Hold-to-Confirm, Swipe Action List, Interactive Data Card, Timeline Scrubber, and AI Prompt Composer each include live demos, prop documentation, source, and registry entries. See [the component guide](docs/KITTU_COMPONENTS.md).

## Validation

```sh
npm run component:sync
npm run lint
npm test
npm run build
npm run test:angular-package
```

For browser checks, install Chromium with `npx playwright install chromium`, then run `npm run test:browser`. On Windows with Edge already installed, set `PLAYWRIGHT_CHANNEL=msedge` instead.

The build generates source outputs, the catalog, sitemap, llms.txt, and static documentation pages. Set VITE_SITE_URL consistently for generation and builds when a real site is deployed. Until then, URLs point to local development and indexing is disabled.

## License and origin

MIT. Preserve both [LICENSE](LICENSE) and [the upstream MIT notice](licenses/UPSTREAM-MIT.txt). See [ATTRIBUTION.md](ATTRIBUTION.md) for derivation and independence. Kittu UI has no affiliation with its upstream project.
