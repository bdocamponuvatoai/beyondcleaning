import { expect, test } from "./fixtures";

test.describe("home page", () => {
  test("renders one h1, sections, and contact routes", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("properly clean");
    for (const id of ["spaces", "services", "quotes", "first-visit", "faq"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await expect(page.locator("main a[href='tel:+12125204815']").first()).toBeVisible();
  });

  test("has no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("sends production security headers", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response!.headers();
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["strict-transport-security"]).toContain("max-age=63072000");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-powered-by"]).toBeUndefined();
  });

  test("keeps all content visible with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const hidden = await page
      .locator("[data-reveal]")
      .evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity !== "1").length);
    expect(hidden).toBe(0);
  });

  test("lobby directory updates the services card", async ({ page }) => {
    await page.goto("/#spaces");
    await page.getByRole("button", { name: "Brownstone", pressed: false }).click();
    await expect(page.getByRole("button", { name: "Brownstone", pressed: true })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Brownstone" })).toBeVisible();
    await expect(page.locator("#spaces").getByText("Post-renovation cleaning")).toBeVisible();
  });

  test("service index links every service to the official site", async ({ page }) => {
    await page.goto("/#services");
    const links = page.locator('#services a[href^="https://beyondcleaning.com/service/"]');
    await expect(links).toHaveCount(44);
    expect(await links.evaluateAll((els) => els.every((a) => a.getAttribute("target") === "_blank"))).toBe(true);
    await expect(page.getByRole("heading", { level: 2, name: /44 services/ })).toBeVisible();
  });

  test("FAQ disclosures open", async ({ page }) => {
    await page.goto("/#faq");
    await page.getByText("Does this website book my cleaning?").click();
    await expect(page.getByText(/only prepares notes about your space/)).toBeVisible();
  });
});

test.describe("other routes", () => {
  test("privacy page", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Your answers stay with you.");
    await expect(page).toHaveTitle(/Privacy/);
  });

  test("unknown routes return the branded 404", async ({ page, pageErrors }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    // The browser logs the 404 document itself; that one is expected.
    pageErrors.splice(0, pageErrors.length, ...pageErrors.filter((e) => !/status of 404/.test(e)));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Nothing to clean here.");
  });

  test("robots, sitemap, and manifest are served", async ({ request }) => {
    expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
    expect(await (await request.get("/sitemap.xml")).text()).toContain("/privacy");
    expect((await request.get("/manifest.webmanifest")).ok()).toBe(true);
  });
});
