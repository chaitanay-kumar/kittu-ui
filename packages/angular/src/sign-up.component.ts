// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, input } from '@angular/core';
import { KittuFormController } from './port-controllers';
import type { KittuField } from './port-types';

@Component({
 selector:"kittu-sign-up", standalone:true,
 host:{'data-kittu':"sign-up",style:'display:block;min-width:0'},
 template:`
<form class="kittu-control kittu-surface kittu-stack" aria-label="Create an account" (submit)="submit($event)">
<h3>{{label()||'Create an account'}}</h3>@for(field of fields();track field.key){<label [for]="uid+'-'+field.key">{{field.label}}<input [id]="uid+'-'+field.key" [name]="field.key" [type]="field.type==='password'&&showPassword()?'text':field.type||'text'" [attr.autocomplete]="field.type==='password'?'new-password':field.type==='email'?'email':'on'" [required]="field.required||false" [attr.minlength]="field.minLength??null" [value]="values()[field.key]||''" [disabled]="disabled()||busy()" (input)="change(field.key,$event)" />
</label>}<label class="kittu-row">
<input type="checkbox" [checked]="showPassword()" (change)="showPassword.set($any($event.target).checked)" />Show password</label>
<button type="submit" [disabled]="disabled()||busy()">{{busy()?'Submitting…':'Create account'}}</button>@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}<p role="status">{{status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}</form>
`
})
export class KittuSignUpComponent extends KittuFormController {
override readonly fields=input<KittuField[]>([{key:'name',label:'Name',type:'text',required:true},{key:'email',label:'Email',type:'email',required:true},{key:'password',label:'Password',type:'password',required:true,minLength:8},{key:'confirmPassword',label:'Confirm password',type:'password',required:true,minLength:8}]);override async submit(event:SubmitEvent):Promise<void>{if(this.values()['password']!==this.values()['confirmPassword']){event.preventDefault();this.error.set('Passwords do not match.');return;}await super.submit(event);}
}
