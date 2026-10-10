// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { KitFormController } from './port-controllers';

@Component({
 selector:"kit-form", standalone:true,
 host:{'data-kit':"form",style:'display:block;min-width:0'},
 template:`
<form class="kit-control kit-surface kit-stack" aria-label="Your details" (submit)="submit($event)">
<h3>{{label()||'Your details'}}</h3>@for(field of fields();track field.key){<label [for]="uid+'-'+field.key">{{field.label}}<input [id]="uid+'-'+field.key" [name]="field.key" [type]="field.type==='password'&&showPassword()?'text':field.type||'text'" [attr.autocomplete]="field.type==='password'?'current-password':field.type==='email'?'email':'on'" [required]="field.required||false" [attr.minlength]="field.minLength??null" [value]="values()[field.key]||''" [disabled]="disabled()||busy()" (input)="change(field.key,$event)" />
</label>}<label class="kit-row">
<input type="checkbox" [checked]="showPassword()" (change)="showPassword.set($any($event.target).checked)" />Show password</label>
<button type="submit" [disabled]="disabled()||busy()">{{busy()?'Submitting…':'Submit'}}</button>@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}<p role="status">{{status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}</form>
`
})
export class KitFormComponent extends KitFormController {

}
