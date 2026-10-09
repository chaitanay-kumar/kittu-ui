// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { forwardRef, ViewEncapsulation } from '@angular/core';
import { KittuAgentActivityController } from './agent-activity-controller';
import { KittuAgentActivityHeaderComponent, KittuAgentActivityTimelineComponent } from './agent-activity-parts';
import { installAgentActivityMotion } from './agent-activity-motion';
@Component({
 selector:"kittu-ai-agent-activity", standalone:true,
 host:{'data-kittu':"ai-agent-activity",style:'display:block;min-width:0'},
 imports:[KittuAgentActivityHeaderComponent,KittuAgentActivityTimelineComponent],
providers:[{provide:KittuAgentActivityController,useExisting:forwardRef(()=>KittuAiAgentActivityComponent)}],
encapsulation:ViewEncapsulation.None,styleUrls:["./agent-activity.css"],
template:`
<div [class]="'k-ai-agent-activity '+className()" [style.--accent-custom]="accentColor()">
<ng-content>
<kittu-agent-activity-header [title]="title()" [agentName]="agentName()"/>
<kittu-agent-activity-timeline/>
</ng-content>
</div>
`
})
export class KittuAiAgentActivityComponent extends KittuAgentActivityController {
constructor(){super();installAgentActivityMotion();}
}
