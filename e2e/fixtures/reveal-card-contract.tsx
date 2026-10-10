import '../../packages/angular/styles.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import '@angular/compiler';
import {Component,provideZonelessChangeDetection,signal} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {KitRevealCardComponent} from '../../packages/angular/dist/fesm2022/kit-ui-angular.mjs';
import {RevealCard} from '../../src/components/ui/RevealCard';
import '../../src/styles/index.css';
type Options={maxTilt?:number;className?:string;content?:string|number|boolean|null;template?:boolean};
const params=new URLSearchParams(location.search);document.documentElement.classList.toggle('dark',params.get('theme')==='dark');document.body.style.margin='20px';const style=document.createElement('style');style.textContent='.consumer-frame{width:320px;max-width:100%}.consumer-primary{color:#fafafa}.consumer-primary h2{font-size:14px;margin:0 0 8px}.consumer-primary button,.consumer-details button{font-size:12px;color:white;border:1px solid #777;padding:4px 8px}.consumer-details{font-size:12px;color:#a1a1a1}';document.head.append(style);
const api=window as unknown as {setRevealOptions:(options:Partial<Options>)=>void;destroyReveal:()=>void;revealEvents:string[]};api.revealEvents=[];
if(params.get('framework')==='react'){
 let options:Options={template:true};const node=document.createElement('div');document.body.append(node);const root=createRoot(node);api.setRevealOptions=patch=>{options={...options,...patch};root.render(<div className="consumer-frame"><RevealCard maxTilt={options.maxTilt} className={'consumer-card '+(options.className??'')} revealContent={options.template?<div className="consumer-details"><p>Hidden telemetry</p><button onClick={()=>api.revealEvents.push('reveal')}>Reveal action</button></div>:options.content}><div className="consumer-primary"><h2>Projected title</h2><button onClick={()=>api.revealEvents.push('primary')}>Primary action</button></div></RevealCard></div>);};api.destroyReveal=()=>root.unmount();api.setRevealOptions({});
}else{
 class Consumer{readonly options=signal<Options>({template:true});primary(){api.revealEvents.push('primary');}reveal(){api.revealEvents.push('reveal');}}
 Component({selector:'reveal-consumer',standalone:true,imports:[KitRevealCardComponent],template:`<div class="consumer-frame"><ng-template #details><div class="consumer-details"><p>Hidden telemetry</p><button (click)="reveal()">Reveal action</button></div></ng-template><kit-reveal-card [maxTilt]="options().maxTilt" [className]="'consumer-card '+(options().className??'')" [revealContent]="options().template?details:options().content"><div class="consumer-primary"><h2>Projected title</h2><button (click)="primary()">Primary action</button></div></kit-reveal-card></div>`})(Consumer);document.body.append(document.createElement('reveal-consumer'));void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]}).then(app=>{api.setRevealOptions=patch=>app.components[0].instance.options.update(current=>({...current,...patch}));api.destroyReveal=()=>app.destroy();});
}
