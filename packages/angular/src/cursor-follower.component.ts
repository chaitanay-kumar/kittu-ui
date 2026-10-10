// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, signal } from '@angular/core';

@Component({
 selector:"kit-cursor-follower", standalone:true,
 host:{'data-kit':"cursor-follower",style:'display:block;min-width:0'},
 template:`
<section class="kit-control k-cursor-surface" (pointermove)="move($event)" (pointerleave)="inside.set(false)">
<span aria-hidden="true" class="k-cursor-dot" [style.left.px]="x()" [style.top.px]="y()" [style.opacity]="inside()&&!disabled()?1:0">
</span>
<h3>{{label()}}</h3>
<ng-content>
<p>Move a pointer inside this surface.</p>
</ng-content>
</section>
`
})
export class KitCursorFollowerComponent {
readonly label=input('Follow your curiosity');readonly disabled=input(false);readonly x=signal(0);readonly y=signal(0);readonly inside=signal(false);move(event:PointerEvent):void{if(this.disabled()||event.pointerType==='touch')return;const r=(event.currentTarget as HTMLElement).getBoundingClientRect();this.x.set(event.clientX-r.left);this.y.set(event.clientY-r.top);this.inside.set(true);}
}
