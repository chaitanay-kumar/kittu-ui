import {DestroyRef,ElementRef,afterEveryRender,inject,type Signal} from '@angular/core';
import type {LoaderVariant} from './loader-types';
/** Native equivalents of the reference's repeating keyframes and easing curves. */
export function installLoaderMotion(variant:Signal<LoaderVariant>,reduceMotion:Signal<boolean>):void{
 const host:HTMLElement=inject(ElementRef).nativeElement;let key='';const animations=new Set<Animation>();
 const render=afterEveryRender(()=>{
  const next=variant()+':'+reduceMotion();if(next===key)return;key=next;for(const animation of animations)animation.cancel();animations.clear();
  for(const [index,node] of Array.from(host.querySelectorAll<HTMLElement>('[data-loader-motion]')).entries()){
   if(typeof node.animate!=='function')continue;
   let frames:Keyframe[],duration:number,delay=0,easing:string;
   switch(variant()){
    case 'dots':frames=reduceMotion()?[{opacity:.3},{opacity:.8},{opacity:.3}]:[{opacity:.3,transform:'scale(.8)'},{opacity:1,transform:'scale(1.25)'},{opacity:.3,transform:'scale(.8)'}];duration=1400;delay=index*220;easing='cubic-bezier(.42,0,.58,1)';break;
    case 'line':frames=reduceMotion()?[{opacity:.4},{opacity:1},{opacity:.4}]:[{left:'-35%'},{left:'100%'}];duration=1800;easing='cubic-bezier(.4,0,.2,1)';break;
    case 'rings':frames=reduceMotion()?[{opacity:.2},{opacity:.6},{opacity:.2}]:[{opacity:.8,transform:'scale(.6)'},{opacity:0,transform:'scale(1.15)'}];duration=2200;delay=index*900;easing='cubic-bezier(0,0,.58,1)';break;
    default:continue;
   }
   // Easing applies to each segment, as in the React keyframe transitions.
   frames=frames.map((frame,index)=>({...frame,offset:index/(frames.length-1),easing}));
   animations.add(node.animate(frames,{duration,delay,iterations:Infinity,fill:'both'}));
  }
 });
 inject(DestroyRef).onDestroy(()=>{render.destroy();for(const animation of animations)animation.cancel();animations.clear();});
}
