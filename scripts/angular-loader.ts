export const loaderPort={
 imports:`import {ViewEncapsulation} from '@angular/core';
import type {LoaderVariant} from './loader-types';
import {installLoaderMotion} from './loader-motion';`,stylesFile:'./loader.css',
 inputs:['size: number','variant: LoaderVariant','label: string','reduceMotion: boolean','color: string','className: string'],outputs:[],
 hostMetadata:`{'data-kittu':'loader','role':'status','aria-busy':'true','[attr.aria-label]':'ariaLabel() ?? label()','[class]':'"k-loader-parity "+className()'}`,
 description:'Native React-matched arc, breathing dots, sliding line and expanding rings with size/color, accessible labeling and explicit reduced-motion keyframes.',
 template:`
@switch(variant()){
@case('arc'){<div class="k-loader-square" [style.width.px]="size()" [style.height.px]="size()"><svg [class.k-loader-spin]="!reduceMotion()" style="animation-duration:2.5s" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="16" stroke="#1F1F1F" stroke-width="3" class="k-loader-track"/><circle cx="20" cy="20" r="16" [attr.stroke]="color()" stroke-width="3" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="65"/></svg></div>}
@case('dots'){<div class="k-loader-dots" [style.width.px]="size()*1.5" [style.height.px]="size()*.4">@for(index of [0,1,2];track index){<span data-loader-motion class="k-loader-dot" [style.width.px]="dotSize()" [style.height.px]="dotSize()" [style.background-color]="color()==='currentColor'?null:color()"></span>}</div>}
@case('line'){<div class="k-loader-line" [style.width.px]="size()*2" [style.height.px]="lineSize()"><div data-loader-motion class="k-loader-line-fill" [style.background-color]="color()==='currentColor'?'#FAFAFA':color()"></div></div>}
@case('rings'){<div class="k-loader-square" [style.width.px]="size()" [style.height.px]="size()">@for(index of [0,1];track index){<span data-loader-motion class="k-loader-ring" [style.border-color]="color()==='currentColor'?null:color()"></span>}<span class="k-loader-center" [style.width.px]="centerSize()" [style.height.px]="centerSize()" [style.background-color]="color()==='currentColor'?null:color()"></span></div>}
}@if(label()){<span class="k-loader-label">{{label()}}</span>}`,
 body:`readonly size=input(32);readonly variant=input<LoaderVariant>('arc');readonly label=input('Loading...');readonly ariaLabel=input<string|undefined>(undefined,{alias:'aria-label'});readonly reduceMotion=input(false);readonly color=input('currentColor');readonly className=input('');readonly dotSize=computed(()=>Math.max(4,this.size()*.18));readonly lineSize=computed(()=>Math.max(3,this.size()*.08));readonly centerSize=computed(()=>Math.max(4,this.size()*.2));constructor(){installLoaderMotion(this.variant,this.reduceMotion);}`
};
