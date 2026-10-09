import React from 'react';
import {createRoot} from 'react-dom/client';
import '@angular/compiler';
import {Component,provideZonelessChangeDetection,signal} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {KittuButtonComponent} from '../../packages/angular/dist/fesm2022/kittu-ui-angular.mjs';
import {Button,type ButtonProps} from '../../src/components/ui/Button';
import '../../src/styles/index.css';
type Options=ButtonProps&{icons?:boolean;content?:boolean};
const params=new URLSearchParams(location.search);document.documentElement.classList.toggle('dark',params.get('theme')==='dark');document.body.style.margin='20px';document.body.style.width='320px';const style=document.createElement('style');style.textContent='button{transition:none!important}';document.head.append(style);
const events:string[]=[];const api=window as unknown as {setButtonOptions:(options:Options)=>void;destroyButton:()=>void;buttonEvents:string[]};api.buttonEvents=events;
if(params.get('framework')==='react'){
 const node=document.createElement('div');document.body.append(node);const root=createRoot(node);
 api.setButtonOptions=options=>root.render(<form onSubmit={event=>{event.preventDefault();events.push('submit');}} onReset={()=>events.push('reset')}><Button {...options} id="action" name="action" value="go" className={'consumer-button '+(options.className||'')} aria-label="Action" onClick={()=>events.push('click')} leftIcon={options.icons?<b>L</b>:undefined} rightIcon={options.icons?<i>R</i>:undefined}>{options.content===false?undefined:<>Run <em>now</em></>}</Button></form>);api.destroyButton=()=>root.unmount();api.setButtonOptions({});
}else{
 class Consumer{readonly options=signal<Options>({});submit(event:Event){event.preventDefault();events.push('submit');}reset(){events.push('reset');}click(){events.push('click');}}
 Component({selector:'button-consumer',standalone:true,imports:[KittuButtonComponent],template:`<form (submit)="submit($event)" (reset)="reset()"><ng-template #left><b>L</b></ng-template><ng-template #right><i>R</i></ng-template><button kittuButton id="action" name="action" value="go" aria-label="Action" [className]="'consumer-button '+(options().className || '')" [variant]="options().variant" [size]="options().size" [isLoading]="options().isLoading || false" [disabled]="options().disabled || false" [fullWidth]="options().fullWidth || false" [type]="options().type" [loadingText]="options().loadingText" [leftIcon]="options().icons ? left : undefined" [rightIcon]="options().icons ? right : undefined" (click)="click()">@if(options().content!==false){Run <em>now</em>}</button></form>`})(Consumer);
 document.body.append(document.createElement('button-consumer'));void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]}).then(app=>{api.setButtonOptions=options=>app.components[0].instance.options.set(options);api.destroyButton=()=>app.destroy();});
}
