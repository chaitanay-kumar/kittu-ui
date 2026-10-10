// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component } from '@angular/core';
import { KittuCollectionController } from './port-controllers';

@Component({
 selector:"kittu-interactive-timeline", standalone:true,
 host:{'data-kittu':"interactive-timeline",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-surface kittu-stack">
<h3>{{label()||'Your timeline'}}</h3>
<label>Filter events<input type="search" [value]="query()" (input)="search($event)" [disabled]="loading()||disabled()" />
</label>
<ol class="k-timeline">@for(item of visible();track item.id){<li>
<details>
<summary [attr.aria-disabled]="disabled()" [tabIndex]="disabled()?-1:0" (click)="disabled()&&$event.preventDefault()">
<span class="k-event-dot" aria-hidden="true">
</span>{{item.label}} <small>{{item.status||item.value}}</small>
</summary>
<p>{{item.description}}</p>
<button type="button" [disabled]="loading()||disabled()||item.disabled" (click)="select(item)">Inspect event</button>
</details>
</li>}@empty{<li>No matching events.</li>}</ol>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kittu-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KittuInteractiveTimelineComponent extends KittuCollectionController {

}
