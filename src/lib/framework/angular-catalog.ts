import { ANGULAR_PORTS } from './angular-ports';
export interface AngularEntry {
  id: string;
  name: string;
  exportName: string;
  selector: string;
  description: string;
  inputs: string[];
  outputs?: string[];
  binding?: string;
  handler?: string;
}
export const ANGULAR_COMPONENTS: AngularEntry[] = [
  {
    id: "elastic-sheet",
    name: "Elastic Sheet",
    exportName: "KittuElasticSheetComponent",
    selector: "kittu-elastic-sheet",
    description:
      "A draggable native modal sheet with keyboard resizing and snap positions.",
    inputs: ["title: string", "snapPositions: number[]", "disabled: boolean"],
    outputs: ["snapChange: number"],
    binding: '[snapPositions]="[35, 65, 90]"',
  },
  {
    id: "smart-upload",
    name: "Smart Upload",
    exportName: "KittuSmartUploadComponent",
    selector: "kittu-smart-upload",
    description:
      "Validated file queues, previews, progress, cancellation, and fresh retries.",
    inputs: [
      "upload: UploadHandler",
      "accept: string",
      "maxSize: number",
      "maxFiles: number",
      "disabled: boolean",
    ],
    binding: '[upload]="upload"',
    handler: `  readonly upload: UploadHandler = async (file, { signal, onProgress }) => {\n    const response = await fetch('/api/files', { method: 'POST', body: file, signal });\n    if (!response.ok) throw new Error('Upload failed');\n    onProgress(100);\n  };`,
  },
  {
    id: "liquid-command-palette",
    name: "Liquid Command Palette",
    exportName: "KittuLiquidCommandPaletteComponent",
    selector: "kittu-liquid-command-palette",
    description:
      "Search commands with keyboard navigation, disabled entries, and async recovery.",
    inputs: ["commands: LiquidCommand[]", "disabled: boolean"],
    binding: '[commands]="commands"',
    handler: `  readonly commands: LiquidCommand[] = [\n    { id: 'home', label: 'Go home', onSelect: () => { window.location.assign('/'); } },\n  ];`,
  },
  {
    id: "hold-to-confirm",
    name: "Hold-to-Confirm",
    exportName: "KittuHoldToConfirmComponent",
    selector: "kittu-hold-to-confirm",
    description:
      "Deliberate pointer and keyboard confirmation with visible progress and retry.",
    inputs: [
      "label: string",
      "duration: number",
      "confirm: () => void | Promise<void>",
      "disabled: boolean",
    ],
    outputs: ["confirmed: void"],
    binding: '[duration]="1200"',
  },
  {
    id: "swipe-action-list",
    name: "Swipe Action List",
    exportName: "KittuSwipeActionListComponent",
    selector: "kittu-swipe-action-list",
    description:
      "Swipe to reveal actions, with keyboard buttons, loading, and failure recovery.",
    inputs: [
      "items: SwipeItem[]",
      "action: (item: SwipeItem) => void | Promise<void>",
      "actionLabel: string",
      "loading: boolean",
      "disabled: boolean",
    ],
  },
  {
    id: "interactive-data-card",
    name: "Interactive Data Card",
    exportName: "KittuInteractiveDataCardComponent",
    selector: "kittu-interactive-data-card",
    description:
      "Expandable summaries and projected details with asynchronous actions.",
    inputs: [
      "title: string",
      "summary: string",
      "action: () => void | Promise<void>",
      "actionLabel: string",
      "loading: boolean",
      "error: string",
      "disabled: boolean",
    ],
  },
  {
    id: "timeline-scrubber",
    name: "Timeline Scrubber",
    exportName: "KittuTimelineScrubberComponent",
    selector: "kittu-timeline-scrubber",
    description:
      "Explore events with native range navigation and readable event announcements.",
    inputs: [
      "events: TimelineEvent[]",
      "loading: boolean",
      "disabled: boolean",
    ],
    outputs: ["eventChange: { event: TimelineEvent; index: number }"],
  },
  {
    id: "ai-prompt-composer",
    name: "AI Prompt Composer",
    exportName: "KittuAIPromptComposerComponent",
    selector: "kittu-ai-prompt-composer",
    description:
      "Draft prompts with suggestions and attachments; preserve work on cancellation or failure.",
    inputs: [
      "sendHandler: SendHandler",
      "suggestions: string[]",
      "maxAttachments: number",
      "maxAttachmentSize: number",
      "disabled: boolean",
    ],
    binding: '[sendHandler]="send"',
    handler: `  readonly send: SendHandler = async ({ text, attachments }, signal) => {\n    const form = new FormData();\n    form.append('text', text);\n    attachments.forEach(file => form.append('attachments', file));\n    const response = await fetch('/api/prompts', { method: 'POST', body: form, signal });\n    if (!response.ok) throw new Error('Send failed');\n  };`,
  },
  ...ANGULAR_PORTS.map(entry => entry.id === "activity-feed" ? {
    ...entry,
    binding: '[events]="events"',
    handler: `  readonly events: ActivityEvent[] = [{
    id: 'evt-1', type: 'deploy', status: 'success',
    title: 'Production release verified', timestamp: '2 mins ago',
    traceId: 'trc_98fa20', actor: { name: 'CI Pipeline' },
    payload: { version: '2.4.0' },
  }];`,
  } : entry),
];
export function angularUsage(entry: AngularEntry) {
  if (entry.id === 'advanced-data-table') return `import { Component } from '@angular/core';
import { KittuAdvancedDataTableComponent, type ColumnDef } from 'kittu-ui-angular';
interface Row { id: string; name: string; }
@Component({selector:'app-example',imports:[KittuAdvancedDataTableComponent],template:\`<kittu-advanced-data-table title="Directory" [data]="rows" [columns]="columns" [onBulkExport]="exportRows"/>\`})
export class ExampleComponent {
  readonly rows: Row[] = [{id:'1',name:'Kit UI'}];
  readonly columns: ColumnDef<Row>[] = [{id:'name',header:'Name',accessorKey:'name',sortable:true}];
  readonly exportRows = (ids: string[]) => { console.log(ids); };
}`;
  const type =
    entry.id === "activity-feed"
      ? "ActivityEvent"
      : entry.id === "smart-upload"
      ? "UploadHandler"
      : entry.id === "ai-prompt-composer"
        ? "SendHandler"
        : entry.id === "liquid-command-palette"
          ? "LiquidCommand"
          : undefined;
  return `import { Component } from '@angular/core';\nimport { ${entry.exportName}${type ? `, type ${type}` : ""} } from 'kittu-ui-angular';\n\n@Component({\n  selector: 'app-example',\n  imports: [${entry.exportName}],\n  template: \`<${entry.selector}${entry.binding ? " " + entry.binding : ""} />\`,\n})\nexport class ExampleComponent {\n${entry.handler ?? ""}\n}`;
}
