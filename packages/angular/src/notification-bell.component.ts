// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitCollectionController } from './port-controllers';

@Component({
 selector:"kit-notification-bell", standalone:true,
 host:{'data-kit':"notification-bell",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack">
<button type="button" [disabled]="loading()||disabled()" [attr.aria-expanded]="open()" (click)="open.set(!open())">♧ {{label()||'Notifications'}} ({{visible().length}})</button>@if(open()){<div class="k-notification-stack">@for(item of visible();track item.id){<article class="kit-surface kit-stack">
<strong>{{item.label}}</strong>
<p>{{item.description}}</p>
<div class="kit-row">
<button type="button" [disabled]="loading()||disabled()" (click)="dismiss(item)">Dismiss <span class="sr-only">{{item.label}}</span>
</button>
</div>
</article>}@empty{<p>No notifications.</p>}</div>}@if(dismissed().length){<button type="button" (click)="undo()" [disabled]="loading()||disabled()">Restore notifications</button>}@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kit-status">{{busy()?'Working…':status()}}</p>
</section>
`
})
export class KitNotificationBellComponent extends KitCollectionController {

}
