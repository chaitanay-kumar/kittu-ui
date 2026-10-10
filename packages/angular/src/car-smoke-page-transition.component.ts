// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitCollectionController } from './port-controllers';

@Component({
 selector:"kit-car-smoke-page-transition", standalone:true,
 host:{'data-kit':"car-smoke-page-transition",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack">
<nav class="kit-row" (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item [disabled]="loading()||disabled() || item.disabled" [attr.aria-pressed]="current()?.id===item.id" (click)="select(item)">{{item.label}}</button>}</nav>
<div class="k-road" aria-hidden="true">
<span class="k-car">▰</span>
<span class="k-smoke">
</span>
</div>@for(item of [current()];track item?.id){<article class="kit-surface k-page-enter">
<h3>{{item?.label}}</h3>
<p>{{item?.description}}</p>
<ng-content>
</ng-content>
</article>}</section>
`
})
export class KitCarSmokePageTransitionComponent extends KitCollectionController {

}
