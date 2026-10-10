// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitCollectionController } from './port-controllers';

@Component({
 selector:"kit-stacked-cards", standalone:true,
 host:{'data-kit':"stacked-cards",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack">
<h3>{{label()||'Your collection'}}</h3>
<nav class="kit-row" aria-label="Choose a card" (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item [disabled]="disabled() || item.disabled" [attr.aria-pressed]="current()?.id===item.id" (click)="select(item)">{{item.label}}</button>}</nav>
<div class="k-cards k-stacked">@for(item of items();track item.id){<article class="k-card kit-surface" [class.k-active]="current()?.id===item.id" (pointermove)="spot($event)" (pointerleave)="clearSpot($event)">
<button type="button" [disabled]="loading()||disabled()||item.disabled" [attr.aria-expanded]="expanded().includes(item.id)" (click)="select(item);toggle(item.id)">{{item.label}}</button>
<p>{{item.value}}</p>
<div [hidden]="!expanded().includes(item.id)">
<p>{{item.description}}</p>
<ng-content>
</ng-content>
<button type="button" [disabled]="loading()||disabled()||busy()||item.disabled" (click)="execute([item])">Select {{item.label}}</button>
</div>
</article>}</div>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kit-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KitStackedCardsComponent extends KitCollectionController {
spot(event:PointerEvent):void{if(this.disabled())return;const el=event.currentTarget as HTMLElement;const r=el.getBoundingClientRect();el.style.setProperty('--spot-x',(event.clientX-r.left)+'px');el.style.setProperty('--spot-y',(event.clientY-r.top)+'px');}clearSpot(event:PointerEvent):void{(event.currentTarget as HTMLElement).style.removeProperty('--spot-x');}
}
