import { expect, test } from "./fixtures";

test.describe("quote planner", () => {
  test("validates, then prepares notes without sending anything", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("main").getByRole("button", { name: "Plan a free quote" }).first().click();

    const sheet = page.getByRole("dialog", { name: "Quote planner" });
    await expect(sheet.getByRole("heading", { name: "What would you like cleaned?" })).toBeFocused();

    await sheet.getByRole("button", { name: "Continue" }).click();
    await expect(sheet.getByRole("alert")).toHaveText("Choose a service to continue.");

    await sheet.locator("label", { hasText: "Deep cleaning" }).click();
    await sheet.getByRole("button", { name: "Continue" }).click();
    await expect(sheet.getByRole("heading", { name: "Tell us about your space." })).toBeFocused();

    await sheet.getByRole("button", { name: "Prepare my notes" }).click();
    await expect(sheet.getByLabel("ZIP code")).toHaveAttribute("aria-invalid", "true");
    await expect(sheet.getByLabel("ZIP code")).toBeFocused();

    await sheet.getByLabel("Type of space").selectOption("Brownstone or town house");
    await sheet.getByLabel("ZIP code").fill("11215");
    await sheet.getByLabel("Size").selectOption("3 bedrooms");
    await sheet.getByLabel("Bathrooms").selectOption("2");
    await sheet.locator("label", { hasText: "One time" }).click();
    await sheet.getByLabel("Extra requests").fill("Oven & inside the fridge.");
    await sheet.getByRole("button", { name: "Prepare my notes" }).click();

    await expect(sheet.getByRole("heading", { name: "Your quote notes are ready." })).toBeFocused();
    await expect(sheet.getByText("Nothing has been sent.", { exact: false })).toBeVisible();
    for (const value of [
      "Deep cleaning",
      "Brownstone or town house",
      "3 bedrooms",
      "11215",
      "Oven & inside the fridge.",
    ]) {
      await expect(sheet.locator("dd", { hasText: value })).toBeVisible();
    }
    await expect(sheet.getByRole("link", { name: /Call \(212\) 520-4815/ })).toHaveAttribute(
      "href",
      "tel:+12125204815",
    );
    await expect(sheet.getByRole("link", { name: /official contact form/ })).toHaveAttribute(
      "href",
      "https://beyondcleaning.com/contact-nyc/",
    );

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
  });

  test("the lobby directory presets the service and the space", async ({ page }) => {
    await page.goto("/#spaces");
    await page.getByRole("button", { name: "Office", exact: true }).click();
    await page.getByRole("button", { name: "Plan a quote for this space" }).click();

    const sheet = page.getByRole("dialog", { name: "Quote planner" });
    await expect(sheet.getByRole("heading", { name: "Tell us about your space." })).toBeVisible();
    await expect(sheet.getByText("Office & janitorial cleaning", { exact: true })).toBeVisible();
    await expect(sheet.getByLabel("Type of space")).toHaveValue("Office");
    await expect(sheet.getByLabel("Restrooms")).toBeVisible();
    await expect(sheet.getByLabel("Approximate size")).toBeVisible();
  });

  test("returns focus to the trigger on close", async ({ page, isMobile }) => {
    test.skip(isMobile, "Header trigger is desktop-only");
    await page.goto("/");
    const trigger = page.locator("header > div").getByRole("button", { name: "Free quote" });
    await trigger.click();
    const sheet = page.getByRole("dialog", { name: "Quote planner" });
    await expect(sheet).toBeVisible();
    await sheet.getByRole("button", { name: "Close quote planner" }).click();
    await expect(sheet).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
