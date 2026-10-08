# GitHub Pages

The website deploys to `https://chaitanay-kumar.github.io/kittu-ui/` through `.github/workflows/pages.yml`. Pushes to `feat/kittu-ui-library` or `main` build and deploy the site. The repository Pages source is GitHub Actions, and the `github-pages` environment permits both branches.

The workflow uses GitHub's short-lived deployment token; no personal token is stored in repository secrets. It builds all React pages, Angular demo frames, source downloads, and the Angular package tarball. Components and documentation have generated directory indexes so direct links and refreshes work on Pages.

To build the same artifact locally, set `VITE_BASE_PATH=/kittu-ui/` and `VITE_SITE_URL=https://chaitanay-kumar.github.io/kittu-ui`, then run `npm run build` and `node scripts/prepare-pages.mjs` with those variables set. Serve `dist` mounted under `/kittu-ui/`. `PAGES_PREVIEW_URL=http://localhost:PORT npm run test:browser -- e2e/pages.spec.ts` checks the artifact on desktop and mobile.

Local development defaults to `/` and `http://localhost:5173`. Base paths apply to navigation, fonts, Angular frames, source fetches, downloads, manifests, and pre-rendered HTML. If changing the host, update the environment's allowed deployment branches and the Pages test canonical URL expectation as needed.

GitHub Pages hosts static files. Upload, authentication, payment, booking, and AI demos still simulate application services; hosting does not add a backend. The Angular package remains a downloadable tarball rather than a published npm package.
