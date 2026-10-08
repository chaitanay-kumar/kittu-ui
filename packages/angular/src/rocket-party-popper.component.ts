// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { KittuCanvasController } from './port-canvas';

@Component({
 selector:"kittu-rocket-party-popper", standalone:true,
 host:{'data-kittu':"rocket-party-popper",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-stack">
<div class="k-canvas-wrap" (pointermove)="move($event)">
<canvas #canvas role="img" [attr.aria-label]="label()" [style.opacity]="active()?1:.15">
</canvas>
</div>
<div class="kittu-row">
<button type="button" [disabled]="disabled()" (click)="launch()">Launch celebration</button>
<button type="button" [disabled]="disabled()" (click)="running.set(!running())">{{running()?'Pause':'Resume'}}</button>
</div>
<p role="status">{{active()?'Celebration launched.':''}}</p>
</section>
`
})
export class KittuRocketPartyPopperComponent extends KittuCanvasController {
override readonly mode='rocket';readonly active=signal(false);readonly triggered=output<void>();private stopTimer:ReturnType<typeof setTimeout>|undefined;constructor(){super();this.running.set(false);inject(DestroyRef).onDestroy(()=>clearTimeout(this.stopTimer));}launch():void{if(this.disabled())return;clearTimeout(this.stopTimer);this.active.set(true);this.running.set(true);this.triggered.emit();this.stopTimer=setTimeout(()=>{this.active.set(false);this.running.set(false);},3000);}
}
