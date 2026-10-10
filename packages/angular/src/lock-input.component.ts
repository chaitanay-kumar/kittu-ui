// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, model, signal } from '@angular/core';

@Component({
 selector:"kit-lock-input", standalone:true,
 host:{'data-kit':"lock-input",style:'display:block;min-width:0'},
 template:`
<div class="kit-control kit-stack">
<label>{{label()}}<input [type]="visible()?'text':'password'" [readOnly]="locked()" [disabled]="disabled()" [value]="value()" autocomplete="current-password" (input)="value.set($any($event.target).value)" />
</label>
<div class="kit-row">
<button type="button" [disabled]="disabled()" [attr.aria-pressed]="locked()" (click)="locked.set(!locked())">{{locked()?'Unlock editing':'Lock editing'}}</button>
<button type="button" [disabled]="disabled()" [attr.aria-pressed]="visible()" (click)="visible.set(!visible())">{{visible()?'Hide password':'Show password'}}</button>
</div>
<p class="kit-muted">Editing lock is a UI control, not encryption.</p>
</div>
`
})
export class KitLockInputComponent {
readonly label=input('Protected input');readonly value=model('');readonly disabled=input(false);readonly locked=model(true);readonly visible=signal(false);
}
