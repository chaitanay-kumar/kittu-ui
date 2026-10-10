import "../../packages/angular/styles.css";
import React from 'react';
import {createRoot} from 'react-dom/client';
import '@angular/compiler';
import {Component,provideZonelessChangeDetection,signal} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {KitMagneticButtonComponent} from '../../packages/angular/dist/fesm2022/kit-ui-angular.mjs';
import {MagneticButton} from '../../src/components/ui/MagneticButton';
import '../../src/styles/index.css';
type Options={strength?:number;variant?:'primary'|'secondary'|'outline'|'ghost';size?:'sm'|'md'|'lg';glow?:boolean;disabled?:boolean;type?:'button'|'submit'|'reset';className?:string;custom?:boolean};
const params=new URLSearchParams(location.search);document.documentElement.classList.toggle('dark',params.get('theme')==='dark');document.body.style.margin='20px';
const style=document.createElement('style');style.textContent='button,button *{transition:none!important}';if(!params.has('transitions'))document.head.append(style);
const events:string[]=[];const api=window as unknown as {setMagneticOptions:(options:Options)=>void;destroyMagnetic:()=>void;magneticEvents:string[]};api.magneticEvents=events;
if(params.get('framework')==='react'){
 const node=document.createElement('div');document.body.append(node);const root=createRoot(node);api.setMagneticOptions=options=>root.render(<form onSubmit={e=>{e.preventDefault();events.push('submit');}} onReset={()=>events.push('reset')}><MagneticButton {...options} id="action" aria-label="Action" className={'consumer-magnetic '+(options.className||'')} onClick={()=>events.push('click')}><>Ship <em>now</em></></MagneticButton></form>);api.destroyMagnetic=()=>root.unmount();api.setMagneticOptions({});
}else{
 class Consumer{readonly options=signal<Options>({});submit(e:Event){e.preventDefault();events.push('submit');}reset(){events.push('reset');}click(){events.push('click');}}
 Component({selector:'magnetic-consumer',standalone:true,imports:[KitMagneticButtonComponent],template:`<form (submit)="submit($event)" (reset)="reset()"><button kitMagneticButton id="action" aria-label="Action" [className]="'consumer-magnetic '+(options().className||'')" [strength]="options().strength" [variant]="options().variant" [size]="options().size" [glow]="options().glow" [disabled]="options().disabled ?? false" [type]="options().type" (click)="click()">Ship <em>now</em></button></form>`})(Consumer);
 document.body.append(document.createElement('magnetic-consumer'));void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]}).then(app=>{api.setMagneticOptions=options=>app.components[0].instance.options.set(options);api.destroyMagnetic=()=>app.destroy();});
}
