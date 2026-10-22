import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

// WCAG 2.2 A and AA rules. Reveal animations are disabled so axe measures
// final colours, not mid-fade ones.
async function scan(page: Page, include?: string) {
  const builder = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]);
  if (include) builder.include(include);
  const { violations } = await builder.analyze();
  return violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
}

test.describe("accessibility (axe)", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "One engine is enough for rule checks");
  test.beforeEach(async ({ page }) => page.emulateMedia({ reducedMotion: "reduce" }));

  for (const path of ["/", "/privacy", "/does-not-exist"]) {
    test(`page ${path} has no WCAG AA violations`, async ({ page, pageErrors }) => {
      await page.goto(path);
      expect(await scan(page)).toEqual([]);
      pageErrors.splice(0, pageErrors.length, ...pageErrors.filter((e) => !/status of 404/.test(e)));
    });
  }

  test("the open mobile menu has no WCAG AA violations", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-only menu");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    expect(await scan(page, "dialog[open]")).toEqual([]);
  });

  test("every planner step has no WCAG AA violations", async ({ page }) => {
    await page.goto("/#services");
    await page.getByRole("button", { name: "Quote for homes" }).click();
    const sheet = page.getByRole("dialog", { name: "Quote planner" });

    await sheet.getByRole("button", { name: "Change" }).click();
    await sheet.getByRole("button", { name: "Continue" }).waitFor();
    expect(await scan(page, "dialog[open]"), "service step").toEqual([]);

    await sheet.getByRole("button", { name: "Continue" }).click();
    await sheet.getByRole("button", { name: "Prepare my notes" }).click();
    expect(await scan(page, "dialog[open]"), "space step with errors").toEqual([]);

    await sheet.getByLabel("ZIP code").fill("10001");
    await sheet.getByRole("button", { name: "Prepare my notes" }).click();
    await sheet.getByRole("heading", { name: "Your quote notes are ready." }).waitFor();
    expect(await scan(page, "dialog[open]"), "notes step").toEqual([]);
  });
});
