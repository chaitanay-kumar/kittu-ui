// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, ElementRef, computed, inject, input, signal } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import type {SpotlightCardMouseHandler} from './spotlight-card-types';
@Component({
 selector:"kittu-spotlight-card", standalone:true,
 host:{'data-kittu':'spotlight-card','[class]':'"k-spotlight-parity group "+className()','(mousemove)':'move($event)','(mouseleave)':'leave($event)'},
 encapsulation:ViewEncapsulation.None,styleUrls:["./spotlight-card.css"],
template:`
<div class="k-spotlight-border" [style.background]="borderGradient()">
</div>
<div class="k-spotlight-glow" [style.background]="backgroundGradient()">
</div>
<div class="k-spotlight-content">
<ng-content/>
</div>
`
})
export class KittuSpotlightCardComponent {
readonly spotlightColor=input<string,string|undefined>('rgba(56, 189, 248, 0.08)',{transform:value=>value===undefined?'rgba(56, 189, 248, 0.08)':value});
readonly spotlightSize=input<number,number|undefined>(350,{transform:value=>value===undefined?350:value});
readonly className=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});
private readonly defaultHandler=Symbol('internal handler');
readonly onMouseMove=input<SpotlightCardMouseHandler|symbol|undefined,SpotlightCardMouseHandler|undefined>(this.defaultHandler,{transform:value=>value});
readonly onMouseLeave=input<SpotlightCardMouseHandler|symbol|undefined,SpotlightCardMouseHandler|undefined>(this.defaultHandler,{transform:value=>value});
private readonly element=inject<ElementRef<HTMLElement>>(ElementRef);
readonly point=signal({x:-1000,y:-1000});
// React useMotionTemplate omits falsy numeric fragments; zero produces invalid CSS and retains the previous painted gradient.
readonly backgroundGradient=computed(()=>'radial-gradient('+(this.spotlightSize()||'')+'px circle at '+this.point().x+'px '+this.point().y+'px, '+this.spotlightColor()+', transparent 80%)');
readonly borderGradient=computed(()=>'radial-gradient(220px circle at '+this.point().x+'px '+this.point().y+'px, rgba(255, 255, 255, 0.18), transparent 80%)');
move(event:MouseEvent):void{const handler=this.onMouseMove();if(typeof handler==='symbol'){const rect=this.element.nativeElement.getBoundingClientRect();this.point.set({x:event.clientX-rect.left,y:event.clientY-rect.top});}else handler?.(event);}
leave(event:MouseEvent):void{const handler=this.onMouseLeave();if(typeof handler==='symbol')this.point.set({x:-1000,y:-1000});else handler?.(event);}
}
