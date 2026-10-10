import type { TemplateRef } from '@angular/core';
/** Angular templates replace React node-returning render functions. */
export type SortDirection = 'asc' | 'desc' | null;
export type DataTableViewMode = 'auto' | 'table' | 'cards';
export interface DataTableCellContext<T> { $implicit: T; row: T; value: any; }
export interface ColumnDef<T = any> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => any;
  cell?: TemplateRef<DataTableCellContext<T>>;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: Array<{ label: string; value: string }>;
  width?: string;
  align?: 'left' | 'center' | 'right';
  priority?: 'high' | 'medium' | 'low';
}
export interface DataTableRowContext<T> { $implicit: T; row: T; }
