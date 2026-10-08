// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, ElementRef, effect, input, model, viewChild } from '@angular/core';
import { portId, KittuActionController } from './port-controllers';

@Component({
 selector:"kittu-settle-modal", standalone:true,
 host:{'data-kittu':"settle-modal",style:'display:block;min-width:0'},
 template:`
<div class="kittu-control kittu-stack">
<button type="button" [disabled]="blocked()" (click)="opened.set(true)">{{label()||'Open dialog'}}</button>
<dialog #dialog class="kittu-dialog kittu-control k-port-dialog" [attr.aria-labelledby]="uid" (close)="opened.set(false)" (cancel)="opened.set(false)">
<div class="kittu-stack">
<h3 [id]="uid">{{title()}}</h3>
<ng-content>
<p>{{description()}}</p>
</ng-content>
<div class="kittu-row">
<button type="button" [disabled]="busy()" (click)="opened.set(false)">Close</button>
<button type="button" [disabled]="blocked()" (click)="confirm()">{{busy()?'Working…':'Confirm'}}</button>
</div>
<p role="status" class="kittu-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</div>
</dialog>
</div>
`
})
export class KittuSettleModalComponent extends KittuActionController {
readonly uid=portId('dialog');readonly title=input('Settle the details');readonly description=input('Your application content belongs here.');readonly opened=model(false);readonly dialog=viewChild<ElementRef<HTMLDialogElement>>('dialog');constructor(){super();effect(()=>{const dialog=this.dialog()?.nativeElement;const opened=this.opened();if(!dialog)return;if(opened&&!dialog.open)dialog.showModal();else if(!opened&&dialog.open)dialog.close();});}async confirm():Promise<void>{const request=this.run();const controller=this.controller;await request;if(controller?.signal.aborted)return;if(!this.error()&&!this.destroyed)this.opened.set(false);}
}
