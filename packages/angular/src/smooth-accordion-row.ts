import {Component,DestroyRef,ElementRef,afterEveryRender,effect,inject,input,output,signal,untracked} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import type {AccordionItem} from './smooth-accordion-types';
import {AccordionMotion} from './smooth-accordion-motion';
@Component({selector:'kit-smooth-accordion-row',standalone:true,imports:[NgTemplateOutlet],host:{class:'k-sa-row'},template:`<button class="k-sa-trigger" [attr.aria-expanded]="open()" (click)="toggleRequested.emit()"><div><div class="k-sa-title">{{item().title}}</div>@if(item().subtitle){<div class="k-sa-subtitle">{{item().subtitle}}</div>}</div><div class="k-sa-chevron"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="k-sa-icon" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></div></button>@if(present()){<div class="k-sa-panel"><div class="k-sa-content">@if(textContent()!==null){<ng-container>{{textContent()}}</ng-container>}@else{<ng-container [ngTemplateOutlet]="templateContent()"/>}</div></div>}`})
export class SmoothAccordionRowComponent{
 readonly item=input.required<AccordionItem>();readonly open=input.required<boolean>();readonly toggleRequested=output<void>();readonly present=signal(false);private readonly panelContent=signal<AccordionItem['content']>(undefined);
 textContent():string|null{const content=this.panelContent();return typeof content==='string'||typeof content==='number'?String(content):null;}
 templateContent(){const content=this.panelContent();return content&&typeof content==='object'?content:null;}
 private readonly host=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
 private readonly motion=new AccordionMotion(this.host,()=>this.present.set(false));private initialized=false;private previous=false;
 constructor(){effect(()=>{const open=this.open(),content=this.item().content;untracked(()=>{if(open)this.panelContent.set(content);if(!this.initialized){this.initialized=true;this.previous=open;this.present.set(open);this.motion.initialize(open);return;}if(open!==this.previous){this.previous=open;if(open)this.present.set(true);this.motion.toggle(open);}});});afterEveryRender(()=>this.motion.rendered(this.open()));inject(DestroyRef).onDestroy(()=>this.motion.destroy());}
}
