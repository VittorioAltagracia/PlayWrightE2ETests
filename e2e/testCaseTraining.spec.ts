import { test, expect, Locator } from "@playwright/test";

test.describe("Playwright practice", () => {
  test.beforeEach(async ({ page }): Promise<void> => {
    await page.goto("https://demoqa.com/");
  });

  test("Login and web tables test", async ({ page }): Promise<void> => {
    await test.step("login to a bookstore", async () => {
      await page.goto("https://demoqa.com/");

      const locator1 = page.getByText("Book Store Application");
      const expectedUrl: string = "https://demoqa.com/books";
      await expect(page).toHaveTitle("DEMOQA");
      await expect(locator1).toBeVisible();
      locator1.click();
      await expect(page).toHaveURL(expectedUrl);
      const login = page.getByRole("button", { name: "Login" });
      login.click();
      await expect(page).toHaveURL("https://demoqa.com/login");
      const loginCreds = ["Test", "Abcd1234!"];
      await page.getByPlaceholder("UserName").fill(loginCreds[0]);
      await page.getByPlaceholder("Password").fill(loginCreds[1]);
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page).toHaveURL(expectedUrl);
    });
    await test.step("Check web tables", async () => {
      const elemLocator = page.getByText("Elements");
      await expect(elemLocator).toBeVisible();
      await elemLocator.click();
      await page.getByText("Web Tables").click();
      await expect(page).toHaveURL("https://demoqa.com/webtables");
      await expect(
        page.locator("div").filter({ hasText: `Web Tables` }).first()
      ).toBeVisible();
    });
  });

  test("Please complete a test that logs user in an application with given URL", async ({
    page,
  }): Promise<void> => {
    await page.goto("https://letcode.in/table");
    //  locate the table first
    const table: Locator = page.locator("#simpletable");
    // locate the table header
    const tableHeader: Locator = table.locator("thead");
    console.log(`Test` + (await tableHeader.allTextContents()));

    const rows = table.locator("tbody tr");
    console.log(await rows.count());
    const cols = rows.first().locator("td");
    console.log(await cols.count());

    const findRaj = rows.filter({
      // find table data which has text 'Raj'
      has: page.locator("td"),
      hasText: "Raj",
    });

    await findRaj.locator("input").check();
    await findRaj.screenshot({ path: "screenshot.png" });

    for (let i = 0; i < (await rows.count()); i++) {
      const row = rows.nth(i);
      const tds = row.locator("td");
      for (let j = 0; j < (await tds.count()); j++) {
        if ((await tds.nth(j).textContent()) == "Raj") {
          console.log(await tds.nth(2).textContent());
          await tds.last().locator("input").check();
        }
      }
    }
  });
});
