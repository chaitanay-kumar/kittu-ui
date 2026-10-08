import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
function run(file, args) {
  const result = spawnSync(process.execPath, [path.join(root, file), ...args], {
    cwd: root,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
for (const [source, target] of [
  ["src/lib/kittu-controls.css", "styles.css"],
  ["LICENSE", "LICENSE"],
  ["licenses/UPSTREAM-MIT.txt", "UPSTREAM-MIT.txt"],
])
  fs.copyFileSync(
    path.join(root, source),
    path.join(root, "packages/angular", target),
  );
run("node_modules/ng-packagr/src/cli/main.js", [
  "-p",
  "packages/angular/ng-package.json",
  "-c",
  "packages/angular/tsconfig.lib.json",
]);
run("node_modules/@angular/compiler-cli/bundles/src/bin/ngc.js", [
  "-p",
  "packages/angular-demo/tsconfig.json",
]);
run("node_modules/vite/bin/vite.js", [
  "build",
  "--config",
  "packages/angular-demo/vite.config.ts",
]);
const downloads = path.join(root, "public/downloads");
fs.mkdirSync(downloads, { recursive: true });
const npmCli = process.env.npm_execpath;
if (!npmCli)
  throw new Error(
    "Run angular:build through npm so the npm executable is available.",
  );
const packed = spawnSync(
  process.execPath,
  [npmCli, "pack", "./packages/angular/dist", "--pack-destination", downloads],
  { cwd: root, stdio: "inherit" },
);
if (packed.status !== 0) process.exit(packed.status ?? 1);
const sources = path.join(root, "public/angular-source");
fs.mkdirSync(sources, { recursive: true });
for (const file of fs
  .readdirSync(path.join(root, "packages/angular/src"))
  .filter((file) => file.endsWith(".component.ts"))) {
  const id = file.replace(".component.ts", "");
  fs.writeFileSync(
    path.join(sources, `${id}.json`),
    JSON.stringify(
      {
        id,
        sourceCode: fs.readFileSync(
          path.join(root, "packages/angular/src", file),
          "utf8",
        ),
        types: fs.readFileSync(
          path.join(root, "packages/angular/src/types.ts"),
          "utf8",
        ),
        styles: fs.readFileSync(
          path.join(root, "src/lib/kittu-controls.css"),
          "utf8",
        ),
      },
      null,
      2,
    ) + "\n",
  );
}
