// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component } from '@angular/core';
import { KittuCollectionController } from './port-controllers';
import type { KittuItem } from './port-types';

@Component({
 selector:"kittu-batch-gesture-tray", standalone:true,
 host:{'data-kittu':"batch-gesture-tray",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-surface kittu-stack">
<h3>{{label()||'Batch selection'}}</h3>
<div class="kittu-row">
<button type="button" [disabled]="loading()||disabled()||busy()" (click)="selectedIds.set(items().filter(enabled).map(itemId))">Select all</button>
<button type="button" [disabled]="loading()||disabled()||busy()" (click)="selectedIds.set([])">Clear selection</button>
</div>@for(item of items();track item.id){<label class="kittu-row">
<input type="checkbox" [checked]="selectedIds().includes(item.id)" [disabled]="loading()||disabled()||busy()||item.disabled" (change)="choose(item)" />
<span>{{item.label}}</span>
</label>}<div class="k-tray">
<span>{{selectedIds().length}} selected</span>
<button type="button" [disabled]="loading()||disabled()||busy()||!selectedIds().length" (click)="execute()">{{busy()?'Applying…':'Apply to selected'}}</button>
</div>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kittu-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KittuBatchGestureTrayComponent extends KittuCollectionController {
readonly enabled=(item:KittuItem)=>!item.disabled;readonly itemId=(item:KittuItem)=>item.id;
}
