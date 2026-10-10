// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, ElementRef, computed, inject, input } from '@angular/core';
import {ViewEncapsulation,booleanAttribute} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import type {PressButtonVariant,PressButtonSize} from './press-button-types';
import {installPressButtonMotion} from './press-button-motion';
@Component({
 selector:"kit-press-button,button[kitPressButton]", standalone:true,
 host:{'data-kit':'press-button','[class]':'native ? buttonClass() : "k-press-host"','[attr.type]':'native ? type() : null','[attr.disabled]':'native && disabled() ? "" : null'},
 imports:[NgTemplateOutlet],
encapsulation:ViewEncapsulation.None,styleUrls:["./press-button.css"],
template:`
<ng-template #content>
<span class="k-press-content">
<ng-content/>
</span>
</ng-template>@if(native){<ng-container [ngTemplateOutlet]="content"/>}@else{<button [class]="buttonClass()" [type]="type()" [disabled]="disabled()">
<ng-container [ngTemplateOutlet]="content"/>
</button>}
`
})
export class KitPressButtonComponent {
readonly native=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName==='BUTTON';readonly variant=input<PressButtonVariant,PressButtonVariant|undefined>('primary',{transform:value=>value===undefined?'primary':value});readonly size=input<PressButtonSize,PressButtonSize|undefined>('md',{transform:value=>value===undefined?'md':value});readonly pressStrength=input<number,number|undefined>(.04,{transform:value=>value===undefined?.04:value});readonly fullWidth=input(false,{transform:booleanAttribute});readonly disabled=input(false,{transform:booleanAttribute});readonly type=input<'button'|'submit'|'reset','button'|'submit'|'reset'|undefined>('button',{transform:value=>value===undefined?'button':value});readonly className=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});readonly buttonClass=computed(()=>['k-press-parity','k-press-'+this.variant(),this.variant()==='ghost'?'':'k-press-'+this.size(),this.fullWidth()?'k-press-full':'',this.disabled()?'k-press-disabled':'',this.className()].filter(Boolean).join(' '));constructor(){installPressButtonMotion(this.disabled,this.pressStrength);}
}
