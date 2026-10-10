# Kit UI for Angular

116 native standalone components using Angular signals, inputs, and outputs. Supports Angular 20, 21, and 22 with RxJS 7.8+. React is not a dependency.

This package is not published to npm. Build from this repository with `npm run angular:build` (Node 22.22.3+) or download the built tarball from the website's Angular setup page. Install the actual local artifact:

```sh
npm install ./kittu-ui-angular-0.1.0.tgz
```

Add `@import 'kittu-ui-angular/styles.css';` to your application's global stylesheet. Styles use optional `--bg`, `--border`, `--text-primary`, and `--text-secondary` variables, with light defaults; supply dark theme values on your root or a wrapper. Motion behavior follows each component’s documented inputs and reference behavior.

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

All 116 components are standalone exports. Examples include `KittuElasticSheetComponent`, `KittuAdvancedDataTableComponent`, `KittuChatComponent`, `KittuMagneticButtonComponent`, `KittuPricingComponent`, and `KittuSmartComparisonComponent`. The repository's `packages/angular/catalog.json` lists the 108 added ports; the eight original Kittu exports remain available unchanged. Each website detail page shows the precise export, selector, inputs, outputs and required source files.

Upload and prompt components need application-provided `upload` and `sendHandler` callbacks. Honor the supplied AbortSignal and reject on errors; client file validation does not replace server validation. Native modal dialogs contain focus and support Escape. Swipe actions have button alternatives; hold confirmation supports Space and Enter; timeline controls use a native keyboard-accessible range.

The Angular components are independent Kit UI ports. MIT; preserve the included LICENSE and upstream notice. See the repository's ATTRIBUTION.md for the project's independent derivation.

The library is built with Angular 20.3 and TypeScript 5.9 in partial compilation mode. Compatibility checks install the same tarball into separate Angular 20.0, 20.3, 21, and 22 consumers and compile all 116 selectors with each consumer's own compiler and compatible TypeScript. The components work with zone-based and zoneless applications; the website demo explicitly enables Angular 20's zoneless provider. The library does not configure change detection for your application.

Angular APIs are independently designed: React render props become typed data or projected content, and callbacks become output events or abortable application handlers. Native CSS and Canvas 2D replace Framer Motion and WebGL effects. Visuals and detailed motion physics differ; this is catalog coverage, not pixel-identical rendering or React API compatibility. Authentication, payments, scheduling, uploads and AI services remain application responsibilities. Library components never report an external operation as completed without an application handler.

Button accepts React-matched variant/size/isLoading/loadingText/fullWidth/disabled/type/className inputs. Use `<button kittuButton (click)="save()">Save</button>` for native HTML attributes, form semantics, focus and DOM events. The existing `<kittu-button>` custom selector remains available and renders an internal native button. Pass icons as TemplateRefs with leftIcon/rightIcon or project elements marked kittuButtonLeftIcon/kittuButtonRightIcon. Loading state is application-owned; the old generic action/loading/status/cancellation API is removed. The bundled Loader2 icon is derived from Lucide; preserve LUCIDE-LICENSE.txt.
