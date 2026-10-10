// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, computed, input, model, output } from '@angular/core';

@Component({
 selector:"kittu-otp-input", standalone:true,
 host:{'data-kittu':"otp-input",style:'display:block;min-width:0'},
 template:`
<div class="kittu-control kittu-stack">
<label>{{label()}}<input class="k-otp" type="text" inputmode="numeric" autocomplete="one-time-code" [attr.maxlength]="safeLength()" [value]="value()" [disabled]="disabled()" (input)="change($event)" />
</label>
<div class="kittu-row" aria-hidden="true">@for(index of slots();track index){<span class="k-otp-slot">{{value()[index]||'·'}}</span>}</div>
<p role="status">{{value().length===safeLength()?'Code complete.':value().length+' of '+safeLength()+' digits'}}</p>
</div>
`
})
export class KittuOtpInputComponent {
readonly label=input('Verification code');readonly length=input(6);readonly value=model('');readonly disabled=input(false);readonly completed=output<string>();readonly safeLength=computed(()=>Math.max(1,Math.min(12,Math.floor(this.length()))));readonly slots=computed(()=>Array.from({length:this.safeLength()},(_,i)=>i));change(event:Event):void{const input=event.target as HTMLInputElement;const value=input.value.replace(/[^0-9]/g,'').slice(0,this.safeLength());input.value=value;this.value.set(value);if(value.length===this.safeLength())this.completed.emit(value);}
}
