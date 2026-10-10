// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, signal } from '@angular/core';
import { KittuActionController } from './port-controllers';

@Component({
 selector:"kittu-particle-delete", standalone:true,
 host:{'data-kittu':"particle-delete",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-stack">@if(!removed()){<article class="kittu-surface kittu-stack" [class.k-dissolve]="busy()">
<ng-content>
<p>{{label()||'A small item to remove'}}</p>
</ng-content>
<button type="button" [disabled]="blocked()" (click)="remove()">Delete item</button>
</article>}@else{<button type="button" [disabled]="disabled()" (click)="removed.set(false)">Restore preview item</button>}<p role="status" class="kittu-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</section>
`
})
export class KittuParticleDeleteComponent extends KittuActionController {
readonly removed=signal(false);async remove():Promise<void>{const request=this.run();const controller=this.controller;await request;if(controller?.signal.aborted)return;if(!this.error()&&!this.destroyed&&!this.disabled())this.removed.set(true);}
}
