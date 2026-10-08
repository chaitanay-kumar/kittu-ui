// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, DestroyRef, computed, effect, inject, input, signal, untracked } from '@angular/core';

@Component({
 selector:"kittu-animated-number", standalone:true,
 host:{'data-kittu':"animated-number",style:'display:block;min-width:0'},
 template:`
<output class="kittu-control k-number" [attr.aria-label]="label()">{{formatted()}}</output>
`
})
export class KittuAnimatedNumberComponent {
readonly value=input(1248);readonly duration=input(600);readonly locale=input('en');readonly label=input('Value');readonly displayed=signal(1248);readonly formatted=computed(()=>new Intl.NumberFormat(this.locale()).format(Math.round(this.displayed())));private timer:ReturnType<typeof setInterval>|undefined;constructor(){inject(DestroyRef).onDestroy(()=>clearInterval(this.timer));effect(()=>{const value=this.value();const duration=this.duration();clearInterval(this.timer);if(typeof matchMedia==='undefined'||matchMedia('(prefers-reduced-motion: reduce)').matches||duration<=0){this.displayed.set(value);return;}const from=untracked(this.displayed);const start=Date.now();this.timer=setInterval(()=>{const progress=Math.min(1,(Date.now()-start)/Math.max(1,duration));this.displayed.set(from+(value-from)*(1-(1-progress)**3));if(progress>=1)clearInterval(this.timer);},16);});}
}
