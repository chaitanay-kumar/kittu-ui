import { expect, test } from "@playwright/test";
const components = [
  ["elastic-sheet", "Elastic Sheet"],
  ["smart-upload", "Smart Upload"],
  ["liquid-command-palette", "Liquid Command Palette"],
  ["hold-to-confirm", "Hold-to-Confirm"],
  ["swipe-action-list", "Swipe Action List"],
  ["interactive-data-card", "Interactive Data Card"],
  ["timeline-scrubber", "Timeline Scrubber"],
  ["ai-prompt-composer", "AI Prompt Composer"],
];
for (const [id, name] of components) {
  test(`native Angular ${name} renders`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/components/${id}?framework=angular`);
    await expect(
      page
        .getByRole("group", { name: "Component framework" })
        .getByRole("button", { name: "Angular", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
    const frame = page.frameLocator(
      `iframe[title="${name} — native Angular demo"]`,
    );
    await expect(frame.locator("kit-angular-demo")).toHaveAttribute(
      "ng-version",
      /^20\./,
    );
    await expect(frame.locator(".kit-control").first()).toBeVisible();
    expect(
      await frame
        .locator("body")
        .evaluate((body) => body.scrollWidth <= window.innerWidth + 1),
    ).toBe(true);
    await page
      .locator("iframe")
      .screenshot({ path: testInfo.outputPath(`${id}-angular.png`) });
    await page.getByRole('tab', { name: 'Code', exact: true }).click();
    await expect(page.getByText(`${id}.component.ts`, { exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  });
}
test("framework switch persists, filters catalog, and restores React detail", async ({
  page,
}) => {
  await page.goto("/");
  const switches = page.getByRole("group", { name: "Component framework" });
  await switches.getByRole("button", { name: "Angular", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: /Nimble by nature.*Native Angular/ }),
  ).toBeVisible();
  await page.reload();
  await expect(
    switches.getByRole("button", { name: "Angular", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: /Angular · Standalone.*Elastic Sheet/ })
    .click();
  await expect(page).toHaveURL(/elastic-sheet\?framework=angular/);
  await switches.getByRole("button", { name: "React", exact: true }).click();
  await expect(
    page.getByRole("button", { name: /Open elastic sheet/ }),
  ).toBeVisible();
  await page.goto("/components/magnetic-button?framework=angular");
  await expect(page.getByRole('heading',{name:'Magnetic Button',exact:true})).toBeVisible();
  await expect(page.frameLocator('iframe').locator('kit-magnetic-button')).toBeVisible();
});
test("Angular interactions cancel, retry and preserve drafts", async ({
  page,
}) => {
  await page.goto("/components/smart-upload?framework=angular");
  let frame = page.frameLocator("iframe");
  await frame.getByLabel("Choose files or drop them here").setInputFiles({
    name: "report.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("demo"),
  });
  await frame.getByRole("button", { name: "Upload", exact: true }).click();
  await frame.getByRole("button", { name: "Cancel", exact: true }).click();
  await frame.getByRole("button", { name: "Retry" }).click();
  await expect(frame.getByText("success", { exact: true })).toBeVisible();
  await page.goto("/components/ai-prompt-composer?framework=angular");
  frame = page.frameLocator("iframe");
  await frame.getByRole("textbox").fill("fail and preserve my draft");
  await frame.getByRole("button", { name: /Send prompt/ }).click();
  await expect(frame.getByRole("status")).toContainText("Sending failed");
  await expect(frame.getByRole("textbox")).toHaveValue(
    "fail and preserve my draft",
  );
  await frame.getByRole("textbox").fill("Send this");
  await frame.getByRole("button", { name: /Send prompt/ }).click();
  await frame.getByRole("button", { name: "Cancel" }).click();
  await expect(frame.getByRole("textbox")).toHaveValue("Send this");
  await expect(frame.getByRole("status")).toContainText("cancelled");
});
test("Angular modal focus and command navigation work", async ({ page }) => {
  await page.goto("/components/elastic-sheet?framework=angular");
  let frame = page.frameLocator("iframe");
  const opener = frame.getByRole("button", { name: /Open elastic sheet/ });
  await opener.click();
  const handle = frame.getByRole("button", { name: /Resize sheet/ });
  await handle.focus();
  await handle.press("End");
  await expect(frame.getByRole("button", { name: "90%" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await handle.press("Escape");
  await expect(opener).toBeFocused();
  await page.goto("/components/liquid-command-palette?framework=angular");
  frame = page.frameLocator("iframe");
  await frame.getByRole("button", { name: /Find a command/ }).click();
  const search = frame.getByRole("combobox");
  await search.fill("documentation");
  await search.press("ArrowDown");
  await search.press("Enter");
  await expect(
    frame.getByText("Documentation selected.", { exact: true }),
  ).toBeVisible();
});
test("Angular hold confirmation, timeline and expandable card support keyboard", async ({
  page,
}) => {
  await page.goto("/components/hold-to-confirm?framework=angular");
  let frame = page.frameLocator("iframe");
  const hold = frame.getByRole("button", {
    name: "Hold to confirm",
    exact: true,
  });
  await hold.focus();
  await hold.press("Space");
  await expect(frame.getByRole("progressbar")).toHaveAttribute("value", "0");
  await page.keyboard.down("Space");
  await expect(frame.getByRole("status")).toContainText("Action completed.");
  await page.keyboard.up("Space");
  await frame.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(hold).toBeEnabled();
  await page.goto("/components/timeline-scrubber?framework=angular");
  frame = page.frameLocator("iframe");
  const timeline = frame.getByRole("slider", { name: "Timeline event" });
  await timeline.focus();
  await timeline.press("End");
  await expect(timeline).toHaveValue("2");
  await expect(
    frame.getByRole("heading", { name: "Ready to share" }),
  ).toBeVisible();
  await timeline.press("Home");
  await expect(timeline).toHaveValue("0");
  await page.goto("/components/interactive-data-card?framework=angular");
  frame = page.frameLocator("iframe");
  await frame.getByRole("button", { name: /Explore details/ }).press("Enter");
  await expect(
    frame.getByRole("button", { name: /Less detail/ }),
  ).toHaveAttribute("aria-expanded", "true");
  await frame.getByRole("button", { name: "Refresh report" }).click();
  await expect(frame.getByRole("status")).toContainText("Report updated.");
});

test("download serves the built Angular package", async ({ request }) => {
  const response = await request.get("/downloads/kit-ui-angular-0.1.0.tgz");
  expect(response.ok()).toBe(true);
  const bytes = await response.body();
  expect(bytes.length).toBeGreaterThan(10000);
  expect(bytes[0]).toBe(0x1f);
  expect(bytes[1]).toBe(0x8b);
});
