import {Component,signal} from '@angular/core';
import {KitHamburgerMenuComponent} from 'kit-ui-angular';
@Component({selector:'kit-hamburger-menu-demo',standalone:true,imports:[KitHamburgerMenuComponent],template:`<div class="py-12 flex flex-col items-center justify-center gap-4"><div class="p-8 rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] flex flex-col items-center gap-4 shadow-md"><kit-hamburger-menu [isOpen]="open()" (change)="open.set($event)" [size]="28"/><span class="text-xs font-mono text-[#A1A1A1]">Click to morph ({{open()?'Open (✕)':'Closed (☰)'}})</span></div></div>`})
export class HamburgerMenuDemoComponent{readonly open=signal(false);}
