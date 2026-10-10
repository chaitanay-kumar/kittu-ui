// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, computed, input } from '@angular/core';
import { KitCollectionController } from './port-controllers';

@Component({
 selector:"kit-avatar-stack", standalone:true,
 host:{'data-kit':"avatar-stack",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack">
<div class="k-avatars" (keydown)="keys($event)">@for(item of items().slice(0,limit());track item.id){<button type="button" data-item class="k-avatar" [attr.aria-label]="item.label" [title]="item.label" [disabled]="loading()||disabled()||item.disabled" (click)="select(item)">@if(item.image){<img [src]="item.image" alt="" />}@else{ {{item.label.slice(0,2)}} }</button>}@if(items().length>limit()){<button type="button" [attr.aria-expanded]="open()" [disabled]="loading()||disabled()" (click)="open.set(!open())">+{{items().length-limit()}}</button>}</div>@if(open()){@for(item of items().slice(limit());track item.id){<button type="button" data-item [disabled]="loading()||disabled() || item.disabled" [attr.aria-pressed]="current()?.id===item.id" (click)="select(item)">{{item.label}}</button>}}<p role="status">{{selected()?'Selected: '+current()?.label:''}}</p>
</section>
`
})
export class KitAvatarStackComponent extends KitCollectionController {
readonly maxVisible=input(4);readonly limit=computed(()=>Math.max(1,Math.floor(this.maxVisible())));
}
