// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitCanvasController } from './port-canvas';

@Component({
 selector:"kit-meteors", standalone:true,
 host:{'data-kit':"meteors",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack">
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
export class KitMeteorsComponent extends KitCanvasController {
override readonly mode='meteors';
}
