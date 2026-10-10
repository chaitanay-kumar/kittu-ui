import { Component, DestroyRef, inject, signal } from '@angular/core';
import { KittuAiAgentActivityComponent } from 'kittu-ui-angular';
import type { AgentActivityItemData } from 'kittu-ui-angular';
import { INITIAL_ACTIVITIES } from './agent-data';

@Component({selector:'kittu-agent-demo',standalone:true,imports:[KittuAiAgentActivityComponent],styleUrls:['./agent-demo.css'],template:`
<div class="k-aa-demo"><div class="k-aa-demo-controls"><div><span>Status:</span>@if(isRunning()){<span class="k-aa-demo-running"><i></i>Running trace</span>}@else{<span>Completed</span>}</div><button type="button" (click)="restart()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg><span>Restart</span></button></div>
<kittu-ai-agent-activity [activities]="activities()" [isRunning]="isRunning()" [defaultExpandedIds]="['act-1','act-4']"/>
</div>`})
export class AgentDemoComponent {
 readonly activities=signal<AgentActivityItemData[]>([...INITIAL_ACTIVITIES]);
 readonly isRunning=signal(true);
 private timer?:ReturnType<typeof setInterval>;
 constructor(){inject(DestroyRef).onDestroy(()=>clearInterval(this.timer));}
 restart():void {
  clearInterval(this.timer);
  this.isRunning.set(true);
  this.activities.set(INITIAL_ACTIVITIES.map((activity,index)=>({...activity,status:index===0?'running':'pending'})));
  let step=0;
  this.timer=setInterval(()=>{
   step++;
   if(step<=INITIAL_ACTIVITIES.length){this.activities.update(activities=>activities.map((activity,index)=>({...activity,status:index<step-1?'success':index===step-1?'running':'pending'})));}
   else{this.activities.update(activities=>activities.map(activity=>({...activity,status:'success'})));this.isRunning.set(false);clearInterval(this.timer);this.timer=undefined;}
  },900);
 }
}
