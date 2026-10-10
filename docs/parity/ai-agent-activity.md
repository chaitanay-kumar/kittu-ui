# AI Agent Activity parity review

React is the source of truth: [component](../../src/components/ui/AIAgentActivity.tsx) and [showcase](../../src/components/docs/sections/NewComponentsShowcase.tsx). Angular now renders the same trace, instead of generic workspace events.

## Contract and migration

Keep `KitAiAgentActivityComponent` and `kit-ai-agent-activity`. Replace generic `items` with `activities: AgentActivityItemData[]`, `label` with `title`, and generic loading/action options with React's explicit `isRunning`. Inputs are `activities`, `isRunning` (false), `title` (Activity), `agentName`, `accentColor`, `defaultExpandedIds` (empty), and `className`. The former collection filters/actions/outputs do not belong to React's activity contract and are removed from this component.

The exported activity contract retains all eleven activity types, five statuses, optional description/duration/timestamp, metadata, and input/output/code/language details. Only success contributes to the completed count. Timestamp is retained but not displayed, matching React. Default expanded IDs initialize once; subsequent default changes do not reset user choices. Expansion is independent per item. Expand-all includes all current IDs; collapse-all clears the set.

Native compound exports are `KitAgentActivityHeaderComponent`, `KitAgentActivityTimelineComponent`, and `KitAgentActivityItemComponent`. Project custom parts or arbitrary content into the root to replace its default header/timeline. Header props include `title`, `agentName`, `showControls`, and `className`; item props include required `activity`, `isLast`, and `className`. The public `KitAgentActivityController` provides the native equivalent of React's context state and expansion operations.

```html
<kit-ai-agent-activity
  [activities]="trace"
  [isRunning]="running"
  agentName="Assistant"
  [defaultExpandedIds]="['request']" />
```

Angular uses the same status icon geometry, completed counts, metadata values and formatted detail sections. Disclosure rows additionally support Enter/Space and expose their expanded state. Removed panels are inert and hidden from accessibility navigation during exit motion. Built-in light defaults keep a bare Angular application usable; supplied host theme tokens take precedence.

## Validation and limits

20 focused Chromium checks pass on desktop/mobile emulation: default details, independent/expand-all/collapse-all controls, restart completion, keyboard operation, exit cleanup, both theme geometry/typography comparisons, all five statuses, metadata, code, errors, empty state and a consuming application without host theme styles. Geometry is compared with a one-pixel tolerance; font/color/radius values and SVG paths are compared directly.

The packaged contract also checks changed data, default initialization, classes/accent, arbitrary projection and compound composition. Angular 20.0, 20.3, 21 and 22 strict consumer builds pass. All 24 catalog/sidebar checks and 117 existing unit tests pass. Production build passes 289 SEO checks. Lint passes with 21 inherited warnings. Lucide/Feather license notices are retained in source and packaged assets; no runtime dependency was added.

The native disclosure/chevron motion samples React's 300/32/0.6 spring using Web Animations and respects reduced motion. Exact frame-by-frame equivalence, rapid reversal trajectories, physical devices and Safari/Firefox remain unverified. These results establish a validated baseline for the recorded coverage, not exhaustive parity. The Angular demonstration cancels an earlier restart timer before starting another and cleans up on destruction.

## Screenshots

These component crops exclude the documentation site's fixed navigation. The state fixture exercises statuses and metadata that the default demo does not show.

| View | React | Angular |
| --- | --- | --- |
| Desktop | [Default](screenshots/ai-agent-activity-react-desktop.png) | [Default](screenshots/ai-agent-activity-angular-desktop.png) |
| Mobile | [Default](screenshots/ai-agent-activity-react-mobile.png) | [Default](screenshots/ai-agent-activity-angular-mobile.png) |
| Desktop states | [Fixture](screenshots/ai-agent-activity-react-states-desktop.png) | [Fixture](screenshots/ai-agent-activity-angular-states-desktop.png) |
| Mobile states | [Fixture](screenshots/ai-agent-activity-react-states-mobile.png) | [Fixture](screenshots/ai-agent-activity-angular-states-mobile.png) |

Authored implementation: [port](../../scripts/angular-agent-activity.ts), [controller](../../packages/angular/src/agent-activity-controller.ts), [parts](../../packages/angular/src/agent-activity-parts.ts), [styles](../../packages/angular/src/agent-activity.css), and [motion](../../packages/angular/src/agent-activity-motion.ts).
