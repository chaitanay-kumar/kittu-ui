// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KittuCollectionController } from './port-controllers';

@Component({
 selector:"kittu-ios-search-bar", standalone:true,
 host:{'data-kittu':"ios-search-bar",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-surface kittu-stack">
<label>{{label()||'Search your workspace'}}<input type="search" [value]="query()" [disabled]="loading()||disabled()" (input)="search($event)" />
</label>@if(query()){<button type="button" (click)="query.set('')">Clear search</button>}<div class="kittu-stack" (keydown)="keys($event)">@for(item of visible();track item.id){<button type="button" data-item [disabled]="loading()||disabled() || item.disabled" [attr.aria-pressed]="current()?.id===item.id" (click)="select(item)">{{item.label}}</button>}@empty{<p role="status">No matching results.</p>}</div>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kittu-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KittuIosSearchBarComponent extends KittuCollectionController {

}
