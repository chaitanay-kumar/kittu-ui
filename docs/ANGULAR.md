# Kittu UI for Angular

The website's React / Angular switch selects a framework-specific catalog, documentation, source, and live demos. Angular demos bootstrap Angular 20 in isolated preview frames; the documentation shell remains React. All 116 catalog components have native standalone Angular implementations without a React runtime dependency. See [the Angular catalog guide](ANGULAR_CATALOG.md) for API and rendering differences.

## Build and install

Use Node 22.22.3+, 24.15+, or 26+ with the compatible major versions declared in package.json.

```sh
npm ci
npm run angular:build
npm run test:angular-package
```

Install the generated `public/downloads/kittu-ui-angular-0.1.0.tgz` in an Angular 20, 21, or 22 application:

```sh
npm install /absolute/path/to/kittu-ui-angular-0.1.0.tgz
```

Import `kittu-ui-angular/styles.css` in your application's global stylesheet. Import the standalone component directly from `kittu-ui-angular`, and add it to your component's `imports`. Full examples are available under Angular in the website and in [the package README](../packages/angular/README.md).

The distributed Angular Package Format artifact includes type declarations, partial compilation, styles, and both MIT notices. It has not been published to npm. The library builds with Angular 20.3 and TypeScript 5.9. `npm run test:angular-package` installs the same tarball in isolated Angular 20.0, 20.3, 21, and 22 consumers, each with its own compiler and compatible TypeScript, and compiles all 116 components with strict Angular templates.

Angular 20 applications may use Zone.js or zoneless change detection. Keep your application's existing configuration; the library requires neither Zone.js imports nor an application provider. The isolated website demos explicitly enable `provideZonelessChangeDetection()` on Angular 20.3. If starting a zoneless application on Angular 20.0 or 20.1, use that version's experimental zoneless provider instead.

## Application contracts

Smart Upload accepts an application upload handler with progress reporting and an AbortSignal. AI Prompt Composer accepts a sending handler with an AbortSignal. Supply real transports, authentication, and server-side validation in your application. The preview handlers simulate success, failure, and cancellation locally; they do not call storage or AI services.

Other action components accept callbacks and expose pending, success, and failure feedback. Refer to each component's input/output table and source for the precise contract. Light and dark themes use shared CSS tokens; apply the `dark` class to an ancestor to select dark colors. Reduced motion follows the user's operating-system preference.

## Website behavior

Framework preferences persist in local storage; an explicit `?framework=angular` or `?framework=react` link takes precedence. Both frameworks cover the same catalog IDs. Angular pages are client-rendered; existing static documentation rendering continues to cover React routes. Angular previews load their runtime only when opened.

Component pages share Preview, Usage, and Code tabs in both frameworks. The selected tab and searchable sidebar persist when switching frameworks. Preview runs the native component, Usage shows the framework-specific example, and Code loads the component source with shared dependencies and styles. Tabs support arrow keys, Home, and End; source failures offer a retry action.

The demo bundle currently includes the Angular compiler to load the package's partial compilation. Applications using Angular's normal production build link the library themselves. No Angular SSR or additional framework support is claimed.
