import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
const tarball = path.join(root, "public/downloads/kit-ui-angular-0.1.0.tgz");
const ports = JSON.parse(
  fs.readFileSync(path.join(root, "packages/angular/catalog.json"), "utf8"),
);
const portImports = ports.map((port) => port.exportName).join(", ");
const portTemplates = ports.map((port) => port.id === "morphing-icon" ? `<ng-template #genericIcon>Icon</ng-template><kit-morphing-icon [from]="genericIcon" [to]="genericIcon"/>` : `<${port.selector} />`).join("\n");
// Each consumer installs and runs its own compiler. Reusing the repository's
// compiler would miss incompatibilities with older Angular versions.
const matrix = [
  { angularVersion: "20.0.0", typescript: "5.8.3" },
  { angularVersion: "20.3.33", typescript: "5.9.3" },
  { angularVersion: "21.2.25", typescript: "5.9.3" },
  { angularVersion: "22.2.1", typescript: "6.0.2" },
];
for (const { angularVersion, typescript } of matrix) {
  const target = fs.mkdtempSync(
    path.join(os.tmpdir(), "kit-angular-consumer-"),
  );
  fs.writeFileSync(
    path.join(target, "package.json"),
    JSON.stringify(
      {
        name: "kit-angular-consumer-check",
        private: true,
        type: "module",
        dependencies: {
          "kit-ui-angular": `file:${tarball.replaceAll("\\", "/")}`,
          "@angular/core": angularVersion,
          "@angular/common": angularVersion,
          "@angular/compiler": angularVersion,
          "@angular/compiler-cli": angularVersion,
          typescript,
          rxjs: "7.8.2",
        },
      },
      null,
      2,
    ),
  );
  const install = spawnSync(
    process.execPath,
    [
      process.env.npm_execpath,
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
    ],
    { cwd: target, stdio: "inherit" },
  );
  if (install.status !== 0) process.exit(install.status ?? 1);
  const loaderOptionalConsumer = `import {Component} from '@angular/core';
import {KitLoaderComponent, type LoaderVariant} from 'kit-ui-angular';
@Component({selector:'loader-optional-consumer',imports:[KitLoaderComponent],template:'<kit-loader [size]="size" [variant]="variant" [label]="label" [reduceMotion]="motion" [color]="color" [className]="classes" [aria-label]="ariaLabel"/>'})
export class LoaderOptionalConsumer {size:number|undefined;variant:LoaderVariant|undefined;label:string|undefined;motion:boolean|undefined;color:string|undefined;classes:string|undefined;ariaLabel:string|undefined;}`;
  const magneticConsumer = `import {Component} from '@angular/core';
import {KitMagneticButtonComponent,type MagneticButtonVariant,type MagneticButtonSize} from 'kit-ui-angular';
@Component({selector:'magnetic-consumer',imports:[KitMagneticButtonComponent],template:'<button kitMagneticButton [strength]="strength" [variant]="variant" [size]="size" [glow]="glow" [type]="type" [className]="classes" [disabled]="false" name="intent" value="save" (click)="clicked=true">Save <em>now</em></button><kit-magnetic-button variant="ghost" size="sm">Projected</kit-magnetic-button>'})
export class MagneticConsumer{strength:number|undefined;variant:MagneticButtonVariant|undefined;size:MagneticButtonSize|undefined;glow:boolean|undefined;type:'button'|'submit'|'reset'|undefined;classes:string|undefined;clicked=false;}`;
  const morphingConsumer=`import {Component} from "@angular/core";import {KitMorphingButtonComponent,type ButtonStatusState,type MorphingButtonVariant} from "kit-ui-angular";@Component({selector:"morphing-consumer",imports:[KitMorphingButtonComponent],template:\`<ng-template #icon><b>Icon</b></ng-template><button kitMorphingButton [status]="status" [variant]="variant" [idleIcon]="icon" [successIcon]="null" [disabled]="false" type="submit" (click)="clicked=true"></button><kit-morphing-button [status]="status" idleText="Go"/>\`})export class MorphingConsumer{status:ButtonStatusState|undefined=undefined;variant:MorphingButtonVariant|undefined=undefined;clicked=false;}`;
  const consumerSources = [loaderOptionalConsumer,magneticConsumer,morphingConsumer,
`import { Component } from '@angular/core';
import { ${portImports}, KitElasticSheetComponent, KitSmartUploadComponent, KitLiquidCommandPaletteComponent, KitHoldToConfirmComponent, KitSwipeActionListComponent, KitInteractiveDataCardComponent, KitTimelineScrubberComponent, KitAIPromptComposerComponent, type UploadHandler, type SendHandler, type ActivityEvent } from 'kit-ui-angular';
@Component({selector:'consumer-app-0',imports:[${portImports}, KitElasticSheetComponent,KitSmartUploadComponent,KitLiquidCommandPaletteComponent,KitHoldToConfirmComponent,KitSwipeActionListComponent,KitInteractiveDataCardComponent,KitTimelineScrubberComponent,KitAIPromptComposerComponent],template:\`
  ${portTemplates}
  <kit-activity-feed [events]="events" [enableLiveSimulation]="false" [enableFilters]="true" [enableSearch]="true" [maxEntries]="10" [onEventReplay]="replay" className="consumer-feed" (eventReplay)="lastEvent = $event" />
  <kit-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kit-smart-upload [upload]="upload" [maxFiles]="2" />
  <kit-liquid-command-palette [commands]="[]" />
  <kit-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kit-swipe-action-list [items]="[]" />
  <kit-interactive-data-card summary="Consumer summary">Consumer detail</kit-interactive-data-card>
  <kit-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kit-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp0 { readonly events:ActivityEvent[]=[{id:'one',type:'deploy',status:'success',title:'Release',timestamp:'Now',payload:{version:1}}];lastEvent:ActivityEvent|undefined;readonly replay=(event:ActivityEvent)=>{this.lastEvent=event;};height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KitElasticSheetComponent, KitSmartUploadComponent, KitLiquidCommandPaletteComponent, KitHoldToConfirmComponent, KitSwipeActionListComponent, KitInteractiveDataCardComponent, KitTimelineScrubberComponent, KitAIPromptComposerComponent, type UploadHandler, type SendHandler, type ColumnDef, KitDataTableComponent, KitDataTableToolbarComponent, KitDataTableContentComponent, KitDataTablePaginationComponent } from 'kit-ui-angular';
interface Row {id:string;name:string;}
@Component({selector:'consumer-app-1',imports:[KitDataTableComponent,KitDataTableToolbarComponent,KitDataTableContentComponent,KitDataTablePaginationComponent,${portImports}, KitElasticSheetComponent,KitSmartUploadComponent,KitLiquidCommandPaletteComponent,KitHoldToConfirmComponent,KitSwipeActionListComponent,KitInteractiveDataCardComponent,KitTimelineScrubberComponent,KitAIPromptComposerComponent],template:\`
  ${portTemplates}
  <ng-template #cell let-row let-value="value">{{row.name}} {{value}}</ng-template>
  <ng-template #details let-row>Details {{row.name}}</ng-template>
  <kit-advanced-data-table [data]="rows" [columns]="columns" [getRowId]="rowId" [defaultPageSize]="2" defaultViewMode="cards" accentColor="#333" [renderSubComponent]="details" [isLoading]="false" [error]="null" [onBulkDelete]="bulk" [onBulkExport]="bulk" (bulkDelete)="ids=$event" (bulkExport)="ids=$event" className="consumer"/>
  <kit-data-table [data]="rows" [columns]="[{id:'name',header:'Name',accessorKey:'name',cell:cell}]"><kit-data-table-toolbar title="Consumer"/><kit-data-table-content emptyTitle="Empty"/><kit-data-table-pagination [pageSizeOptions]="[2,4]"/></kit-data-table>
  <kit-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kit-smart-upload [upload]="upload" [maxFiles]="2" />
  <kit-liquid-command-palette [commands]="[]" />
  <kit-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kit-swipe-action-list [items]="[]" />
  <kit-interactive-data-card summary="Consumer summary">Consumer detail</kit-interactive-data-card>
  <kit-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kit-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp1 {readonly rows:Row[]=[{id:'1',name:'Kit UI'}];readonly columns:ColumnDef<Row>[]=[{id:'name',header:'Name',accessorKey:'name',sortable:true}];readonly rowId=(row:Row)=>row.id;readonly bulk=(ids:string[])=>{this.ids=ids;};ids:string[]=[]; height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KitElasticSheetComponent, KitSmartUploadComponent, KitLiquidCommandPaletteComponent, KitHoldToConfirmComponent, KitSwipeActionListComponent, KitInteractiveDataCardComponent, KitTimelineScrubberComponent, KitAIPromptComposerComponent, type UploadHandler, type SendHandler, type AgentActivityItemData, KitAgentActivityHeaderComponent, KitAgentActivityTimelineComponent, KitAgentActivityItemComponent } from 'kit-ui-angular';
@Component({selector:'consumer-app-2',imports:[KitAgentActivityHeaderComponent,KitAgentActivityTimelineComponent,KitAgentActivityItemComponent,${portImports}, KitElasticSheetComponent,KitSmartUploadComponent,KitLiquidCommandPaletteComponent,KitHoldToConfirmComponent,KitSwipeActionListComponent,KitInteractiveDataCardComponent,KitTimelineScrubberComponent,KitAIPromptComposerComponent],template:\`
  ${portTemplates}
  <kit-ai-agent-activity [activities]="activities" [isRunning]="false" title="Trace" agentName="Consumer" accentColor="#333" [defaultExpandedIds]="['trace']" className="consumer"/>
  <kit-ai-agent-activity [activities]="activities"><kit-agent-activity-header title="Custom trace" [showControls]="false"/><kit-agent-activity-timeline className="custom-timeline"/></kit-ai-agent-activity>
  <kit-ai-agent-activity [activities]="activities"><kit-agent-activity-item [activity]="activities[0]" [isLast]="true"/></kit-ai-agent-activity>
  <kit-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kit-smart-upload [upload]="upload" [maxFiles]="2" />
  <kit-liquid-command-palette [commands]="[]" />
  <kit-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kit-swipe-action-list [items]="[]" />
  <kit-interactive-data-card summary="Consumer summary">Consumer detail</kit-interactive-data-card>
  <kit-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kit-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp2 {readonly activities:AgentActivityItemData[]=[{id:'trace',type:'thinking',title:'Analyze',status:'success',details:{input:{query:'hello'},output:'Ready',codeSnippet:'const ready = true;',language:'typescript'},metadata:{score:2}}]; height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KitElasticSheetComponent, KitSmartUploadComponent, KitLiquidCommandPaletteComponent, KitHoldToConfirmComponent, KitSwipeActionListComponent, KitInteractiveDataCardComponent, KitTimelineScrubberComponent, KitAIPromptComposerComponent, type UploadHandler, type SendHandler } from 'kit-ui-angular';
@Component({selector:'consumer-app-3',imports:[${portImports}, KitElasticSheetComponent,KitSmartUploadComponent,KitLiquidCommandPaletteComponent,KitHoldToConfirmComponent,KitSwipeActionListComponent,KitInteractiveDataCardComponent,KitTimelineScrubberComponent,KitAIPromptComposerComponent],template:\`
  ${portTemplates}
  <kit-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kit-smart-upload [upload]="upload" [maxFiles]="2" />
  <kit-liquid-command-palette [commands]="[]" />
  <kit-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kit-swipe-action-list [items]="[]" />
  <kit-interactive-data-card summary="Consumer summary">Consumer detail</kit-interactive-data-card>
  <kit-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kit-ai-prompt-composer [onSend]="send" />
\`})
export class ConsumerApp3 { height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KitElasticSheetComponent, KitSmartUploadComponent, KitLiquidCommandPaletteComponent, KitHoldToConfirmComponent, KitSwipeActionListComponent, KitInteractiveDataCardComponent, KitTimelineScrubberComponent, KitAIPromptComposerComponent, type UploadHandler, type SendHandler } from 'kit-ui-angular';
@Component({selector:'consumer-app-4',imports:[${portImports}, KitElasticSheetComponent,KitSmartUploadComponent,KitLiquidCommandPaletteComponent,KitHoldToConfirmComponent,KitSwipeActionListComponent,KitInteractiveDataCardComponent,KitTimelineScrubberComponent,KitAIPromptComposerComponent],template:\`
  ${portTemplates}
  <kit-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kit-smart-upload [upload]="upload" [maxFiles]="2" />
  <kit-liquid-command-palette [commands]="[]" />
  <kit-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kit-swipe-action-list [items]="[]" />
  <kit-interactive-data-card summary="Consumer summary">Consumer detail</kit-interactive-data-card>
  <kit-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kit-loader [size]="48" variant="rings" color="#ff8800" label="Working" [reduceMotion]="true" className="consumer-loader" aria-label="Override" />
  <kit-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp4 { height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KitElasticSheetComponent, KitSmartUploadComponent, KitLiquidCommandPaletteComponent, KitHoldToConfirmComponent, KitSwipeActionListComponent, KitInteractiveDataCardComponent, KitTimelineScrubberComponent, KitAIPromptComposerComponent, type UploadHandler, type SendHandler, type ButtonVariant, type ButtonSize } from 'kit-ui-angular';
@Component({selector:'consumer-app-5',imports:[${portImports}, KitElasticSheetComponent,KitSmartUploadComponent,KitLiquidCommandPaletteComponent,KitHoldToConfirmComponent,KitSwipeActionListComponent,KitInteractiveDataCardComponent,KitTimelineScrubberComponent,KitAIPromptComposerComponent],template:\`
  ${portTemplates}
<button kitButton variant="success" size="sm" [isLoading]="false" loadingText="Saving" [fullWidth]="true" [disabled]="false" type="submit">Save</button>
<button kitButton [variant]="optionalVariant" [size]="optionalSize" [type]="optionalType" [className]="optionalClass">Defaults</button>
  <kit-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kit-smart-upload [upload]="upload" [maxFiles]="2" />
  <kit-liquid-command-palette [commands]="[]" />
  <kit-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kit-swipe-action-list [items]="[]" />
  <kit-interactive-data-card summary="Consumer summary">Consumer detail</kit-interactive-data-card>
  <kit-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kit-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp5 { readonly optionalVariant:ButtonVariant|undefined=undefined;readonly optionalSize:ButtonSize|undefined=undefined;readonly optionalType:'button'|'submit'|'reset'|undefined=undefined;readonly optionalClass:string|undefined=undefined;height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KitElasticSheetComponent, KitSmartUploadComponent, KitLiquidCommandPaletteComponent, KitHoldToConfirmComponent, KitSwipeActionListComponent, KitInteractiveDataCardComponent, KitTimelineScrubberComponent, KitAIPromptComposerComponent, type UploadHandler, type SendHandler } from 'kit-ui-angular';
@Component({selector:'consumer-app-6',imports:[${portImports}, KitElasticSheetComponent,KitSmartUploadComponent,KitLiquidCommandPaletteComponent,KitHoldToConfirmComponent,KitSwipeActionListComponent,KitInteractiveDataCardComponent,KitTimelineScrubberComponent,KitAIPromptComposerComponent],template:\`
  ${portTemplates}
<button kitNeonEdgeButton [speed]="2" [glow]="false" [disabled]="false" type="submit" className="customer-neon">Ship</button>
<button kitNeonEdgeButton [speed]="optionalSpeed" [glow]="optionalGlow" [type]="optionalType" [className]="optionalClass">Defaults</button>
  <kit-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kit-smart-upload [upload]="upload" [maxFiles]="2" />
  <kit-liquid-command-palette [commands]="[]" />
  <kit-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kit-swipe-action-list [items]="[]" />
  <kit-interactive-data-card summary="Consumer summary">Consumer detail</kit-interactive-data-card>
  <kit-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kit-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp6 { readonly optionalSpeed:number|undefined=undefined;readonly optionalGlow:boolean|undefined=undefined;readonly optionalType:'button'|'submit'|'reset'|undefined=undefined;readonly optionalClass:string|undefined=undefined;height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KitElasticSheetComponent, KitSmartUploadComponent, KitLiquidCommandPaletteComponent, KitHoldToConfirmComponent, KitSwipeActionListComponent, KitInteractiveDataCardComponent, KitTimelineScrubberComponent, KitAIPromptComposerComponent, type UploadHandler, type SendHandler, type OrbitalLoadingRingVariant } from 'kit-ui-angular';
@Component({selector:'consumer-app-7',imports:[${portImports}, KitElasticSheetComponent,KitSmartUploadComponent,KitLiquidCommandPaletteComponent,KitHoldToConfirmComponent,KitSwipeActionListComponent,KitInteractiveDataCardComponent,KitTimelineScrubberComponent,KitAIPromptComposerComponent],template:\`
  ${portTemplates}
<kit-orbital-loading-ring [size]="96" [speed]="2" variant="dense" label="Reading" aria-label="Custom name" className="customer-ring"/>
<kit-orbital-loading-ring [size]="optionalSize" [speed]="optionalSpeed" [variant]="optionalVariant" [label]="optionalLabel" [className]="optionalClass" [aria-label]="optionalLabel"/>
  <kit-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kit-smart-upload [upload]="upload" [maxFiles]="2" />
  <kit-liquid-command-palette [commands]="[]" />
  <kit-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kit-swipe-action-list [items]="[]" />
  <kit-interactive-data-card summary="Consumer summary">Consumer detail</kit-interactive-data-card>
  <kit-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kit-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp7 { readonly optionalSize:number|undefined=undefined;readonly optionalSpeed:number|undefined=undefined;readonly optionalVariant:OrbitalLoadingRingVariant|undefined=undefined;readonly optionalLabel:string|undefined=undefined;readonly optionalClass:string|undefined=undefined;height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KitElasticSheetComponent, KitSmartUploadComponent, KitLiquidCommandPaletteComponent, KitHoldToConfirmComponent, KitSwipeActionListComponent, KitInteractiveDataCardComponent, KitTimelineScrubberComponent, KitAIPromptComposerComponent, type UploadHandler, type SendHandler, type SpotlightCardMouseHandler } from 'kit-ui-angular';
@Component({selector:'consumer-app-8',imports:[${portImports}, KitElasticSheetComponent,KitSmartUploadComponent,KitLiquidCommandPaletteComponent,KitHoldToConfirmComponent,KitSwipeActionListComponent,KitInteractiveDataCardComponent,KitTimelineScrubberComponent,KitAIPromptComposerComponent],template:\`
  ${portTemplates}
  <kit-spotlight-card [spotlightColor]="optionalColor" [spotlightSize]="optionalSize" [className]="optionalClass" [onMouseMove]="optionalHandler" [onMouseLeave]="optionalHandler"><button (click)="done=true">Projected action</button></kit-spotlight-card>
  <kit-spotlight-card spotlightColor="rgba(255,255,255,.1)" [spotlightSize]="180" [onMouseMove]="moved">Projected content</kit-spotlight-card>
  <kit-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kit-smart-upload [upload]="upload" [maxFiles]="2" />
  <kit-liquid-command-palette [commands]="[]" />
  <kit-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kit-swipe-action-list [items]="[]" />
  <kit-interactive-data-card summary="Consumer summary">Consumer detail</kit-interactive-data-card>
  <kit-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kit-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp8 { readonly optionalColor:string|undefined=undefined;readonly optionalSize:number|undefined=undefined;readonly optionalClass:string|undefined=undefined;readonly optionalHandler:SpotlightCardMouseHandler|undefined=undefined;readonly moved:SpotlightCardMouseHandler=event=>{this.height=event.clientX;}; height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KitElasticSheetComponent, KitSmartUploadComponent, KitLiquidCommandPaletteComponent, KitHoldToConfirmComponent, KitSwipeActionListComponent, KitInteractiveDataCardComponent, KitTimelineScrubberComponent, KitAIPromptComposerComponent, type UploadHandler, type SendHandler, type MorphingIconStyle } from 'kit-ui-angular';
@Component({selector:'consumer-app-9',imports:[${portImports}, KitElasticSheetComponent,KitSmartUploadComponent,KitLiquidCommandPaletteComponent,KitHoldToConfirmComponent,KitSwipeActionListComponent,KitInteractiveDataCardComponent,KitTimelineScrubberComponent,KitAIPromptComposerComponent],template:\`
  ${portTemplates}
  <kit-morphing-icon [from]="genericIcon" [to]="genericIcon" [active]="optionalActive" [size]="optionalSize" [duration]="optionalDuration" [className]="optionalClass" [style]="optionalStyle"/>
  <kit-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kit-smart-upload [upload]="upload" [maxFiles]="2" />
  <kit-liquid-command-palette [commands]="[]" />
  <kit-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kit-swipe-action-list [items]="[]" />
  <kit-interactive-data-card summary="Consumer summary">Consumer detail</kit-interactive-data-card>
  <kit-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kit-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp9 { readonly optionalActive:boolean|undefined=undefined;readonly optionalSize:number|undefined=undefined;readonly optionalDuration:number|undefined=undefined;readonly optionalClass:string|undefined=undefined;readonly optionalStyle:MorphingIconStyle|undefined=undefined;height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`
  ];
  consumerSources.push(`import {Component} from '@angular/core';
import {KitPressButtonComponent,type PressButtonVariant,type PressButtonSize} from 'kit-ui-angular';
@Component({selector:'press-consumer',imports:[KitPressButtonComponent],template:\`<button kitPressButton [variant]="variant" [size]="size" [pressStrength]="strength" [fullWidth]="false" [disabled]="false" [type]="type" [className]="className" name="action" value="save">Save</button><kit-press-button variant="ghost" size="icon">Cancel</kit-press-button>\`})
export class PressConsumer{variant:PressButtonVariant|undefined=undefined;size:PressButtonSize|undefined=undefined;strength:number|undefined=undefined;type:'button'|'submit'|'reset'|undefined=undefined;className:string|undefined=undefined;}`);
  consumerSources.forEach((source, index) => fs.writeFileSync(path.join(target, `app${index}.ts`), source));
  fs.writeFileSync(
    path.join(target, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "ES2022",
          moduleResolution: "bundler",
          experimentalDecorators: true,
          strict: true,
          skipLibCheck: true,
          outDir: "out",
        },
        angularCompilerOptions: {
          strictTemplates: true,
          compilationMode: "full",
        },
        files: consumerSources.map((_, index) => `app${index}.ts`),
      },
      null,
      2,
    ),
  );
  const compile = spawnSync(
    process.execPath,
    [
      path.join(
        target,
        "node_modules/@angular/compiler-cli/bundles/src/bin/ngc.js",
      ),
      "-p",
      path.join(target, "tsconfig.json"),
    ],
    { cwd: target, stdio: "inherit" },
  );
  if (compile.status !== 0) process.exit(compile.status ?? 1);
  const installed = path.join(target, "node_modules/kit-ui-angular");
  for (const asset of ["styles.css", "LICENSE", "UPSTREAM-MIT.txt", "LUCIDE.txt", "LUCIDE-LICENSE.txt"])
    if (!fs.existsSync(path.join(installed, asset)))
      throw new Error(`Missing package asset: ${asset}`);
  console.log(
    `Angular ${angularVersion}: installed tarball and compiled all ${ports.length + 8} selectors with its own compiler and strict templates.`,
  );
  // Only remove the unique temporary directory created above.
  if (
    !path
      .resolve(target)
      .startsWith(
        path.resolve(os.tmpdir()) + path.sep + "kit-angular-consumer-",
      )
  )
    throw new Error("Unexpected cleanup path");
  fs.rmSync(target, { recursive: true, force: true });
}
