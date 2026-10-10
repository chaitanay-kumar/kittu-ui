# Advanced Data Table parity review

Status: under review. React source: `src/components/ui/AdvancedDataTable.tsx`; React demo: `src/components/docs/sections/NewComponentsShowcase.tsx`. Current Angular definitions are in `scripts/angular-complex-ports.ts`.

[Full tracker](../ANGULAR_REACT_PARITY.md) · [React implementation](../../src/components/ui/AdvancedDataTable.tsx) · [Angular authored definitions](../../scripts/angular-complex-ports.ts)

## Confirmed gaps

| Area | React reference | Current Angular |
| --- | --- | --- |
| Columns | IDs, headers, accessor keys/functions, custom cells, alignment, widths, priority and filter options | Key/label and basic sorting/filter flags |
| Data | Generic application rows and custom row IDs | Primitive records with mandatory string IDs |
| Composition | DataTable, Toolbar, Filters, Content and Pagination | One monolithic template |
| Content customization | Cell rendering and row-detail rendering | Primitive cells and JSON row details |
| Responsive view | Auto/table/cards modes and a view toggle | Table only |
| Sorting | Ascending, descending, then unsorted; nulls last | Two-state sorting with different comparison rules |
| Filters | Multiple selected values per column, explicit labeled options and Reset | One native select value per column |
| Selection | Current-page select-all and indeterminate state | Selects every filtered row |
| Pagination | Default size 10, size selector, first/previous/next/last, range summary | Fixed input size 5 and previous/next |
| Bulk actions | Delete/export callbacks receive selected IDs | One abortable callback receives rows |
| States | Error, five-row skeleton loading, configurable empty content | Basic text feedback |
| Demo | Team Directory with custom cells and expansion | Three workspace tasks |

## Implementation requirements

Preserve the React contract and provide native Angular template equivalents for custom cells, row details and compound composition. Replace the generic table styling with the rendered React layout and tokens. Use the same Team Directory data in both demos. Verify table/cards modes, sorting cycles, multi-value filters, current-page selection, callbacks, pagination, custom templates, state panels, responsive layouts and cleanup before marking the component validated.
