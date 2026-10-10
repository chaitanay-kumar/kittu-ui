// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, effect, input, signal, untracked } from '@angular/core';
import {ViewEncapsulation,booleanAttribute} from '@angular/core';
import {SmoothAccordionRowComponent} from './smooth-accordion-row';
import type {AccordionItem} from './smooth-accordion-types';
@Component({
 selector:"kit-smooth-accordion", standalone:true,
 host:{'data-kit':'smooth-accordion',class:'k-sa-host'},
 imports:[SmoothAccordionRowComponent],
encapsulation:ViewEncapsulation.None,styleUrls:["./smooth-accordion.css"],
template:`
<div [class]="'k-sa-root '+className()">@for(item of items();track item.id){<kit-smooth-accordion-row [item]="item" [open]="openIds().includes(item.id)" (toggleRequested)="toggle(item.id)"/>}</div>
`
})
export class KitSmoothAccordionComponent {
readonly items=input.required<AccordionItem[]>();readonly allowMultiple=input(false,{transform:booleanAttribute});readonly defaultOpen=input<string[],string[]|undefined>([],{transform:v=>v===undefined?[]:v});readonly className=input<string,string|undefined>('',{transform:v=>v===undefined?'':v});readonly openIds=signal<string[]>([]);private initialized=false;constructor(){effect(()=>{this.items();untracked(()=>{if(!this.initialized){this.initialized=true;this.openIds.set(this.defaultOpen());}});});}toggle(id:string):void{this.openIds.update(ids=>this.allowMultiple()?(ids.includes(id)?ids.filter(value=>value!==id):[...ids,id]):ids.includes(id)?[]:[id]);}
}
