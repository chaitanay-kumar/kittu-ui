import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { FrameworkProvider, useFramework } from "./FrameworkProvider";
function Probe() {
  const { framework, setFramework } = useFramework();
  return (
    <>
      <p role="status">{framework}</p>
      <button onClick={() => setFramework("angular")}>Angular</button>
      <button onClick={() => setFramework("react")}>React</button>
    </>
  );
}
beforeEach(() => {
  localStorage.clear();
  window.history.replaceState(null, "", "/components/elastic-sheet");
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  localStorage.clear();
});
describe("framework preference", () => {
  it("persists a switch and preserves the route and unrelated query parameters", () => {
    window.history.replaceState(
      null,
      "",
      "/components/elastic-sheet?category=Forms",
    );
    render(
      <FrameworkProvider>
        <Probe />
      </FrameworkProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Angular" }));
    expect(screen.getByRole("status")).toHaveTextContent("angular");
    expect(localStorage.getItem("kit-ui-framework")).toBe("angular");
    expect(window.location.pathname).toBe("/components/elastic-sheet");
    expect(new URLSearchParams(window.location.search).get("category")).toBe(
      "Forms",
    );
    expect(new URLSearchParams(window.location.search).get("framework")).toBe(
      "angular",
    );
  });
  it("prefers an explicit deep link over saved framework", () => {
    localStorage.setItem("kit-ui-framework", "angular");
    window.history.replaceState(null, "", "/?framework=react");
    render(
      <FrameworkProvider>
        <Probe />
      </FrameworkProvider>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("react");
  });
  it("restores a saved framework", () => {
    localStorage.setItem("kit-ui-framework", "angular");
    render(
      <FrameworkProvider>
        <Probe />
      </FrameworkProvider>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("angular");
  });
  it("switches even when persistent storage is blocked", () => {
    render(
      <FrameworkProvider>
        <Probe />
      </FrameworkProvider>,
    );
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    fireEvent.click(screen.getByRole("button", { name: "Angular" }));
    expect(screen.getByRole("status")).toHaveTextContent("angular");
  });
});
