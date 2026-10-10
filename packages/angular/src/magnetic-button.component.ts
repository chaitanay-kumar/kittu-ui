// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, ElementRef, computed, inject, input, signal } from '@angular/core';
import {ViewEncapsulation,booleanAttribute} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import type {MagneticButtonVariant,MagneticButtonSize} from './magnetic-button-types';
import {installMagneticMotion} from './magnetic-button-motion';
@Component({
 selector:"kit-magnetic-button,button[kitMagneticButton]", standalone:true,
 host:{'data-kit':'magnetic-button','[class]':'native ? buttonClass() : "k-magnetic-host"','[attr.type]':'native ? type() : null','[attr.disabled]':'native && disabled() ? "" : null'},
 imports:[NgTemplateOutlet],
encapsulation:ViewEncapsulation.None,styleUrls:["./magnetic-button.css"],
template:`
<ng-template #content>@if(glow() && hovered()){<span class="k-magnetic-glow">
</span>}<span class="k-magnetic-content">
<ng-content/>
</span>
</ng-template>@if(native){<ng-container [ngTemplateOutlet]="content"/>}@else{<button [class]="buttonClass()" [attr.type]="type()" [disabled]="disabled()">
<ng-container [ngTemplateOutlet]="content"/>
</button>}
`
})
export class KitMagneticButtonComponent {
readonly native=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName==='BUTTON';readonly hovered=signal(false);readonly strength=input<number,number|undefined>(.35,{transform:value=>value===undefined?.35:value});readonly variant=input<MagneticButtonVariant,MagneticButtonVariant|undefined>('primary',{transform:value=>value===undefined?'primary':value});readonly size=input<MagneticButtonSize,MagneticButtonSize|undefined>('md',{transform:value=>value===undefined?'md':value});readonly glow=input(true,{transform:(value:unknown)=>value===undefined?true:booleanAttribute(value)});readonly disabled=input(false,{transform:booleanAttribute});readonly type=input<'button'|'submit'|'reset'>();readonly className=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});readonly buttonClass=computed(()=>['k-magnetic-parity focus-ring','k-magnetic-'+this.variant(),'k-magnetic-'+this.size(),this.className()].filter(Boolean).join(' '));constructor(){installMagneticMotion(this.strength,this.disabled,this.hovered);}
}
