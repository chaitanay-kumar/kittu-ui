/** React SpotlightCard's native Angular contract; HTML event overrides retain spread precedence. */
export const spotlightCardPort = {
  imports: `import {ViewEncapsulation} from '@angular/core';
import type {SpotlightCardMouseHandler} from './spotlight-card-types';`,
  stylesFile: './spotlight-card.css',
  hostMetadata: `{'data-kittu':'spotlight-card','[class]':'"k-spotlight-parity group "+className()','(mousemove)':'move($event)','(mouseleave)':'leave($event)'}`,
  description: 'React-matched single content card with pointer-following border and ambient radial spotlights, projected children, customizable color/size and native HTML event overrides.',
  inputs: ['spotlightColor: string','spotlightSize: number','className: string','onMouseMove: SpotlightCardMouseHandler','onMouseLeave: SpotlightCardMouseHandler'],
  outputs: [],
  template: `<div class="k-spotlight-border" [style.background]="borderGradient()"></div><div class="k-spotlight-glow" [style.background]="backgroundGradient()"></div><div class="k-spotlight-content"><ng-content/></div>`,
  body: `readonly spotlightColor=input<string,string|undefined>('rgba(56, 189, 248, 0.08)',{transform:value=>value===undefined?'rgba(56, 189, 248, 0.08)':value});
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
leave(event:MouseEvent):void{const handler=this.onMouseLeave();if(typeof handler==='symbol')this.point.set({x:-1000,y:-1000});else handler?.(event);}`,
};
