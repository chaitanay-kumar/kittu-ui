// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component } from '@angular/core';
import { KittuCanvasController } from './port-canvas';

@Component({
 selector:"kittu-evil-eye", standalone:true,
 host:{'data-kittu':"evil-eye",style:'display:block;min-width:0'},
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
export class KittuEvilEyeComponent extends KittuCanvasController {
override readonly mode='eye';
}
