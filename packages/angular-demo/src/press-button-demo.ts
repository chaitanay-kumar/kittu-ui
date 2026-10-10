import {Component} from '@angular/core';
import {KitPressButtonComponent} from 'kit-ui-angular';
@Component({selector:'kit-press-button-demo',standalone:true,imports:[KitPressButtonComponent],styles:':host{display:block}.k-press-demo{padding-block:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}',template:'<div class="k-press-demo"><button kitPressButton>Save changes</button><button kitPressButton variant="outline">Cancel</button></div>'})
export class PressButtonDemoComponent{}
