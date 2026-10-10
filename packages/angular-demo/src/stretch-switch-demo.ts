import {Component} from '@angular/core';
import {KitStretchSwitchComponent} from 'kit-ui-angular';

@Component({selector:'kit-stretch-switch-demo',standalone:true,imports:[KitStretchSwitchComponent],styles:':host{display:block}.k-stretch-demo{padding-block:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px}',template:'<div class="k-stretch-demo"><kit-stretch-switch defaultChecked label="Reduce motion" description="Disable spring animations"/><kit-stretch-switch label="Dark mode" description="Toggle dark theme"/></div>'})
export class StretchSwitchDemoComponent {}
