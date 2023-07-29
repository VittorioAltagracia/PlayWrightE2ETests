import { baseUrl } from "../utils/helper.spec";
import { test, expect, type Page } from "@playwright/test";

const pageTitle: string = "Universal Source";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(pageTitle);
});
