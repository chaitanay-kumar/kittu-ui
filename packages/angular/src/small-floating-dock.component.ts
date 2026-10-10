// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KittuCollectionController } from './port-controllers';

@Component({
 selector:"kittu-small-floating-dock", standalone:true,
 host:{'data-kittu':"small-floating-dock",style:'display:block;min-width:0'},
 template:`
<div class="kittu-control kittu-stack">
<nav class="k-nav k-small-dock" aria-label="small-floating-dock"  (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item [attr.aria-current]="current()?.id===item.id?'page':null" [disabled]="loading()||disabled()||item.disabled" (click)="select(item)">{{item.label}}</button>}</nav>
<section >
<ng-content>
<p>{{current()?.description}}</p>
</ng-content>
</section>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kittu-status">{{busy()?'Working…':status()}}</p>
</div>
`
})
export class KittuSmallFloatingDockComponent extends KittuCollectionController {

}
