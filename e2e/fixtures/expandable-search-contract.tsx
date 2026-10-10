import "../../packages/angular/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import "@angular/compiler";
import {
  Component,
  provideZonelessChangeDetection,
  signal,
} from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { KitExpandableSearchComponent } from "../../packages/angular/dist/fesm2022/kit-ui-angular.mjs";
import {
  ExpandableSearch,
  type ExpandableSearchProps,
} from "../../src/components/ui/ExpandableSearch";
import "../../src/styles/index.css";
const params = new URLSearchParams(location.search);
document.documentElement.classList.toggle(
  "dark",
  params.get("theme") === "dark",
);
document.body.style.margin = "20px";
const events: string[] = [];
const api = window as unknown as {
  setSearchOptions: (options: ExpandableSearchProps) => void;
  destroySearch: () => void;
  searchEvents: string[];
};
api.searchEvents = events;
const search = (value: string) => events.push("search:" + value);
if (params.get("framework") === "react") {
  const node = document.createElement("div");
  document.body.append(node);
  const root = createRoot(node);
  api.setSearchOptions = (options) =>
    root.render(
      <form
        onClick={() => events.push("form-click")}
        onSubmit={(event) => {
          event.preventDefault();
          events.push("submit");
        }}
      >
        <ExpandableSearch {...options} onSearch={search} />
      </form>,
    );
  api.destroySearch = () => root.unmount();
  api.setSearchOptions({});
} else {
  class Consumer {
    readonly options = signal<ExpandableSearchProps>({});
    readonly search = search;
    click() {
      events.push("form-click");
    }
    submit(event: Event) {
      event.preventDefault();
      events.push("submit");
    }
  }
  Component({
    selector: "search-consumer",
    standalone: true,
    imports: [KitExpandableSearchComponent],
    template:
      '<form (click)="click()" (submit)="submit($event)"><kit-expandable-search [placeholder]="options().placeholder" [className]="options().className" [onSearch]="search"/></form>',
  })(Consumer);
  document.body.append(document.createElement("search-consumer"));
  void bootstrapApplication(Consumer, {
    providers: [provideZonelessChangeDetection()],
  }).then((app) => {
    api.setSearchOptions = (options) =>
      app.components[0].instance.options.set(options);
    api.destroySearch = () => app.destroy();
  });
}
