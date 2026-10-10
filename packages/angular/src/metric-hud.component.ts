// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, computed, input } from '@angular/core';

@Component({
 selector:"kittu-metric-hud", standalone:true,
 host:{'data-kittu':"metric-hud",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-surface kittu-stack" [attr.aria-busy]="loading()">
<h3>{{label()}}</h3>
<output class="k-number">{{loading()?'—':value()}}{{unit()}}</output>
<progress [attr.aria-label]="label()+' progress'" [max]="safeMax()" [value]="bounded()">
</progress>
<p>{{trend()>=0?'↑':'↓'}} {{trend()}}%</p>@if(error()){<p role="alert">{{error()}}</p>}<ng-content>
</ng-content>
</section>
`
})
export class KittuMetricHudComponent {
readonly label=input('Weekly momentum');readonly value=input(72);readonly max=input(100);readonly unit=input('%');readonly trend=input(12);readonly loading=input(false);readonly error=input('');readonly safeMax=computed(()=>Math.max(1,this.max()));readonly bounded=computed(()=>Math.max(0,Math.min(this.safeMax(),this.value())));
}
