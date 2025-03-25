import { test, expect } from "@playwright/test";

const URL_ADMIN = "http://localhost:3000/admin";
const EMAIL = "hussinirfan2@gmail.com";
const PASSWORD = "Password2@";

test.describe("Admin Login Page Loads", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_ADMIN);
  });

  test("Redirects to login and form is visible", async ({ page }) => {
    await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  test("Forgot password link is visible", async ({ page }) => {
    await expect(page.getByText("Forgot your password?")).toBeVisible();
  });
});

test.describe("Admin Login Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_ADMIN);
  });

  test("Fails with invalid credentials", async ({ page }) => {
    await page.getByRole("textbox", { name: "Email" }).fill("wrong@email.com");
    await page.getByPlaceholder("Password").fill("wrongpass");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(
      page.getByText("Incorrect username or password") 
    ).toBeVisible();
  });

  test("Succeeds with valid credentials", async ({ page }) => {
    await page.getByRole("textbox", { name: "Email" }).fill(EMAIL);
    await page.getByPlaceholder("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();

    // Wait for navigation back to admin
    await page.waitForURL("http://localhost:3000/admin");

    // Confirm you're now on admin page (adjust locator if needed)
    // await expect(page.getByRole("heading")).toContainText("Admin"); 
  });
});
