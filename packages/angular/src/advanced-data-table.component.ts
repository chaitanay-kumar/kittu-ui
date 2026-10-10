// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, output } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { KittuDataTableComponent,KittuDataTableToolbarComponent,KittuDataTableFiltersComponent,KittuDataTableContentComponent,KittuDataTablePaginationComponent } from './data-table-parts';
import type { ColumnDef, DataTableRowContext, DataTableViewMode } from './data-table-types';
@Component({
 selector:"kittu-advanced-data-table", standalone:true,
 host:{'data-kittu':"advanced-data-table",style:'display:block;min-width:0'},
 imports:[KittuDataTableComponent,KittuDataTableToolbarComponent,KittuDataTableFiltersComponent,KittuDataTableContentComponent,KittuDataTablePaginationComponent],
template:`
<kittu-data-table [data]="data()" [columns]="columns()" [getRowId]="getRowId()" [defaultPageSize]="defaultPageSize()" [defaultViewMode]="defaultViewMode()" [accentColor]="accentColor()" [renderSubComponent]="renderSubComponent()" [isLoading]="isLoading()" [error]="error()" [className]="className()">
<kittu-data-table-toolbar [title]="title()" [searchPlaceholder]="searchPlaceholder()" [onBulkDelete]="onBulkDelete()" [onBulkExport]="onBulkExport()" (bulkDelete)="bulkDelete.emit($event)" (bulkExport)="bulkExport.emit($event)"/>
<kittu-data-table-filters/>
<kittu-data-table-content/>
<kittu-data-table-pagination/>
</kittu-data-table>
`
})
export class KittuAdvancedDataTableComponent<T = any> {
readonly data=input<T[]>([]);readonly columns=input<ColumnDef<T>[]>([]);readonly getRowId=input<(row:T,index:number)=>string>((row,index)=>(row as any).id||'row-'+index);readonly title=input('');readonly searchPlaceholder=input('Search...');readonly defaultPageSize=input(10);readonly defaultViewMode=input<DataTableViewMode>('auto');readonly accentColor=input<string>();readonly renderSubComponent=input<TemplateRef<DataTableRowContext<T>>>();readonly isLoading=input(false);readonly error=input<string|null>(null);readonly className=input('');readonly onBulkDelete=input<(ids:string[])=>void>();readonly onBulkExport=input<(ids:string[])=>void>();readonly bulkDelete=output<string[]>();readonly bulkExport=output<string[]>();
}
