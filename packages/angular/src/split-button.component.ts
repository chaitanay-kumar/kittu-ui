// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, output } from '@angular/core';
import { KitActionController } from './port-controllers';
import type { KitItem } from './port-types';

@Component({
 selector:"kit-split-button", standalone:true,
 host:{'data-kit':"split-button",style:'display:block;min-width:0'},
 template:`
<div class="kit-control kit-stack">
<div class="kit-row">
<button type="button" [disabled]="blocked()" (click)="run()">{{label()||'Publish'}}</button>
<details class="k-menu">
<summary [attr.aria-disabled]="disabled()" [tabIndex]="disabled()?-1:0" (click)="disabled()&&$event.preventDefault()">More actions</summary>
<div class="k-menu-panel">@for(option of options();track option.id){<button type="button" [disabled]="blocked()||option.disabled" (click)="choose(option,$event)">{{option.label}}</button>}</div>
</details>
</div>
<p role="status" class="kit-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</div>
`
})
export class KitSplitButtonComponent extends KitActionController {
readonly options=input<KitItem[]>([{id:'draft',label:'Save draft'},{id:'schedule',label:'Schedule'}]);readonly optionSelect=output<KitItem>();choose(option:KitItem,event:Event):void{if(this.blocked()||option.disabled)return;this.optionSelect.emit(option);this.status.set(option.label+' requested.');(event.currentTarget as HTMLElement).closest('details')?.removeAttribute('open');}
}
