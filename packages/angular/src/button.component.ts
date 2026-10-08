// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KittuActionController } from './port-controllers';

@Component({
 selector:"kittu-button", standalone:true,
 host:{'data-kittu':"button",style:'display:block;min-width:0'},
 template:`
<div class="kittu-control kittu-stack">
<button class="k-action" type="button" [disabled]="blocked()" [attr.aria-busy]="loading()||busy()" (click)="run()">
<span class="k-button-text">
<ng-content>{{busy()?'Working…':label()||'Continue'}}</ng-content>
</span>
</button>
<p role="status" class="kittu-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</div>
`
})
export class KittuButtonComponent extends KittuActionController {

}
