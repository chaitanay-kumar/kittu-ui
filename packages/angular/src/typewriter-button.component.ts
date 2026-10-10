// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, ElementRef, computed, inject, input, signal } from '@angular/core';
import {ViewEncapsulation,booleanAttribute} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import type {TypewriterButtonVariant,TypewriterButtonCallback} from './typewriter-button-types';
import {installTypewriterButton} from './typewriter-button-controller';
@Component({
 selector:"kit-typewriter-button,button[kitTypewriterButton]", standalone:true,
 host:{'data-kit':'typewriter-button','[class]':'native ? buttonClass() : "k-typewriter-host"','[attr.type]':'native ? type() : null','[attr.disabled]':'native && disabled() ? "" : null','[attr.aria-label]':'native ? text() : null'},
 imports:[NgTemplateOutlet],
encapsulation:ViewEncapsulation.None,styleUrls:["./typewriter-button.css"],
template:`
<ng-template #content>
<span class="k-typewriter-content">
<span>{{displayedText()}}</span>@if(isTyping()){<span class="k-typewriter-cursor">
</span>}</span>
</ng-template>@if(native){<ng-container [ngTemplateOutlet]="content"/>}@else{<button [class]="buttonClass()" [type]="type()" [disabled]="disabled()" [attr.aria-label]="text()">
<ng-container [ngTemplateOutlet]="content"/>
</button>}
`
})
export class KitTypewriterButtonComponent {
readonly native=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName==='BUTTON';readonly text=input.required<string>();readonly variant=input<TypewriterButtonVariant,TypewriterButtonVariant|undefined>('primary',{transform:value=>value===undefined?'primary':value});readonly charDuration=input<number,number|undefined>(75,{transform:value=>value===undefined?75:value});readonly soundVolume=input<number,number|undefined>(.25,{transform:value=>value===undefined?.25:value});readonly autoStart=input(false,{transform:booleanAttribute});readonly soundEnabled=input(false,{transform:booleanAttribute});readonly disabled=input(false,{transform:booleanAttribute});readonly onComplete=input<TypewriterButtonCallback>();readonly onClick=input<TypewriterButtonCallback>();readonly type=input<'button'|'submit'|'reset','button'|'submit'|'reset'|undefined>('button',{transform:value=>value===undefined?'button':value});readonly className=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});readonly displayedText=signal('');readonly isTyping=signal(false);readonly buttonClass=computed(()=>['k-typewriter-parity','k-typewriter-'+this.variant(),this.disabled()?'k-typewriter-disabled':'',this.className()].filter(Boolean).join(' '));constructor(){installTypewriterButton(this);}
}
