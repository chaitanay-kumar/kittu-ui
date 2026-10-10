// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, model } from '@angular/core';

@Component({
 selector:"kit-draw-checkbox", standalone:true,
 host:{'data-kit':"draw-checkbox",style:'display:block;min-width:0'},
 template:`
<label class="kit-control k-toggle">
<input type="checkbox" role="checkbox" [checked]="checked()" [disabled]="disabled()" (change)="checked.set($any($event.target).checked)" />
<span class="k-toggle-track" aria-hidden="true">
<span>✓</span>
</span>
<span>{{label()||'Mark as complete'}}</span>
</label>
`
})
export class KitDrawCheckboxComponent {
readonly checked=model(false);readonly disabled=input(false);readonly label=input('');
}
