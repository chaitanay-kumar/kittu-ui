// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, ElementRef, output, signal, viewChild } from '@angular/core';
import { KittuActionController } from './port-controllers';

@Component({
 selector:"kittu-book-call-button", standalone:true,
 host:{'data-kittu':"book-call-button",style:'display:block;min-width:0'},
 template:`
<div class="kittu-control kittu-stack">
<button type="button" [disabled]="blocked()" (click)="dialog().nativeElement.showModal()">{{label()||'Book a call'}}</button>
<dialog #booking class="kittu-dialog kittu-control">
<form class="kittu-stack" (submit)="book($event)">
<h3>Find a time</h3>
<label>Date<input type="date" required [min]="today" (input)="date.set($any($event.target).value)" />
</label>
<label>Time<input type="time" required (input)="time.set($any($event.target).value)" />
</label>
<div class="kittu-row">
<button type="button" (click)="dialog().nativeElement.close()">Cancel</button>
<button type="submit" [disabled]="blocked()">Request booking</button>
</div>
</form>
</dialog>
<p role="status" class="kittu-status">{{loading() || busy() ? 'Working…' : status()}}</p>@if(error()){<p role="alert">{{error()}}</p>}@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</div>
`
})
export class KittuBookCallButtonComponent extends KittuActionController {
readonly dialog=viewChild.required<ElementRef<HTMLDialogElement>>('booking');readonly date=signal('');readonly time=signal('');readonly bookingRequested=output<{date:string;time:string}>();readonly today=new Date().toISOString().slice(0,10);book(event:SubmitEvent):void{event.preventDefault();if(!this.date()||!this.time()||this.blocked())return;this.bookingRequested.emit({date:this.date(),time:this.time()});this.dialog().nativeElement.close();this.status.set('Booking requested. Your application confirms availability.');}
}
