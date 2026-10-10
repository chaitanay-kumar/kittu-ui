// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, input, model } from '@angular/core';
import type { KittuItem } from './port-types';

@Component({
 selector:"kittu-payment-receipt-printer", standalone:true,
 host:{'data-kittu':"payment-receipt-printer",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-surface kittu-stack">
<h3>{{label()}}</h3>
<button type="button" [disabled]="disabled()" [attr.aria-expanded]="printed()" (click)="printed.set(!printed())">{{printed()?'Retract receipt':'Print receipt preview'}}</button>@if(printed()){<article class="k-receipt">
<h3>{{merchant()}}</h3>
<p>{{reference()}}</p>@for(item of items();track item.id){<div class="kittu-row">
<span>{{item.label}}</span>
<span>{{currency()}} {{item.value}}</span>
</div>}<hr />
<strong>Total: {{currency()}} {{total()}}</strong>
<ng-content>
</ng-content>
</article>}</section>
`
})
export class KittuPaymentReceiptPrinterComponent {
readonly label=input('Your receipt');readonly merchant=input('Kit workspace');readonly reference=input('Receipt preview');readonly currency=input('USD');readonly items=input<KittuItem[]>([{id:'subscription',label:'Workspace plan',value:24}]);readonly total=input(24);readonly disabled=input(false);readonly printed=model(false);
}
