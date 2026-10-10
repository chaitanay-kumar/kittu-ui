import '../../packages/angular/styles.css';
import '../../src/styles/index.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import '@angular/compiler';
import {Component,provideZonelessChangeDetection,signal} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {KitRainbowButtonComponent} from '../../packages/angular/dist/fesm2022/kit-ui-angular.mjs';
import {RainbowButton} from '../../src/components/ui/RainbowButton';
type Options={variant?:'default'|'outline';size?:'default'|'sm'|'lg'|'icon';speed?:number;glow?:boolean;disabled?:boolean;type?:'button'|'submit'|'reset';color1?:string;color2?:string;color3?:string;color4?:string;color5?:string;className?:string;style?:Record<string,string|number>;mode?:'link'|'custom'|'child'};
const params=new URLSearchParams(location.search);document.documentElement.classList.toggle('dark',params.get('theme')==='dark');document.body.style.margin='20px';
const freeze=document.createElement('style');freeze.textContent='button,button::before,a,a::before{animation-play-state:paused!important}';document.head.append(freeze);
const events:string[]=[];const api=window as unknown as {setRainbowOptions:(o:Options)=>void;destroyRainbow:()=>void;rainbowEvents:string[]};api.rainbowEvents=events;
const icon=<svg viewBox="0 0 24 24" width="24" height="24"><path d="M4 12h16"/></svg>;
if(params.get('framework')==='react'){
 const node=document.createElement('div');document.body.append(node);const root=createRoot(node);api.setRainbowOptions=options=>{const {mode,...props}=options;root.render(<form onSubmit={e=>{e.preventDefault();events.push('submit');}} onReset={()=>events.push('reset')}><RainbowButton {...props} asChild={mode==='link'||mode==='child'} id="action" aria-label="Action" onClick={()=>events.push('click')}>{mode==='link'?<a href="#destination">Visit <em>now</em></a>:mode==='child'?<button type="button">Compose <em>now</em></button>:<>{icon}Ship <em>now</em></>}</RainbowButton></form>);};api.destroyRainbow=()=>root.unmount();api.setRainbowOptions({});
}else{
 class Consumer{readonly options=signal<Options>({});submit(e:Event){e.preventDefault();events.push('submit');}reset(){events.push('reset');}click(){events.push('click');}}
 const bindings=`[variant]="options().variant" [size]="options().size" [speed]="options().speed" [glow]="options().glow" [color1]="options().color1" [color2]="options().color2" [color3]="options().color3" [color4]="options().color4" [color5]="options().color5" [style]="options().style" [className]="options().className" [type]="options().type" [disabled]="options().disabled ?? false"`;
 Component({selector:'rainbow-consumer',standalone:true,imports:[KitRainbowButtonComponent],template:`<form (submit)="submit($event)" (reset)="reset()">@if(options().mode==='link'){<a kitRainbowButton href="#destination" id="action" aria-label="Action" ${bindings} (click)="click()">Visit <em>now</em></a>}@else if(options().mode==='child'){<button kitRainbowButton id="action" aria-label="Action" ${bindings.replace('[type]="options().type"','type="button"')} (click)="click()">Compose <em>now</em></button>}@else if(options().mode==='custom'){<kit-rainbow-button ${bindings} (click)="click()"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M4 12h16"/></svg>Ship <em>now</em></kit-rainbow-button>}@else{<button kitRainbowButton id="action" aria-label="Action" ${bindings} (click)="click()"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M4 12h16"/></svg>Ship <em>now</em></button>}</form>`})(Consumer);
 document.body.append(document.createElement('rainbow-consumer'));void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]}).then(app=>{api.setRainbowOptions=o=>app.components[0].instance.options.set(o);api.destroyRainbow=()=>app.destroy();});
}
