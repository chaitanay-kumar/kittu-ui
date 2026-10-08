# Kittu UI for Angular

The website's React / Angular switch selects a framework-specific catalog, documentation, source, and live demos. Angular demos bootstrap Angular 22 in isolated preview frames; the documentation shell remains React. The eight Kittu originals are native standalone Angular components and contain no React runtime dependency. The remaining React catalog has not been ported.

## Build and install

Use Node 22.22.3+, 24.15+, or 26+ with the compatible major versions declared in package.json.

```sh
npm ci
npm run angular:build
npm run test:angular-package
```

Install the generated `public/downloads/kittu-ui-angular-0.1.0.tgz` in an Angular 22 application:

```sh
npm install /absolute/path/to/kittu-ui-angular-0.1.0.tgz
```

Import `kittu-ui-angular/styles.css` in your application's global stylesheet. Import the standalone component directly from `kittu-ui-angular`, and add it to your component's `imports`. Full examples are available under Angular in the website and in [the package README](../packages/angular/README.md).

The distributed Angular Package Format artifact includes type declarations, partial compilation, styles, and both MIT notices. It has not been published to npm. `npm run test:angular-package` installs the tarball in an isolated consumer and compiles all eight components with strict Angular templates.

## Application contracts

Smart Upload accepts an application upload handler with progress reporting and an AbortSignal. AI Prompt Composer accepts a sending handler with an AbortSignal. Supply real transports, authentication, and server-side validation in your application. The preview handlers simulate success, failure, and cancellation locally; they do not call storage or AI services.

Other action components accept callbacks and expose pending, success, and failure feedback. Refer to each component's input/output table and source for the precise contract. Light and dark themes use shared CSS tokens; apply the `dark` class to an ancestor to select dark colors. Reduced motion follows the user's operating-system preference.

## Website behavior

Framework preferences persist in local storage; an explicit `?framework=angular` or `?framework=react` link takes precedence. React-only component links in Angular mode show an availability notice and an option to switch frameworks. Angular pages are client-rendered; existing static documentation rendering continues to cover React routes. Angular previews load their runtime only when opened.

The demo bundle currently includes the Angular compiler to load the package's partial compilation. Applications using Angular's normal production build link the library themselves. No Angular SSR or additional framework support is claimed.
