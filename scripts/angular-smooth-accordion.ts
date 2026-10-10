export const smoothAccordionPort={
 imports:`import {ViewEncapsulation,booleanAttribute} from '@angular/core';
import {SmoothAccordionRowComponent} from './smooth-accordion-row';
import type {AccordionItem} from './smooth-accordion-types';`,componentImports:'SmoothAccordionRowComponent',stylesFile:'./smooth-accordion.css',
 hostMetadata:`{'data-kit':'smooth-accordion',class:'k-sa-host'}`,
 description:'React-matched item accordion with initial defaultOpen, single/multiple disclosure, template content and interruptible height/opacity/chevron springs.',
 inputs:['items: AccordionItem[] (required)','allowMultiple: boolean','defaultOpen: string[]','className: string'],outputs:[],
 template:`<div [class]="'k-sa-root '+className()">@for(item of items();track item.id){<kit-smooth-accordion-row [item]="item" [open]="openIds().includes(item.id)" (toggleRequested)="toggle(item.id)"/>}</div>`,
 body:`readonly items=input.required<AccordionItem[]>();readonly allowMultiple=input(false,{transform:booleanAttribute});readonly defaultOpen=input<string[],string[]|undefined>([],{transform:v=>v===undefined?[]:v});readonly className=input<string,string|undefined>('',{transform:v=>v===undefined?'':v});readonly openIds=signal<string[]>([]);private initialized=false;constructor(){effect(()=>{this.items();untracked(()=>{if(!this.initialized){this.initialized=true;this.openIds.set(this.defaultOpen());}});});}toggle(id:string):void{this.openIds.update(ids=>this.allowMultiple()?(ids.includes(id)?ids.filter(value=>value!==id):[...ids,id]):ids.includes(id)?[]:[id]);}`
};
