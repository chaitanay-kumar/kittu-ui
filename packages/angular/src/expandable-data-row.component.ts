// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitCollectionController } from './port-controllers';

@Component({
 selector:"kit-expandable-data-row", standalone:true,
 host:{'data-kit':"expandable-data-row",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-surface kit-stack">
<h3>{{label()||'Data details'}}</h3>@for(item of items();track item.id){<details class="k-disclosure">
<summary [attr.aria-disabled]="disabled()" [tabIndex]="disabled()?-1:0" (click)="disabled()&&$event.preventDefault()">{{item.label}} @if(item.value!==undefined){<span>{{item.value}}</span>}</summary>
<div class="kit-stack">
<p>{{item.description}}</p>
<ng-content>
</ng-content>
</div>
</details>}@empty{<p>No items yet.</p>}@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kit-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KitExpandableDataRowComponent extends KitCollectionController {

}
