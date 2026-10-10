import {DestroyRef,ElementRef,inject,type Signal,type WritableSignal} from '@angular/core';
/** Uses the reference's 280/20 translation and 380/30/.5 press springs. */
export function installMagneticMotion(strength:Signal<number>,disabled:Signal<boolean>,hovered:WritableSignal<boolean>):void{
 const host=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
 const button=()=>host.tagName==='BUTTON'?host:host.querySelector('button');
 const axes=[{value:0,target:0,velocity:0,k:280,d:20,m:1},{value:0,target:0,velocity:0,k:280,d:20,m:1},{value:1,target:1,velocity:0,k:380,d:30,m:.5}];
 let frame=0,last=0;
 const tick=(time:number)=>{const dt=Math.min((time-last)/1000,.04);last=time;let active=false;for(const a of axes){const x=a.value-a.target,v=a.velocity,d=a.d/(2*a.m),disc=d*d-a.k/a.m;let y:number,nextVelocity:number;
 if(disc<0){const w=Math.sqrt(-disc),c=(v+d*x)/w,e=Math.exp(-d*dt);y=e*(x*Math.cos(w*dt)+c*Math.sin(w*dt));nextVelocity=-d*y+e*w*(-x*Math.sin(w*dt)+c*Math.cos(w*dt));}
 else{const root=Math.sqrt(disc),r1=-d+root,r2=-d-root,c1=(v-r2*x)/(r1-r2),c2=x-c1;y=c1*Math.exp(r1*dt)+c2*Math.exp(r2*dt);nextVelocity=r1*c1*Math.exp(r1*dt)+r2*c2*Math.exp(r2*dt);}
 a.value=a.target+y;a.velocity=nextVelocity;if(Math.abs(a.value-a.target)<.001&&Math.abs(a.velocity)<.001){a.value=a.target;a.velocity=0;}else active=true;}const node=button();if(node)node.style.transform=`translateX(${axes[0].value}px) translateY(${axes[1].value}px) scale(${axes[2].value})`;frame=active?requestAnimationFrame(tick):0;};
 const start=()=>{if(!frame){last=performance.now();frame=requestAnimationFrame(tick);}};
 const move=(event:Event)=>{const node=button();if(!node)return;const e=event as MouseEvent,r=node.getBoundingClientRect();axes[0].target=(e.clientX-r.left-r.width/2)*strength();axes[1].target=(e.clientY-r.top-r.height/2)*strength();start();};
 const enter=()=>hovered.set(true),leave=()=>{hovered.set(false);axes[0].target=axes[1].target=0;start();};
 const validPointer=(event:Event)=>!(event instanceof PointerEvent)||(event.pointerType==='mouse'?event.button<=0:event.isPrimary!==false);
 const down=(event:Event)=>{if(disabled()||!validPointer(event))return;axes[2].target=.96;start();};
 const release=(event?:Event)=>{if(event&&!validPointer(event))return;axes[2].target=1;start();};
 const keydown=(event:Event)=>{if((event as KeyboardEvent).key==='Enter')down(event);},keyup=(event:Event)=>{if((event as KeyboardEvent).key==='Enter')release();};
 const bindings:[EventTarget,string,EventListener][]=[[host,'mousemove',move],[host,'mouseenter',enter],[host,'mouseleave',leave],[host,'pointerdown',down],[host,'pointercancel',release],[host,'blur',release],[host,'keydown',keydown],[host,'keyup',keyup]];
 if(typeof window!=='undefined')bindings.push([window,'pointerup',release],[window,'pointercancel',release]);
 for(const [target,name,listener] of bindings)target.addEventListener(name,listener,name==='blur'||(typeof window!=='undefined'&&target===window));
 inject(DestroyRef).onDestroy(()=>{if(frame)cancelAnimationFrame(frame);for(const [target,name,listener] of bindings)target.removeEventListener(name,listener,name==='blur'||(typeof window!=='undefined'&&target===window));});
}
