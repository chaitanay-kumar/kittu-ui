import '@angular/compiler';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {Component,provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {BrowserTestingModule,platformBrowserTesting} from '@angular/platform-browser/testing';
import {KitSpotlightCardComponent} from '../packages/angular/dist/fesm2022/kit-ui-angular.mjs';
const dom=new JSDOM('<html><body></body></html>');for(const key of ['window','document','HTMLElement','Element','Node','MouseEvent'])globalThis[key]=dom.window[key];
TestBed.initTestEnvironment(BrowserTestingModule,platformBrowserTesting());
TestBed.configureTestingModule({imports:[KitSpotlightCardComponent],providers:[provideZonelessChangeDetection()]});const fixture=TestBed.createComponent(KitSpotlightCardComponent),card=fixture.componentInstance;const set=(key,value)=>{fixture.componentRef.setInput(key,value);fixture.detectChanges();};fixture.detectChanges();
try{
 const root=fixture.nativeElement;assert.equal(card.spotlightSize(),350);assert.equal(card.spotlightColor(),'rgba(56, 189, 248, 0.08)');assert.deepEqual(card.point(),{x:-1000,y:-1000});assert.equal(root.children.length,3);assert.equal(root.getAttribute('role'),null);assert.equal(root.querySelector('button'),null);
 root.getBoundingClientRect=()=>({left:20,top:30});root.dispatchEvent(new MouseEvent('mousemove',{clientX:90,clientY:80}));fixture.detectChanges();assert.deepEqual(card.point(),{x:70,y:50});assert.match(root.children[1].style.background,/350px circle at 70px 50px/);root.dispatchEvent(new MouseEvent('mouseleave'));fixture.detectChanges();assert.deepEqual(card.point(),{x:-1000,y:-1000});
 set('spotlightSize',180);set('spotlightColor','red');set('className','customer-card');assert.match(root.children[1].style.background,/180px.*red/);assert.ok(root.classList.contains('customer-card'));
 let calls=0;set('onMouseMove',event=>{assert.equal(event.clientX,90);calls++;});root.dispatchEvent(new MouseEvent('mousemove',{clientX:90,clientY:80}));fixture.detectChanges();assert.equal(calls,1);assert.deepEqual(card.point(),{x:-1000,y:-1000});set('onMouseMove',undefined);root.dispatchEvent(new MouseEvent('mousemove',{clientX:90,clientY:80}));fixture.detectChanges();assert.equal(calls,1);assert.deepEqual(card.point(),{x:-1000,y:-1000});
 for(const key of ['spotlightSize','spotlightColor','className'])set(key,undefined);assert.equal(card.spotlightSize(),350);assert.equal(card.spotlightColor(),'rgba(56, 189, 248, 0.08)');assert.equal(root.classList.contains('undefined'),false);
}finally{fixture.destroy();TestBed.resetTestingModule();}
class Consumer {calls=0;}
Component({selector:'test-consumer',standalone:true,imports:[KitSpotlightCardComponent],template:'<kit-spotlight-card aria-label="Custom card"><h2>Projected heading</h2><button (click)="calls=calls+1">Projected action</button></kit-spotlight-card>'})(Consumer);
TestBed.configureTestingModule({imports:[Consumer],providers:[provideZonelessChangeDetection()]});const projected=TestBed.createComponent(Consumer);projected.detectChanges();try{assert.equal(projected.nativeElement.querySelector('h2').textContent,'Projected heading');projected.nativeElement.querySelector('button').click();assert.equal(projected.componentInstance.calls,1);assert.equal(projected.nativeElement.querySelector('kit-spotlight-card').getAttribute('aria-label'),'Custom card');console.log('Spotlight Card packaged contract passed: defaults/undefined inputs, reactive gradients, native mouse tracking, handler override precedence and projected interactive content.');}finally{projected.destroy();TestBed.resetTestingModule();dom.window.close();}
