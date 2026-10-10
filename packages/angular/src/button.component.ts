// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, ElementRef, computed, inject, input } from '@angular/core';
import {ViewEncapsulation,booleanAttribute} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import type {ButtonVariant,ButtonSize,ButtonIcon} from './button-types';
import {installButtonPress} from './button-motion';
@Component({
 selector:"kittu-button,button[kittuButton]", standalone:true,
 host:{'data-kittu':'button','[class]':'native ? buttonClass() : "k-button-host"','[attr.type]':'native ? type() : null','[attr.disabled]':'native && blocked() ? "" : null','[attr.aria-busy]':'native ? isLoading() : null'},
 imports:[NgTemplateOutlet],
encapsulation:ViewEncapsulation.None,styleUrls:["./button.css"],
template:`
<ng-template #content>
@if(variant()==='gradient'){<div class="k-button-shimmer" aria-hidden="true">
</div>}
@if(isLoading()){<svg aria-hidden="true" class="k-button-spinner" [class.k-button-spinner-sm]="size()==='sm'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M21 12a9 9 0 1 1-6.219-8.56"/>
</svg>}
@else{<span class="k-button-slot">@if(leftIcon()){<ng-container [ngTemplateOutlet]="leftIcon()!"/>}@else{<ng-content select="[kittuButtonLeftIcon]"/>}</span>}
@if(isLoading() && loadingText()){<span>{{loadingText()}}</span>}@else{<span class="k-button-content">
<ng-content/>
</span>}
@if(!isLoading()){<span class="k-button-slot">@if(rightIcon()){<ng-container [ngTemplateOutlet]="rightIcon()!"/>}@else{<ng-content select="[kittuButtonRightIcon]"/>}</span>}
</ng-template>
@if(native){<ng-container [ngTemplateOutlet]="content"/>}@else{<button [class]="buttonClass()" [type]="type()" [disabled]="blocked()" [attr.aria-busy]="isLoading()">
<ng-container [ngTemplateOutlet]="content"/>
</button>}
`
})
export class KittuButtonComponent {
readonly native=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName==='BUTTON';readonly variant=input<ButtonVariant,ButtonVariant|undefined>('primary',{transform:value=>value===undefined?'primary':value});readonly size=input<ButtonSize,ButtonSize|undefined>('md',{transform:value=>value===undefined?'md':value});readonly isLoading=input(false,{transform:booleanAttribute});readonly loadingText=input<string>();readonly leftIcon=input<ButtonIcon>();readonly rightIcon=input<ButtonIcon>();readonly fullWidth=input(false,{transform:booleanAttribute});readonly disabled=input(false,{transform:booleanAttribute});readonly type=input<'button'|'submit'|'reset','button'|'submit'|'reset'|undefined>('button',{transform:value=>value===undefined?'button':value});readonly className=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});readonly blocked=computed(()=>this.disabled()||this.isLoading());readonly buttonClass=computed(()=>['k-button-parity','k-button-'+this.variant(),this.variant()==='link'?'':'k-button-'+this.size(),this.fullWidth()?'k-button-full':'',this.blocked()?'k-button-disabled':'',this.className()].filter(Boolean).join(' '));constructor(){installButtonPress(this.blocked);}
}
