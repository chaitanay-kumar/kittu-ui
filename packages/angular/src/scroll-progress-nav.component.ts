// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { KitCollectionController } from './port-controllers';
import type { KitItem } from './port-types';

@Component({
 selector:"kit-scroll-progress-nav", standalone:true,
 host:{'data-kit':"scroll-progress-nav",style:'display:block;min-width:0'},
 template:`
<div class="kit-control kit-stack">
<nav class="kit-row" aria-label="Section navigation" (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item [disabled]="loading()||disabled()||item.disabled" (click)="jump(item)">{{item.label}}</button>}</nav>
<progress aria-label="Reading progress" max="100" [value]="progress()">
</progress>
<div #scroller class="k-scroll-page" (scroll)="track($event)">@for(item of items();track item.id){<section [id]="uid+'-'+item.id" class="k-scroll-section">
<h3>{{item.label}}</h3>
<p>{{item.description}}</p>
</section>}</div>
</div>
`
})
export class KitScrollProgressNavComponent extends KitCollectionController {
readonly progress=signal(0);readonly scroller=viewChild.required<ElementRef<HTMLElement>>('scroller');jump(item:KitItem):void{this.select(item);const node=Array.from(this.scroller().nativeElement.children).find(el=>el.id===this.uid+'-'+item.id) as HTMLElement|undefined;this.scroller().nativeElement.scrollTo({top:node?.offsetTop?node.offsetTop-this.scroller().nativeElement.offsetTop:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}track(event:Event):void{const el=event.target as HTMLElement;this.progress.set(el.scrollHeight<=el.clientHeight?100:el.scrollTop/(el.scrollHeight-el.clientHeight)*100);}
}
