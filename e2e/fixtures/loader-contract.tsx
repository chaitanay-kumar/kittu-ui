import "../../packages/angular/styles.css";
import React from 'react';
import {createRoot} from 'react-dom/client';
import '@angular/compiler';
import {Component,provideZonelessChangeDetection} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {KittuLoaderComponent} from '../../packages/angular/dist/fesm2022/kittu-ui-angular.mjs';
import {Loader} from '../../src/components/ui/Loader';
import '../../src/styles/index.css';
const params=new URLSearchParams(location.search);
const props={variant:(params.get('variant')||'arc') as 'arc'|'dots'|'line'|'rings',size:Number(params.get('size')||32),reduceMotion:params.get('reduce')==='true',color:params.get('color')||'currentColor',label:params.has('label')?params.get('label')!:'Loading...',className:'consumer-loader'};
if(params.get('framework')==='react'){const root=document.createElement('div');document.body.append(root);createRoot(root).render(<Loader {...props} data-consumer="loader"/>);}
else{
 class Consumer{readonly props=props;}
 Component({selector:'loader-consumer',standalone:true,imports:[KittuLoaderComponent],template:'<kittu-loader [variant]="props.variant" [size]="props.size" [reduceMotion]="props.reduceMotion" [color]="props.color" [label]="props.label" className="consumer-loader" data-consumer="loader" />'})(Consumer);
 document.body.append(document.createElement('loader-consumer'));void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]}).then(app=>{(window as unknown as {destroyLoader:()=>void}).destroyLoader=()=>app.destroy();});
}
