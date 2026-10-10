# Advanced Data Table parity review

React is the source of truth: [component](../../src/components/ui/AdvancedDataTable.tsx), [Component Registry showcase](../../src/components/docs/sections/NewComponentsShowcase.tsx). The earlier audit's Team Directory reference came from a Chat documentation example; the actual preview uses Component Registry.

## Native contract and migration

The existing `KittuAdvancedDataTableComponent` export and `kittu-advanced-data-table` selector remain. The generic component accepts `data`, `columns: ColumnDef<T>[]`, `getRowId`, `defaultPageSize` (10), `defaultViewMode` (`auto`), `accentColor`, `renderSubComponent`, `isLoading`, `error`, `className`, `title`, `searchPlaceholder`, `onBulkDelete` and `onBulkExport`. Callbacks receive selected IDs; `bulkDelete` and `bulkExport` additionally expose Angular outputs. State ownership and defaults follow React; replacing defaults after initialization does not reset user state.

Migrate old `{key,label}` columns to `{id,header,accessorKey}` and supply application data explicitly. Replace `label` with `title`, `loading` with `isLoading`, and `pageSize` with `defaultPageSize`. The old generic `bulkAction` callback receiving rows and an AbortSignal is replaced by ID callbacks. `disabled`, two-way `page`/`selectedIds`, and collection-specific outputs are outside React's API and have been removed from this component. Legacy `KittuTableColumn`, `KittuTableRow` and `KittuTableAction` types remain exported for existing integrations.

React node-returning functions become Angular `TemplateRef`s. Column `cell` templates receive `$implicit`/`row` and `value`; `renderSubComponent` receives `$implicit`/`row`. Accessor functions, widths, alignment, priorities and explicit labeled filter options retain React's data contract. Compound exports are `KittuDataTableComponent`, `KittuDataTableToolbarComponent`, `KittuDataTableFiltersComponent`, `KittuDataTableContentComponent`, and `KittuDataTablePaginationComponent`; compose them inside `kittu-data-table` or use its default composition. Compound parts provide their React options, including empty content and page-size choices. Public controller state supports native equivalents of React's context operations.

```html
<ng-template #nameCell let-row let-value="value">{{row.name}}: {{value}}</ng-template>
<ng-template #details let-row>Details for {{row.name}}</ng-template>
<kittu-advanced-data-table
  title="Directory"
  [data]="rows"
  [columns]="[{id:'name',header:'Name',accessorKey:'name',sortable:true,cell:nameCell}]"
  [renderSubComponent]="details"
  [onBulkExport]="exportIds" />
```

Sorting cycles ascending, descending, unsorted and keeps nulls last. Search checks primitive row values and follows React's whitespace behavior. Filters OR values within a column and AND across columns. Select-all operates on the current page with an indeterminate checkbox; selected IDs persist across page changes. Column visibility supports hiding every column, matching React. Table/cards modes, responsive auto mode, custom details, pagination and error/loading/empty panels follow the reference. Iframe height-only resize events are ignored so documentation resizing cannot undo a manual view toggle.

The root supplies light/dark defaults when a consuming application omits theme CSS; application tokens take precedence.

## Validation and limits

The demo duplicates the current React Component Registry data, custom cells, specifications panels and delete/export feedback. Browser checks compare rendered geometry, typography, colors and radii in both themes, desktop and mobile. Additional checks exercise search, multi-value filters, sort cycles, selection across pages, column visibility, keyboard details, table/cards views, pagination and callbacks.

Packaged contract tests exercise null sorting, nested-value search exclusions, replacement data, defaults, state panels, custom Angular templates, arbitrary projected content, compound composition and callback/output payloads. Strict consumer builds cover Angular 20.0, 20.3, 21 and 22. Validation passed: 10 focused browser checks, 24 catalog/sidebar checks, 117 existing unit tests, the built-package contract, all four Angular consumer builds, and the production build with 289 SEO checks. Lint passes with 21 inherited warnings.

Native Web Animations sample React's 300/32/0.6 spring for disclosure entries and respect reduced motion. Exact animation trajectories and bulk-bar exit motion remain review limitations. Verification covers Chromium desktop and mobile emulation, not physical devices or every browser. These limits are recorded rather than claiming exhaustive parity.

Authored implementation: [port](../../scripts/angular-data-table.ts), [controller](../../packages/angular/src/data-table-controller.ts), [compound parts](../../packages/angular/src/data-table-parts.ts), [styles](../../packages/angular/src/data-table.css). Lucide/Feather notices are retained in source and the package. No new runtime dependencies.

## Review screenshots

Component crops exclude the documentation site's fixed navigation overlay.

| View | React reference | Angular |
| --- | --- | --- |
| Desktop | [Screenshot](screenshots/advanced-data-table-react-desktop.png) | [Screenshot](screenshots/advanced-data-table-angular-desktop.png) |
| Mobile cards | [Screenshot](screenshots/advanced-data-table-react-mobile.png) | [Screenshot](screenshots/advanced-data-table-angular-mobile.png) |
