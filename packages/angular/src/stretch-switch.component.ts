// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, computed, effect, input, output, signal, untracked } from '@angular/core';
import {ViewEncapsulation, TemplateRef, booleanAttribute, afterEveryRender} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import type {StretchSwitchLabel, StretchSwitchChangeHandler} from './stretch-switch-types';
import {installStretchSwitchMotion} from './stretch-switch-motion';
@Component({
 selector:"kit-stretch-switch,div[kitStretchSwitch]", standalone:true,
 host:{'data-kit':'stretch-switch','[class]':'hostClass()'},
 imports:[NgTemplateOutlet],
encapsulation:ViewEncapsulation.None,styleUrls:["./stretch-switch.css"],
template:`
@if(label() || description()){
<div class="k-stretch-copy" [class.k-stretch-copy-disabled]="disabled()" (click)="toggle()">
@if(label()) {<div class="k-stretch-label">@if(labelTemplate()){<ng-container [ngTemplateOutlet]="labelTemplate()"/>}@else{{{labelText()}}}</div>}
@if(description()){<div class="k-stretch-description">{{description()}}</div>}
</div>}
<button type="button" role="switch" class="k-stretch-track" [class.k-stretch-on]="current()" [attr.aria-checked]="current()" [disabled]="disabled()" (click)="toggle()" (pointerdown)="press()" (pointerup)="pressed.set(false)" (pointercancel)="pressed.set(false)" (pointerleave)="pressed.set(false)">
<span class="k-stretch-thumb" [class.k-stretch-thumb-on]="current()">
</span>
</button>
`
})
export class KitStretchSwitchComponent {
readonly checked=input<boolean|undefined,unknown>(undefined,{transform:value=>value===undefined?undefined:booleanAttribute(value)});
readonly defaultChecked=input(false,{transform:booleanAttribute});
readonly disabled=input(false,{transform:booleanAttribute});
readonly onChange=input<StretchSwitchChangeHandler>();
readonly checkedChange=output<boolean>();
readonly label=input<StretchSwitchLabel>();
readonly description=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});
readonly className=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});
readonly internal=signal(false);readonly pressed=signal(false);private renderedCurrent=false;
readonly current=computed(()=>this.checked()===undefined?this.internal():this.checked()!);
readonly hostClass=computed(()=>['k-stretch-parity',this.disabled()?'k-stretch-disabled':'',this.className()].filter(Boolean).join(' '));
readonly labelText=computed(()=>typeof this.label()==='string'||typeof this.label()==='number'?this.label():'');
readonly labelTemplate=computed(()=>this.label() instanceof TemplateRef?this.label() as TemplateRef<unknown>:null);
constructor(){let initialized=false;effect(()=>{const initial=this.defaultChecked();untracked(()=>{if(!initialized){initialized=true;this.internal.set(initial);}});});installStretchSwitchMotion(this.current,this.pressed);afterEveryRender(()=>{this.renderedCurrent=this.current();});}
press():void{if(!this.disabled())this.pressed.set(true);}
toggle():void{if(this.disabled())return;const next=!this.renderedCurrent;if(this.checked()===undefined)this.internal.set(next);this.onChange()?.(next);this.checkedChange.emit(next);}
}
