// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, model } from '@angular/core';
import { KittuActionController } from './port-controllers';

@Component({
 selector:"kittu-drag-to-confirm", standalone:true,
 host:{'data-kittu':"drag-to-confirm",style:'display:block;min-width:0'},
 template:`
<div class="kittu-control kittu-stack">
<label>{{label()||'Slide to confirm'}}<input type="range" min="0" max="100" [value]="value()" [disabled]="blocked()" aria-label="Confirmation progress" [attr.aria-valuetext]="value()+' percent'" (input)="value.set(+$any($event.target).value)" (change)="finish()" />
</label>
<button type="button" [disabled]="blocked()||value()<100" (click)="run()">Confirm</button>
<p role="status" class="kittu-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</div>
`
})
export class KittuDragToConfirmComponent extends KittuActionController {
readonly value=model(0);finish():void{if(this.value()>=100)void this.run();else this.value.set(0);}
}
