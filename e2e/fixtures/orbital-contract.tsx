import React from 'react';
import {createRoot} from 'react-dom/client';
import '@angular/compiler';
import {Component,provideZonelessChangeDetection,signal} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {KittuOrbitalLoadingRingComponent} from '../../packages/angular/dist/fesm2022/kittu-ui-angular.mjs';
import {OrbitalLoadingRing,type OrbitalLoadingRingProps} from '../../src/components/ui/OrbitalLoadingRing';
import '../../src/styles/index.css';
type Options=OrbitalLoadingRingProps&{ariaOverride?:boolean;ariaLabel?:string;widthOverride?:number};const params=new URLSearchParams(location.search);document.documentElement.classList.toggle('dark',params.get('theme')==='dark');document.body.style.margin='20px';
const api=window as unknown as {setOrbitalOptions:(options:Options)=>void;destroyOrbital:()=>void};
if(params.get('framework')==='react'){
 const node=document.createElement('div');document.body.append(node);const root=createRoot(node);api.setOrbitalOptions=options=>{const{ariaOverride,ariaLabel,widthOverride,...props}=options;root.render(<OrbitalLoadingRing {...props} data-consumer="orbital" className={'consumer-orbital '+(options.className||'')} style={widthOverride===undefined?undefined:{width:widthOverride}} {...(ariaOverride?{'aria-label':ariaLabel}:{})}/>);};api.destroyOrbital=()=>root.unmount();api.setOrbitalOptions({});
}else{
 class Consumer{readonly options=signal<Options>({});}
 Component({selector:'orbital-consumer',standalone:true,imports:[KittuOrbitalLoadingRingComponent],template:`@if(options().ariaOverride){<kittu-orbital-loading-ring data-consumer="orbital" [className]="'consumer-orbital '+(options().className || '')" [size]="options().size" [speed]="options().speed" [variant]="options().variant" [label]="options().label" [aria-label]="options().ariaLabel" [style.width.px]="options().widthOverride ?? options().size ?? 72"/>}@else{@if(options().widthOverride!==undefined){<kittu-orbital-loading-ring data-consumer="orbital" [className]="'consumer-orbital '+(options().className || '')" [size]="options().size" [speed]="options().speed" [variant]="options().variant" [label]="options().label" [style.width.px]="options().widthOverride"/>}@else{<kittu-orbital-loading-ring data-consumer="orbital" [className]="'consumer-orbital '+(options().className || '')" [size]="options().size" [speed]="options().speed" [variant]="options().variant" [label]="options().label"/>}}`})(Consumer);
 document.body.append(document.createElement('orbital-consumer'));void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]}).then(app=>{api.setOrbitalOptions=options=>app.components[0].instance.options.set(options);api.destroyOrbital=()=>app.destroy();});
}
