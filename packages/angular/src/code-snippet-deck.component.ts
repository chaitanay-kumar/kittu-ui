// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input } from '@angular/core';
import { KitCollectionController } from './port-controllers';
import type { KitItem } from './port-types';

@Component({
 selector:"kit-code-snippet-deck", standalone:true,
 host:{'data-kit':"code-snippet-deck",style:'display:block;min-width:0'},
 template:`
<div class="kit-control kit-surface kit-stack">
<div class="kit-row" (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item [disabled]="loading()||disabled() || item.disabled" [attr.aria-pressed]="current()?.id===item.id" (click)="select(item)">{{item.label}}</button>}</div>
<pre class="k-code">{{current()?.description}}</pre>
<button type="button" [disabled]="loading()||disabled()||!current()" (click)="copy()">Copy snippet</button>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kit-status">{{busy()?'Working…':status()}}</p>
</div>
`
})
export class KitCodeSnippetDeckComponent extends KitCollectionController {
override readonly items=input<KitItem[]>([{id:'install',label:'Install',description:'npm install ./kit-ui-angular-0.1.0.tgz'},{id:'import',label:'Import',description:"import { KitButtonComponent } from 'kit-ui-angular';"}]);async copy():Promise<void>{try{await navigator.clipboard.writeText(this.current()?.description??'');this.status.set('Copied.');}catch{this.actionError.set('Clipboard unavailable. Select and copy the snippet manually.');}}
}
