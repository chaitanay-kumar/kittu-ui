import "@angular/compiler";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from "@angular/platform-browser/testing";
import { KitExpandableSearchComponent } from "../packages/angular/dist/fesm2022/kit-ui-angular.mjs";
const dom = new JSDOM("<html><body></body></html>");
for (const key of ["window", "document", "HTMLElement", "Element", "Node"])
  globalThis[key] = dom.window[key];
TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
TestBed.configureTestingModule({
  imports: [KitExpandableSearchComponent],
  providers: [provideZonelessChangeDetection()],
});
const fixture = TestBed.createComponent(KitExpandableSearchComponent),
  instance = fixture.componentInstance,
  queries = [];
fixture.componentRef.setInput("onSearch", (query) => queries.push(query));
fixture.detectChanges();
try {
  const input = fixture.nativeElement.querySelector("input");
  assert.equal(input.type, "text");
  assert.equal(input.placeholder, "Quick search...");
  assert.equal(instance.placeholder(), "Search components, props...");
  assert.equal(instance.value(), "");
  assert.equal(
    fixture.nativeElement.querySelector(".k-es-search path").getAttribute("d"),
    "m21 21-4.34-4.34",
  );
  input.dispatchEvent(new dom.window.Event("focus"));
  fixture.detectChanges();
  assert.equal(input.placeholder, "Search components, props...");
  input.value = " query ";
  input.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  fixture.detectChanges();
  assert.deepEqual(queries, [" query "]);
  assert.equal(instance.value(), " query ");
  input.dispatchEvent(new dom.window.Event("blur"));
  fixture.detectChanges();
  assert.equal(instance.expanded(), true);
  const clear = fixture.nativeElement.querySelector("button");
  assert.equal(clear.type, "submit");
  clear.click();
  fixture.detectChanges();
  assert.deepEqual(queries, [" query ", ""]);
  assert.equal(input.value, "");
  assert.equal(input.placeholder, "Quick search...");
  assert.equal(fixture.nativeElement.querySelector("button"), null);
  fixture.componentRef.setInput("placeholder", "Custom");
  fixture.componentRef.setInput("className", "customer-search");
  fixture.detectChanges();
  input.dispatchEvent(new dom.window.Event("focus"));
  fixture.detectChanges();
  assert.equal(input.placeholder, "Custom");
  assert.ok(fixture.nativeElement.querySelector(".customer-search"));
  fixture.componentRef.setInput("placeholder", undefined);
  fixture.componentRef.setInput("className", undefined);
  fixture.detectChanges();
  assert.equal(input.placeholder, "Search components, props...");
  input.dispatchEvent(new dom.window.Event("blur"));
  fixture.detectChanges();
  assert.equal(instance.expanded(), false);
  console.log(
    "Expandable Search packaged contract: defaults/undefined, real input callback, whitespace preservation, blur retention, synchronous clear, SVG geometry, custom placeholder/classes.",
  );
} finally {
  fixture.destroy();
  TestBed.resetTestingModule();
  dom.window.close();
}
