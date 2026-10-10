import {DestroyRef,ElementRef,effect,inject,untracked,type Signal,type WritableSignal} from '@angular/core';
import type {ButtonStatusState} from './morphing-button-types';
const root1=-30+Math.sqrt(140),root2=-30-Math.sqrt(140);
type Axis={value:number;velocity:number;target:number;delta:number;speed:number};
const axis=(value:number):Axis=>({value,velocity:0,target:value,delta:.005,speed:.01});
function retarget(value:Axis,target:number):void{
 const granular=Math.abs(target-value.value)<5;value.target=target;value.delta=granular?.005:.5;value.speed=granular?.01:2;
}
/** Advance the 380/30/.5 spring analytically, retaining interrupted velocity. */
function advance(value:Axis,time:number):boolean{
 const x=value.value-value.target,c1=(value.velocity-root2*x)/(root1-root2),c2=x-c1;
 value.value=value.target+c1*Math.exp(root1*time)+c2*Math.exp(root2*time);
 value.velocity=root1*c1*Math.exp(root1*time)+root2*c2*Math.exp(root2*time);
 const done=Math.abs(value.value-value.target)<=value.delta&&Math.abs(value.velocity)<=value.speed;
 if(done){value.value=value.target;value.velocity=0;}return done;
}
/** AnimatePresence wait: one uninterrupted outgoing exit, latest pending child. */
export function installMorphingButtonMotion(status:Signal<ButtonStatusState>,displayed:WritableSignal<ButtonStatusState>):void{
 const host=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
 const opacity=axis(1),position=axis(0);
 const nativeFrames=typeof requestAnimationFrame==='function';
 let initialized=false,destroyed=false,pending:ButtonStatusState='idle',phase:'rest'|'enter'|'exit'='rest';
 let frame:number|ReturnType<typeof setTimeout>|undefined,last=0;
 const schedule=()=>nativeFrames?requestAnimationFrame(tick):setTimeout(()=>tick(performance.now()),16);
 const scaled=()=>displayed()==='success'||displayed()==='error';
 const write=()=>{const node=host.querySelector<HTMLElement>('.k-mb-content');if(node){node.style.opacity=String(opacity.value);node.style.transform=phase==='rest'?'none':scaled()?`scale(${position.value})`:`translateY(${position.value}px)`;}};
 const tick=(time:number)=>{
  frame=undefined;if(destroyed)return;const dt=Math.max((time-last)/1000,0);last=time;
  const opacityDone=advance(opacity,dt),positionDone=advance(position,dt);write();
  if(opacityDone&&positionDone){
   if(phase==='exit'){
    const next=pending;displayed.set(next);phase='enter';
    opacity.value=0;opacity.velocity=0;position.value=scaled()?.8:(next==='idle'?-6:6);position.velocity=0;
    retarget(opacity,1);retarget(position,scaled()?1:0);write();
   }else{phase='rest';write();}
  }
  if(phase!=='rest')frame=schedule();
 };
 const start=()=>{if(frame===undefined){last=performance.now();frame=schedule();}};
 effect(()=>{const next=status();untracked(()=>{
  pending=next;
  if(!initialized){initialized=true;displayed.set(next);position.value=scaled()?1:0;position.target=position.value;return;}
  const current=displayed();
  if(phase==='exit'&&next!==current)return; // Do not restart the departing child.
  if(next===current){
   if(phase==='exit'){phase='enter';retarget(opacity,1);retarget(position,scaled()?1:0);start();}
   return;
  }
  phase='exit';retarget(opacity,0);retarget(position,scaled()?.8:(current==='idle'?6:-6));start();
 });});
 inject(DestroyRef).onDestroy(()=>{destroyed=true;if(frame!==undefined){if(nativeFrames)cancelAnimationFrame(frame as number);else clearTimeout(frame as ReturnType<typeof setTimeout>);}});
}
