// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input } from '@angular/core';
import { KittuCollectionController } from './port-controllers';
import type { KittuItem } from './port-types';

@Component({
 selector:"kittu-code-snippet-deck", standalone:true,
 host:{'data-kittu':"code-snippet-deck",style:'display:block;min-width:0'},
 template:`
<div class="kittu-control kittu-surface kittu-stack">
<div class="kittu-row" (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item [disabled]="loading()||disabled() || item.disabled" [attr.aria-pressed]="current()?.id===item.id" (click)="select(item)">{{item.label}}</button>}</div>
<pre class="k-code">{{current()?.description}}</pre>
<button type="button" [disabled]="loading()||disabled()||!current()" (click)="copy()">Copy snippet</button>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kittu-status">{{busy()?'Working…':status()}}</p>
</div>
`
})
export class KittuCodeSnippetDeckComponent extends KittuCollectionController {
override readonly items=input<KittuItem[]>([{id:'install',label:'Install',description:'npm install ./kittu-ui-angular-0.1.0.tgz'},{id:'import',label:'Import',description:"import { KittuButtonComponent } from 'kittu-ui-angular';"}]);async copy():Promise<void>{try{await navigator.clipboard.writeText(this.current()?.description??'');this.status.set('Copied.');}catch{this.actionError.set('Clipboard unavailable. Select and copy the snippet manually.');}}
}
