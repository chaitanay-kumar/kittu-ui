// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, signal } from '@angular/core';
import { portId } from './port-controllers';

@Component({
 selector:"kit-directional-tooltip", standalone:true,
 host:{'data-kit':"directional-tooltip",style:'display:block;min-width:0'},
 template:`
<div class="kit-control k-tooltip-wrap" (pointerenter)="show()" (pointerleave)="open.set(false)" (focusin)="show()" (focusout)="open.set(false)" (keydown.escape)="open.set(false)">
<button type="button" [disabled]="disabled()" [attr.aria-describedby]="open()?uid:null" (click)="open.set(!open())">
<ng-content>{{label()}}</ng-content>
</button>
<span role="tooltip" class="k-tooltip" [id]="uid" [attr.data-placement]="placement()" [hidden]="!open()">{{text()}}</span>
</div>
`
})
export class KitDirectionalTooltipComponent {
readonly uid=portId('tooltip');readonly label=input('Hover, focus or tap');readonly text=input('Small details make the difference.');readonly placement=input<'top'|'bottom'|'left'|'right'>('top');readonly disabled=input(false);readonly open=signal(false);show():void{if(!this.disabled())this.open.set(true);}
}
