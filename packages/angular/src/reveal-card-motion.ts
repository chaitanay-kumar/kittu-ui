import {DestroyRef,ElementRef,inject,type Signal,type WritableSignal} from '@angular/core';
/** React useSpring 260/20/1 plus its explicit 200ms easeOut reveal tween. */
export function installRevealCardMotion(maxTilt:Signal<number>,glare:WritableSignal<{x:number;y:number}>){
 const host=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
 const axes=[0,0].map(value=>({value,target:value,velocity:0,delta:.001,speed:.01}));
 const nativeFrames=typeof requestAnimationFrame==='function';let frame:number|ReturnType<typeof setTimeout>|undefined,last=0,destroyed=false;
 let revealNode:HTMLElement|null=null,previousHover:boolean|undefined,animation:Animation|undefined;
 const card=()=>host.querySelector<HTMLElement>('.k-reveal-parity');
 const schedule=()=>nativeFrames?requestAnimationFrame(tick):setTimeout(()=>tick(performance.now()),16);
 const write=()=>{const node=card();if(node)node.style.transform=axes.every(a=>a.value===0)?'none':`rotateX(${axes[0].value}deg) rotateY(${axes[1].value}deg)`;};
 const tick=(time:number)=>{frame=undefined;if(destroyed)return;const dt=Math.max((time-last)/1000,0);last=time;let active=false;const w=Math.sqrt(160);for(const a of axes){const x=a.value-a.target,c=(a.velocity+10*x)/w,e=Math.exp(-10*dt);const y=e*(x*Math.cos(w*dt)+c*Math.sin(w*dt));a.velocity=-10*y+e*w*(-x*Math.sin(w*dt)+c*Math.cos(w*dt));a.value=a.target+y;if(Math.abs(y)<=a.delta&&Math.abs(a.velocity)<=a.speed){a.value=a.target;a.velocity=0;}else active=true;}write();if(active)frame=schedule();};
 const target=(x:number,y:number)=>{axes.forEach((a,i)=>{a.target=i===0?x:y;});if(frame===undefined){last=performance.now();frame=schedule();}};
 const move=(event:MouseEvent)=>{if(destroyed)return;const rect=card()?.getBoundingClientRect();if(!rect)return;const x=event.clientX-rect.left,y=event.clientY-rect.top;target((y-rect.height/2)/(rect.height/2)*-maxTilt(),(x-rect.width/2)/(rect.width/2)*maxTilt());glare.set({x:x/rect.width*100,y:y/rect.height*100});};
 const leave=()=>target(0,0);
 const reveal=(active:boolean)=>{const node=host.querySelector<HTMLElement>('.k-reveal-content');if(node===revealNode&&active===previousHover)return;const from=node?{opacity:getComputedStyle(node).opacity,transform:getComputedStyle(node).transform}:null;animation?.cancel();animation=undefined;const changed=node!==revealNode;revealNode=node;previousHover=active;if(!node)return;const to={opacity:active?'1':'0',transform:active?'none':'translateY(10px)'};Object.assign(node.style,to);if((changed&&!active)||typeof node.animate!=='function')return;animation=node.animate([from!,to],{duration:200,easing:'cubic-bezier(0, 0, 0.58, 1)'});const running=animation;running.onfinish=()=>{if(animation===running){running.cancel();animation=undefined;}};};
 inject(DestroyRef).onDestroy(()=>{destroyed=true;animation?.cancel();if(frame!==undefined){if(nativeFrames)cancelAnimationFrame(frame as number);else clearTimeout(frame as ReturnType<typeof setTimeout>);}});
 return{move,leave,reveal};
}
