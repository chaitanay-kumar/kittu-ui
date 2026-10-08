// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KittuCollectionController } from './port-controllers';

@Component({
 selector:"kittu-animated-tabs", standalone:true,
 host:{'data-kittu':"animated-tabs",style:'display:block;min-width:0'},
 template:`
<div class="kittu-control kittu-stack">
<nav class="k-nav k-tabs" aria-label="animated-tabs" role="tablist" (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item role="tab" [tabIndex]="current()?.id===item.id?0:-1" [attr.aria-selected]="current()?.id===item.id" [id]="uid+'-tab-'+item.id" [attr.aria-controls]="uid+'-panel'" [disabled]="loading()||disabled()||item.disabled" (click)="select(item)">{{item.label}}</button>}</nav>
<section role="tabpanel" [id]="uid+'-panel'" [attr.aria-labelledby]="uid+'-tab-'+current()?.id">
<ng-content>
<p>{{current()?.description}}</p>
</ng-content>
</section>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kittu-status">{{busy()?'Working…':status()}}</p>
</div>
`
})
export class KittuAnimatedTabsComponent extends KittuCollectionController {

}
