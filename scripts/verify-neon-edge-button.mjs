import '@angular/compiler';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {Component,provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {BrowserTestingModule,platformBrowserTesting} from '@angular/platform-browser/testing';
import {KitNeonEdgeButtonComponent} from '../packages/angular/dist/fesm2022/kit-ui-angular.mjs';
const dom=new JSDOM('<html><body></body></html>');for(const key of ['window','document','HTMLElement','Element','Node'])globalThis[key]=dom.window[key];
TestBed.initTestEnvironment(BrowserTestingModule,platformBrowserTesting());TestBed.configureTestingModule({imports:[KitNeonEdgeButtonComponent],providers:[provideZonelessChangeDetection()]});
const fixture=TestBed.createComponent(KitNeonEdgeButtonComponent),neon=fixture.componentInstance;const set=(key,value)=>{fixture.componentRef.setInput(key,value);fixture.detectChanges();};fixture.detectChanges();
try{
 const button=()=>fixture.nativeElement.querySelector('button');assert.equal(neon.speed(),1);assert.equal(neon.glow(),true);assert.equal(button().type,'button');assert.equal(button().textContent.trim(),'Deploy preview');assert.equal(button().querySelector('.k-neon-beam').style.animation,'k-neon-rotate 3s linear infinite');assert.equal(button().querySelector('svg').getAttribute('aria-hidden'),'true');assert.ok(button().querySelector('svg path').getAttribute('d').startsWith('M15.914 4'));assert.ok(button().classList.contains('k-neon-glow'));
 set('speed',.5);assert.equal(button().querySelector('.k-neon-beam').style.animation,'k-neon-rotate 6s linear infinite');set('speed',2);assert.equal(button().querySelector('.k-neon-beam').style.animation,'k-neon-rotate 1.5s linear infinite');set('glow',false);assert.equal(button().classList.contains('k-neon-glow'),false);set('disabled',true);assert.equal(button().disabled,true);set('disabled',false);assert.equal(button().disabled,false);set('type','submit');assert.equal(button().type,'submit');set('type','reset');assert.equal(button().type,'reset');set('className','customer-neon');assert.ok(button().classList.contains('customer-neon'));for(const key of ['speed','glow','type','className'])set(key,undefined);assert.equal(neon.speed(),1);assert.equal(neon.glow(),true);assert.equal(button().type,'button');assert.equal(button().classList.contains('undefined'),false);
 console.log('Neon Edge Button packaged contract passed: defaults, fallback content, speeds/glow, custom selector, native types/disabled, className and accessible Zap geometry.');
}finally{fixture.destroy();TestBed.resetTestingModule();}
class ProjectedConsumer{}
Component({selector:'neon-projected-consumer',standalone:true,imports:[KitNeonEdgeButtonComponent],template:'<kit-neon-edge-button>Ship <em>now</em></kit-neon-edge-button>'})(ProjectedConsumer);TestBed.configureTestingModule({imports:[ProjectedConsumer],providers:[provideZonelessChangeDetection()]});const projected=TestBed.createComponent(ProjectedConsumer);projected.detectChanges();try{assert.equal(projected.nativeElement.querySelector('.k-neon-label').textContent,'Ship now');assert.ok(projected.nativeElement.querySelector('.k-neon-label em'));console.log('Custom projected markup preserved.');}finally{projected.destroy();TestBed.resetTestingModule();dom.window.close();}
