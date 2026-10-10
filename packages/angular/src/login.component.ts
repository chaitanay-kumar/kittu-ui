// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component } from '@angular/core';
import { KittuFormController } from './port-controllers';

@Component({
 selector:"kittu-login", standalone:true,
 host:{'data-kittu':"login",style:'display:block;min-width:0'},
 template:`
<form class="kittu-control kittu-surface kittu-stack" aria-label="Welcome back" (submit)="submit($event)">
<h3>{{label()||'Welcome back'}}</h3>@for(field of fields();track field.key){<label [for]="uid+'-'+field.key">{{field.label}}<input [id]="uid+'-'+field.key" [name]="field.key" [type]="field.type==='password'&&showPassword()?'text':field.type||'text'" [attr.autocomplete]="field.type==='password'?'current-password':field.type==='email'?'email':'on'" [required]="field.required||false" [attr.minlength]="field.minLength??null" [value]="values()[field.key]||''" [disabled]="disabled()||busy()" (input)="change(field.key,$event)" />
</label>}<label class="kittu-row">
<input type="checkbox" [checked]="showPassword()" (change)="showPassword.set($any($event.target).checked)" />Show password</label>
<button type="submit" [disabled]="disabled()||busy()">{{busy()?'Submitting…':'Sign in'}}</button>@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}<p role="status">{{status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}</form>
`
})
export class KittuLoginComponent extends KittuFormController {

}
