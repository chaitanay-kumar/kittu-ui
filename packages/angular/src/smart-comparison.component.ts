// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, computed, input, model, output, signal } from '@angular/core';
import type { KittuPlan, KittuCompareFeature } from './port-types';
import type { KittuCompareCategory } from './port-types';
@Component({
 selector:"kittu-smart-comparison", standalone:true,
 host:{'data-kittu':"smart-comparison",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-surface kittu-stack">
<label>Find a feature<input type="search" [value]="query()" [disabled]="disabled()" (input)="query.set($any($event.target).value)" />
</label>
<label class="kittu-row">
<input type="checkbox" [checked]="differences()" [disabled]="disabled()" (change)="differences.set($any($event.target).checked)" />Show differences only</label>
<div class="k-table-scroll" tabindex="0" aria-label="Plan comparison">
<table>
<thead>
<tr>
<th scope="col">Feature</th>@for(plan of plans();track plan.id){<th scope="col">
<button type="button" [disabled]="disabled()" [attr.aria-pressed]="selected()===plan.id" (click)="selected.set(plan.id);planSelect.emit(plan)">{{plan.label}}</button>
</th>}</tr>
</thead>
<tbody>@for(group of groups();track group.id){<tr>
<th [attr.colspan]="plans().length+1">
<button type="button" [attr.aria-expanded]="!collapsed().includes(group.id)" (click)="toggle(group.id)">{{group.label}}</button>
</th>
</tr>@if(!collapsed().includes(group.id)){@for(feature of filtered(group.features);track feature.id){<tr>
<th scope="row">{{feature.label}}</th>@for(plan of plans();track plan.id){<td>{{cell(feature.values[plan.id])}}</td>}</tr>}@empty{<tr>
<td [attr.colspan]="plans().length+1">No matching features.</td>
</tr>}}}</tbody>
</table>
</div>
</section>
`
})
export class KittuSmartComparisonComponent {
readonly plans=input<KittuPlan[]>([{id:'starter',label:'Starter',price:12,features:[]},{id:'team',label:'Team',price:24,features:[]}]);readonly features=input<KittuCompareFeature[]>([{id:'components',label:'Components',values:{starter:true,team:true}},{id:'members',label:'Members',values:{starter:'1',team:'Unlimited'}},{id:'support',label:'Priority support',values:{starter:false,team:true}}]);readonly categories=input<KittuCompareCategory[]>([]);readonly selected=model('');readonly disabled=input(false);readonly planSelect=output<KittuPlan>();readonly query=signal('');readonly differences=signal(false);readonly collapsed=signal<string[]>([]);readonly groups=computed(()=>this.categories().length?this.categories():[{id:'features',label:'Plan features',features:this.features()}]);filtered(features:KittuCompareFeature[]):KittuCompareFeature[]{return features.filter(f=>f.label.toLowerCase().includes(this.query().toLowerCase())&&(!this.differences()||new Set(this.plans().map(p=>f.values[p.id])).size>1));}cell(value:string|boolean|undefined):string{return value===true?'Included':value===false?'Not included':value??'—';}toggle(id:string):void{this.collapsed.update(a=>a.includes(id)?a.filter(x=>x!==id):[...a,id]);}
}
