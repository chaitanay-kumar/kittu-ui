// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, computed, input, model, output } from '@angular/core';

@Component({
 selector:"kit-torque-dial", standalone:true,
 host:{'data-kit':"torque-dial",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-stack">
<label>{{label()}}<input type="range" [min]="min()" [max]="safeMax()" [step]="safeStep()" [value]="bounded()" [disabled]="disabled()" (input)="set(+$any($event.target).value)" (change)="changeEnd.emit()" />
</label>
<div class="k-dial" role="slider" [attr.aria-label]="label()" [attr.aria-valuemin]="min()" [attr.aria-valuemax]="safeMax()" [attr.aria-valuenow]="bounded()" [attr.aria-disabled]="disabled()" [tabIndex]="disabled()?-1:0" (keydown)="key($event)" (pointerdown)="start($event)" (pointermove)="drag($event)" (pointerup)="end()" (pointercancel)="end()">
<span class="k-dial-tick" [style.transform]="'rotate('+angle()+'deg)'">
</span>
<output>{{bounded()}}{{unit()}}</output>
</div>
</section>
`
})
export class KitTorqueDialComponent {
readonly value=model(50);readonly min=input(0);readonly max=input(100);readonly step=input(1);readonly label=input('Dial control');readonly unit=input('%');readonly disabled=input(false);readonly changeEnd=output<void>();readonly safeMax=computed(()=>Math.max(this.min(),this.max()));readonly safeStep=computed(()=>Math.max(.001,this.step()));readonly bounded=computed(()=>Math.max(this.min(),Math.min(this.safeMax(),this.value())));readonly angle=computed(()=>-135+(this.bounded()-this.min())/Math.max(1,this.safeMax()-this.min())*270);private origin?:{y:number;value:number};set(value:number):void{if(this.disabled())return;const step=this.safeStep();this.value.set(Math.max(this.min(),Math.min(this.safeMax(),Math.round((value-this.min())/step)*step+this.min())));}start(event:PointerEvent):void{if(this.disabled()||event.button!==0)return;this.origin={y:event.clientY,value:this.bounded()};(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);}drag(event:PointerEvent):void{if(this.origin)this.set(this.origin.value+(this.origin.y-event.clientY)*(this.safeMax()-this.min())/150);}end():void{if(this.origin)this.changeEnd.emit();this.origin=undefined;}key(event:KeyboardEvent):void{if(['ArrowUp','ArrowRight','ArrowDown','ArrowLeft','Home','End','PageUp','PageDown'].includes(event.key)){event.preventDefault();this.set(event.key==='Home'?this.min():event.key==='End'?this.safeMax():this.bounded()+(['ArrowDown','ArrowLeft','PageDown'].includes(event.key)?-1:1)*this.safeStep()*(event.key.startsWith('Page')?10:1));this.changeEnd.emit();}}
}
