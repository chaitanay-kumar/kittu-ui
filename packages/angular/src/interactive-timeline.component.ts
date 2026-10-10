// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitCollectionController } from './port-controllers';

@Component({
 selector:"kit-interactive-timeline", standalone:true,
 host:{'data-kit':"interactive-timeline",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-surface kit-stack">
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
</li>}@empty{<li>No matching events.</li>}</ol>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kit-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KitInteractiveTimelineComponent extends KitCollectionController {

}
