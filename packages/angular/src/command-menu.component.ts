// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input, output } from '@angular/core';
import { KittuLiquidCommandPaletteComponent } from './liquid-command-palette.component';
import type { LiquidCommand } from './types';
@Component({
 selector:"kittu-command-menu", standalone:true,
 host:{'data-kittu':"command-menu",style:'display:block;min-width:0'},
 imports:[KittuLiquidCommandPaletteComponent],
template:`
<kittu-liquid-command-palette [commands]="commands()" [disabled]="disabled()" />
`
})
export class KittuCommandMenuComponent {
readonly commands=input<LiquidCommand[]>([{id:'home',label:'Go home',onSelect:()=>this.commandSelect.emit('home')},{id:'docs',label:'Open documentation',onSelect:()=>this.commandSelect.emit('docs')}]);readonly disabled=input(false);readonly commandSelect=output<string>();
}
