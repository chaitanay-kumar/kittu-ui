import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
const target = fs.mkdtempSync(
  path.join(os.tmpdir(), "kittu-angular-consumer-"),
);
const tarball = path.join(root, "public/downloads/kittu-ui-angular-0.1.0.tgz");
const angularVersion = JSON.parse(
  fs.readFileSync(
    path.join(root, "node_modules/@angular/core/package.json"),
    "utf8",
  ),
).version;
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
fs.writeFileSync(
  path.join(target, "app.ts"),
  `import { Component } from '@angular/core';
import { KittuElasticSheetComponent, KittuSmartUploadComponent, KittuLiquidCommandPaletteComponent, KittuHoldToConfirmComponent, KittuSwipeActionListComponent, KittuInteractiveDataCardComponent, KittuTimelineScrubberComponent, KittuAIPromptComposerComponent, type UploadHandler, type SendHandler } from 'kittu-ui-angular';
@Component({selector:'consumer-app',imports:[KittuElasticSheetComponent,KittuSmartUploadComponent,KittuLiquidCommandPaletteComponent,KittuHoldToConfirmComponent,KittuSwipeActionListComponent,KittuInteractiveDataCardComponent,KittuTimelineScrubberComponent,KittuAIPromptComposerComponent],template:\`
  <kittu-elastic-sheet [snapPositions]="[35,65,90]" (snapChange)="height = $event" />
  <kittu-smart-upload [upload]="upload" [maxFiles]="2" />
  <kittu-liquid-command-palette [commands]="[]" />
  <kittu-hold-to-confirm [duration]="500" (confirmed)="done = true" />
  <kittu-swipe-action-list [items]="[]" />
  <kittu-interactive-data-card summary="Consumer summary">Consumer detail</kittu-interactive-data-card>
  <kittu-timeline-scrubber [events]="[]" (eventChange)="height = $event.index" />
  <kittu-ai-prompt-composer [sendHandler]="send" />
\`})
export class ConsumerApp { height=0;done=false;readonly upload:UploadHandler=async(_file,{onProgress})=>{onProgress(100);};readonly send:SendHandler=async()=>{}; }
`,
);
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
      files: ["app.ts"],
    },
    null,
    2,
  ),
);
const compile = spawnSync(
  process.execPath,
  [
    path.join(
      root,
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
  "Installed tarball in a separate consumer and compiled all eight Angular selectors with strict templates.",
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
