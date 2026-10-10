import { DestroyRef, ElementRef, afterEveryRender, inject } from '@angular/core';

/** Native disclosure entry motion sampled from React's 300/32/0.6 spring. */
export function installDataTableMotion(): void {
 const host:HTMLElement=inject(ElementRef).nativeElement;
 const animations=new Set<Animation>();
 let previous=new Set<Element>();
 const frames=Array.from({length:41},(_,i)=>{
   const time=i*.015,omega=Math.sqrt(300/.6),zeta=32/(2*Math.sqrt(300*.6));
   // This spring is overdamped. Use its two real roots for displacement.
   const root=Math.sqrt(zeta*zeta-1),r1=-omega*(zeta-root),r2=-omega*(zeta+root);
   const displacement=(r2*Math.exp(r1*time)-r1*Math.exp(r2*time))/(r2-r1);
   return {offset:i/40,progress:1-displacement};
 });
 const render=afterEveryRender(()=>{
   const nodes=new Set(Array.from(host.querySelectorAll<HTMLElement>('.k-dt-detail,.k-dt-card-detail,.k-dt-bulk')));
   if(typeof matchMedia!=='undefined'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
     for(const node of nodes){if(previous.has(node)||typeof node.animate!=='function')continue;
       const height=node.getBoundingClientRect().height;
       const animation=node.animate(frames.map(({offset,progress})=>({offset,height:height*progress+'px',opacity:progress})),{duration:600,easing:'linear'});
       animations.add(animation);animation.finished.catch(()=>{}).finally(()=>animations.delete(animation));
     }
   }
   previous=nodes;
 });
 inject(DestroyRef).onDestroy(()=>{render.destroy();for(const animation of animations)animation.cancel();animations.clear();});
}
