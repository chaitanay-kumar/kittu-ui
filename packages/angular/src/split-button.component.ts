// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, output } from '@angular/core';
import { KittuActionController } from './port-controllers';
import type { KittuItem } from './port-types';

@Component({
 selector:"kittu-split-button", standalone:true,
 host:{'data-kittu':"split-button",style:'display:block;min-width:0'},
 template:`
<div class="kittu-control kittu-stack">
<div class="kittu-row">
<button type="button" [disabled]="blocked()" (click)="run()">{{label()||'Publish'}}</button>
<details class="k-menu">
<summary [attr.aria-disabled]="disabled()" [tabIndex]="disabled()?-1:0" (click)="disabled()&&$event.preventDefault()">More actions</summary>
<div class="k-menu-panel">@for(option of options();track option.id){<button type="button" [disabled]="blocked()||option.disabled" (click)="choose(option,$event)">{{option.label}}</button>}</div>
</details>
</div>
<p role="status" class="kittu-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</div>
`
})
export class KittuSplitButtonComponent extends KittuActionController {
readonly options=input<KittuItem[]>([{id:'draft',label:'Save draft'},{id:'schedule',label:'Schedule'}]);readonly optionSelect=output<KittuItem>();choose(option:KittuItem,event:Event):void{if(this.blocked()||option.disabled)return;this.optionSelect.emit(option);this.status.set(option.label+' requested.');(event.currentTarget as HTMLElement).closest('details')?.removeAttribute('open');}
}
