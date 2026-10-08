// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KittuCollectionController } from './port-controllers';

@Component({
 selector:"kittu-dynamic-island", standalone:true,
 host:{'data-kittu':"dynamic-island",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-stack">
<div class="k-island">
<button type="button" [disabled]="loading()||disabled()" [attr.aria-expanded]="open()" [attr.aria-controls]="uid" (click)="open.set(!open())">● {{label()||'Workspace activity'}} {{loading()?'· Working':''}}</button>@if(open()){<div class="kittu-stack" [id]="uid" (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item [disabled]="loading()||disabled() || item.disabled" [attr.aria-pressed]="current()?.id===item.id" (click)="select(item)">{{item.label}}</button>}</div>}</div>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kittu-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KittuDynamicIslandComponent extends KittuCollectionController {

}
