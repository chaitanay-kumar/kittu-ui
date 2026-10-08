// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';

@Component({
 selector:"kittu-text-scramble-decoder", standalone:true,
 host:{'data-kittu':"text-scramble-decoder",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-stack">
<div class="k-text k-scramble" [class.k-paused]="paused()" [attr.data-text]="text()" [style.transform]="transform()" (wheel)="wheel($event)">
<span class="sr-only">{{text()}}</span>
<span aria-hidden="true">{{display()}}</span>
</div>
<button type="button" [disabled]="disabled()" (click)="decode()">Decode text</button>
</section>
`
})
export class KittuTextScrambleDecoderComponent {
readonly text=input('Nimble by nature. Precise by design.');readonly paused=input(false);readonly disabled=input(false);readonly decoded=signal<string|null>(null);readonly display=computed(()=>this.decoded()??this.text());readonly transform=signal('translateX(0)');private timer:ReturnType<typeof setInterval>|undefined;private settle:ReturnType<typeof setTimeout>|undefined;constructor(){inject(DestroyRef).onDestroy(()=>{clearInterval(this.timer);clearTimeout(this.settle);});}wheel(event:WheelEvent):void{if(this.disabled()||this.paused()||matchMedia('(prefers-reduced-motion: reduce)').matches)return;this.transform.set('translateX('+Math.max(-25,Math.min(25,event.deltaY*.15))+'px)');clearTimeout(this.settle);this.settle=setTimeout(()=>this.transform.set('translateX(0)'),180);}decode():void{clearInterval(this.timer);if(this.disabled()||this.paused()||matchMedia('(prefers-reduced-motion: reduce)').matches){this.decoded.set(this.text());return;}let step=0;this.timer=setInterval(()=>{const text=this.text();step+=2;this.decoded.set(Array.from(text).map((c,i)=>i<step||c===' '?c:'01<>/{}'[Math.floor(Math.random()*7)]).join(''));if(step>=text.length)clearInterval(this.timer);},45);}
}
