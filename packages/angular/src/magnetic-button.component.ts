// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, signal } from '@angular/core';
import { KittuActionController } from './port-controllers';

@Component({
 selector:"kittu-magnetic-button", standalone:true,
 host:{'data-kittu':"magnetic-button",style:'display:block;min-width:0'},
 template:`
<div class="kittu-control kittu-stack">
<button type="button" class="k-action" [disabled]="blocked()" [style.transform]="transform()" (pointermove)="move($event)" (pointerleave)="reset()" (pointercancel)="reset()" (blur)="reset()" (click)="run()">
<ng-content>{{label()||'A little attraction'}}</ng-content>
</button>
<p role="status" class="kittu-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</div>
`
})
export class KittuMagneticButtonComponent extends KittuActionController {
readonly strength=input(.35);readonly transform=signal('translate(0,0)');move(event:PointerEvent):void{if(this.blocked()||event.pointerType==='touch'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=(event.currentTarget as HTMLElement).getBoundingClientRect();const s=Math.max(0,Math.min(1,this.strength()));this.transform.set('translate('+Math.max(-24,Math.min(24,(event.clientX-r.left-r.width/2)*s))+'px,'+Math.max(-24,Math.min(24,(event.clientY-r.top-r.height/2)*s))+'px)');}reset():void{this.transform.set('translate(0,0)');}
}
