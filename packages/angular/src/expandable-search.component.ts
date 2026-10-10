// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitCollectionController } from './port-controllers';

@Component({
 selector:"kit-expandable-search", standalone:true,
 host:{'data-kit':"expandable-search",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-surface kit-stack">
<label>{{label()||'Find a component'}}<input type="search" [value]="query()" [disabled]="loading()||disabled()" (input)="search($event)" />
</label>@if(query()){<button type="button" (click)="query.set('')">Clear search</button>}<div class="kit-stack" (keydown)="keys($event)">@for(item of visible();track item.id){<button type="button" data-item [disabled]="loading()||disabled() || item.disabled" [attr.aria-pressed]="current()?.id===item.id" (click)="select(item)">{{item.label}}</button>}@empty{<p role="status">No matching results.</p>}</div>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kit-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KitExpandableSearchComponent extends KitCollectionController {

}
