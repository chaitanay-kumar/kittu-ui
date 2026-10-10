import { Component } from "@angular/core";
import { KitExpandableSearchComponent } from "kit-ui-angular";
@Component({
  selector: "kit-expandable-search-demo",
  standalone: true,
  imports: [KitExpandableSearchComponent],
  styles:
    ":host{display:block}.k-es-demo{padding-block:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px}.k-es-demo p{margin:0;font-size:12px;line-height:16px;color:#6b6b6b}",
  template:
    '<div class="k-es-demo"><kit-expandable-search placeholder="Search components, tokens..."/><p>Click input or focus to test smooth width expansion</p></div>',
})
export class ExpandableSearchDemoComponent {}
