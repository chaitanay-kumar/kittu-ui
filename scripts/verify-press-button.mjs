import '@angular/compiler';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {Component,provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {BrowserTestingModule,platformBrowserTesting} from '@angular/platform-browser/testing';
import {KitPressButtonComponent} from '../packages/angular/dist/fesm2022/kit-ui-angular.mjs';
const dom=new JSDOM('<html><body></body></html>');for(const key of ['window','document','HTMLElement','Element','Node'])globalThis[key]=dom.window[key];
TestBed.initTestEnvironment(BrowserTestingModule,platformBrowserTesting());TestBed.configureTestingModule({imports:[KitPressButtonComponent],providers:[provideZonelessChangeDetection()]});
const fixture=TestBed.createComponent(KitPressButtonComponent),button=fixture.componentInstance;const set=(key,value)=>{fixture.componentRef.setInput(key,value);fixture.detectChanges();};fixture.detectChanges();
try{
 const native=()=>fixture.nativeElement.querySelector('button');assert.equal(button.variant(),'primary');assert.equal(button.size(),'md');assert.equal(button.fullWidth(),false);assert.equal(native().type,'button');assert.equal(native().disabled,false);
 for(const variant of ['primary','secondary','outline','ghost']){set('variant',variant);assert.ok(native().classList.contains('k-press-'+variant));}
 set('disabled',true);assert.equal(native().disabled,true);set('disabled',false);assert.equal(native().disabled,false);
 set('fullWidth',true);set('className','customer-button');assert.ok(native().classList.contains('k-press-full'));assert.ok(native().classList.contains('customer-button'));set('type','submit');assert.equal(native().type,'submit');set('type','reset');assert.equal(native().type,'reset');for(const key of ['variant','size','pressStrength','type','className'])set(key,undefined);assert.equal(button.variant(),'primary');assert.equal(button.size(),'md');assert.equal(button.pressStrength(),.04);assert.equal(native().type,'button');assert.equal(native().classList.contains('undefined'),false);
 console.log('Press Button packaged contract passed: optional defaults, variants, disabled, full width, custom classes and native types.');
}finally{fixture.destroy();TestBed.resetTestingModule();}
class NativeConsumer{}
Component({selector:'native-consumer',standalone:true,imports:[KitPressButtonComponent],template:'<form><button kitPressButton type="submit" name="action" value="save" aria-label="Save" data-customer="yes"><b>Save</b></button></form><kit-press-button variant="ghost"><i>Cancel</i></kit-press-button>'})(NativeConsumer);
TestBed.configureTestingModule({imports:[NativeConsumer],providers:[provideZonelessChangeDetection()]});const projected=TestBed.createComponent(NativeConsumer);projected.detectChanges();
try{const native=projected.nativeElement.querySelector('button');assert.equal(native.type,'submit');assert.equal(native.name,'action');assert.equal(native.value,'save');assert.equal(native.getAttribute('aria-label'),'Save');assert.equal(native.getAttribute('data-customer'),'yes');assert.equal(native.querySelector('b').textContent,'Save');assert.equal(projected.nativeElement.querySelector('kit-press-button button i').textContent,'Cancel');console.log('Native attribute selector preserves arbitrary DOM attributes and both selectors project arbitrary content.');}
finally{projected.destroy();TestBed.resetTestingModule();dom.window.close();}
