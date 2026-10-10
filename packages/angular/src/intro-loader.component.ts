// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input } from '@angular/core';

@Component({
 selector:"kittu-intro-loader", standalone:true,
 host:{'data-kittu':"intro-loader",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-stack" [attr.aria-busy]="loading()">
<div class="k-loader k-intro-loader" [class.k-paused]="paused()||!loading()" aria-hidden="true">
<span>
</span>
<span>
</span>
<span>
</span>
</div>
<p role="status">{{loading()?label():'Ready.'}}</p>
<ng-content>
</ng-content>
</section>
`
})
export class KittuIntroLoaderComponent {
readonly label=input('Loading…');readonly loading=input(true);readonly paused=input(false);
}
