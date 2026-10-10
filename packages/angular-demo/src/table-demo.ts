import { Component, DestroyRef, TemplateRef, computed, inject, signal, viewChild } from '@angular/core';
import { KitAdvancedDataTableComponent } from 'kit-ui-angular';
import type { ColumnDef, DataTableCellContext, DataTableRowContext } from 'kit-ui-angular';
import { SAMPLE_COMPONENTS_DATA, type ComponentRecord } from './table-data';

@Component({selector:'kit-table-demo',standalone:true,imports:[KitAdvancedDataTableComponent],styleUrls:['./table-demo.css'],template:`
<div class="k-dt-demo">
@if(actionMessage()){<div class="k-dt-demo-message" role="status"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>{{actionMessage()}}</div>}
<kit-advanced-data-table title="Component Registry" [data]="data()" [columns]="columns()" [defaultPageSize]="5" [onBulkDelete]="deleteRecords" [onBulkExport]="exportRecords" [renderSubComponent]="details()"/>
<ng-template #nameCell let-row><div class="k-dt-demo-name"><span>{{row.name}}</span>@if(row.status==='New'){<span class="k-dt-demo-new">New</span>}</div></ng-template>
<ng-template #categoryCell let-value="value"><span class="k-dt-demo-muted">{{value}}</span></ng-template>
<ng-template #downloadsCell let-value="value"><span class="k-dt-demo-downloads">{{value}}</span></ng-template>
<ng-template #sizeCell let-value="value"><span class="k-dt-demo-muted k-dt-demo-numeric">{{value}}</span></ng-template>
<ng-template #statusCell let-value="value"><span class="k-dt-demo-status"><i [class]="'k-dt-demo-dot k-dt-demo-'+value"></i>{{value}}</span></ng-template>
<ng-template #detailsTemplate let-row><div class="k-dt-demo-spec"><div class="k-dt-demo-spec-heading"><span>{{row.name}} Specifications</span><span>Author: {{row.author}}</span></div><div class="k-dt-demo-spec-grid"><div><div>Tree-shake efficiency</div><strong>99.4%</strong></div><div><div>Dependencies</div><p>{{row.dependencies.join(', ')}}</p></div><div><div>Verification</div><strong>100% Verified</strong></div></div></div></ng-template>
</div>`})
export class TableDemoComponent {
 readonly data=signal<ComponentRecord[]>([...SAMPLE_COMPONENTS_DATA]);
 readonly actionMessage=signal<string|null>(null);
 readonly nameCell=viewChild<TemplateRef<DataTableCellContext<ComponentRecord>>>('nameCell');
 readonly categoryCell=viewChild<TemplateRef<DataTableCellContext<ComponentRecord>>>('categoryCell');
 readonly downloadsCell=viewChild<TemplateRef<DataTableCellContext<ComponentRecord>>>('downloadsCell');
 readonly sizeCell=viewChild<TemplateRef<DataTableCellContext<ComponentRecord>>>('sizeCell');
 readonly statusCell=viewChild<TemplateRef<DataTableCellContext<ComponentRecord>>>('statusCell');
 readonly details=viewChild<TemplateRef<DataTableRowContext<ComponentRecord>>>('detailsTemplate');
 readonly columns=computed<ColumnDef<ComponentRecord>[]>(()=>[
 {id:'name',header:'Component',accessorKey:'name',sortable:true,cell:this.nameCell()},
 {id:'category',header:'Category',accessorKey:'category',sortable:true,filterable:true,filterOptions:['Motion','AI','Interactive','Layout','Form'].map(value=>({label:value,value})),cell:this.categoryCell()},
 {id:'downloads',header:'Weekly Installs',accessorKey:'downloads',sortable:true,align:'right',cell:this.downloadsCell()},
 {id:'bundleSize',header:'Gzip Size',accessorKey:'bundleSize',sortable:true,align:'right',cell:this.sizeCell()},
 {id:'status',header:'Status',accessorKey:'status',sortable:true,filterable:true,filterOptions:['Stable','New','Beta'].map(value=>({label:value,value})),cell:this.statusCell()},
 ]);
 private timer?:ReturnType<typeof setTimeout>;
 constructor(){inject(DestroyRef).onDestroy(()=>clearTimeout(this.timer));}
 private message(text:string):void{clearTimeout(this.timer);this.actionMessage.set(text);this.timer=setTimeout(()=>this.actionMessage.set(null),3000);}
 readonly deleteRecords=(ids:string[])=>{this.data.update(rows=>rows.filter(row=>!ids.includes(row.id)));this.message('Removed '+ids.length+' selected record(s) from table.');};
 readonly exportRecords=(ids:string[])=>{this.message('Exported '+this.data().filter(row=>ids.includes(row.id)).length+' records as JSON payload.');};
}
