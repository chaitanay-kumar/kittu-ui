export const expandableSearchPort = {
  imports: `import {ViewEncapsulation,ChangeDetectorRef} from '@angular/core';
import type {ExpandableSearchHandler} from './expandable-search-types';
import {installExpandableSearchMotion} from './expandable-search-motion';`,
  stylesFile: "./expandable-search.css",
  hostMetadata: `{'data-kit':'expandable-search',class:'k-es-host'}`,
  description:
    "React-matched compact text search with spring expansion, delayed click focus, live query callback, clear control and responsive shortcut hint.",
  inputs: [
    "placeholder: string",
    "onSearch: ExpandableSearchHandler",
    "className: string",
  ],
  outputs: [],
  template: `<div [class]="'k-es-outer '+className()"><div class="k-es-control" (click)="open()"><svg aria-hidden="true" class="k-es-search" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg><input #searchInput type="text" [value]="value()" [placeholder]="expanded()?placeholder():'Quick search...'" (input)="change($event)" (focus)="expanded.set(true)" (blur)="blur()"/>@if(value()){<button class="k-es-clear" (click)="clear($event)"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>}@else{<div class="k-es-shortcut"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg><span>K</span></div>}</div></div>`,
  body: `readonly placeholder=input<string,string|undefined>('Search components, props...',{transform:value=>value===undefined?'Search components, props...':value});readonly onSearch=input<ExpandableSearchHandler>();readonly className=input<string,string|undefined>('',{transform:value=>value===undefined?'':value});private readonly detector=inject(ChangeDetectorRef);readonly expanded=signal(false);readonly value=signal('');readonly searchInput=viewChild<ElementRef<HTMLInputElement>>('searchInput');private readonly focusTimers=new Set<ReturnType<typeof setTimeout>>();constructor(){installExpandableSearchMotion(this.expanded);inject(DestroyRef).onDestroy(()=>{for(const timer of this.focusTimers)clearTimeout(timer);this.focusTimers.clear();});}open():void{this.expanded.set(true);const timer=setTimeout(()=>{this.focusTimers.delete(timer);this.searchInput()?.nativeElement.focus();},100);this.focusTimers.add(timer);}blur():void{if(!this.value())this.expanded.set(false);}change(event:Event):void{const value=(event.target as HTMLInputElement).value;this.value.set(value);this.onSearch()?.(value);this.detector.detectChanges();}clear(event:Event):void{event.stopPropagation();this.expanded.set(false);this.value.set('');this.onSearch()?.('');this.detector.detectChanges();}`,
};
