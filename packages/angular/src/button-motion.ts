import {DestroyRef,ElementRef,effect,inject,type Signal} from '@angular/core';
/** Native press feedback using the reference's 380/30/0.5 overdamped spring. */
export function installButtonPress(blocked:Signal<boolean>):void{
 const host=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;let animation:Animation|undefined,pressed=false;let keyPressed=false;
 const button=()=>host.tagName==='BUTTON'?host:host.querySelector('button');
 const animate=(target:number)=>{const node=button();if(!node||typeof node.animate!=='function')return;const matrix=getComputedStyle(node).transform;const start=matrix==='none'?1:new DOMMatrixReadOnly(matrix).a;animation?.cancel();
  const r1=(-30+Math.sqrt(30*30-4*.5*380))/(2*.5),r2=(-30-Math.sqrt(30*30-4*.5*380))/(2*.5);
  const frames=Array.from({length:61},(_,index)=>{const time=index/120;const progress=1-(r2*Math.exp(r1*time)-r1*Math.exp(r2*time))/(r2-r1);return{transform:`scale(${start+(target-start)*progress})`,offset:index/60};});frames[60].transform=`scale(${target})`;
  animation=node.animate(frames,{duration:500,fill:'forwards'});
 };
 const release=()=>{if(!pressed)return;pressed=false;keyPressed=false;animate(1);};
 const down=(event:Event)=>{if(blocked())return;if(event instanceof PointerEvent&&event.button!==0)return;pressed=true;animate(.97);};
 const keydown=(event:Event)=>{const key=event as KeyboardEvent;if(key.key==='Enter'&&!key.repeat&&!blocked()){keyPressed=true;down(event);}};
 const keyup=(event:Event)=>{if(keyPressed&&(event as KeyboardEvent).key==='Enter')release();};
 const bindings:[EventTarget,string,EventListener][]=[[host,'pointerdown',down],[host,'pointerleave',release],[host,'pointercancel',release],[host,'blur',release],[host,'keydown',keydown],[host,'keyup',keyup]];
 if(typeof document!=='undefined')bindings.push([document,'pointerup',release]);
 for(const [target,name,listener] of bindings)target.addEventListener(name,listener,true);
 effect(()=>{if(blocked()){pressed=false;keyPressed=false;animation?.cancel();animation=undefined;}});
 inject(DestroyRef).onDestroy(()=>{animation?.cancel();for(const [target,name,listener] of bindings)target.removeEventListener(name,listener,true);});
}
