// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, model } from '@angular/core';

@Component({
 selector:"kit-focus-mode", standalone:true,
 host:{'data-kit':"focus-mode",style:'display:block;min-width:0'},
 template:`
<section class="kit-control k-focus" [class.k-focused]="active()" (keydown.escape)="active.set(false)">
<button type="button" [disabled]="disabled()" [attr.aria-pressed]="active()" (click)="active.set(!active())">{{active()?'Exit focus mode':'Enter focus mode'}}</button>
<article class="kit-surface kit-stack">
<h3>{{label()}}</h3>
<ng-content>
<p>Keep the next step small and intentional.</p>
</ng-content>
</article>
</section>
`
})
export class KitFocusModeComponent {
readonly active=model(false);readonly disabled=input(false);readonly label=input('One thing at a time');
}
