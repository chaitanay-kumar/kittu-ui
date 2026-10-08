// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, model } from '@angular/core';

@Component({
 selector:"kittu-morphing-icon", standalone:true,
 host:{'data-kittu':"morphing-icon",style:'display:block;min-width:0'},
 template:`
<button type="button" class="kittu-button k-icon-toggle" [disabled]="disabled()" [attr.aria-label]="label()" [attr.aria-pressed]="active()" (click)="active.set(!active())">
<svg viewBox="0 0 32 32" width="36" height="36" [class.k-active]="active()" aria-hidden="true">
<path class="k-icon-top" d="M5 8H27"/>
<path class="k-icon-mid" d="M5 16H27"/>
<path class="k-icon-bottom" d="M5 24H27"/>
</svg>
</button>
`
})
export class KittuMorphingIconComponent {
readonly active=model(false);readonly disabled=input(false);readonly label=input('Toggle menu icon');
}
