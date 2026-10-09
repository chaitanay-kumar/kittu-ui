/** Exercises the built public package and real projected Angular templates. */
import '@angular/compiler';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { KittuAdvancedDataTableComponent,KittuDataTableComponent,KittuDataTableToolbarComponent,KittuDataTableContentComponent,KittuDataTablePaginationComponent } from '../packages/angular/dist/fesm2022/kittu-ui-angular.mjs';
const dom=new JSDOM('<html><body></body></html>',{url:'http://localhost'});
for(const key of ['window','document','HTMLElement','Element','Node'])globalThis[key]=dom.window[key];
globalThis.matchMedia=()=>({matches:true});
TestBed.initTestEnvironment(BrowserTestingModule,platformBrowserTesting());
TestBed.configureTestingModule({imports:[KittuDataTableComponent,KittuAdvancedDataTableComponent],providers:[provideZonelessChangeDetection()]});
const fixture=TestBed.createComponent(KittuDataTableComponent),table=fixture.componentInstance;
const set=(key,value)=>{fixture.componentRef.setInput(key,value);fixture.detectChanges();};
try{
 const rows=[{id:'a',name:'Beta',score:2,group:'x',nested:{name:'secret'}},{id:'b',name:'Alpha',score:null,group:'y'},{id:'c',name:'Gamma',score:1,group:'z'}];
 const columns=[{id:'name',header:'Name',accessorKey:'name',sortable:true},{id:'score',header:'Score',accessorFn:row=>row.score,sortable:true},{id:'group',header:'Group',accessorFn:row=>row.group,filterable:true,filterOptions:['x','y','z'].map(value=>({label:value,value}))}];
 set('defaultPageSize',2);set('data',rows);set('columns',columns);
 assert.equal(table.pageSize(),2);assert.equal(table.totalPages(),2);
 table.handleSort('score');fixture.detectChanges();assert.deepEqual(table.filteredData().map(row=>row.id),['c','a','b']);
 table.handleSort('score');assert.deepEqual(table.filteredData().map(row=>row.id),['a','c','b']);
 table.handleSort('score');assert.deepEqual(table.filteredData(),rows);assert.equal(table.sortDirection(),null);
 table.searchTerm.set('secret');assert.equal(table.filteredData().length,0);
 table.searchTerm.set('  ');assert.equal(table.filteredData().length,3);
 table.clearFilters();table.toggleFilter('group','x');table.toggleFilter('group','y');assert.equal(table.filteredData().length,2);
 table.toggleFilter('group','x');assert.equal(table.filteredData()[0].id,'b');table.clearFilters();
 table.toggleRowSelection('a');assert.equal(table.isIndeterminate(),true);table.toggleSelectAll();assert.deepEqual([...table.selectedRowIds()],['a','b']);
 table.currentPage.set(2);table.toggleSelectAll();assert.deepEqual([...table.selectedRowIds()],['a','b','c']);
 table.toggleSelectAll();assert.deepEqual([...table.selectedRowIds()],['a','b']);
 table.toggleColumnVisibility('name');fixture.detectChanges();assert.ok(!fixture.nativeElement.querySelector('th[aria-sort]')?.textContent.includes('Name'));
 set('isLoading',true);assert.equal(fixture.nativeElement.querySelectorAll('.k-dt-loading>div').length,5);
 set('error','Network failed');assert.ok(fixture.nativeElement.querySelector('[role=alert]').textContent.includes('Network failed'));
 set('error',null);set('isLoading',false);table.clearFilters();table.searchTerm.set('missing');fixture.detectChanges();assert.ok(fixture.nativeElement.textContent.includes('No matching records found'));
 fixture.nativeElement.querySelector('.k-dt-state button').click();fixture.detectChanges();assert.equal(table.searchTerm(),'');
 set('data',[{id:'new',name:'Replacement',score:8,group:'x'}]);assert.equal(table.filteredData()[0].id,'new');
 table.viewMode.set('cards');fixture.detectChanges();assert.equal(fixture.nativeElement.querySelectorAll('.k-dt-card').length,1);
 set('defaultPageSize',50);assert.equal(table.pageSize(),2);
 fixture.destroy();TestBed.resetTestingModule();
 class Consumer{rows=rows;columns=columns;deleted=[];exported=[];onDelete=ids=>this.deleted=ids;onExport=ids=>this.exported=ids;}
 Component({selector:'consumer',standalone:true,imports:[KittuAdvancedDataTableComponent,KittuDataTableComponent,KittuDataTableToolbarComponent,KittuDataTableContentComponent,KittuDataTablePaginationComponent],template:`
 <ng-template #cell let-row let-value="value"><b class="custom-cell">{{row.name}}:{{value}}</b></ng-template>
 <ng-template #detail let-row><p class="custom-detail">Details {{row.name}}</p></ng-template>
 <kittu-advanced-data-table [data]="rows" [columns]="[{id:'name',header:'Name',accessorKey:'name',cell:cell}]" [renderSubComponent]="detail" [onBulkDelete]="onDelete" [onBulkExport]="onExport" (bulkDelete)="deleted=$event" (bulkExport)="exported=$event"/>
 <kittu-data-table [data]="rows" [columns]="columns"><kittu-data-table-toolbar title="Custom composition"/><kittu-data-table-content emptyTitle="Custom empty"/><kittu-data-table-pagination [pageSizeOptions]="[2,4]"/></kittu-data-table>
 <kittu-data-table><p class="plain-content">Custom standalone content</p></kittu-data-table>`})(Consumer);
 TestBed.configureTestingModule({imports:[Consumer],providers:[provideZonelessChangeDetection()]});
 const consumer=TestBed.createComponent(Consumer);consumer.detectChanges();
 try{
 const inner=consumer.debugElement.queryAll(By.directive(KittuDataTableComponent))[0].componentInstance;
 assert.ok(consumer.nativeElement.querySelector('.custom-cell').textContent.includes('Beta:Beta'));
 inner.toggleRowExpansion('a');inner.toggleRowSelection('a');consumer.detectChanges();
 assert.ok(consumer.nativeElement.querySelector('.custom-detail').textContent.includes('Details Beta'));
 const toolbar=consumer.debugElement.queryAll(By.directive(KittuDataTableToolbarComponent))[0].componentInstance;
 toolbar.deleteSelected();toolbar.exportSelected();assert.deepEqual(consumer.componentInstance.deleted,['a']);assert.deepEqual(consumer.componentInstance.exported,['a']);
 assert.equal(consumer.nativeElement.querySelectorAll('.k-dt-toolbar').length,2);
 assert.ok(consumer.nativeElement.textContent.includes('Custom composition'));
 assert.ok(consumer.nativeElement.querySelector('.plain-content'));
 assert.equal(consumer.nativeElement.querySelector('.plain-content').parentElement.querySelector('.k-dt-toolbar'),null);
 }finally{consumer.destroy();}
 console.log('Data Table package contract passed: sorting/nulls, search, OR filters, page selection/indeterminate, visibility, defaults, loading/error/empty, updates, cards, custom cells/details, compound composition, bulk callbacks/outputs.');
}finally{if(!fixture.componentRef.hostView.destroyed)fixture.destroy();TestBed.resetTestingModule();dom.window.close();}
