import "../../packages/angular/styles.css";
import React from 'react';
import {createRoot} from 'react-dom/client';
import '@angular/compiler';
import {Component,provideZonelessChangeDetection,signal} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {KitPressButtonComponent} from '../../packages/angular/dist/fesm2022/kit-ui-angular.mjs';
import {PressButton,type PressButtonProps} from '../../src/components/ui/PressButton';
import '../../src/styles/index.css';
type Options=PressButtonProps&{content?:boolean};
const params=new URLSearchParams(location.search);document.documentElement.classList.toggle('dark',params.get('theme')==='dark');document.body.style.margin='20px';document.body.style.width='320px';const style=document.createElement('style');style.textContent='button{transition:none!important}';if(!params.has('transitions'))document.head.append(style);
const events:string[]=[];const api=window as unknown as {setPressOptions:(options:Options)=>void;destroyPress:()=>void;pressEvents:string[]};api.pressEvents=events;
if(params.get('framework')==='react'){
 const node=document.createElement('div');document.body.append(node);const root=createRoot(node);
 api.setPressOptions=options=>root.render(<form onSubmit={event=>{event.preventDefault();events.push('submit');}} onReset={()=>events.push('reset')}><PressButton {...options} id="action" name="action" value="go" className={'consumer-button '+(options.className||'')} aria-label="Action" onClick={()=>events.push('click')}>{options.content===false?undefined:<>Run <em>now</em></>}</PressButton></form>);api.destroyPress=()=>root.unmount();api.setPressOptions({});
}else{
 class Consumer{readonly options=signal<Options>({});submit(event:Event){event.preventDefault();events.push('submit');}reset(){events.push('reset');}click(){events.push('click');}}
 Component({selector:'button-consumer',standalone:true,imports:[KitPressButtonComponent],template:`<form (submit)="submit($event)" (reset)="reset()"><button kitPressButton id="action" name="action" value="go" aria-label="Action" [className]="'consumer-button '+(options().className || '')" [variant]="options().variant" [size]="options().size" [disabled]="options().disabled || false" [fullWidth]="options().fullWidth || false" [type]="options().type" [pressStrength]="options().pressStrength" (click)="click()">@if(options().content!==false){Run <em>now</em>}</button></form>`})(Consumer);
 document.body.append(document.createElement('button-consumer'));void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]}).then(app=>{api.setPressOptions=options=>app.components[0].instance.options.set(options);api.destroyPress=()=>app.destroy();});
}
