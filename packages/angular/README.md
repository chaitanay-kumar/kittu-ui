# Kit UI for Angular

116 native standalone components using Angular signals, inputs, and outputs. Supports Angular 20, 21, and 22 with RxJS 7.8+. React is not a dependency.

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

All 116 components are standalone exports. Examples include `KittuElasticSheetComponent`, `KittuAdvancedDataTableComponent`, `KittuChatComponent`, `KittuMagneticButtonComponent`, `KittuPricingComponent`, and `KittuSmartComparisonComponent`. The repository's `packages/angular/catalog.json` lists the 108 added ports; the eight original Kittu exports remain available unchanged. Each website detail page shows the precise export, selector, inputs, outputs and required source files.

Upload and prompt components need application-provided `upload` and `sendHandler` callbacks. Honor the supplied AbortSignal and reject on errors; client file validation does not replace server validation. Native modal dialogs contain focus and support Escape. Swipe actions have button alternatives; hold confirmation supports Space and Enter; timeline controls use a native keyboard-accessible range.

The Angular components are independent Kit UI ports. MIT; preserve the included LICENSE and upstream notice. See the repository's ATTRIBUTION.md for the project's independent derivation.

The library is built with Angular 20.3 and TypeScript 5.9 in partial compilation mode. Compatibility checks install the same tarball into separate Angular 20.0, 20.3, 21, and 22 consumers and compile all 116 selectors with each consumer's own compiler and compatible TypeScript. The components work with zone-based and zoneless applications; the website demo explicitly enables Angular 20's zoneless provider. The library does not configure change detection for your application.

Angular APIs are independently designed: React render props become typed data or projected content, and callbacks become output events or abortable application handlers. Native CSS and Canvas 2D replace Framer Motion and WebGL effects. Visuals and detailed motion physics differ; this is catalog coverage, not pixel-identical rendering or React API compatibility. Authentication, payments, scheduling, uploads and AI services remain application responsibilities. Library components never report an external operation as completed without an application handler.

### Spotlight Card

`KittuSpotlightCardComponent` renders one content card. Project children directly into `<kittu-spotlight-card>`. Inputs are `spotlightColor` (default `rgba(56, 189, 248, 0.08)`), `spotlightSize` (350) and `className`; explicitly undefined values retain those defaults. Native attributes/styles/events apply to the host. `onMouseMove`/`onMouseLeave` inputs accept `SpotlightCardMouseHandler` callbacks with native MouseEvent payloads; supplying either overrides the corresponding internal handler, as React's spread props do. Explicit undefined overrides disable that internal handler. Omit these inputs to retain tracking; use native `(mousemove)`/`(mouseleave)` listeners for observation without replacing it. The previous items/selection/disclosure/loading/action API is removed. No role, focus behavior or action is added by default; projected controls keep their native semantics. React's hover capability rules and CSS transitions apply; reduced-motion preferences do not change this reference component's transitions.

A zero `spotlightSize` follows the current React reference: useMotionTemplate omits its falsy numeric fragment, producing invalid CSS and retaining the previous painted gradient (none on a fresh zero-size mount). Use a transparent `spotlightColor` with a positive size to hide the ambient glow.
