export const agentActivityPort = {
  controller: 'KitAgentActivityController',
  imports: `import { forwardRef, ViewEncapsulation } from '@angular/core';
import { KitAgentActivityController } from './agent-activity-controller';
import { KitAgentActivityHeaderComponent, KitAgentActivityTimelineComponent } from './agent-activity-parts';
import { installAgentActivityMotion } from './agent-activity-motion';`,
  componentImports: 'KitAgentActivityHeaderComponent,KitAgentActivityTimelineComponent',
  providers: '[{provide:KitAgentActivityController,useExisting:forwardRef(()=>KitAiAgentActivityComponent)}]',
  stylesFile: './agent-activity.css',
  description: 'React-matched agent activity contracts, status timeline, independent detail drawers, expand/collapse controls and native compound composition.',
  inputs: ['activities: AgentActivityItemData[]','isRunning: boolean','title: string','agentName: string','accentColor: string','defaultExpandedIds: string[]','className: string'],
  outputs: [],
  template: `<div [class]="'k-ai-agent-activity '+className()" [style.--accent-custom]="accentColor()"><ng-content><kit-agent-activity-header [title]="title()" [agentName]="agentName()"/><kit-agent-activity-timeline/></ng-content></div>`,
  body: `constructor(){super();installAgentActivityMotion();}`
};
