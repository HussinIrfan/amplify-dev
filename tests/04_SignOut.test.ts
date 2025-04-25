import { test, expect } from "@playwright/test";

const URL_ADMIN = "http://localhost:3000/admin";
const URL_LOGIN = "http://localhost:3000/login";
const EMAIL = "hussinirfan2@gmail.com";
const PASSWORD = "Password2@";

test.describe("Admin Sign Out Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_ADMIN);

    // Login first
    await page.getByRole("textbox", { name: "Email" }).fill(EMAIL);
    await page.getByPlaceholder("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();

    await page.waitForURL(URL_ADMIN);
    await expect(page.locator("h1.admin-h1")).toHaveText("Admin Settings");
  });

  test("Clicking Sign Out logs out and redirects to login", async ({ page }) => {
    // Click the sign out button using its class
    await page.locator("button.signOutButton").click();

    await page.waitForURL(URL_ADMIN);

    // Confirm login screen is shown again
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });
});
