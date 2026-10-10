// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, signal } from '@angular/core';
import { KittuActionController } from './port-controllers';

@Component({
 selector:"kittu-pull-to-refresh", standalone:true,
 host:{'data-kittu':"pull-to-refresh",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-surface kittu-stack">
<div class="k-pull" style="touch-action:pan-x" (pointerdown)="start($event)" (pointermove)="pull($event)" (pointerup)="release()" (pointercancel)="distance.set(0)" [style.padding-top.px]="distance()">
<strong>{{distance()>65?'Release to refresh':'Pull down to refresh'}}</strong>
<ng-content>
<p class="kittu-muted">Your latest updates appear here.</p>
</ng-content>
</div>
<button type="button" [disabled]="blocked()" (click)="run()">{{busy()?'Refreshing…':label()||'Refresh'}}</button>
<p role="status" class="kittu-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</section>
`
})
export class KittuPullToRefreshComponent extends KittuActionController {
readonly distance=signal(0);private startY:number|undefined;start(event:PointerEvent):void{if(this.blocked()||event.button!==0)return;this.startY=event.clientY;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);}pull(event:PointerEvent):void{if(this.startY!==undefined)this.distance.set(Math.max(0,Math.min(100,(event.clientY-this.startY)*.5)));}release():void{if(this.distance()>65)void this.run();this.startY=undefined;this.distance.set(0);}
}
