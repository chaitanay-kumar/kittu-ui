// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, input, model } from '@angular/core';

@Component({
 selector:"kittu-draw-checkbox", standalone:true,
 host:{'data-kittu':"draw-checkbox",style:'display:block;min-width:0'},
 template:`
<label class="kittu-control k-toggle">
<input type="checkbox" role="checkbox" [checked]="checked()" [disabled]="disabled()" (change)="checked.set($any($event.target).checked)" />
<span class="k-toggle-track" aria-hidden="true">
<span>✓</span>
</span>
<span>{{label()||'Mark as complete'}}</span>
</label>
`
})
export class KittuDrawCheckboxComponent {
readonly checked=model(false);readonly disabled=input(false);readonly label=input('');
}
