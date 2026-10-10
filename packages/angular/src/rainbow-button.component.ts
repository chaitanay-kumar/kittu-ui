// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitActionController } from './port-controllers';

@Component({
 selector:"kit-rainbow-button", standalone:true,
 host:{'data-kit':"rainbow-button",style:'display:block;min-width:0'},
 template:`
<div class="kit-control kit-stack">
<button class="k-action" type="button" [disabled]="blocked()" [attr.aria-busy]="loading()||busy()" (click)="run()">
<span class="k-button-text">
<ng-content>{{busy()?'Working…':label()||'Make something colorful'}}</ng-content>
</span>
</button>
<p role="status" class="kit-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</div>
`
})
export class KitRainbowButtonComponent extends KitActionController {

}
