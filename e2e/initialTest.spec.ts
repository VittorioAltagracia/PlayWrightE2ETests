import { baseUrl } from "../utils/helper.spec";
import { test, expect, type Page } from "@playwright/test";

const pageTitle: string = "Universal Source";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test.describe("UI tests", () => {
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(pageTitle);
  });

  test("Confirm main header text", async ({ page }) => {
    await expect(page.getByText("Universal Source")).toBeVisible();
  });

  test("Confirm toast message is present", async ({ page }) => {
    await page.getByRole("contentinfo").locator("div").filter({
      hasText:
        "Please noteThis application is still in development and may contain fake data an",
    });
  });

  test("Verify main header is present", async ({ page }) => {
    await page.getByRole("heading").locator("h2").filter({
      hasText:
        "New in the US? Find quick answers to the most important questions.",
    });
  });
});
