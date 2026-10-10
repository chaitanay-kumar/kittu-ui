// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component } from '@angular/core';
import { KittuCollectionController } from './port-controllers';

@Component({
 selector:"kittu-car-smoke-page-transition", standalone:true,
 host:{'data-kittu':"car-smoke-page-transition",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-stack">
<nav class="kittu-row" (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item [disabled]="loading()||disabled() || item.disabled" [attr.aria-pressed]="current()?.id===item.id" (click)="select(item)">{{item.label}}</button>}</nav>
<div class="k-road" aria-hidden="true">
<span class="k-car">▰</span>
<span class="k-smoke">
</span>
</div>@for(item of [current()];track item?.id){<article class="kittu-surface k-page-enter">
<h3>{{item?.label}}</h3>
<p>{{item?.description}}</p>
<ng-content>
</ng-content>
</article>}</section>
`
})
export class KittuCarSmokePageTransitionComponent extends KittuCollectionController {

}
