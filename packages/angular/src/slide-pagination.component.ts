// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, computed, input, model } from '@angular/core';

@Component({
 selector:"kit-slide-pagination", standalone:true,
 host:{'data-kit':"slide-pagination",style:'display:block;min-width:0'},
 template:`
<nav class="kit-control kit-row" aria-label="Pagination" (keydown)="keys($event)">
<button type="button" [disabled]="disabled()||safePage()<=1" (click)="go(safePage()-1)">Previous</button>@for(p of visiblePages();track p){<button type="button" [disabled]="disabled()" [attr.aria-current]="p===safePage()?'page':null" (click)="go(p)">{{p}}</button>}<button type="button" [disabled]="disabled()||safePage()>=total()" (click)="go(safePage()+1)">Next</button>
<span role="status">Page {{safePage()}} of {{total()}}</span>
</nav>
`
})
export class KitSlidePaginationComponent {
readonly page=model(1);readonly totalPages=input(10);readonly disabled=input(false);readonly total=computed(()=>Math.max(1,Math.floor(this.totalPages())));readonly safePage=computed(()=>Math.max(1,Math.min(this.total(),this.page())));readonly visiblePages=computed(()=>Array.from({length:Math.min(5,this.total())},(_,i)=>Math.max(1,Math.min(this.total()-4,this.safePage()-2))+i));go(page:number):void{if(!this.disabled())this.page.set(Math.max(1,Math.min(this.total(),page)));}keys(event:KeyboardEvent):void{if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){event.preventDefault();this.go(event.key==='Home'?1:event.key==='End'?this.total():this.safePage()+(event.key==='ArrowRight'?1:-1));}}
}
