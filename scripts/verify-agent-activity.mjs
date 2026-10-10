/** Public packaged contracts, composition and consumer-driven state updates. */
import '@angular/compiler';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { KitAiAgentActivityComponent,KitAgentActivityHeaderComponent,KitAgentActivityTimelineComponent,KitAgentActivityItemComponent } from '../packages/angular/dist/fesm2022/kit-ui-angular.mjs';
const dom=new JSDOM('<html><body></body></html>',{url:'http://localhost'});
for(const key of ['window','document','HTMLElement','Element','Node'])globalThis[key]=dom.window[key];
globalThis.matchMedia=()=>({matches:true});
TestBed.initTestEnvironment(BrowserTestingModule,platformBrowserTesting());
TestBed.configureTestingModule({imports:[KitAiAgentActivityComponent],providers:[provideZonelessChangeDetection()]});
const fixture=TestBed.createComponent(KitAiAgentActivityComponent),agent=fixture.componentInstance;
const set=(key,value)=>{fixture.componentRef.setInput(key,value);fixture.detectChanges();};
const activities=[
 {id:'a',type:'thinking',title:'Analyze',status:'success',duration:'42ms',details:{input:{query:'hello'},output:'Ready'},metadata:{score:2,active:true}},
 {id:'b',type:'code_execution',title:'Execute',status:'running',details:{codeSnippet:'const ready = true;',language:'typescript'}},
 {id:'c',type:'completed',title:'Complete',status:'pending'},
];
try{
 set('defaultExpandedIds',['a']);set('activities',activities);
 assert.equal(fixture.nativeElement.querySelectorAll('.k-aa-item').length,3);
 assert.equal(fixture.nativeElement.querySelectorAll('.k-aa-connector').length,2);
 assert.ok(fixture.nativeElement.textContent.includes('1 of 3 completed'));
 assert.equal(fixture.nativeElement.querySelectorAll('.k-aa-disclosure').length,1);
 assert.ok(fixture.nativeElement.textContent.includes('"query": "hello"'));
 assert.ok(fixture.nativeElement.textContent.includes('Output Result'));
 assert.ok(fixture.nativeElement.textContent.includes('score:2'));
 set('title','Trace');set('agentName','Kit Fox');set('className','consumer-agent');set('accentColor','#123456');set('isRunning',true);
 assert.ok(fixture.nativeElement.querySelector('.consumer-agent'));
 assert.equal(fixture.nativeElement.querySelector('.k-ai-agent-activity').style.getPropertyValue('--accent-custom'),'#123456');
 assert.ok(fixture.nativeElement.textContent.includes('— Kit Fox'));assert.ok(fixture.nativeElement.querySelector('.k-aa-running'));
 agent.toggleExpand('b');fixture.detectChanges();assert.ok(fixture.nativeElement.querySelector('code').textContent.includes('const ready'));
 assert.equal(fixture.nativeElement.querySelectorAll('.k-aa-disclosure').length,2);
 set('defaultExpandedIds',['c']);assert.deepEqual([...agent.expandedIds()],['a','b']);
 agent.collapseAll();fixture.detectChanges();assert.equal(fixture.nativeElement.querySelectorAll('.k-aa-disclosure').length,0);
 agent.expandAll();fixture.detectChanges();assert.equal(agent.expandedIds().size,3);assert.equal(fixture.nativeElement.querySelectorAll('.k-aa-disclosure').length,2);
 assert.equal(fixture.nativeElement.querySelector('[data-activity-id=c] [role=button]'),null);
 set('activities',[{...activities[0],title:'Replacement',status:'error'}]);
 assert.ok(fixture.nativeElement.textContent.includes('Replacement'));assert.ok(fixture.nativeElement.querySelector('.k-aa-error'));
 set('activities',[{...activities[0],status:'cancelled'}]);assert.ok(fixture.nativeElement.querySelector('.k-aa-cancelled'));
 set('activities',[]);assert.ok(fixture.nativeElement.textContent.includes('No activity recorded'));
 fixture.destroy();TestBed.resetTestingModule();
 class Consumer{rows=activities;}
 Component({selector:'consumer-agent',standalone:true,imports:[KitAiAgentActivityComponent,KitAgentActivityHeaderComponent,KitAgentActivityTimelineComponent,KitAgentActivityItemComponent],template:`
 <kit-ai-agent-activity [activities]="rows"><kit-agent-activity-header title="Custom header" agentName="Consumer" [showControls]="false"/><kit-agent-activity-timeline className="custom-timeline"/></kit-ai-agent-activity>
 <kit-ai-agent-activity [activities]="rows"><p class="custom-content">Custom content</p></kit-ai-agent-activity>
 <kit-ai-agent-activity [activities]="rows"><kit-agent-activity-item [activity]="rows[0]" [isLast]="true" className="custom-item"/></kit-ai-agent-activity>`})(Consumer);
 TestBed.configureTestingModule({imports:[Consumer],providers:[provideZonelessChangeDetection()]});
 const consumer=TestBed.createComponent(Consumer);consumer.detectChanges();
 try{
  assert.equal(consumer.nativeElement.querySelectorAll('.k-aa-header').length,1);
  assert.ok(consumer.nativeElement.textContent.includes('Custom header'));
  assert.ok(consumer.nativeElement.querySelector('.custom-timeline'));
  assert.equal(consumer.nativeElement.querySelector('.k-aa-controls'),null);
  assert.equal(consumer.nativeElement.querySelector('.custom-content').parentElement.querySelector('.k-aa-timeline'),null);
  assert.ok(consumer.nativeElement.querySelector('.custom-item'));
 }finally{consumer.destroy();}
 console.log('Agent Activity package contract passed: typed activities, status/counts, all detail sections, independent/default expansion, updated data, controls, class/accent, empty state and arbitrary/compound projection.');
}finally{if(!fixture.componentRef.hostView.destroyed)fixture.destroy();TestBed.resetTestingModule();dom.window.close();}
