// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, ElementRef, computed, inject, input, output } from '@angular/core';
import {ViewEncapsulation,booleanAttribute} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {installHamburgerMotion} from './hamburger-menu-motion';
@Component({
 selector:"kit-hamburger-menu,button[kitHamburgerMenu]", standalone:true,
 host:{'data-kit':'hamburger-menu','[class]':'native ? buttonClass() : "k-hamburger-host"','[attr.type]':'native ? type() : null','[attr.disabled]':'native && disabled() ? "" : null','[attr.aria-label]':'native ? accessibleLabel() : null','[attr.aria-expanded]':'native ? expanded() : null','(click)':'hostClick($event)'},
 imports:[NgTemplateOutlet],
encapsulation:ViewEncapsulation.None,styleUrls:["./hamburger-menu.css"],
template:`
<ng-template #content>
<div class="k-hamburger-icon" [style.width.px]="size()" [style.height.px]="size()">@for(line of [0,1,2];track line){<span class="k-hamburger-line" [style.width.px]="size()" [style.height.px]="stroke()" [style.background-color]="color()">
</span>}</div>
</ng-template>@if(native){<ng-container [ngTemplateOutlet]="content"/>}@else{<button [class]="buttonClass()" [attr.type]="type()" [disabled]="disabled()" [attr.aria-label]="accessibleLabel()" [attr.aria-expanded]="expanded()" (click)="activate($event)">
<ng-container [ngTemplateOutlet]="content"/>
</button>}
`
})
export class KitHamburgerMenuComponent {
readonly native=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName==='BUTTON';readonly isOpen=input.required<boolean>();readonly change=output<boolean>();readonly size=input<number,number|undefined>(24,{transform:value=>value===undefined?24:value});readonly color=input<string,string|undefined>('currentColor',{transform:value=>value===undefined?'currentColor':value});readonly label=input<string,string|undefined>('Menu',{transform:value=>value===undefined?'Menu':value});readonly disabled=input(false,{transform:booleanAttribute});readonly type=input<'button'|'submit'|'reset'|undefined>('button');readonly className=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});readonly ariaLabel=input<{provided:boolean;value:string|null|undefined},string|null|undefined>({provided:false,value:undefined},{alias:'aria-label',transform:value=>({provided:true,value})});readonly ariaExpanded=input<{provided:boolean;value:boolean|string|null|undefined},boolean|string|null|undefined>({provided:false,value:undefined},{alias:'aria-expanded',transform:value=>({provided:true,value})});readonly onClick=input<((event:MouseEvent)=>void)|null|undefined>(()=>{if(!this.disabled())this.change.emit(!this.isOpen());});readonly stroke=computed(()=>Math.max(2,this.size()*.08));readonly accessibleLabel=computed(()=>this.ariaLabel().provided?this.ariaLabel().value:(this.isOpen()?'Close ':'Open ')+this.label());readonly expanded=computed(()=>this.ariaExpanded().provided?this.ariaExpanded().value:this.isOpen());readonly buttonClass=computed(()=>['k-hamburger-parity',this.className()].filter(Boolean).join(' '));hostClick(event:MouseEvent):void{if(this.native)this.activate(event);}activate(event:MouseEvent):void{this.onClick()?.(event);}constructor(){installHamburgerMotion(this.isOpen,this.size);}
}
