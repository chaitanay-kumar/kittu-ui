// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, DestroyRef, inject, input, model, output, signal } from '@angular/core';
import type { KitMessage, KitChatHandler } from './port-types';

@Component({
 selector:"kit-chat", standalone:true,
 host:{'data-kit':"chat",style:'display:block;min-width:0'},
 template:`
<section class="kit-control kit-surface kit-stack">
<h3>{{label()}}</h3>
<ol class="k-chat-log" aria-label="Conversation">@for(message of messages();track message.id){<li [class.k-chat-user]="message.role==='user'">
<strong>{{message.role==='user'?'You':'Assistant'}}</strong>
<p>{{message.text}}</p>
</li>}@empty{<li>No messages yet.</li>}</ol>
<form class="kit-stack" (submit)="send($event)">
<label>Message<textarea [value]="draft()" [disabled]="disabled()||busy()" (input)="draft.set($any($event.target).value)" required rows="3">
</textarea>
</label>
<button type="submit" [disabled]="disabled()||busy()||!draft().trim()||!sendHandler()">{{busy()?'Sending…':error()?'Retry message':'Send message'}}</button>@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</form>@if(!sendHandler()){<p>Connect a chat handler to send messages.</p>}@if(error()){<p role="alert">{{error()}}</p>}<p role="status">{{status()}}</p>
</section>
`
})
export class KitChatComponent {
readonly messages=model<KitMessage[]>([]);readonly sendHandler=input<KitChatHandler>();readonly disabled=input(false);readonly label=input('Conversation');readonly draft=signal('');readonly busy=signal(false);readonly error=signal('');readonly status=signal('');readonly messageSent=output<KitMessage>();private controller?:AbortController;private destroyed=false;constructor(){inject(DestroyRef).onDestroy(()=>{this.destroyed=true;this.controller?.abort();});}async send(event:SubmitEvent):Promise<void>{event.preventDefault();const handler=this.sendHandler();const text=this.draft().trim();if(!handler||!text||this.disabled()||this.busy())return;const controller=new AbortController();this.controller=controller;this.error.set('');this.status.set('Sending message…');this.busy.set(true);try{const reply=await handler(text,controller.signal);if(this.destroyed||controller.signal.aborted)return;const message:KitMessage={id:crypto.randomUUID(),role:'user',text};this.messages.update(a=>[...a,message,{id:crypto.randomUUID(),role:'assistant',text:reply}]);this.messageSent.emit(message);this.draft.set('');this.status.set('Message received.');}catch(error){if(!this.destroyed&&!controller.signal.aborted){this.error.set(error instanceof Error?error.message:'Sending failed. Your draft is preserved.');this.status.set('Sending failed.');}}finally{if(!this.destroyed&&this.controller===controller){this.busy.set(false);this.controller=undefined;}}}cancel():void{this.controller?.abort();this.controller=undefined;this.busy.set(false);this.status.set('Cancelled. Your draft is preserved.');}
}
