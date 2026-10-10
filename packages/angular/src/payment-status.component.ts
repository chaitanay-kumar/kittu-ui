// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, output } from '@angular/core';

@Component({
 selector:"kit-payment-status", standalone:true,
 host:{'data-kit':"payment-status",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-surface kit-stack" [attr.aria-busy]="state()==='pending'">
<span class="k-payment-icon" aria-hidden="true">{{state()==='success'?'✓':state()==='error'?'!':'◌'}}</span>
<h3>{{label()}}</h3>
<p role="status">{{state()==='pending'?'Processing payment…':state()==='success'?'Payment completed.':state()==='error'?'Payment failed.': 'Ready for payment.'}}</p>@if(state()==='error'){<button type="button" [disabled]="disabled()" (click)="retry.emit()">Retry payment</button>}<ng-content>
</ng-content>
</section>
`
})
export class KitPaymentStatusComponent {
readonly state=input<'idle'|'pending'|'success'|'error'>('idle');readonly label=input('Payment status');readonly disabled=input(false);readonly retry=output<void>();
}
