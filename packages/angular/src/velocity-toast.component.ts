// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, input } from '@angular/core';
import { KittuCollectionController } from './port-controllers';
import type { KittuItem } from './port-types';

@Component({
 selector:"kittu-velocity-toast", standalone:true,
 host:{'data-kittu':"velocity-toast",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-stack">
<div class="k-notification-stack">@for(item of visible();track item.id){<article class="kittu-surface kittu-stack">
<strong>{{label()||'Update available'}}</strong>
<p>{{item.description}}</p>
<div class="kittu-row">
<button type="button" [disabled]="loading()||disabled()" (click)="dismiss(item)">Dismiss <span class="sr-only">{{item.label}}</span>
</button>
</div>
</article>}@empty{<p>No notifications.</p>}</div>@if(dismissed().length){<button type="button" (click)="undo()" [disabled]="loading()||disabled()">Restore notifications</button>}@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kittu-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KittuVelocityToastComponent extends KittuCollectionController {
override readonly items=input<KittuItem[]>([{id:'notice',label:'Update available',description:'A local notification. Connect actions to your application.'}]);
}
