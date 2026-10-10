import { Component, computed, inject, input } from '@angular/core';
import { KitAgentActivityController } from './agent-activity-controller';
import type { AgentActivityItemData } from './agent-activity-types';
/*
ISC License

Copyright (c) 2026 Lucide Icons and Contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

---

The following Lucide icons are derived from the Feather project:

airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out

The MIT License (MIT) (for the icons listed above)

Copyright (c) 2013-present Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
@Component({selector:'kit-agent-activity-header',standalone:true,host:{style:'display:contents'},template:`<div [class]="'k-aa-header '+className()"><div class="k-aa-header-info"><div class="k-aa-heading"><h3>{{title()}}</h3>@if(agentName()){<span>— {{agentName()}}</span>}</div><span class="k-aa-divider"></span><div class="k-aa-progress">@if(agent.isRunning()){<span class="k-aa-running"><i></i>Running</span>}@else{<span>{{completedCount()}} of {{agent.activities().length}} completed</span>}</div></div>@if(showControls()){<div class="k-aa-controls"><button type="button" (click)="agent.expandAll()">Expand all</button><span>/</span><button type="button" (click)="agent.collapseAll()">Collapse all</button></div>}</div>`})
export class KitAgentActivityHeaderComponent {
 readonly agent=inject(KitAgentActivityController);
 readonly title=input('Activity');readonly agentName=input<string>();readonly showControls=input(true);readonly className=input('');
 readonly completedCount=computed(()=>this.agent.activities().filter(activity=>activity.status==='success').length);
}
@Component({selector:'kit-agent-activity-item',standalone:true,host:{style:'display:contents'},template:`<div [class]="'k-aa-item '+className()" [attr.data-activity-id]="activity().id">
@if(!isLast()){<div class="k-aa-connector" aria-hidden="true"></div>}
<div class="k-aa-indicator" role="img" [attr.aria-label]="activity().status"><div [class]="'k-aa-status k-aa-status-'+activity().status">@switch(activity().status){@case('running'){<svg class="k-aa-svg k-aa-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>}@case('success'){<svg class="k-aa-svg k-aa-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>}@case('error'){<svg class="k-aa-svg k-aa-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>}@case('cancelled'){<svg class="k-aa-svg k-aa-cancelled" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>}@default{<span class="k-aa-pending"></span>}}</div></div>
<div class="k-aa-body"><div class="k-aa-summary" [class.k-aa-interactive]="hasDetails()" [attr.role]="hasDetails()?'button':null" [attr.tabindex]="hasDetails()?0:null" [attr.aria-expanded]="hasDetails()?expanded():null" (click)="toggle()" (keydown.enter)="activate($event)" (keydown.space)="activate($event)"><div class="k-aa-row-heading"><div class="k-aa-title-wrap"><span class="k-aa-title" [class.k-aa-title-running]="activity().status==='running'">{{activity().title}}</span></div><div class="k-aa-row-meta">@if(activity().duration){<span>{{activity().duration}}</span>}@if(hasDetails()){<span class="k-aa-chevron" [class.k-aa-chevron-expanded]="expanded()"><svg class="k-aa-svg " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span>}</div></div>@if(activity().description){<p>{{activity().description}}</p>}</div>
@if(hasDetails()&&expanded()){<div class="k-aa-disclosure"><div class="k-aa-details">
@if(activity().details?.input){<div class="k-aa-detail-block"><div class="k-aa-detail-label">Parameters</div><div class="k-aa-detail-value">{{format(activity().details!.input!)}}</div></div>}
@if(activity().details?.codeSnippet){<div class="k-aa-detail-block"><div class="k-aa-detail-label">{{activity().details!.language||'Code'}}</div><pre class="k-aa-detail-value"><code>{{activity().details!.codeSnippet}}</code></pre></div>}
@if(activity().details?.output){<div class="k-aa-detail-block"><div class="k-aa-detail-label">Output Result</div><div class="k-aa-detail-value k-aa-output">{{format(activity().details!.output!)}}</div></div>}
@if(metadata().length){<div class="k-aa-metadata">@for(entry of metadata();track entry[0]){<span><span>{{entry[0]}}:</span><strong>{{string(entry[1])}}</strong></span>}</div>}
</div></div>}</div></div>`})
export class KitAgentActivityItemComponent {
 readonly agent=inject(KitAgentActivityController);
 readonly activity=input.required<AgentActivityItemData>();readonly isLast=input(false);readonly className=input('');
 readonly expanded=computed(()=>this.agent.expandedIds().has(this.activity().id));
 readonly hasDetails=computed(()=>Boolean(this.activity().details||this.activity().metadata));
 readonly metadata=computed(()=>Object.entries(this.activity().metadata||{}));
 toggle():void{if(this.hasDetails())this.agent.toggleExpand(this.activity().id);}
 activate(event:Event):void{if(!this.hasDetails())return;event.preventDefault();this.toggle();}
 format(value:string|Record<string,unknown>):string{return typeof value==='string'?value:JSON.stringify(value,null,2);}
 string(value:unknown):string{return String(value);}
}
@Component({selector:'kit-agent-activity-timeline',standalone:true,imports:[KitAgentActivityItemComponent],host:{style:'display:contents'},template:`@if(!agent.activities().length){<div class="k-aa-empty">No activity recorded</div>}@else{<div [class]="'k-aa-timeline '+className()">@for(activity of agent.activities();track activity.id;let last=$last){<kit-agent-activity-item [activity]="activity" [isLast]="last"/>}</div>}`})
export class KitAgentActivityTimelineComponent {readonly agent=inject(KitAgentActivityController);readonly className=input('');}
