import '@angular/compiler';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {Component, provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {BrowserTestingModule, platformBrowserTesting} from '@angular/platform-browser/testing';
import {KitStretchSwitchComponent} from '../packages/angular/dist/fesm2022/kit-ui-angular.mjs';

const dom = new JSDOM('<html><body></body></html>');
for (const key of ['window','document','HTMLElement','Element','Node']) globalThis[key] = dom.window[key];
TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
TestBed.configureTestingModule({imports:[KitStretchSwitchComponent],providers:[provideZonelessChangeDetection()]});
const fixture=TestBed.createComponent(KitStretchSwitchComponent), component=fixture.componentInstance;
const set=(key,value)=>{fixture.componentRef.setInput(key,value);fixture.detectChanges();};
const button=()=>fixture.nativeElement.querySelector('button');
try {
  set('defaultChecked',true);
  assert.equal(button().type,'button');assert.equal(button().getAttribute('role'),'switch');assert.equal(button().getAttribute('aria-checked'),'true');
  set('defaultChecked',false);assert.equal(button().getAttribute('aria-checked'),'true');
  const requests=[],outputs=[];set('onChange',value=>requests.push(value));component.checkedChange.subscribe(value=>outputs.push(value));
  set('checked',false);button().click();fixture.detectChanges();button().click();fixture.detectChanges();
  assert.equal(button().getAttribute('aria-checked'),'false');assert.deepEqual(requests,[true,true]);assert.deepEqual(outputs,requests);
  set('checked',undefined);assert.equal(button().getAttribute('aria-checked'),'true');button().click();fixture.detectChanges();assert.equal(button().getAttribute('aria-checked'),'false');
  set('label',0);assert.equal(fixture.nativeElement.querySelector('.k-stretch-copy'),null);
  set('label',true);assert.equal(fixture.nativeElement.querySelector('.k-stretch-label').textContent,'');set('label',false);assert.equal(fixture.nativeElement.querySelector('.k-stretch-copy'),null);
  set('description','Details');set('disabled',true);fixture.nativeElement.querySelector('.k-stretch-copy').click();fixture.detectChanges();assert.equal(requests.length,3);assert.equal(button().disabled,true);
  set('disabled',undefined);set('className',undefined);set('description',undefined);assert.equal(button().disabled,false);assert.equal(component.className(),'');assert.equal(fixture.nativeElement.querySelector('.k-stretch-copy'),null);
  console.log('Stretch Switch package contract: initial default, controlled requests/output, fallback, disabled copy and optional defaults passed.');
} finally {fixture.destroy();TestBed.resetTestingModule();}
class Consumer {}
Component({selector:'stretch-consumer',standalone:true,imports:[KitStretchSwitchComponent],template:'<ng-template #label><b>Template label</b></ng-template><div kitStretchSwitch [label]="label" className="customer-class" description="Help"></div>'})(Consumer);
TestBed.configureTestingModule({imports:[Consumer],providers:[provideZonelessChangeDetection()]});
const consumer=TestBed.createComponent(Consumer);consumer.detectChanges();
try {assert.equal(consumer.nativeElement.querySelector('.k-stretch-label b').textContent,'Template label');assert.ok(consumer.nativeElement.querySelector('[kitStretchSwitch]').classList.contains('customer-class'));assert.equal(consumer.nativeElement.querySelector('.k-stretch-description').textContent,'Help');console.log('Stretch Switch template label and native div selector passed.');}
finally {consumer.destroy();TestBed.resetTestingModule();dom.window.close();}
