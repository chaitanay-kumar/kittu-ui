import "@angular/compiler";
import { provideZonelessChangeDetection } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { DemoComponent } from "./.generated/demo.component.js";
import "../../src/styles/tokens.css";
import "../../src/styles/fonts.css";
import "../../src/lib/kittu-controls.css";
import "../angular/src/ports.css";
import "./demo.css";

const origin = window.location.origin;
function theme(value: string) {
  document.documentElement.classList.toggle("dark", value === "dark");
  document.documentElement.style.colorScheme =
    value === "dark" ? "dark" : "light";
}
theme(new URLSearchParams(window.location.search).get("theme") || "light");
window.addEventListener("message", (event) => {
  if (
    event.origin === origin &&
    event.source === window.parent &&
    event.data?.type === "kittu-theme"
  )
    theme(event.data.theme);
});
bootstrapApplication(DemoComponent, {
  providers: [provideZonelessChangeDetection()],
})
  .then(() => {
    const resize = () =>
      window.parent.postMessage(
        { type: "kittu-angular-height", height: document.body.scrollHeight },
        origin,
      );
    new ResizeObserver(resize).observe(document.body);
    resize();
  })
  .catch((error) => {
    console.error(error);
    document.body.textContent =
      "Angular demo could not start. Refresh to retry.";
  });
