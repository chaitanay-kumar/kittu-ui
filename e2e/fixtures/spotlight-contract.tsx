import "../../packages/angular/styles.css";
import React from 'react';
import {createRoot} from 'react-dom/client';
import '@angular/compiler';
import {Component,provideZonelessChangeDetection,signal} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {KittuSpotlightCardComponent} from '../../packages/angular/dist/fesm2022/kittu-ui-angular.mjs';
import {SpotlightCard,type SpotlightCardProps} from '../../src/components/ui/SpotlightCard';
import '../../src/styles/index.css';
type Options=Omit<SpotlightCardProps,'children'|'onMouseMove'|'onMouseLeave'>&{moveOverride?:boolean;leaveOverride?:boolean;handler?:boolean;ancestorGroup?:boolean};
const params=new URLSearchParams(location.search);document.documentElement.classList.toggle('dark',params.get('theme')==='dark');document.body.style.margin='20px';
const style=document.createElement('style');style.textContent='.consumer-frame{width:300px;max-width:100%;padding:12px}.consumer-card{width:100%}.consumer-content{color:#fafafa}.consumer-content p{font-size:12px;margin:0 0 8px}.consumer-content button{color:white;border:1px solid #777;padding:4px 8px}';if(!params.has('transitions'))document.head.append(style);
const api=window as unknown as {setSpotlightOptions:(options:Options)=>void;destroySpotlight:()=>void;events:string[]};api.events=[];
if(params.get('framework')==='react'){
 const node=document.createElement('div');document.body.append(node);const root=createRoot(node);
 api.setSpotlightOptions=options=>{const{moveOverride,leaveOverride,handler,ancestorGroup,...props}=options;root.render(<div className={'consumer-frame '+(ancestorGroup?'group':'')}><SpotlightCard {...props} className={'consumer-card '+(options.className||'')} data-consumer="spotlight" aria-label="Card" tabIndex={0} {...(moveOverride?{onMouseMove:handler?()=>api.events.push('move'):undefined}:{})} {...(leaveOverride?{onMouseLeave:handler?()=>api.events.push('leave'):undefined}:{})}><div className="consumer-content"><p>Projected spotlight content</p><button onClick={()=>api.events.push('click')}>Inspect details</button></div></SpotlightCard></div>);};api.destroySpotlight=()=>root.unmount();api.setSpotlightOptions({});
}else{
 class Consumer {readonly options=signal<Options>({});readonly moved=()=>api.events.push('move');readonly left=()=>api.events.push('leave');click(){api.events.push('click');}}
 const attrs=`data-consumer="spotlight" aria-label="Card" [tabIndex]="0" [className]="'consumer-card '+(options().className || '')" [spotlightColor]="options().spotlightColor" [spotlightSize]="options().spotlightSize" [style.width.px]="options().style?.width" [style.padding.px]="options().style?.padding" [style.color]="options().style?.color"`;
 const content=`<div class="consumer-content"><p>Projected spotlight content</p><button (click)="click()">Inspect details</button></div>`;
 const card=(extra:string)=>`<kittu-spotlight-card ${attrs} ${extra}>${content}</kittu-spotlight-card>`;
 Component({selector:'spotlight-consumer',standalone:true,imports:[KittuSpotlightCardComponent],template:`<div class="consumer-frame" [class.group]="options().ancestorGroup">@if(options().moveOverride){@if(options().leaveOverride){${card('[onMouseMove]="options().handler?moved:undefined" [onMouseLeave]="options().handler?left:undefined"')}}@else{${card('[onMouseMove]="options().handler?moved:undefined"')}}}@else{@if(options().leaveOverride){${card('[onMouseLeave]="options().handler?left:undefined"')}}@else{${card('')}}}</div>`})(Consumer);
 document.body.append(document.createElement('spotlight-consumer'));void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]}).then(app=>{api.setSpotlightOptions=options=>app.components[0].instance.options.set(options);api.destroySpotlight=()=>app.destroy();});
}
