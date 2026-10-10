/** Animate from the current painted state so interrupted morphs continue without jumping. */
export class MorphingIconMotion {
  private readonly animations=new Map<HTMLElement,Animation>();
  update(element:HTMLElement,active:boolean,duration:number,animate:boolean):void{
    const target={opacity:active?'0':'1',transform:active?'scale(0.65) rotate(-90deg)':'none'};
    this.paint(element,target,duration,animate);
  }
  updateTarget(element:HTMLElement,active:boolean,duration:number,animate:boolean):void{
    this.paint(element,{opacity:active?'1':'0',transform:active?'none':'scale(0.65) rotate(90deg)'},duration,animate);
  }
  private paint(element:HTMLElement,target:{opacity:string;transform:string},duration:number,animate:boolean):void{
    const current=animate?getComputedStyle(element):null;
    const from=current?{opacity:current.opacity,transform:current.transform}:target;
    this.animations.get(element)?.cancel();this.animations.delete(element);
    Object.assign(element.style,target);
    if(!animate||duration<=0||typeof element.animate!=='function')return;
    const animation=element.animate([from,target],{duration:duration*1000,easing:'cubic-bezier(0.4, 0, 0.2, 1)'});
    this.animations.set(element,animation);animation.onfinish=()=>{if(this.animations.get(element)===animation){this.animations.delete(element);animation.cancel();}};
  }
  destroy():void{for(const animation of this.animations.values())animation.cancel();this.animations.clear();}
}
