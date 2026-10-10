import { DestroyRef, Directive, computed, effect, inject, input, signal, untracked } from '@angular/core';
import type { TemplateRef } from '@angular/core';
import type { ColumnDef, DataTableRowContext, DataTableViewMode, SortDirection } from './data-table-types';

@Directive()
export class KitDataTableController<T = any> {
  readonly data = input<T[]>([]);
  readonly columns = input<ColumnDef<T>[]>([]);
  readonly getRowId = input<(row: T, index: number) => string>((row: any, index) => row.id || `row-${index}`);
  readonly defaultPageSize = input(10);
  readonly defaultViewMode = input<DataTableViewMode>('auto');
  readonly accentColor = input<string>();
  readonly renderSubComponent = input<TemplateRef<DataTableRowContext<T>>>();
  readonly isLoading = input(false);
  readonly error = input<string | null>(null);
  readonly className = input('');
  readonly viewMode = signal<DataTableViewMode>('table');
  readonly sortColumn = signal<string | null>(null);
  readonly sortDirection = signal<SortDirection>(null);
  readonly searchTerm = signal('');
  readonly activeFilters = signal<Record<string, string[]>>({});
  readonly selectedRowIds = signal(new Set<string>());
  readonly expandedRowIds = signal(new Set<string>());
  readonly hiddenColumnIds = signal(new Set<string>());
  readonly currentPage = signal(1);
  readonly pageSize = signal(10);
  readonly visibleColumns = computed(() => this.columns().filter(column => !this.hiddenColumnIds().has(column.id)));
  readonly filterableColumns = computed(() => this.columns().filter(column => column.filterable && column.filterOptions?.length));
  readonly activeCount = computed(() => Object.values(this.activeFilters()).reduce((sum, values) => sum + values.length, 0));
  readonly filteredData = computed(() => {
    let rows = [...this.data()];
    const query = this.searchTerm().toLowerCase();
    if (query.trim()) rows = rows.filter(row => Object.values(row as object).some(value => (typeof value === 'string' || typeof value === 'number') && String(value).toLowerCase().includes(query)));
    for (const [id, values] of Object.entries(this.activeFilters())) {
      const column = this.columns().find(column => column.id === id);
      if (column && values.length) rows = rows.filter(row => values.includes(String(this.value(row, column, ''))));
    }
    const column = this.columns().find(column => column.id === this.sortColumn());
    const direction = this.sortDirection();
    if (column && direction) rows.sort((a, b) => {
      const av = this.value(a, column, ''), bv = this.value(b, column, '');
      if (av === bv) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const comparison = av > bv ? 1 : -1;
      return direction === 'asc' ? comparison : -comparison;
    });
    return rows;
  });
  readonly totalFilteredCount = computed(() => this.filteredData().length);
  readonly totalPages = computed(() => Math.ceil(this.totalFilteredCount() / this.pageSize()));
  readonly paginatedData = computed(() => this.filteredData().slice((this.currentPage() - 1) * this.pageSize(), this.currentPage() * this.pageSize()));
  readonly currentPageIds = computed(() => this.paginatedData().map((row, index) => this.getRowId()(row, index)));
  readonly isAllSelected = computed(() => this.currentPageIds().length > 0 && this.currentPageIds().every(id => this.selectedRowIds().has(id)));
  readonly isIndeterminate = computed(() => this.currentPageIds().some(id => this.selectedRowIds().has(id)) && !this.isAllSelected());
  constructor() {
    // Defaults initialize state once, matching React useState rather than resetting on later prop changes.
    let initialized = false;
    effect(() => {
      const size = this.defaultPageSize(), mode = this.defaultViewMode();
      if (!initialized) {
        initialized = true;
        untracked(() => { this.pageSize.set(size); this.viewMode.set(mode === 'auto' ? this.responsiveMode() : mode); });
      }
    });
    let previousWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const resize = () => {
      // Preview iframe height changes must not undo a user's view toggle.
      if (window.innerWidth === previousWidth) return;
      previousWidth = window.innerWidth;
      if (this.defaultViewMode() === 'auto') this.viewMode.set(this.responsiveMode());
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resize);
      inject(DestroyRef).onDestroy(() => window.removeEventListener('resize', resize));
    }
  }
  private responsiveMode(): 'cards' | 'table' { return typeof window !== 'undefined' && window.innerWidth < 640 ? 'cards' : 'table'; }
  value(row: T, column: ColumnDef<T>, fallback: any = null): any { return column.accessorKey ? row[column.accessorKey] : column.accessorFn ? column.accessorFn(row) : fallback; }
  handleSort(id: string): void {
    if (this.sortColumn() !== id) { this.sortColumn.set(id); this.sortDirection.set('asc'); }
    else if (this.sortDirection() === 'asc') this.sortDirection.set('desc');
    else { this.sortColumn.set(null); this.sortDirection.set(null); }
  }
  toggleFilter(id: string, value: string): void {
    this.activeFilters.update(filters => { const values = filters[id] || []; return { ...filters, [id]: values.includes(value) ? values.filter(item => item !== value) : [...values, value] }; });
    this.currentPage.set(1);
  }
  clearFilters(): void { this.activeFilters.set({}); this.searchTerm.set(''); this.currentPage.set(1); }
  private toggle(set: Set<string>, id: string): Set<string> { const next = new Set(set); if (next.has(id)) next.delete(id); else next.add(id); return next; }
  toggleRowSelection(id: string): void { this.selectedRowIds.update(ids => this.toggle(ids, id)); }
  toggleRowExpansion(id: string): void { this.expandedRowIds.update(ids => this.toggle(ids, id)); }
  toggleColumnVisibility(id: string): void { this.hiddenColumnIds.update(ids => this.toggle(ids, id)); }
  toggleSelectAll(): void {
    const deselect = this.isAllSelected();
    this.selectedRowIds.update(ids => { const next = new Set(ids); for (const id of this.currentPageIds()) { if (deselect) next.delete(id); else next.add(id); } return next; });
  }
}
