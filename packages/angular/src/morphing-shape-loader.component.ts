// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input } from '@angular/core';

@Component({
 selector:"kittu-morphing-shape-loader", standalone:true,
 host:{'data-kittu':"morphing-shape-loader",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-stack" [attr.aria-busy]="loading()">
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
export class KittuMorphingShapeLoaderComponent {
readonly label=input('Loading…');readonly loading=input(true);readonly paused=input(false);
}
