// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, output } from '@angular/core';
import { KitLiquidCommandPaletteComponent } from './liquid-command-palette.component';
import type { LiquidCommand } from './types';
@Component({
 selector:"kit-command-menu", standalone:true,
 host:{'data-kit':"command-menu",style:'display:block;min-width:0'},
 imports:[KitLiquidCommandPaletteComponent],
template:`
<kit-liquid-command-palette [commands]="commands()" [disabled]="disabled()" />
`
})
export class KitCommandMenuComponent {
readonly commands=input<LiquidCommand[]>([{id:'home',label:'Go home',onSelect:()=>this.commandSelect.emit('home')},{id:'docs',label:'Open documentation',onSelect:()=>this.commandSelect.emit('docs')}]);readonly disabled=input(false);readonly commandSelect=output<string>();
}
