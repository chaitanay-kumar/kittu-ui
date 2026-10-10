// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitCollectionController } from './port-controllers';

@Component({
 selector:"kit-spring-select", standalone:true,
 host:{'data-kit':"spring-select",style:'display:block;min-width:0'},
 template:`
<div class="kit-control kit-stack">
<label>{{label()||'Choose a workspace'}}<select [disabled]="disabled()||loading()" [value]="current()?.id" (change)="pick($event)">@for(item of items();track item.id){<option [value]="item.id" [disabled]="loading()||item.disabled">{{item.label}}</option>}</select>
</label>
<p>{{current()?.description}}</p>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kit-status">{{busy()?'Working…':status()}}</p>
</div>
`
})
export class KitSpringSelectComponent extends KitCollectionController {
pick(event:Event):void{const item=this.items().find(i=>i.id===(event.target as HTMLSelectElement).value);if(item)this.select(item);}
}
