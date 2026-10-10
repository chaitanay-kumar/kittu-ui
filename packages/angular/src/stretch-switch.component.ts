// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, model } from '@angular/core';

@Component({
 selector:"kittu-stretch-switch", standalone:true,
 host:{'data-kittu':"stretch-switch",style:'display:block;min-width:0'},
 template:`
<label class="kittu-control k-toggle">
<input type="checkbox" role="switch" [checked]="checked()" [disabled]="disabled()" (change)="checked.set($any($event.target).checked)" />
<span class="k-toggle-track" aria-hidden="true">
<span>✓</span>
</span>
<span>{{label()||'Stretch switch'}}</span>
</label>
`
})
export class KittuStretchSwitchComponent {
readonly checked=model(false);readonly disabled=input(false);readonly label=input('');
}
