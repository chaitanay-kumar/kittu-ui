// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, model, output } from '@angular/core';
import type { KitPlan } from './port-types';

@Component({
 selector:"kit-pricing", standalone:true,
 host:{'data-kit':"pricing",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack">
<label class="kit-row">
<input type="checkbox" [checked]="yearly()" [disabled]="disabled()" (change)="yearly.set($any($event.target).checked)" />Yearly billing · {{yearlyDiscount()}}% discount</label>
<div class="k-pricing">@for(plan of plans();track plan.id){<article class="kit-surface kit-stack" [class.k-featured]="plan.featured">
<h3>{{plan.label}}</h3>
<p class="k-price">{{price(plan)}} <small>/{{yearly()?'year':'month'}}</small>
</p>
<ul>@for(feature of plan.features;track $index){<li>{{feature}}</li>}</ul>
<button type="button" [disabled]="disabled()" (click)="planSelect.emit({plan,yearly:yearly()})">Choose {{plan.label}}</button>
</article>}</div>
</section>
`
})
export class KitPricingComponent {
readonly plans=input<KitPlan[]>([{id:'starter',label:'Starter',price:12,features:['Core components','One workspace']},{id:'team',label:'Team',price:24,features:['Shared workspace','Team controls'],featured:true}]);readonly yearly=model(false);readonly yearlyDiscount=input(20);readonly currency=input('USD');readonly disabled=input(false);readonly planSelect=output<{plan:KitPlan;yearly:boolean}>();price(plan:KitPlan):string{const value=this.yearly()?plan.price*12*(1-Math.max(0,Math.min(100,this.yearlyDiscount()))/100):plan.price;try{return new Intl.NumberFormat('en',{style:'currency',currency:this.currency()}).format(value);}catch{return value.toFixed(2)+' '+this.currency();}}
}
