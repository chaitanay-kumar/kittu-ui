import '@angular/compiler';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {BrowserTestingModule,platformBrowserTesting} from '@angular/platform-browser/testing';
import {KittuLoaderComponent} from '../packages/angular/dist/fesm2022/kittu-ui-angular.mjs';
const dom=new JSDOM('<html><body></body></html>');for(const key of ['window','document','HTMLElement','Element','Node'])globalThis[key]=dom.window[key];
TestBed.initTestEnvironment(BrowserTestingModule,platformBrowserTesting());TestBed.configureTestingModule({imports:[KittuLoaderComponent],providers:[provideZonelessChangeDetection()]});
const fixture=TestBed.createComponent(KittuLoaderComponent),loader=fixture.componentInstance;const set=(key,value)=>{fixture.componentRef.setInput(key,value);fixture.detectChanges();};fixture.detectChanges();
try{
 assert.equal(loader.variant(),'arc');assert.equal(loader.size(),32);assert.equal(loader.label(),'Loading...');assert.equal(loader.color(),'currentColor');assert.equal(loader.reduceMotion(),false);
 for(const [key,expected] of [['size',32],['variant','arc'],['label','Loading...'],['reduceMotion',false],['color','currentColor'],['className','']]){set(key,undefined);assert.equal(loader[key](),expected);}
 assert.equal(fixture.nativeElement.getAttribute('aria-label'),'Loading...');
 assert.equal(fixture.nativeElement.getAttribute('role'),'status');assert.equal(fixture.nativeElement.getAttribute('aria-busy'),'true');assert.equal(fixture.nativeElement.querySelectorAll('circle').length,2);
 set('variant','dots');set('size',16);set('color','#ff8800');assert.equal(fixture.nativeElement.querySelector('.k-loader-dots').style.width,'24px');assert.equal(fixture.nativeElement.querySelectorAll('.k-loader-dot').length,3);assert.equal(fixture.nativeElement.querySelector('.k-loader-dot').style.width,'4px');assert.equal(fixture.nativeElement.querySelector('.k-loader-dot').style.backgroundColor,'rgb(255, 136, 0)');
 set('variant','line');assert.equal(fixture.nativeElement.querySelector('.k-loader-line').style.height,'3px');assert.equal(fixture.nativeElement.querySelector('.k-loader-line').style.width,'32px');
 set('variant','rings');assert.equal(fixture.nativeElement.querySelectorAll('.k-loader-ring').length,2);assert.equal(fixture.nativeElement.querySelector('.k-loader-center').style.width,'4px');
 set('variant','arc');set('reduceMotion',true);assert.equal(fixture.nativeElement.querySelector('.k-loader-spin'),null);set('className','customer-loader');assert.ok(fixture.nativeElement.classList.contains('customer-loader'));
 set('label','');assert.equal(fixture.nativeElement.querySelector('.k-loader-label'),null);set('label','Reading');set('aria-label','Custom accessible label');assert.equal(fixture.nativeElement.getAttribute('aria-label'),'Custom accessible label');assert.equal(fixture.nativeElement.querySelector('.k-loader-label').textContent,'Reading');
 set('aria-label',undefined);assert.equal(fixture.nativeElement.getAttribute('aria-label'),null);assert.equal(fixture.nativeElement.querySelector('.k-loader-label').textContent,'Reading');
 console.log('Loader package contract passed: defaults, four variants, minimum dimensions, colors, size updates, reduced spin, classes, label and native aria-label override.');
}finally{fixture.destroy();TestBed.resetTestingModule();dom.window.close();}
