/** Tests the packaged public component, including consumer-driven input updates. */
import '@angular/compiler';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { KittuActivityFeedComponent } from '../packages/angular/dist/fesm2022/kittu-ui-angular.mjs';
const dom = new JSDOM('<html><body></body></html>', { url: 'http://localhost' });
for (const key of ['window', 'document', 'HTMLElement', 'Element', 'Node']) globalThis[key] = dom.window[key];
globalThis.matchMedia = () => ({ matches: true });
TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
TestBed.configureTestingModule({ imports: [KittuActivityFeedComponent], providers: [provideZonelessChangeDetection()] });
const event = { id:'evt-1', type:'deploy', status:'success', title:'Production release', timestamp:'Now', actor:{name:'CI'}, traceId:'trace-1', payload:{version:'1'} };
const fixture = TestBed.createComponent(KittuActivityFeedComponent);
const api = fixture.componentInstance;
const set = (key, value) => { fixture.componentRef.setInput(key,value); fixture.detectChanges(); };
try {
  set('events',[event]);
  assert.equal(api.filteredEvents().length,1);
  for (const [flag, selector] of [['enableSearch','input'],['enableFilters','.k-af-filters'],['enableLiveSimulation','.k-af-stream']]) {
    set(flag,false); assert.equal(fixture.nativeElement.querySelector(selector),null);
    set(flag,true); assert.ok(fixture.nativeElement.querySelector(selector));
  }
  set('className','consumer-class');
  assert.ok(fixture.nativeElement.querySelector('.consumer-class'));
  let replayed, emitted;
  set('onEventReplay',value => { replayed=value; });
  const subscription=api.eventReplay.subscribe(value => { emitted=value; });
  fixture.nativeElement.querySelector('[title="Replay event"]').click();
  assert.equal(replayed,event); assert.equal(emitted,event); subscription.unsubscribe();
  api.togglePayload(event.id);fixture.detectChanges();
  assert.equal(fixture.nativeElement.querySelector('[title="Toggle JSON payload"]').getAttribute('aria-expanded'),'true');
  set('events',[{...event,id:'evt-2',title:'Replacement event'}]);
  assert.equal(api.filteredEvents()[0].title,'Replacement event');
  assert.equal(api.displayedEvents().length,1);
  assert.equal(api.categories()[0].count,1);
  assert.ok(!fixture.nativeElement.textContent.includes('Production release'));
  set('events',[]);assert.ok(fixture.nativeElement.textContent.includes('No activity events recorded matching filters.'));
  // Capture interval callbacks to verify the cap and cleanup without slow sleeps.
  const originalSet = globalThis.setInterval, originalClear = globalThis.clearInterval;
  const intervals = new Map();let intervalId=0;
  globalThis.setInterval=(callback,delay)=>{assert.equal(delay,3500);intervals.set(++intervalId,callback);return intervalId;};
  globalThis.clearInterval=id=>intervals.delete(id);
  try {
    set('maxEntries',2);api.isLiveStreaming.set(true);fixture.detectChanges();
    for(let i=0;i<4;i++) { [...intervals.values()][0]();fixture.detectChanges(); }
    assert.equal(api.displayedEvents().length,2);
    assert.equal(api.categories()[0].count,2);
    api.isLiveStreaming.set(false);fixture.detectChanges();assert.equal(intervals.size,0);
    api.isLiveStreaming.set(true);fixture.detectChanges();assert.equal(intervals.size,1);
    fixture.destroy();assert.equal(intervals.size,0);
  } finally { globalThis.setInterval=originalSet;globalThis.clearInterval=originalClear; }
  console.log('Activity Feed package contract: flags, event updates, callback/output replay, payload controls, className, stream limit and disposal passed.');
} finally { if(!fixture.componentRef.hostView.destroyed)fixture.destroy();TestBed.resetTestingModule();dom.window.close(); }
