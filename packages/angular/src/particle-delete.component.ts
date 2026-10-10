// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, signal } from '@angular/core';
import { KitActionController } from './port-controllers';

@Component({
 selector:"kit-particle-delete", standalone:true,
 host:{'data-kit':"particle-delete",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack">@if(!removed()){<article class="kit-surface kit-stack" [class.k-dissolve]="busy()">
<ng-content>
<p>{{label()||'A small item to remove'}}</p>
</ng-content>
<button type="button" [disabled]="blocked()" (click)="remove()">Delete item</button>
</article>}@else{<button type="button" [disabled]="disabled()" (click)="removed.set(false)">Restore preview item</button>}<p role="status" class="kit-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</section>
`
})
export class KitParticleDeleteComponent extends KitActionController {
readonly removed=signal(false);async remove():Promise<void>{const request=this.run();const controller=this.controller;await request;if(controller?.signal.aborted)return;if(!this.error()&&!this.destroyed&&!this.disabled())this.removed.set(true);}
}
