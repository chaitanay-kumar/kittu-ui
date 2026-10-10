# Kit UI

**Nimble by nature. Precise by design.**

An independent UI component collection for React and Angular, with TypeScript, tactile interactions, live demos, source ownership, and an original Kit Fox mascot.

Inspired by the kit fox: nimble interactions, precise feedback, and components that adapt to their environment. See the [brand philosophy](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/docs/BRAND.md).

The product and integration namespace is **Kit UI**: `kit-ui-angular`, `Kit*` Angular exports, and `kit-*` selectors. Existing consumers must update imports and templates; see the [namespace migration guide](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/docs/KIT_NAMESPACE_MIGRATION.md).

[Explore the website](https://chaitanay-kumar.github.io/kit-ui/) · [Browse components](https://chaitanay-kumar.github.io/kit-ui/components/) · [Contribute](CONTRIBUTING.md)

> The implementation and deployed website currently come from [`feat/kit-ui-library`](https://github.com/chaitanay-kumar/kit-ui/tree/feat/kit-ui-library). The default `main` branch carries the repository documentation until the implementation is merged. Use the branch shown in the setup command below.

## What is included

| Area | Current support |
| --- | --- |
| React | 116 components, component registry, previews, usage, source, and API documentation |
| Angular | 116 native standalone components; Angular 20 baseline with Angular 21 and 22 compatibility checks; RxJS 7.8+ |
| Website | Persistent React / Angular switch, searchable component sidebar, light/dark themes, responsive layouts, and direct component links |
| Distribution | Copyable React source and a downloadable Angular Package Format tarball |
| Hosting | GitHub Pages, with automated builds and deployments |
| License | MIT, with the original upstream MIT notice preserved |

The website shell uses React. Angular previews run actual Angular components in isolated frames; the Angular library has no React runtime dependency. An explicit `?framework=angular` or `?framework=react` link overrides the saved framework preference. Switching on a component page preserves its selection and sidebar search.

### Eight original Kit components

| Component | Interaction |
| --- | --- |
| Elastic Sheet | Draggable sheet with snap positions and keyboard resizing |
| Smart Upload | File previews, validation, progress, cancellation, and retry |
| Liquid Command Palette | Searchable commands with keyboard navigation |
| Hold-to-Confirm | Visible hold progress with pointer and keyboard controls |
| Swipe Action List | Swipe actions with accessible button alternatives |
| Interactive Data Card | Expandable summaries, details, and application actions |
| Timeline Scrubber | Event navigation with pointer and keyboard controls |
| AI Prompt Composer | Attachments, suggestions, sending, cancellation, and failure recovery |

The remaining catalog includes buttons, forms, navigation, dialogs, cards, tables, timelines, feedback, and motion effects. See the [original component guide](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/docs/KIT_COMPONENTS.md) and [Angular catalog contracts](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/docs/ANGULAR_CATALOG.md).

## Run the website locally

Use Node **22.22.3+ within Node 22**, **24.15+ within Node 24**, or **26+**, as declared in `package.json`. Node 22 is used by CI. npm is required; use the checked-in lockfile.

```sh
git clone --branch feat/kit-ui-library https://github.com/chaitanay-kumar/kit-ui.git
cd kit-ui
npm ci
npm run dev
```

Open [localhost:5173](http://localhost:5173). The `predev` script first generates and builds the Angular library, demo frames, source files, and tarball, so the first start takes longer than a plain Vite startup. Keep the terminal running while using the preview.

Local development defaults to `/` and `http://localhost:5173`, with indexing disabled. You do not need GitHub authentication to clone this public repository or run it. Authentication is required to push changes to a repository you can write to.

## Use components in your application

### React

Choose React on the website, open a component, and follow its Usage, Code, and Installation instructions. Copy the component and its documented shared files/styles, install its dependencies, and adjust import aliases to match your application. Components are source distributions; the repository is not an installable `kit-ui` npm package.

After the implementation is merged into `main`, the destination GitHub registry can be used with shadcn's GitHub shorthand:

```sh
npx shadcn@latest add chaitanay-kumar/kit-ui/elastic-sheet
```

That shorthand is not the current feature-branch installation route. Until merge, use the website's source instructions. Dependencies and styling needs vary by component; inspect its source and API rather than assuming every component has the same setup.

### Angular 20, 21, and 22

[Download the Angular package](https://chaitanay-kumar.github.io/kit-ui/downloads/kit-ui-angular-0.1.0.tgz), then install the downloaded file in your Angular application:

```sh
npm install ./kit-ui-angular-0.1.0.tgz
```

Add this import to your application's global stylesheet:

```css
@import 'kit-ui-angular/styles.css';
```

Import a standalone component and add it to your Angular component's `imports`:

```ts
import { Component } from '@angular/core';
import { KitElasticSheetComponent } from 'kit-ui-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [KitElasticSheetComponent],
  template: `
    <kit-elastic-sheet [snapPositions]="[35, 65, 90]">
      Your content
    </kit-elastic-sheet>
  `,
})
export class ExampleComponent {}
```

The package also builds locally with `npm run angular:build`; its tarball appears in `public/downloads/`. It has not been published to npm. See [Angular integration](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/docs/ANGULAR.md) and the [package README](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/packages/angular/README.md) for themes, callbacks, change detection, and compatibility.

### Integration limits

Angular provides native counterparts across the catalog, with independently designed inputs, signal models, projected content, and output events. React and Angular APIs, layouts, and motion physics are not identical. Native CSS and Canvas 2D replace some React motion and shader effects.

Direct Angular `formControl` / `formControlName` integration through `ControlValueAccessor` is not implemented; bridge the documented model inputs and outputs to a form control. Angular SSR is not validated. The Angular data table uses typed primitive cells and JSON row details rather than custom cell templates.

Authentication, payments, bookings, uploads, storage, and AI services belong to the consuming application. Website handlers simulate requests locally; static hosting does not provide those backends. Honor cancellation signals and validate user data on the server.

## Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Build Angular artifacts, then start the Vite development server |
| `npm run component:new -- ComponentName` | Scaffold a React component and its metadata |
| `npm run component:sync` | Generate and validate the React registry, catalog, source JSON, sitemap, robots.txt, and llms.txt |
| `npm run angular:sync` | Generate the 108 additional authored Angular ports, exports, demo map, and API metadata |
| `npm run angular:build` | Synchronize and build the Angular library, demos, source JSON, and package tarball |
| `npm run lint` | Run Oxlint |
| `npm test` | Run unit tests |
| `npm run test:browser` | Run Playwright desktop/mobile checks against the local site |
| `npm run test:angular-package` | Install the built tarball in separate Angular consumer/compiler environments |
| `npm run build` | Build Angular, synchronize React outputs, type-check, build Vite, prerender routes, and audit SEO |
| `npm run preview` | Serve the production build for local inspection |

For browser tests, install Chromium once with `npx playwright install chromium`. If using an existing Microsoft Edge installation on Windows:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm run test:browser
```

The latest implementation validation passed 117 unit tests, the production build, all 289 SEO checks, and independent consumer checks for Angular 20.0, 20.3, 21, and 22. Browser checks cover both frameworks, themes, keyboard/async interactions, and the hosted Pages site on desktop/mobile emulation. Lint currently retains 21 inherited warnings. These checks do not establish physical-device, Safari/Firefox, or exhaustive accessibility coverage.

## Repository layout

```text
src/components/ui/          React components and metadata
src/components/docs/        Documentation shell and React demos
src/components/angular/     Angular documentation and iframe integration
src/lib/framework/          Framework selection and Angular API catalog
packages/angular/src/       Native Angular components and shared behavior
packages/angular-demo/      Angular preview application
scripts/                    Generators, packaging, prerendering, and validation
public/                     Static assets and generated source/download outputs
e2e/                       Playwright interaction and hosting checks
.github/workflows/          Registry CI and Pages deployment
```

## Hosting and documentation

The live website is **[chaitanay-kumar.github.io/kit-ui](https://chaitanay-kumar.github.io/kit-ui/)**. GitHub Actions deploys pushes from `feat/kit-ui-library` and, once it contains the implementation/workflow, `main`. No custom domain is configured.

The Pages workflow sets `VITE_BASE_PATH=/kit-ui/` and the public `VITE_SITE_URL`, builds all 136 static routes and Angular artifacts, prepares the manifest, and uploads `dist`. Keep both environment variables consistent when reproducing a hosted build. See the [hosting guide](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/docs/HOSTING.md).

More detail: [Architecture](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/docs/ARCHITECTURE.md) · [Angular contracts](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/docs/ANGULAR_CATALOG.md) · [Project handoff and validation history](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/docs/HANDOFF_STATUS.md).

## Contributing and licensing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, React and Angular authoring, generated-file rules, checks, and pull requests. Contributions should support keyboard, touch, reduced motion, visible focus, responsive layouts, and both themes where applicable.

Kit UI is independently derived from the MIT-licensed EasyUI project and has no affiliation with or endorsement from its upstream maintainers. Preserve [LICENSE](LICENSE) and the [verbatim upstream MIT notice](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/licenses/UPSTREAM-MIT.txt) when redistributing substantial portions. [ATTRIBUTION.md](https://github.com/chaitanay-kumar/kit-ui/blob/feat/kit-ui-library/ATTRIBUTION.md) documents the import and independence.
