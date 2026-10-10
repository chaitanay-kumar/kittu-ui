export const agentActivityPort = {
  controller: 'KittuAgentActivityController',
  imports: `import { forwardRef, ViewEncapsulation } from '@angular/core';
import { KittuAgentActivityController } from './agent-activity-controller';
import { KittuAgentActivityHeaderComponent, KittuAgentActivityTimelineComponent } from './agent-activity-parts';
import { installAgentActivityMotion } from './agent-activity-motion';`,
  componentImports: 'KittuAgentActivityHeaderComponent,KittuAgentActivityTimelineComponent',
  providers: '[{provide:KittuAgentActivityController,useExisting:forwardRef(()=>KittuAiAgentActivityComponent)}]',
  stylesFile: './agent-activity.css',
  description: 'React-matched agent activity contracts, status timeline, independent detail drawers, expand/collapse controls and native compound composition.',
  inputs: ['activities: AgentActivityItemData[]','isRunning: boolean','title: string','agentName: string','accentColor: string','defaultExpandedIds: string[]','className: string'],
  outputs: [],
  template: `<div [class]="'k-ai-agent-activity '+className()" [style.--accent-custom]="accentColor()"><ng-content><kittu-agent-activity-header [title]="title()" [agentName]="agentName()"/><kittu-agent-activity-timeline/></ng-content></div>`,
  body: `constructor(){super();installAgentActivityMotion();}`
};
