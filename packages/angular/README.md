# Kittu UI for Angular

Eight native standalone components using Angular signals, inputs, and outputs. Supports Angular 20, 21, and 22 with RxJS 7.8+. React is not a dependency.

This package is not published to npm. Build from this repository with `npm run angular:build` (Node 22.22.3+) or download the built tarball from the website's Angular setup page. Install the actual local artifact:

```sh
npm install ./kittu-ui-angular-0.1.0.tgz
```

Add `@import 'kittu-ui-angular/styles.css';` to your application's global stylesheet. Styles use optional `--bg`, `--border`, `--text-primary`, and `--text-secondary` variables, with light defaults; supply dark theme values on your root or a wrapper. All motion respects `prefers-reduced-motion`.

```ts
import { Component } from '@angular/core';
import { KittuElasticSheetComponent } from 'kittu-ui-angular';

@Component({
  selector: 'app-example',
  imports: [KittuElasticSheetComponent],
  template: `<kittu-elastic-sheet [snapPositions]="[35, 65, 90]" (snapChange)="height = $event">Your content</kittu-elastic-sheet>`,
})
export class ExampleComponent { height = 35; }
```

Available exports: `KittuElasticSheetComponent`, `KittuSmartUploadComponent`, `KittuLiquidCommandPaletteComponent`, `KittuHoldToConfirmComponent`, `KittuSwipeActionListComponent`, `KittuInteractiveDataCardComponent`, `KittuTimelineScrubberComponent`, and `KittuAIPromptComposerComponent`. All are standalone.

Upload and prompt components need application-provided `upload` and `sendHandler` callbacks. Honor the supplied AbortSignal and reject on errors; client file validation does not replace server validation. Native modal dialogs contain focus and support Escape. Swipe actions have button alternatives; hold confirmation supports Space and Enter; timeline controls use a native keyboard-accessible range.

The eight Angular components are original Kittu UI ports. MIT; preserve the included LICENSE and upstream notice. See the repository's ATTRIBUTION.md for the project's independent derivation.

The library is built with Angular 20.3 and TypeScript 5.9 in partial compilation mode. Compatibility checks install the same tarball into separate Angular 20.0, 20.3, 21, and 22 consumers and compile with each consumer's own compiler and compatible TypeScript. The components work with zone-based and zoneless applications; the website demo explicitly enables Angular 20's zoneless provider. The library does not configure change detection for your application.
