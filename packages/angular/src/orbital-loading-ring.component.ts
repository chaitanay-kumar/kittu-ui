// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, computed, input } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import type {OrbitalLoadingRingVariant} from './orbital-loading-ring-types';
@Component({
 selector:"kit-orbital-loading-ring", standalone:true,
 host:{'data-kit':'orbital-loading-ring','role':'status','[attr.aria-label]':'accessibleLabel()','[style.width.px]':'size()','[style.height.px]':'size()','[class]':'"k-orbital-parity "+className()'},
 encapsulation:ViewEncapsulation.None,styleUrls:["./orbital-loading-ring.css"],
template:`
<span class="k-orbital-label">{{label()}}</span>
<svg class="k-orbital-tracks" viewBox="0 0 100 100" fill="none" aria-hidden="true">
<circle cx="50" cy="50" r="44" stroke="#282828" stroke-width="1.5" stroke-dasharray="3 3"/>
<circle cx="50" cy="50" r="30" stroke="#333333" stroke-width="1.5"/>
</svg>
<div class="k-orbital-outer" [style.animation]="outerAnimation()">
<span class="k-orbital-satellite-outer">
</span>@if(variant()!=='minimal'){<span class="k-orbital-satellite-bottom">
</span>}</div>
<div class="k-orbital-inner" [style.animation]="innerAnimation()">
<span class="k-orbital-satellite-inner">
</span>@if(variant()==='dense'){<span class="k-orbital-satellite-right">
</span>}</div>
<div class="k-orbital-core" [style.animation]="coreAnimation()">
</div>
`
})
export class KitOrbitalLoadingRingComponent {
private readonly defaultAriaLabel=Symbol('default aria-label');readonly size=input<number,number|undefined>(72,{transform:value=>value===undefined?72:value});readonly speed=input<number,number|undefined>(1,{transform:value=>value===undefined?1:value});readonly variant=input<OrbitalLoadingRingVariant,OrbitalLoadingRingVariant|undefined>('default',{transform:value=>value===undefined?'default':value});readonly label=input<string,string|undefined>('Loading',{transform:value=>value===undefined?'Loading':value});readonly className=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});readonly ariaLabel=input<string|symbol|undefined,string|undefined>(this.defaultAriaLabel,{alias:'aria-label',transform:value=>value});readonly accessibleLabel=computed(()=>{const value=this.ariaLabel();return typeof value==='symbol'?this.label():value;});readonly outerAnimation=computed(()=>'k-orbital-cw '+(2.4/this.speed())+'s linear infinite');readonly innerAnimation=computed(()=>'k-orbital-ccw '+(1.6/this.speed())+'s cubic-bezier(0.4, 0, 0.2, 1) infinite');readonly coreAnimation=computed(()=>'k-orbital-pulse '+(1.2/this.speed())+'s ease-in-out infinite');
}
