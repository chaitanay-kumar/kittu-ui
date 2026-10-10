// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, input } from '@angular/core';
import { KittuCollectionController } from './port-controllers';
import type { KittuItem } from './port-types';

@Component({
 selector:"kittu-profile-card", standalone:true,
 host:{'data-kittu':"profile-card",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-stack">
<h3>{{label()||'Alex Morgan'}}</h3>
<div class="k-cards k-profile">@for(item of items();track item.id){<article class="k-card kittu-surface" [class.k-active]="current()?.id===item.id" (pointermove)="spot($event)" (pointerleave)="clearSpot($event)">
<span class="k-avatar" aria-hidden="true">{{item.label.slice(0,2)}}</span>
<button type="button" [disabled]="loading()||disabled()||item.disabled" [attr.aria-expanded]="expanded().includes(item.id)" (click)="select(item);toggle(item.id)">{{item.label}}</button>
<p>{{item.value}}</p>
<div [hidden]="!expanded().includes(item.id)">
<p>{{item.description}}</p>
<ng-content>
</ng-content>
<button type="button" [disabled]="loading()||disabled()||busy()||item.disabled" (click)="execute([item])">Select {{item.label}}</button>
</div>
</article>}</div>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kittu-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KittuProfileCardComponent extends KittuCollectionController {
spot(event:PointerEvent):void{if(this.disabled())return;const el=event.currentTarget as HTMLElement;const r=el.getBoundingClientRect();el.style.setProperty('--spot-x',(event.clientX-r.left)+'px');el.style.setProperty('--spot-y',(event.clientY-r.top)+'px');}clearSpot(event:PointerEvent):void{(event.currentTarget as HTMLElement).style.removeProperty('--spot-x');}
override readonly items=input<KittuItem[]>([{"id":"alex","label":"Alex Morgan","value":"Product designer","description":"Building thoughtful interfaces, one small detail at a time."}]);
}
