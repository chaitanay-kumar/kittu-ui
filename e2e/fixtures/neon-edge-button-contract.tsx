import React from 'react';
import {createRoot} from 'react-dom/client';
import '@angular/compiler';
import {Component,provideZonelessChangeDetection,signal} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {KittuNeonEdgeButtonComponent} from '../../packages/angular/dist/fesm2022/kittu-ui-angular.mjs';
import {NeonEdgeButton} from '../../src/components/ui/NeonEdgeButton';
import '../../src/styles/index.css';
type Options={speed?:number;glow?:boolean;disabled?:boolean;type?:'button'|'submit'|'reset';className?:string;custom?:boolean};
const params=new URLSearchParams(location.search);document.documentElement.classList.toggle('dark',params.get('theme')==='dark');document.body.style.margin='20px';
const style=document.createElement('style');style.textContent='button,button *{transition:none!important}';document.head.append(style);
const events:string[]=[];const api=window as unknown as {setNeonOptions:(options:Options)=>void;destroyNeon:()=>void;neonEvents:string[]};api.neonEvents=events;
if(params.get('framework')==='react'){
 const node=document.createElement('div');document.body.append(node);const root=createRoot(node);api.setNeonOptions=options=>root.render(<form onSubmit={e=>{e.preventDefault();events.push('submit');}} onReset={()=>events.push('reset')}><NeonEdgeButton {...options} id="action" aria-label="Action" className={'consumer-neon '+(options.className||'')} onClick={()=>events.push('click')}>{options.custom?<>Ship <em>now</em></>:undefined}</NeonEdgeButton></form>);api.destroyNeon=()=>root.unmount();api.setNeonOptions({});
}else{
 class Consumer{readonly options=signal<Options>({});submit(e:Event){e.preventDefault();events.push('submit');}reset(){events.push('reset');}click(){events.push('click');}}
 Component({selector:'neon-consumer',standalone:true,imports:[KittuNeonEdgeButtonComponent],template:`<form (submit)="submit($event)" (reset)="reset()">@if(options().custom){<button kittuNeonEdgeButton id="action" aria-label="Action" [className]="'consumer-neon '+(options().className||'')" [speed]="options().speed" [glow]="options().glow" [disabled]="options().disabled ?? false" [type]="options().type" (click)="click()">Ship <em>now</em></button>}@else{<button kittuNeonEdgeButton id="action" aria-label="Action" [className]="'consumer-neon '+(options().className||'')" [speed]="options().speed" [glow]="options().glow" [disabled]="options().disabled ?? false" [type]="options().type" (click)="click()"></button>}</form>`})(Consumer);
 document.body.append(document.createElement('neon-consumer'));void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]}).then(app=>{api.setNeonOptions=options=>app.components[0].instance.options.set(options);api.destroyNeon=()=>app.destroy();});
}
