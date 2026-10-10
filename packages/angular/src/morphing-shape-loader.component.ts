// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input } from '@angular/core';

@Component({
 selector:"kit-morphing-shape-loader", standalone:true,
 host:{'data-kit':"morphing-shape-loader",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack" [attr.aria-busy]="loading()">
<div class="k-loader k-shape-loader" [class.k-paused]="paused()||!loading()" aria-hidden="true">
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
export class KitMorphingShapeLoaderComponent {
readonly label=input('Loading…');readonly loading=input(true);readonly paused=input(false);
}
