// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input } from '@angular/core';

@Component({
 selector:"kit-intro-loader", standalone:true,
 host:{'data-kit':"intro-loader",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack" [attr.aria-busy]="loading()">
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
export class KitIntroLoaderComponent {
readonly label=input('Loading…');readonly loading=input(true);readonly paused=input(false);
}
