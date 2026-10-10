// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitCollectionController } from './port-controllers';

@Component({
 selector:"kit-glass-navbar", standalone:true,
 host:{'data-kit':"glass-navbar",style:'display:block;min-width:0'},
 template:`
<div class="kit-control kit-stack">
<nav class="k-nav k-glass" aria-label="glass-navbar"  (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item [attr.aria-current]="current()?.id===item.id?'page':null" [disabled]="loading()||disabled()||item.disabled" (click)="select(item)">{{item.label}}</button>}</nav>
<section >
<ng-content>
<p>{{current()?.description}}</p>
</ng-content>
</section>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kit-status">{{busy()?'Working…':status()}}</p>
</div>
`
})
export class KitGlassNavbarComponent extends KitCollectionController {

}
