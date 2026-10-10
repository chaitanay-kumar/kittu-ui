// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, output } from '@angular/core';

@Component({
 selector:"kit-not-found", standalone:true,
 host:{'data-kit':"not-found",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-surface kit-stack k-empty">
<strong class="k-error-code">{{code()}}</strong>
<h3>{{title()}}</h3>
<p>{{description()}}</p>
<button type="button" [disabled]="disabled()" (click)="recover.emit()">{{actionLabel()}}</button>
<ng-content>
</ng-content>
</section>
`
})
export class KitNotFoundComponent {
readonly code=input('404');readonly title=input('We could not find that page');readonly description=input('Try another path or return to your workspace.');readonly actionLabel=input('Go back');readonly disabled=input(false);readonly recover=output<void>();
}
