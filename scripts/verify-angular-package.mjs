import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
const tarball = path.join(root, "public/downloads/kittu-ui-angular-0.1.0.tgz");
const ports = JSON.parse(
  fs.readFileSync(path.join(root, "packages/angular/catalog.json"), "utf8"),
);
const portImports = ports.map((port) => port.exportName).join(", ");
const portTemplates = ports.map((port) => port.id === "morphing-icon" ? `<ng-template #genericIcon>Icon</ng-template><kittu-morphing-icon [from]="genericIcon" [to]="genericIcon"/>` : `<${port.selector} />`).join("\n");
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
    path.join(os.tmpdir(), "kittu-angular-consumer-"),
  );
  fs.writeFileSync(
    path.join(target, "package.json"),
    JSON.stringify(
      {
        name: "kittu-angular-consumer-check",
        private: true,
        type: "module",
        dependencies: {
          "kittu-ui-angular": `file:${tarball.replaceAll("\\", "/")}`,
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
  const consumerSources = [
`import { Component } from '@angular/core';
import { ${portImports}, KittuElasticSheetComponent, KittuSmartUploadComponent, KittuLiquidCommandPaletteComponent, KittuHoldToConfirmComponent, KittuSwipeActionListComponent, KittuInteractiveDataCardComponent, KittuTimelineScrubberComponent, KittuAIPromptComposerComponent, type UploadHandler, type SendHandler, type ActivityEvent } from 'kittu-ui-angular';
@Component({selector:'consumer-app-0',imports:[${portImports}, KittuElasticSheetComponent,KittuSmartUploadComponent,KittuLiquidCommandPaletteComponent,KittuHoldToConfirmComponent,KittuSwipeActionListComponent,KittuInteractiveDataCardComponent,KittuTimelineScrubberComponent,KittuAIPromptComposerComponent],template:\`
  ${portTemplates}
  <kittu-activity-feed [events]="events" [enableLiveSimulation]="false" [enableFilters]="true" [enableSearch]="true" [maxEntries]="10" [onEventReplay]="replay" className="consumer-feed" (eventReplay)="lastEvent = $event" />
  <kittu-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kittu-smart-upload [upload]="upload" [maxFiles]="2" />
  <kittu-liquid-command-palette [commands]="[]" />
  <kittu-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kittu-swipe-action-list [items]="[]" />
  <kittu-interactive-data-card summary="Consumer summary">Consumer detail</kittu-interactive-data-card>
  <kittu-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kittu-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp0 { readonly events:ActivityEvent[]=[{id:'one',type:'deploy',status:'success',title:'Release',timestamp:'Now',payload:{version:1}}];lastEvent:ActivityEvent|undefined;readonly replay=(event:ActivityEvent)=>{this.lastEvent=event;};height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KittuElasticSheetComponent, KittuSmartUploadComponent, KittuLiquidCommandPaletteComponent, KittuHoldToConfirmComponent, KittuSwipeActionListComponent, KittuInteractiveDataCardComponent, KittuTimelineScrubberComponent, KittuAIPromptComposerComponent, type UploadHandler, type SendHandler, type ColumnDef, KittuDataTableComponent, KittuDataTableToolbarComponent, KittuDataTableContentComponent, KittuDataTablePaginationComponent } from 'kittu-ui-angular';
interface Row {id:string;name:string;}
@Component({selector:'consumer-app-1',imports:[KittuDataTableComponent,KittuDataTableToolbarComponent,KittuDataTableContentComponent,KittuDataTablePaginationComponent,${portImports}, KittuElasticSheetComponent,KittuSmartUploadComponent,KittuLiquidCommandPaletteComponent,KittuHoldToConfirmComponent,KittuSwipeActionListComponent,KittuInteractiveDataCardComponent,KittuTimelineScrubberComponent,KittuAIPromptComposerComponent],template:\`
  ${portTemplates}
  <ng-template #cell let-row let-value="value">{{row.name}} {{value}}</ng-template>
  <ng-template #details let-row>Details {{row.name}}</ng-template>
  <kittu-advanced-data-table [data]="rows" [columns]="columns" [getRowId]="rowId" [defaultPageSize]="2" defaultViewMode="cards" accentColor="#333" [renderSubComponent]="details" [isLoading]="false" [error]="null" [onBulkDelete]="bulk" [onBulkExport]="bulk" (bulkDelete)="ids=$event" (bulkExport)="ids=$event" className="consumer"/>
  <kittu-data-table [data]="rows" [columns]="[{id:'name',header:'Name',accessorKey:'name',cell:cell}]"><kittu-data-table-toolbar title="Consumer"/><kittu-data-table-content emptyTitle="Empty"/><kittu-data-table-pagination [pageSizeOptions]="[2,4]"/></kittu-data-table>
  <kittu-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kittu-smart-upload [upload]="upload" [maxFiles]="2" />
  <kittu-liquid-command-palette [commands]="[]" />
  <kittu-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kittu-swipe-action-list [items]="[]" />
  <kittu-interactive-data-card summary="Consumer summary">Consumer detail</kittu-interactive-data-card>
  <kittu-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kittu-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp1 {readonly rows:Row[]=[{id:'1',name:'Kit UI'}];readonly columns:ColumnDef<Row>[]=[{id:'name',header:'Name',accessorKey:'name',sortable:true}];readonly rowId=(row:Row)=>row.id;readonly bulk=(ids:string[])=>{this.ids=ids;};ids:string[]=[]; height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KittuElasticSheetComponent, KittuSmartUploadComponent, KittuLiquidCommandPaletteComponent, KittuHoldToConfirmComponent, KittuSwipeActionListComponent, KittuInteractiveDataCardComponent, KittuTimelineScrubberComponent, KittuAIPromptComposerComponent, type UploadHandler, type SendHandler, type AgentActivityItemData, KittuAgentActivityHeaderComponent, KittuAgentActivityTimelineComponent, KittuAgentActivityItemComponent } from 'kittu-ui-angular';
@Component({selector:'consumer-app-2',imports:[KittuAgentActivityHeaderComponent,KittuAgentActivityTimelineComponent,KittuAgentActivityItemComponent,${portImports}, KittuElasticSheetComponent,KittuSmartUploadComponent,KittuLiquidCommandPaletteComponent,KittuHoldToConfirmComponent,KittuSwipeActionListComponent,KittuInteractiveDataCardComponent,KittuTimelineScrubberComponent,KittuAIPromptComposerComponent],template:\`
  ${portTemplates}
  <kittu-ai-agent-activity [activities]="activities" [isRunning]="false" title="Trace" agentName="Consumer" accentColor="#333" [defaultExpandedIds]="['trace']" className="consumer"/>
  <kittu-ai-agent-activity [activities]="activities"><kittu-agent-activity-header title="Custom trace" [showControls]="false"/><kittu-agent-activity-timeline className="custom-timeline"/></kittu-ai-agent-activity>
  <kittu-ai-agent-activity [activities]="activities"><kittu-agent-activity-item [activity]="activities[0]" [isLast]="true"/></kittu-ai-agent-activity>
  <kittu-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kittu-smart-upload [upload]="upload" [maxFiles]="2" />
  <kittu-liquid-command-palette [commands]="[]" />
  <kittu-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kittu-swipe-action-list [items]="[]" />
  <kittu-interactive-data-card summary="Consumer summary">Consumer detail</kittu-interactive-data-card>
  <kittu-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kittu-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp2 {readonly activities:AgentActivityItemData[]=[{id:'trace',type:'thinking',title:'Analyze',status:'success',details:{input:{query:'hello'},output:'Ready',codeSnippet:'const ready = true;',language:'typescript'},metadata:{score:2}}]; height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
`import { Component } from '@angular/core';
import { ${portImports}, KittuElasticSheetComponent, KittuSmartUploadComponent, KittuLiquidCommandPaletteComponent, KittuHoldToConfirmComponent, KittuSwipeActionListComponent, KittuInteractiveDataCardComponent, KittuTimelineScrubberComponent, KittuAIPromptComposerComponent, type UploadHandler, type SendHandler } from 'kittu-ui-angular';
@Component({selector:'consumer-app-3',imports:[${portImports}, KittuElasticSheetComponent,KittuSmartUploadComponent,KittuLiquidCommandPaletteComponent,KittuHoldToConfirmComponent,KittuSwipeActionListComponent,KittuInteractiveDataCardComponent,KittuTimelineScrubberComponent,KittuAIPromptComposerComponent],template:\`
  ${portTemplates}
  <kittu-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kittu-smart-upload [upload]="upload" [maxFiles]="2" />
  <kittu-liquid-command-palette [commands]="[]" />
  <kittu-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kittu-swipe-action-list [items]="[]" />
  <kittu-interactive-data-card summary="Consumer summary">Consumer detail</kittu-interactive-data-card>
  <kittu-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kittu-ai-prompt-composer [onSend]="send" />
\`})
export class ConsumerApp3 { height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`
  ];
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
  const installed = path.join(target, "node_modules/kittu-ui-angular");
  for (const asset of ["styles.css", "LICENSE", "UPSTREAM-MIT.txt"])
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
        path.resolve(os.tmpdir()) + path.sep + "kittu-angular-consumer-",
      )
  )
    throw new Error("Unexpected cleanup path");
  fs.rmSync(target, { recursive: true, force: true });
}
