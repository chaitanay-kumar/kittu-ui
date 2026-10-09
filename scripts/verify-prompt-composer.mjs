/** Exercise the built public package's async request ownership and draft recovery. */
import '@angular/compiler';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {BrowserTestingModule,platformBrowserTesting} from '@angular/platform-browser/testing';
import {KittuAIPromptComposerComponent} from '../packages/angular/dist/fesm2022/kittu-ui-angular.mjs';
const dom=new JSDOM('<html><body></body></html>');
for(const key of ['window','document','HTMLElement','Element','Node'])globalThis[key]=dom.window[key];
TestBed.initTestEnvironment(BrowserTestingModule,platformBrowserTesting());
TestBed.configureTestingModule({imports:[KittuAIPromptComposerComponent],providers:[provideZonelessChangeDetection()]});
const make=()=>{const fixture=TestBed.createComponent(KittuAIPromptComposerComponent);fixture.detectChanges();return fixture;};
const fixture=make(),composer=fixture.componentInstance;
const set=(key,value)=>{fixture.componentRef.setInput(key,value);fixture.detectChanges();};
try{
 assert.equal(composer.maxAttachments(),4);assert.equal(composer.maxAttachmentSize(),10*1024*1024);
 assert.match(fixture.nativeElement.textContent,/Connect an onSend handler/);
 assert.equal(fixture.nativeElement.querySelector('button[type=submit]').disabled,true);
 assert.equal(fixture.nativeElement.querySelector('label').htmlFor,fixture.nativeElement.querySelector('textarea').id);
 assert.equal(fixture.nativeElement.querySelector('label').children.length,0);
 const second=make();assert.notEqual(second.componentInstance.id,composer.id);second.destroy();
 const first=new dom.window.File(['one'],'first.txt'),secondFile=new dom.window.File(['two'],'second.txt');
 const attach=files=>{const input={files,value:'selected'};composer.attach({target:input});assert.equal(input.value,'');};
 set('maxAttachments',1);set('maxAttachmentSize',1024*1024);attach([first,secondFile]);assert.deepEqual(composer.files(),[]);assert.equal(composer.status(),'Choose up to 1 attachments, each under 1 MB.');
 set('maxAttachmentSize',2);attach([first]);assert.deepEqual(composer.files(),[]);
 set('maxAttachmentSize',1024*1024);attach([first]);assert.equal(composer.files()[0],first);composer.remove(0);assert.deepEqual(composer.files(),[]);attach([first]);
 let oldResolve,oldSignal,calls=0;
 set('onSend',async(payload,signal)=>{calls++;assert.equal(payload.text,'draft');assert.deepEqual(payload.attachments,[first]);oldSignal=signal;await new Promise(resolve=>oldResolve=resolve);});
 composer.text.set('  draft  ');const oldSend=composer.send();assert.equal(composer.pending(),true);await composer.send();assert.equal(calls,1);
 composer.cancel();assert.equal(oldSignal.aborted,true);assert.equal(composer.text(),'  draft  ');assert.equal(composer.files().length,1);
 let resolveNew;set('onSend',async()=>new Promise(resolve=>resolveNew=resolve));const newSend=composer.send();oldResolve();await oldSend;assert.equal(composer.pending(),true);assert.equal(composer.text(),'  draft  ');resolveNew();await newSend;assert.equal(composer.text(),'');assert.deepEqual(composer.files(),[]);assert.equal(composer.status(),'Prompt sent.');
 set('onSend',async()=>{throw new Error('Failed');});composer.text.set('keep');attach([first]);await composer.send();assert.equal(composer.text(),'keep');assert.equal(composer.files()[0],first);assert.equal(composer.pending(),false);assert.match(composer.status(),/Sending failed/);
 set('disabled',true);assert.ok([...fixture.nativeElement.querySelectorAll('button,input,textarea')].every(control=>control.disabled));let disabledCalls=0;set('onSend',async()=>{disabledCalls++;});await composer.send();assert.equal(disabledCalls,0);set('disabled',false);
 let aliasCalls=0;set('onSend',undefined);set('sendHandler',async()=>{aliasCalls++;});await composer.send();assert.equal(aliasCalls,1);
 let primaryCalls=0;set('onSend',async()=>{primaryCalls++;});composer.text.set('primary');await composer.send();assert.equal(primaryCalls,1);assert.equal(aliasCalls,1);
 let disposedSignal;set('onSend',async(_payload,signal)=>{disposedSignal=signal;await new Promise(resolve=>signal.addEventListener('abort',resolve,{once:true}));});composer.text.set('dispose');const disposedSend=composer.send();fixture.destroy();assert.equal(disposedSignal.aborted,true);await disposedSend;
 console.log('Prompt Composer package contract passed: React defaults, unique labels, attachment limits, payload, pending exclusion, cancellation, stale request isolation, success, failure, disabled, alias precedence and destruction abort.');
}finally{if(!fixture.componentRef.hostView.destroyed)fixture.destroy();TestBed.resetTestingModule();dom.window.close();}
