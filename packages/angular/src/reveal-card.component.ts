// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, computed, input, signal } from '@angular/core';
import {afterEveryRender,TemplateRef,ViewEncapsulation} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import type {RevealCardContent} from './reveal-card-types';
import {installRevealCardMotion} from './reveal-card-motion';
@Component({
 selector:"kit-reveal-card", standalone:true,
 host:{'data-kit':'reveal-card',class:'k-reveal-host'},
 imports:[NgTemplateOutlet],
encapsulation:ViewEncapsulation.None,styleUrls:["./reveal-card.css"],
template:`
<div class="k-reveal-parity" [class]="'k-reveal-parity '+className()" (mouseenter)="hovered.set(true)" (mouseleave)="leave()" (mousemove)="move($event)">@if(hovered()){<div class="k-reveal-glare" [style.background]="glareBackground()">
</div>}<div class="k-reveal-primary">
<ng-content/>
</div>@if(revealContent()){<div class="k-reveal-content">@if(revealTemplate()){<ng-container [ngTemplateOutlet]="revealTemplate()"/>}@else{{{revealText()}}}</div>}@else if(isNumber()){{{revealText()}}}</div>
`
})
export class KitRevealCardComponent {
readonly revealContent=input<RevealCardContent>();readonly maxTilt=input<number,number|undefined>(12,{transform:value=>value===undefined?12:value});readonly className=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});readonly hovered=signal(false);readonly glare=signal({x:50,y:50});readonly glareBackground=computed(()=>'radial-gradient(circle at '+this.glare().x+'% '+this.glare().y+'%, rgba(255,255,255,0.4), transparent 60%)');readonly revealTemplate=computed(()=>this.revealContent() instanceof TemplateRef?this.revealContent() as TemplateRef<unknown>:null);readonly revealText=computed(()=>{const value=this.revealContent();return typeof value==='string'||typeof value==='number'?value:'';});readonly isNumber=computed(()=>typeof this.revealContent()==='number');private readonly motion=installRevealCardMotion(this.maxTilt,this.glare);move(event:MouseEvent):void{this.motion.move(event);}leave():void{this.hovered.set(false);this.motion.leave();}constructor(){afterEveryRender(()=>this.motion.reveal(this.hovered()));}
}
