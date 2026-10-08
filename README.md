# Kittu UI

Small details. Lasting impressions. An independent collection of tactile React components with TypeScript, Tailwind CSS, and motion-aware interactions.

## Run locally

Use Node 22.15 or newer.

```sh
npm ci
npm run dev
```

Browse http://localhost:5173. No production domain or npm package has been published. Copy component source or, after this branch is merged to main, use the destination GitHub registry:

```sh
npx shadcn@latest add chaitanay-kumar/kittu-ui/elastic-sheet
```

## Kittu originals

Elastic Sheet, Smart Upload, Liquid Command Palette, Hold-to-Confirm, Swipe Action List, Interactive Data Card, Timeline Scrubber, and AI Prompt Composer each include live demos, prop documentation, source, and registry entries. See [the component guide](docs/KITTU_COMPONENTS.md).

## Validation

```sh
npm run component:sync
npm run lint
npm test
npm run build
```

For browser checks, install Chromium with `npx playwright install chromium`, then run `npm run test:browser`. On Windows with Edge already installed, set `PLAYWRIGHT_CHANNEL=msedge` instead.

The build generates source outputs, the catalog, sitemap, llms.txt, and static documentation pages. Set VITE_SITE_URL consistently for generation and builds when a real site is deployed. Until then, URLs point to local development and indexing is disabled.

## License and origin

MIT. Preserve both [LICENSE](LICENSE) and [the upstream MIT notice](licenses/UPSTREAM-MIT.txt). See [ATTRIBUTION.md](ATTRIBUTION.md) for derivation and independence. Kittu UI has no affiliation with its upstream project.
