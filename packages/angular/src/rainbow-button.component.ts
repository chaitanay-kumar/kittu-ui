// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, ElementRef, computed, effect, inject, input, signal } from '@angular/core';
import {ViewEncapsulation,booleanAttribute,afterEveryRender} from '@angular/core';
import {rainbowStyleValue,rainbowStyleName} from './rainbow-button-style';
import {NgTemplateOutlet} from '@angular/common';
import type {RainbowButtonVariant,RainbowButtonSize,RainbowButtonStyle} from './rainbow-button-types';
@Component({
 selector:"kit-rainbow-button,[kitRainbowButton]", standalone:true,
 host:{'data-kit':'rainbow-button','[class]':'native ? buttonClass() : "k-rainbow-host"','[attr.disabled]':'native && disabled() ? "" : null','[attr.type]':'native ? type() ?? null : null','[attr.data-slot]':'native ? "button" : null'},
 imports:[NgTemplateOutlet],
encapsulation:ViewEncapsulation.None,styleUrls:["./rainbow-button.css"],
template:`
<ng-template #content>
<ng-content/>
</ng-template>@if(native){<ng-container [ngTemplateOutlet]="content"/>}@else{<button [class]="buttonClass()" [disabled]="disabled()" [attr.type]="type() ?? null" data-slot="button">
<ng-container [ngTemplateOutlet]="content"/>
</button>}
`
})
export class KitRainbowButtonComponent {
readonly host=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;readonly native=this.host.hasAttribute('kitRainbowButton')||['BUTTON','A'].includes(this.host.tagName);readonly target=signal<HTMLElement|null>(null);
readonly variant=input<RainbowButtonVariant,RainbowButtonVariant|undefined>('default',{transform:v=>v===undefined?'default':v});readonly size=input<RainbowButtonSize,RainbowButtonSize|undefined>('default',{transform:v=>v===undefined?'default':v});readonly disabled=input(false,{transform:booleanAttribute});readonly type=input<'button'|'submit'|'reset'>();readonly className=input<string,string|undefined>('',{transform:v=>v??''});readonly style=input<RainbowButtonStyle>();
readonly color1=input<string,string|undefined>('hsl(0 100% 63%)',{transform:v=>v===undefined?'hsl(0 100% 63%)':v});readonly color2=input<string,string|undefined>('hsl(270 100% 63%)',{transform:v=>v===undefined?'hsl(270 100% 63%)':v});readonly color3=input<string,string|undefined>('hsl(210 100% 63%)',{transform:v=>v===undefined?'hsl(210 100% 63%)':v});readonly color4=input<string,string|undefined>('hsl(195 100% 63%)',{transform:v=>v===undefined?'hsl(195 100% 63%)':v});readonly color5=input<string,string|undefined>('hsl(90 100% 63%)',{transform:v=>v===undefined?'hsl(90 100% 63%)':v});readonly speed=input<number,number|undefined>(3,{transform:v=>v===undefined?3:v});readonly glow=input<boolean,boolean|undefined>(true,{transform:v=>v===undefined?true:booleanAttribute(v)});
readonly buttonClass=computed(()=>['k-rainbow-parity','k-rainbow-variant-'+this.variant(),'k-rainbow-size-'+this.size(),'kit-ui-rainbow-active',this.glow()?'kit-ui-rainbow-glow':'',this.className()].filter(Boolean).join(' '));
private appliedStyles:string[]=[];
constructor(){afterEveryRender(()=>{const target=this.native?this.host:this.host.firstElementChild as HTMLElement;if(target!==this.target())this.target.set(target);});effect(()=>{const target=this.target();const values:RainbowButtonStyle={'--color-1':this.color1(),'--color-2':this.color2(),'--color-3':this.color3(),'--color-4':this.color4(),'--color-5':this.color5(),'--rainbow-speed':this.speed()+'s',...this.style()};if(!target)return;for(const name of this.appliedStyles)target.style.removeProperty(name);this.appliedStyles=[];for(const [key,value]of Object.entries(values)){const name=rainbowStyleName(key);if(value!==undefined&&value!==null){target.style.setProperty(name,rainbowStyleValue(key,value));this.appliedStyles.push(name);}}});}
}
