// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, input, model, output } from '@angular/core';
import type { KittuPlan } from './port-types';

@Component({
 selector:"kittu-pricing", standalone:true,
 host:{'data-kittu':"pricing",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-stack">
<label class="kittu-row">
<input type="checkbox" [checked]="yearly()" [disabled]="disabled()" (change)="yearly.set($any($event.target).checked)" />Yearly billing · {{yearlyDiscount()}}% discount</label>
<div class="k-pricing">@for(plan of plans();track plan.id){<article class="kittu-surface kittu-stack" [class.k-featured]="plan.featured">
<h3>{{plan.label}}</h3>
<p class="k-price">{{price(plan)}} <small>/{{yearly()?'year':'month'}}</small>
</p>
<ul>@for(feature of plan.features;track $index){<li>{{feature}}</li>}</ul>
<button type="button" [disabled]="disabled()" (click)="planSelect.emit({plan,yearly:yearly()})">Choose {{plan.label}}</button>
</article>}</div>
</section>
`
})
export class KittuPricingComponent {
readonly plans=input<KittuPlan[]>([{id:'starter',label:'Starter',price:12,features:['Core components','One workspace']},{id:'team',label:'Team',price:24,features:['Shared workspace','Team controls'],featured:true}]);readonly yearly=model(false);readonly yearlyDiscount=input(20);readonly currency=input('USD');readonly disabled=input(false);readonly planSelect=output<{plan:KittuPlan;yearly:boolean}>();price(plan:KittuPlan):string{const value=this.yearly()?plan.price*12*(1-Math.max(0,Math.min(100,this.yearlyDiscount()))/100):plan.price;try{return new Intl.NumberFormat('en',{style:'currency',currency:this.currency()}).format(value);}catch{return value.toFixed(2)+' '+this.currency();}}
}
