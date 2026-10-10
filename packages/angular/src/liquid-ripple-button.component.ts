// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, signal } from '@angular/core';
import { KitActionController } from './port-controllers';

@Component({
 selector:"kit-liquid-ripple-button", standalone:true,
 host:{'data-kit':"liquid-ripple-button",style:'display:block;min-width:0'},
 template:`
<div class="kit-control kit-stack">
<button type="button" class="k-action k-ripple" [disabled]="blocked()" (click)="ripple($event)">@for(point of [point()];track point.key){<span aria-hidden="true" class="k-ripple-dot" [style.left.px]="point.x" [style.top.px]="point.y">
</span>}<span>{{label()||'Make a ripple'}}</span>
</button>
<p role="status" class="kit-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</div>
`
})
export class KitLiquidRippleButtonComponent extends KitActionController {
readonly point=signal({x:0,y:0,key:0});ripple(event:MouseEvent):void{const r=(event.currentTarget as HTMLElement).getBoundingClientRect();this.point.set({x:event.detail?event.clientX-r.left:r.width/2,y:event.detail?event.clientY-r.top:r.height/2,key:this.point().key+1});void this.run();}
}
