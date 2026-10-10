// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, ElementRef, computed, inject, input } from '@angular/core';
import {ViewEncapsulation,booleanAttribute} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
@Component({
 selector:"kit-neon-edge-button,button[kitNeonEdgeButton]", standalone:true,
 host:{'data-kit':'neon-edge-button','[class]':'native ? buttonClass() : "k-neon-host"','[attr.type]':'native ? type() : null','[attr.disabled]':'native && disabled() ? "" : null'},
 imports:[NgTemplateOutlet],
encapsulation:ViewEncapsulation.None,styleUrls:["./neon-edge-button.css"],
template:`
<ng-template #content>
<span aria-hidden="true" class="k-neon-edge">
<span class="k-neon-beam" [style.animation]="animation()">
</span>
</span>
<span class="k-neon-interior">
<svg aria-hidden="true" class="k-neon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>
</svg>
<span class="k-neon-label">
<ng-content>Deploy preview</ng-content>
</span>
</span>
</ng-template>@if(native){<ng-container [ngTemplateOutlet]="content"/>}@else{<button [class]="buttonClass()" [type]="type()" [disabled]="disabled()">
<ng-container [ngTemplateOutlet]="content"/>
</button>}
`
})
export class KitNeonEdgeButtonComponent {
readonly native=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName==='BUTTON';readonly speed=input<number,number|undefined>(1,{transform:value=>value===undefined?1:value});readonly glow=input(true,{transform:(value:unknown)=>value===undefined?true:booleanAttribute(value)});readonly disabled=input(false,{transform:booleanAttribute});readonly type=input<'button'|'submit'|'reset','button'|'submit'|'reset'|undefined>('button',{transform:value=>value===undefined?'button':value});readonly className=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});readonly animation=computed(()=> 'k-neon-rotate '+(3/this.speed())+'s linear infinite');readonly buttonClass=computed(()=>['k-neon-parity group focus-ring',this.glow()?'k-neon-glow':'',this.className()].filter(Boolean).join(' '));
}
