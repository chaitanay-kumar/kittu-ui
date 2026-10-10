import "../../packages/angular/styles.css";
import React from 'react';
import {createRoot} from 'react-dom/client';
import '@angular/compiler';
import {Component,provideZonelessChangeDetection,signal} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {KitTypewriterButtonComponent} from '../../packages/angular/dist/fesm2022/kit-ui-angular.mjs';
import {TypewriterButton,type TypewriterButtonProps} from '../../src/components/ui/TypewriterButton';
import '../../src/styles/index.css';
type Options=Omit<TypewriterButtonProps,'children'>&{text?:string};
const params=new URLSearchParams(location.search);document.documentElement.classList.toggle('dark',params.get('theme')==='dark');document.body.style.margin='20px';document.body.style.width='320px';const style=document.createElement('style');style.textContent='button{transition:none!important}';if(!params.has('transitions'))document.head.append(style);
const events:string[]=[];const api=window as unknown as {setTypewriterOptions:(options:Options)=>void;destroyTypewriter:()=>void;typewriterEvents:string[]};api.typewriterEvents=events;
if(params.get('framework')==='react'){
 const complete=()=>events.push('complete');const node=document.createElement('div');document.body.append(node);const root=createRoot(node);
 api.setTypewriterOptions=options=>root.render(<form onSubmit={event=>{event.preventDefault();events.push('submit');}} onReset={()=>events.push('reset')}><TypewriterButton {...options} onComplete={complete} id="action" name="action" value="go" className={'consumer-button '+(options.className||'')} onClick={()=>events.push('click')}>{options.text??'Type this'}</TypewriterButton></form>);api.destroyTypewriter=()=>root.unmount();api.setTypewriterOptions({});
}else{
 class Consumer{readonly options=signal<Options>({});readonly complete=()=>events.push('complete');submit(event:Event){event.preventDefault();events.push('submit');}reset(){events.push('reset');}click(){events.push('click');}}
 Component({selector:'button-consumer',standalone:true,imports:[KitTypewriterButtonComponent],template:`<form (submit)="submit($event)" (reset)="reset()"><button kitTypewriterButton id="action" name="action" value="go" [className]="'consumer-button '+(options().className || '')" [variant]="options().variant" [disabled]="options().disabled || false" [type]="options().type" [text]="options().text ?? 'Type this'" [charDuration]="options().charDuration" [autoStart]="options().autoStart || false" [soundEnabled]="options().soundEnabled || false" [soundVolume]="options().soundVolume" [onComplete]="complete" (click)="click()"></button></form>`})(Consumer);
 document.body.append(document.createElement('button-consumer'));void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]}).then(app=>{api.setTypewriterOptions=options=>app.components[0].instance.options.set(options);api.destroyTypewriter=()=>app.destroy();});
}
