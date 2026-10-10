// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component } from '@angular/core';
import { KittuCanvasController } from './port-canvas';

@Component({
 selector:"kittu-nimbu-mirchi", standalone:true,
 host:{'data-kittu':"nimbu-mirchi",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-stack">
<div class="k-canvas-wrap" (pointermove)="move($event)" (pointerleave)="reset()">
<canvas #canvas [attr.aria-label]="label()" role="img">
</canvas>
<ng-content>
</ng-content>
</div>
<button type="button" [disabled]="disabled()||paused()" [attr.aria-pressed]="!running()" (click)="running.set(!running())">{{running()?'Pause animation':'Resume animation'}}</button>
</section>
`
})
export class KittuNimbuMirchiComponent extends KittuCanvasController {
override readonly mode='nimbu';
}
