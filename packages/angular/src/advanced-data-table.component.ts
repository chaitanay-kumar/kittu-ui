// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, DestroyRef, computed, inject, input, model, output, signal } from '@angular/core';
import type { KittuTableColumn, KittuTableRow } from './port-types';
import type { KittuTableAction } from './port-types';
@Component({
 selector:"kittu-advanced-data-table", standalone:true,
 host:{'data-kittu':"advanced-data-table",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-surface kittu-stack" [attr.aria-busy]="loading()||busy()">
<h3>{{label()}}</h3>
<label>Search rows<input type="search" [value]="query()" [disabled]="disabled()" (input)="query.set($any($event.target).value);page.set(1)" />
</label>
<details>
<summary>Columns and filters</summary>
<div class="kittu-stack">@for(column of columns();track column.key){<div class="kittu-row">
<label>
<input type="checkbox" [checked]="!hidden().includes(column.key)" [disabled]="disabled()||(!hidden().includes(column.key)&&visibleColumns().length===1)" (change)="toggleColumn(column.key)" />{{column.label}}</label>@if(column.filterable){<label>Filter {{column.label}}<select [disabled]="disabled()" [value]="filters()[column.key]||''" (change)="filter(column.key,$any($event.target).value)">
<option value="">All</option>@for(value of options(column.key);track value){<option [value]="value">{{value}}</option>}</select>
</label>}</div>}</div>
</details>
<div class="kittu-row">
<span>{{selectedIds().length}} selected</span>
<button type="button" [disabled]="disabled()||busy()||!selectedRows().length" (click)="apply()">{{busy()?'Applying…':'Apply bulk action'}}</button>
</div>@if(error()){<p role="alert">{{error()}}</p>}@if(loading()){<p role="status">Loading rows…</p>}@else{<div class="k-table-scroll" tabindex="0" aria-label="Scrollable data table">
<table>
<caption class="sr-only">{{label()}}</caption>
<thead>
<tr>
<th scope="col">
<input type="checkbox" aria-label="Select all filtered rows" [checked]="allSelected()" [disabled]="disabled()||busy()||!filtered().length" (change)="toggleAll()" />
</th>@for(column of visibleColumns();track column.key){<th scope="col" [attr.aria-sort]="sortKey()===column.key?(direction()===1?'ascending':'descending'):'none'">
<button type="button" [disabled]="disabled()||column.sortable===false" (click)="sort(column.key)">{{column.label}} {{sortKey()===column.key?(direction()===1?'↑':'↓'):''}}</button>
</th>}<th scope="col">Details</th>
</tr>
</thead>
<tbody>@for(row of paginated();track row.id){<tr>
<td>
<input type="checkbox" [attr.aria-label]="'Select row '+row.id" [checked]="selectedIds().includes(row.id)" [disabled]="disabled()||busy()" (change)="toggleRow(row.id)" />
</td>@for(column of visibleColumns();track column.key){<td>{{row[column.key]}}</td>}<td>
<button type="button" [disabled]="disabled()" [attr.aria-expanded]="expanded().includes(row.id)" (click)="expand(row)">Details <span class="sr-only">{{row.id}}</span>
</button>
</td>
</tr>@if(expanded().includes(row.id)){<tr>
<td [attr.colspan]="visibleColumns().length+2">
<pre class="k-code">{{details(row)}}</pre>
</td>
</tr>}}@empty{<tr>
<td [attr.colspan]="visibleColumns().length+2">No matching rows.</td>
</tr>}</tbody>
</table>
</div>}<div class="kittu-row">
<button type="button" [disabled]="disabled()||safePage()<=1" (click)="page.set(safePage()-1)">Previous page</button>
<span>Page {{safePage()}} of {{pages()}} · {{filtered().length}} rows</span>
<button type="button" [disabled]="disabled()||safePage()>=pages()" (click)="page.set(safePage()+1)">Next page</button>
</div>
<p role="status">{{status()}}</p>@if(actionError()){<p role="alert">{{actionError()}}</p>}</section>
`
})
export class KittuAdvancedDataTableComponent {
readonly label=input('Workspace tasks');readonly data=input<KittuTableRow[]>([{id:'1',name:'Design tokens',status:'Ready',priority:1},{id:'2',name:'Angular components',status:'In progress',priority:2},{id:'3',name:'Documentation',status:'Ready',priority:3}]);readonly columns=input<KittuTableColumn[]>([{key:'name',label:'Task',sortable:true},{key:'status',label:'Status',sortable:true,filterable:true},{key:'priority',label:'Priority',sortable:true}]);readonly disabled=input(false);readonly loading=input(false);readonly error=input('');readonly page=model(1);readonly pageSize=input(5);readonly selectedIds=model<string[]>([]);readonly bulkAction=input<KittuTableAction>();readonly rowSelect=output<KittuTableRow>();readonly bulkComplete=output<KittuTableRow[]>();readonly bulkRequested=output<KittuTableRow[]>();readonly query=signal('');readonly sortKey=signal('');readonly direction=signal(1);readonly filters=signal<Record<string,string>>({});readonly hidden=signal<string[]>([]);readonly expanded=signal<string[]>([]);readonly busy=signal(false);readonly status=signal('');readonly actionError=signal('');private controller?:AbortController;private destroyed=false;
readonly visibleColumns=computed(()=>this.columns().filter(c=>!this.hidden().includes(c.key)));readonly size=computed(()=>Math.max(1,Math.min(100,Math.floor(this.pageSize()))));readonly filtered=computed(()=>{const query=this.query().toLowerCase();const rows=this.data().filter(row=>Object.values(row).some(value=>String(value).toLowerCase().includes(query))&&Object.entries(this.filters()).every(([key,value])=>!value||String(row[key])===value));const key=this.sortKey();if(!key)return rows;return [...rows].sort((a,b)=>this.direction()*(typeof a[key]==='number'&&typeof b[key]==='number'?(a[key] as number)-(b[key] as number):String(a[key]??'').localeCompare(String(b[key]??''),undefined,{numeric:true})));});readonly pages=computed(()=>Math.max(1,Math.ceil(this.filtered().length/this.size())));readonly safePage=computed(()=>Math.max(1,Math.min(this.pages(),this.page())));readonly paginated=computed(()=>this.filtered().slice((this.safePage()-1)*this.size(),this.safePage()*this.size()));readonly selectedRows=computed(()=>this.data().filter(row=>this.selectedIds().includes(row.id)));readonly allSelected=computed(()=>this.filtered().length>0&&this.filtered().every(row=>this.selectedIds().includes(row.id)));
constructor(){inject(DestroyRef).onDestroy(()=>{this.destroyed=true;this.controller?.abort();});}options(key:string):string[]{return [...new Set(this.data().map(row=>String(row[key]??'')))];}filter(key:string,value:string):void{this.filters.update(v=>({...v,[key]:value}));this.page.set(1);}sort(key:string):void{if(this.sortKey()===key)this.direction.update(v=>-v);else{this.sortKey.set(key);this.direction.set(1);}}toggleColumn(key:string):void{this.hidden.update(a=>a.includes(key)?a.filter(k=>k!==key):[...a,key]);}toggleRow(id:string):void{this.selectedIds.update(a=>a.includes(id)?a.filter(k=>k!==id):[...a,id]);}toggleAll():void{const ids=this.filtered().map(r=>r.id);this.selectedIds.update(a=>this.allSelected()?a.filter(id=>!ids.includes(id)):[...new Set([...a,...ids])]);}expand(row:KittuTableRow):void{this.expanded.update(a=>a.includes(row.id)?a.filter(id=>id!==row.id):[...a,row.id]);this.rowSelect.emit(row);}details(row:KittuTableRow):string{return JSON.stringify(row,null,2);}async apply():Promise<void>{if(this.disabled()||this.busy()||!this.selectedRows().length)return;this.actionError.set('');const rows=[...this.selectedRows()];this.bulkRequested.emit(rows);const handler=this.bulkAction();if(!handler){this.status.set('Bulk action requested.');return;}const controller=new AbortController();this.controller=controller;this.busy.set(true);try{await handler(rows,controller.signal);if(!this.destroyed&&!controller.signal.aborted){this.bulkComplete.emit(rows);this.status.set('Bulk action completed.');}}catch(error){if(!this.destroyed)this.actionError.set(error instanceof Error?error.message:'Bulk action failed. Selection preserved.');}finally{if(!this.destroyed)this.busy.set(false);}}
}
