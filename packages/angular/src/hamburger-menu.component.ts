// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, ElementRef, viewChild } from '@angular/core';
import { KitCollectionController } from './port-controllers';
import type { KitItem } from './port-types';

@Component({
 selector:"kit-hamburger-menu", standalone:true,
 host:{'data-kit':"hamburger-menu",style:'display:block;min-width:0'},
 template:`
<div class="kit-control kit-stack" (keydown.escape)="closeMenu()">
<div class="k-menu">
<button #trigger type="button" [disabled]="loading()||disabled()" [attr.aria-expanded]="open()" [attr.aria-controls]="uid" (click)="open.set(!open())">
<span aria-hidden="true">{{open()?'×':'☰'}}</span> {{label()||'Menu'}}</button>@if(open()){<div [id]="uid" class="k-menu-panel" (keydown)="keys($event)">@for(item of items();track item.id){<button type="button" data-item [disabled]="loading()||item.disabled||disabled()" (click)="pick(item)">{{item.label}}</button>}</div>}</div>@if(loading()){<p role="status">Loading…</p>}@if(error()){<p role="alert">{{error()}}</p>}@if(actionError()){<p role="alert">{{actionError()}}</p>}<p role="status" class="kit-status">{{busy()?'Working…':status()}}</p>
</div>
`
})
export class KitHamburgerMenuComponent extends KitCollectionController {
readonly trigger=viewChild<ElementRef<HTMLButtonElement>>('trigger');closeMenu():void{this.open.set(false);this.trigger()?.nativeElement.focus();}pick(item:KitItem):void{if(this.disabled()||this.loading()||item.disabled)return;this.select(item);this.closeMenu();}override keys(event:KeyboardEvent):void{if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key)||this.disabled())return;const buttons=Array.from((event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>('button[data-item]:not(:disabled)'));if(!buttons.length)return;event.preventDefault();const index=buttons.indexOf(event.target as HTMLButtonElement);const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowUp'?-1:1)+buttons.length)%buttons.length;buttons[next].focus();}
}
