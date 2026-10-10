import {DestroyRef,ElementRef,effect,inject,untracked,type Signal,type WritableSignal} from '@angular/core';
import type {ButtonStatusState} from './morphing-button-types';
const root1=-30+Math.sqrt(140),root2=-30-Math.sqrt(140);
/** Reference spring: stiffness 380, damping 30, mass .5, zero initial velocity. */
function sample(from:number,to:number,time:number):{value:number;done:boolean}{
 const t=time/1000,delta=to-from;
 const remaining=(root2*Math.exp(root1*t)-root1*Math.exp(root2*t))/(root2-root1);
 const velocity=-delta*root1*root2*(Math.exp(root1*t)-Math.exp(root2*t))/(root2-root1);
 const granular=Math.abs(delta)<5;
 const done=Math.abs(delta*remaining)<=(granular?.005:.5)&&Math.abs(velocity)<=(granular?.01:2);
 return{value:done?to:to-delta*remaining,done};
}
/** Presence mode wait: retain the outgoing status until its opacity spring rests. */
export function installMorphingButtonMotion(status:Signal<ButtonStatusState>,displayed:WritableSignal<ButtonStatusState>):void{
 const host=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
 let initialized=false,animation:Animation|undefined,timer:ReturnType<typeof setTimeout>|undefined,generation=0,destroyed=false;
 const frames=(state:ButtonStatusState,enter:boolean)=>{
  const scaled=state==='success'||state==='error';const opacityFrom=enter?0:1,opacityTo=enter?1:0;
  const transformFrom=scaled?(enter?.8:1):(enter?(state==='idle'?-6:6):0);
  const transformTo=scaled?(enter?1:.8):(enter?0:(state==='idle'?6:-6));
  let duration=0;while(duration<1000&&!sample(opacityFrom,opacityTo,duration).done)duration+=10;
  const count=Math.ceil(duration/8.333);
  const keyframes=Array.from({length:count+1},(_,i)=>{const time=duration*i/count;return{opacity:sample(opacityFrom,opacityTo,time).value,transform:scaled?`scale(${sample(transformFrom,transformTo,time).value})`:`translateY(${sample(transformFrom,transformTo,time).value}px)`,offset:i/count};});
  return{duration,keyframes};
 };
 const animate=(state:ButtonStatusState,enter:boolean)=>{const node=host.querySelector('.k-mb-content');const data=frames(state,enter);if(node&&typeof node.animate==='function')animation=node.animate(data.keyframes,{duration:data.duration,fill:'forwards'});return data.duration;};
 effect(()=>{const next=status();untracked(()=>{
  if(!initialized){initialized=true;displayed.set(next);return;}
  const current=displayed(),id=++generation;if(timer)clearTimeout(timer);animation?.cancel();if(next===current)return;
  const duration=animate(current,false);
  timer=setTimeout(()=>{if(destroyed||id!==generation)return;animation?.cancel();displayed.set(next);timer=setTimeout(()=>{if(!destroyed&&id===generation)animate(next,true);},0);},duration);
 });});
 inject(DestroyRef).onDestroy(()=>{destroyed=true;generation++;if(timer)clearTimeout(timer);animation?.cancel();});
}
