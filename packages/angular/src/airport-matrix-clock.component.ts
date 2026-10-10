// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, DestroyRef, computed, inject, input, model, signal } from '@angular/core';

@Component({
 selector:"kittu-airport-matrix-clock", standalone:true,
 host:{'data-kittu':"airport-matrix-clock",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-surface kittu-stack">
<h3>{{label()}}</h3>
<time class="k-matrix-clock" [attr.datetime]="now().toISOString()">{{formatted()}}</time>
<button type="button" [attr.aria-pressed]="paused()" (click)="paused.set(!paused())">{{paused()?'Resume clock':'Pause clock'}}</button>
</section>
`
})
export class KittuAirportMatrixClockComponent {
readonly label=input('Local departures');readonly timeZone=input('UTC');readonly paused=model(false);readonly now=signal(new Date());readonly formatted=computed(()=>{try{return new Intl.DateTimeFormat('en-GB',{timeZone:this.timeZone(),hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(this.now());}catch{return 'Invalid time zone';}});constructor(){const timer=setInterval(()=>{if(!this.paused())this.now.set(new Date());},1000);inject(DestroyRef).onDestroy(()=>clearInterval(timer));}
}
