// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input } from '@angular/core';
import { KitCollectionController } from './port-controllers';
import type { KitItem } from './port-types';

@Component({
 selector:"kit-story-card", standalone:true,
 host:{'data-kit':"story-card",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack">
<h3>{{label()||'Your stories'}}</h3>
<div class="k-cards k-stories">@for(item of items();track item.id){<article class="k-card kit-surface" [class.k-active]="current()?.id===item.id" (pointermove)="spot($event)" (pointerleave)="clearSpot($event)">
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
export class KitStoryCardComponent extends KitCollectionController {
spot(event:PointerEvent):void{if(this.disabled())return;const el=event.currentTarget as HTMLElement;const r=el.getBoundingClientRect();el.style.setProperty('--spot-x',(event.clientX-r.left)+'px');el.style.setProperty('--spot-y',(event.clientY-r.top)+'px');}clearSpot(event:PointerEvent):void{(event.currentTarget as HTMLElement).style.removeProperty('--spot-x');}
override readonly items=input<KitItem[]>([{"id":"beginning","label":"A small beginning","value":"Chapter 01","description":"Every useful idea starts with a question."},{"id":"rhythm","label":"Find the rhythm","value":"Chapter 02","description":"Build, test and follow the details."},{"id":"share","label":"Ready to share","value":"Chapter 03","description":"Bring the finished pieces together."}]);
}
