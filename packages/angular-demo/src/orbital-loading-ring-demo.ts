import {Component} from '@angular/core';
import {KittuOrbitalLoadingRingComponent} from 'kittu-ui-angular';
@Component({selector:'kittu-orbital-loading-ring-demo',standalone:true,imports:[KittuOrbitalLoadingRingComponent],styles:':host{display:block;min-width:0}.k-orbital-demo{width:max-content;max-width:100%;margin-inline:auto;padding-block:48px;display:flex;flex-direction:column;align-items:center;gap:16px}.k-orbital-demo p{margin:0;font-family:var(--font-body);font-size:12px;line-height:16px;color:#6b6b6b;font-weight:400;letter-spacing:-.011em}',template:'<div class="k-orbital-demo"><kittu-orbital-loading-ring [size]="96" variant="dense" label="Syncing registry"/><p>Layered orbital loading with reduced-motion fallback.</p></div>'})
export class OrbitalLoadingRingDemoComponent{}
