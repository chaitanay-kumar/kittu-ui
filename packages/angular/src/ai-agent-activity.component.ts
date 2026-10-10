// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component } from '@angular/core';
import { forwardRef, ViewEncapsulation } from '@angular/core';
import { KitAgentActivityController } from './agent-activity-controller';
import { KitAgentActivityHeaderComponent, KitAgentActivityTimelineComponent } from './agent-activity-parts';
import { installAgentActivityMotion } from './agent-activity-motion';
@Component({
 selector:"kit-ai-agent-activity", standalone:true,
 host:{'data-kit':"ai-agent-activity",style:'display:block;min-width:0'},
 imports:[KitAgentActivityHeaderComponent,KitAgentActivityTimelineComponent],
encapsulation:ViewEncapsulation.None,styleUrls:["./agent-activity.css"],
providers:[{provide:KitAgentActivityController,useExisting:forwardRef(()=>KitAiAgentActivityComponent)}],
template:`
<div [class]="'k-ai-agent-activity '+className()" [style.--accent-custom]="accentColor()">
<ng-content>
<kit-agent-activity-header [title]="title()" [agentName]="agentName()"/>
<kit-agent-activity-timeline/>
</ng-content>
</div>
`
})
export class KitAiAgentActivityComponent extends KitAgentActivityController {
constructor(){super();installAgentActivityMotion();}
}
