/** Browser-only consumer fixture; never imported by the documentation website. */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '@angular/compiler';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { KitAiAgentActivityComponent } from '../../packages/angular/dist/fesm2022/kit-ui-angular.mjs';
import { AIAgentActivity, type AgentActivityItemData } from '../../src/components/ui/AIAgentActivity';
import '../../src/styles/index.css';

const params=new URLSearchParams(location.search);
document.documentElement.classList.toggle('dark',params.get('theme')==='dark');
const activities:AgentActivityItemData[]=[
 {id:'metadata',type:'api_request',title:'Inspect metadata',description:'Consumer provided parameters and output.',status:'success',duration:'12ms',details:{input:{nested:{query:'hello'}},output:'Ready',codeSnippet:'const result = true;'},metadata:{attempt:2,cached:true,note:'Verified'}},
 {id:'error',type:'failed',title:'Request failed',status:'error',description:'Backend refused the request.',details:{output:{error:'Forbidden'}}},
 {id:'cancelled',type:'cancelled',title:'Request cancelled',status:'cancelled'},
 {id:'pending',type:'database_query',title:'Query queued',status:'pending',details:{}},
 {id:'running',type:'tool_execution',title:'Tool active',status:'running'},
];
const rows=params.get('state')==='empty'?[]:activities;
document.body.style.margin='0';document.body.style.padding='16px';
const wrapper=document.createElement('div');wrapper.style.maxWidth='672px';wrapper.style.margin='auto';document.body.append(wrapper);
if(params.get('framework')==='angular'){
 class AngularConsumer {readonly activities=rows;}
 Component({selector:'parity-agent',standalone:true,imports:[KitAiAgentActivityComponent],template:`<kit-ai-agent-activity title="Agent Contract" agentName="Kit Fox" [activities]="activities" [defaultExpandedIds]="['metadata']" accentColor="#123456" className="consumer-agent"/>`})(AngularConsumer);
 wrapper.innerHTML='<parity-agent></parity-agent>';
 void bootstrapApplication(AngularConsumer,{providers:[provideZonelessChangeDetection()]});
}else{
 createRoot(wrapper).render(<AIAgentActivity title="Agent Contract" agentName="Kit Fox" activities={rows} defaultExpandedIds={['metadata']} accentColor="#123456" className="consumer-agent"/>);
}
