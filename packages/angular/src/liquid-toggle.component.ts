// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, model } from '@angular/core';

@Component({
 selector:"kit-liquid-toggle", standalone:true,
 host:{'data-kit':"liquid-toggle",style:'display:block;min-width:0'},
 template:`
<label class="kit-control k-toggle">
<input type="checkbox" role="switch" [checked]="checked()" [disabled]="disabled()" (change)="checked.set($any($event.target).checked)" />
<span class="k-toggle-track" aria-hidden="true">
<span>✓</span>
</span>
<span>{{label()||'Liquid toggle'}}</span>
</label>
`
})
export class KitLiquidToggleComponent {
readonly checked=model(false);readonly disabled=input(false);readonly label=input('');
}
