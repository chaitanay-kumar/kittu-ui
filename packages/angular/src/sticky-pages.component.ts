// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component } from '@angular/core';
import { KittuCollectionController } from './port-controllers';

@Component({
 selector:"kittu-sticky-pages", standalone:true,
 host:{'data-kittu':"sticky-pages",style:'display:block;min-width:0'},
 template:`
<div class="kittu-control k-scroll-page" tabindex="0" aria-label="Sticky pages">@for(item of items();track item.id){<section class="k-sticky-page">
<h3>{{item.label}}</h3>
<p>{{item.description}}</p>
<ng-content>
</ng-content>
<button type="button" [disabled]="loading()||disabled()||item.disabled" (click)="select(item)">Open {{item.label}}</button>
</section>}</div>
`
})
export class KittuStickyPagesComponent extends KittuCollectionController {

}
