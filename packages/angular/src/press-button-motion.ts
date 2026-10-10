import {DestroyRef,ElementRef,effect,inject,type Signal} from '@angular/core';
/** Native press feedback using the reference's 380/30/0.5 overdamped spring. */
export function installPressButtonMotion(blocked:Signal<boolean>,strength:Signal<number>):void{
 const host=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;let animation:Animation|undefined,pressed=false;let keyPressed=false;
 const button=()=>host.tagName==='BUTTON'?host:host.querySelector('button');
 const animate=(target:number)=>{const node=button();if(!node||typeof node.animate!=='function')return;const matrix=getComputedStyle(node).transform;const initial=matrix==='none'?new DOMMatrixReadOnly():new DOMMatrixReadOnly(matrix);const start=initial.a,startY=initial.d;const compression=Math.min(.06,Math.max(.01,strength()));const targetX=target===1?1:.97*(1-compression),targetY=target===1?1:.97*(1-compression*1.6);animation?.cancel();
  const r1=(-30+Math.sqrt(30*30-4*.5*380))/(2*.5),r2=(-30-Math.sqrt(30*30-4*.5*380))/(2*.5);
  const frames=Array.from({length:61},(_,index)=>{const time=index/120;const progress=1-(r2*Math.exp(r1*time)-r1*Math.exp(r2*time))/(r2-r1);return{transform:`scale(${start+(targetX-start)*progress},${startY+(targetY-startY)*progress})`,offset:index/60};});frames[60].transform=`scale(${targetX},${targetY})`;
  animation=node.animate(frames,{duration:500,fill:'forwards'});
 };
 const release=()=>{if(!pressed)return;pressed=false;keyPressed=false;animate(1);};
 const primary=(event:Event)=>!(event instanceof PointerEvent)||(event.pointerType==='mouse'?event.button<=0:event.isPrimary!==false);
 const down=(event:Event)=>{if(blocked()||!primary(event))return;pressed=true;animate(.97);};
 const pointerEnd=(event:Event)=>{if(primary(event))release();};
 const blur=()=>{if(keyPressed)release();};
 const keydown=(event:Event)=>{const key=event as KeyboardEvent;if(key.key==='Enter'&&!key.repeat&&!blocked()){keyPressed=true;down(event);}};
 const keyup=(event:Event)=>{if(keyPressed&&(event as KeyboardEvent).key==='Enter')release();};
 const bindings:[EventTarget,string,EventListener][]=[[host,'pointerdown',down],[host,'blur',blur],[host,'keydown',keydown],[host,'keyup',keyup]];
 if(typeof window!=='undefined')bindings.push([window,'pointerup',pointerEnd],[window,'pointercancel',pointerEnd]);
 for(const [target,name,listener] of bindings)target.addEventListener(name,listener,true);
 effect(()=>{const disabled=blocked();strength();if(disabled){pressed=false;keyPressed=false;animation?.cancel();animation=undefined;}else if(pressed){animate(.97);}});
 inject(DestroyRef).onDestroy(()=>{animation?.cancel();for(const [target,name,listener] of bindings)target.removeEventListener(name,listener,true);});
}
