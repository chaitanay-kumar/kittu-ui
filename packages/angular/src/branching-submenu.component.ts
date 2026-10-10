// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitCollectionController } from './port-controllers';

@Component({
 selector:"kit-branching-submenu", standalone:true,
 host:{'data-kit':"branching-submenu",style:'display:block;min-width:0'},
 template:`
<nav class="kit-control kit-surface kit-stack" aria-label="Branching navigation" (keydown)="keys($event)">@for(item of items();track item.id){<details>
<summary [attr.aria-disabled]="disabled()" [tabIndex]="disabled()?-1:0" (click)="disabled()&&$event.preventDefault()">{{item.label}}</summary>
<div class="kit-stack">@for(child of item.children||[];track child.id){<button type="button" data-item [disabled]="loading()||disabled()||child.disabled" (click)="select(child)">{{child.label}}</button>}@if(!item.children?.length){<button type="button" data-item [disabled]="loading()||disabled() || item.disabled" [attr.aria-pressed]="current()?.id===item.id" (click)="select(item)">{{item.label}}</button>}</div>
</details>}<p role="status">{{selected()?'Selected: '+selected():''}}</p>
</nav>
`
})
export class KitBranchingSubmenuComponent extends KitCollectionController {

}
