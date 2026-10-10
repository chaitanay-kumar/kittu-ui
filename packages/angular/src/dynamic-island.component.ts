// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitCollectionController } from './port-controllers';

@Component({
 selector:"kit-dynamic-island", standalone:true,
 host:{'data-kit':"dynamic-island",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack">
<div class="k-island">
<button type="button" [disabled]="loading()||disabled()" [attr.aria-expanded]="open()" [attr.aria-controls]="uid" (click)="open.set(!open())">● {{label()||'Workspace activity'}} {{loading()?'· Working':''}}</button>@if(open()){<div class="kit-stack" [id]="uid" (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item [disabled]="loading()||disabled() || item.disabled" [attr.aria-pressed]="current()?.id===item.id" (click)="select(item)">{{item.label}}</button>}</div>}</div>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kit-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KitDynamicIslandComponent extends KitCollectionController {

}
