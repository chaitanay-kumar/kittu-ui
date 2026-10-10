import {DestroyRef,ElementRef,effect,inject,type Signal} from '@angular/core';
/** Analytic springSnappy (380/30/.5), retaining velocity across controlled updates. */
export function installHamburgerMotion(open:Signal<boolean>,size:Signal<number>):void{
 const host=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
 const axes=[0,0,1,1].map(value=>({value,target:value,velocity:0,delta:.005,speed:.01}));
 let frame=0,last=0;
 const raf=(callback:FrameRequestCallback)=>typeof requestAnimationFrame==='function'?requestAnimationFrame(callback):setTimeout(()=>callback(performance.now()),16) as unknown as number;
 const cancel=(id:number)=>typeof cancelAnimationFrame==='function'?cancelAnimationFrame(id):clearTimeout(id);
 const write=()=>{const lines=host.querySelectorAll<HTMLElement>('.k-hamburger-line');if(lines.length!==3)return;lines[0].style.transform=`translateY(${axes[0].value}px) rotate(${axes[1].value}deg)`;lines[1].style.opacity=String(axes[2].value);lines[1].style.transform=`scaleX(${axes[3].value})`;lines[2].style.transform=`translateY(${-axes[0].value}px) rotate(${-axes[1].value}deg)`;};
 const tick=(time:number)=>{const dt=Math.max(0,(time-last)/1000);last=time;let active=false;const root=Math.sqrt(140),r1=-30+root,r2=-30-root;for(const a of axes){const x=a.value-a.target,c1=(a.velocity-r2*x)/(r1-r2),c2=x-c1,e1=Math.exp(r1*dt),e2=Math.exp(r2*dt);a.value=a.target+c1*e1+c2*e2;a.velocity=r1*c1*e1+r2*c2*e2;if(Math.abs(a.value-a.target)<=a.delta&&Math.abs(a.velocity)<=a.speed){a.value=a.target;a.velocity=0;}else active=true;}write();frame=active?raf(tick):0;};
 effect(()=>{const targets=open()?[0,45,0,.3]:[-size()*.28,0,1,1];axes.forEach((a,i)=>{a.target=targets[i];const granular=Math.abs(a.value-a.target)<5;a.delta=granular?.005:.5;a.speed=granular?.01:2;});if(!frame){write();last=performance.now();frame=raf(tick);}});
 inject(DestroyRef).onDestroy(()=>{if(frame)cancel(frame);});
}
