import '../../packages/angular/styles.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import '@angular/compiler';
import {Component,provideZonelessChangeDetection,signal} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {KitStretchSwitchComponent} from '../../packages/angular/dist/fesm2022/kit-ui-angular.mjs';
import {StretchSwitch} from '../../src/components/ui/StretchSwitch';
import '../../src/styles/index.css';

type Options={checked?:boolean;defaultChecked?:boolean;disabled?:boolean;label?:string|number|boolean;description?:string;className?:string;rich?:boolean;reflect?:boolean};
const params=new URLSearchParams(location.search);
document.documentElement.classList.toggle('dark',params.get('theme')==='dark');
document.body.style.margin='20px';
const initial:Options=params.get('initial')==='checked'?{checked:true}:params.get('initial')==='default'?{defaultChecked:true}:{};
const events:unknown[]=[];
const api=window as unknown as {setStretchOptions:(options:Options)=>void;destroyStretch:()=>void;stretchEvents:unknown[]};
api.stretchEvents=events;
if(params.get('framework')==='react'){
  const node=document.createElement('div');document.body.append(node);const root=createRoot(node);let settings:Options={};
  const change=(checked:boolean)=>{events.push(['change',checked]);if(settings.reflect)api.setStretchOptions({...settings,checked});};
  api.setStretchOptions=options=>{settings=options;flushSync(()=>root.render(<form onSubmit={event=>{event.preventDefault();events.push('submit');}}><div id="fixture"><StretchSwitch {...options} label={options.rich?<span>Rich <b>label</b><input aria-label="Label draft" defaultValue="Keep"/></span>:options.label} onChange={change}/></div></form>));};
  api.destroyStretch=()=>root.unmount();api.setStretchOptions(initial);
}else{
  class Consumer{
    readonly options=signal<Options>(initial);
    readonly change=(checked:boolean)=>{events.push(['change',checked]);if(this.options().reflect)this.options.update(options=>({...options,checked}));};
    submit(event:Event){event.preventDefault();events.push('submit');}
  }
  Component({selector:'stretch-consumer',standalone:true,imports:[KitStretchSwitchComponent],template:`<form (submit)="submit($event)"><div id="fixture"><ng-template #rich><span>Rich <b>label</b><input aria-label="Label draft" value="Keep"/></span></ng-template><kit-stretch-switch [checked]="options().checked" [defaultChecked]="options().defaultChecked" [disabled]="options().disabled" [label]="options().rich?rich:options().label" [description]="options().description" [className]="options().className" [onChange]="change"/></div></form>`})(Consumer);
  document.body.append(document.createElement('stretch-consumer'));
  void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]}).then(app=>{api.setStretchOptions=options=>{app.components[0].instance.options.set(options);app.tick();};api.destroyStretch=()=>app.destroy();});
}
