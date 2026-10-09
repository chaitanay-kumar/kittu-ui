import '@angular/compiler';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {Component,signal,provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {BrowserTestingModule,platformBrowserTesting} from '@angular/platform-browser/testing';
import {KittuButtonComponent} from '../packages/angular/dist/fesm2022/kittu-ui-angular.mjs';
const dom=new JSDOM('<html><body></body></html>');for(const key of ['window','document','HTMLElement','Element','Node'])globalThis[key]=dom.window[key];
TestBed.initTestEnvironment(BrowserTestingModule,platformBrowserTesting());TestBed.configureTestingModule({imports:[KittuButtonComponent],providers:[provideZonelessChangeDetection()]});
const fixture=TestBed.createComponent(KittuButtonComponent),button=fixture.componentInstance;const set=(key,value)=>{fixture.componentRef.setInput(key,value);fixture.detectChanges();};fixture.detectChanges();
try{
 const native=()=>fixture.nativeElement.querySelector('button');assert.equal(button.variant(),'primary');assert.equal(button.size(),'md');assert.equal(button.isLoading(),false);assert.equal(button.fullWidth(),false);assert.equal(native().type,'button');assert.equal(native().disabled,false);assert.equal(native().getAttribute('aria-busy'),'false');
 for(const variant of ['default','primary','secondary','outline','ghost','destructive','success','link','gradient']){set('variant',variant);assert.ok(native().classList.contains('k-button-'+variant));assert.equal(!!native().querySelector('.k-button-shimmer'),variant==='gradient');}
 set('disabled',true);assert.equal(native().disabled,true);set('disabled',false);set('isLoading',true);set('loadingText','Sending');assert.equal(native().disabled,true);assert.equal(native().getAttribute('aria-busy'),'true');assert.equal(native().textContent.trim(),'Sending');assert.equal(native().querySelector('svg').getAttribute('aria-hidden'),'true');assert.equal(native().querySelector('svg path').getAttribute('d'),'M21 12a9 9 0 1 1-6.219-8.56');set('size','sm');assert.ok(native().querySelector('.k-button-spinner-sm'));set('isLoading',false);assert.equal(native().disabled,false);assert.equal(native().querySelector('svg'),null);
 set('fullWidth',true);set('className','customer-button');assert.ok(native().classList.contains('k-button-full'));assert.ok(native().classList.contains('customer-button'));set('type','submit');assert.equal(native().type,'submit');set('type','reset');assert.equal(native().type,'reset');for(const key of ['variant','size','type','className'])set(key,undefined);assert.equal(button.variant(),'primary');assert.equal(button.size(),'md');assert.equal(native().type,'button');assert.equal(native().classList.contains('undefined'),false);
 console.log('Button packaged contract passed: defaults, nine variants, custom selector, loading/disabled, spinner geometry, sizes, fullWidth/classes and native types.');
}finally{fixture.destroy();TestBed.resetTestingModule();}

class ProjectedConsumer{loading=signal(false);}
Component({selector:'projected-consumer',standalone:true,imports:[KittuButtonComponent],template:'<kittu-button [isLoading]="loading()"><b kittuButtonLeftIcon>L</b>Go<i kittuButtonRightIcon>R</i></kittu-button>'})(ProjectedConsumer);
TestBed.configureTestingModule({imports:[ProjectedConsumer],providers:[provideZonelessChangeDetection()]});const projected=TestBed.createComponent(ProjectedConsumer);projected.detectChanges();
try{const native=()=>projected.nativeElement.querySelector('button');assert.equal(native().textContent.trim(),'LGoR');projected.componentInstance.loading.set(true);projected.detectChanges();assert.equal(native().textContent.trim(),'Go');assert.equal(native().querySelectorAll('.k-button-slot').length,0);projected.componentInstance.loading.set(false);projected.detectChanges();assert.equal(native().textContent.trim(),'LGoR');console.log('Projected icon slots and child content survive loading transitions.');}
finally{projected.destroy();TestBed.resetTestingModule();dom.window.close();}
