import { test, expect } from "@playwright/test";

const URL_ADMIN = "http://localhost:3000/admin";
const EMAIL = "hussinirfan2@gmail.com";
const PASSWORD = "Password2@";

test.describe("Product Edit Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_ADMIN);

    // Step 1: Log in
    await page.getByLabel("Email").fill(EMAIL);
    await page.getByRole("textbox", { name: "Password" }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();

    // prevent hydration issues in dev/sandbox
    await page.waitForLoadState('networkidle');


    // Step 2: Wait for authenticated content to load
    await expect(page.getByRole("heading", { name: "Admin Settings" })).toBeVisible();

    // Step 3: Open the store section
    const storeHeading = page.getByRole("heading", { name: "Store" });
    await expect(storeHeading).toBeVisible();
    await storeHeading.click();

    await page.waitForTimeout(500); // Let the section expand

    // Step 4: Click "Add Product"
    const addButton = page.getByRole("button", { name: /add product/i });
    await expect(addButton).toBeVisible();
    await addButton.click();

    // Step 5: Wait for the product form to appear
    await expect(page.getByLabel("Product Name (Max 26 characters)")).toBeVisible();
  });

  test("loads all form inputs", async ({ page }) => {
    await expect(page.getByLabel("Product Name (Max 26 characters)")).toBeVisible();
    await expect(page.getByLabel("Product Link")).toBeVisible();
    await expect(page.getByLabel("Price")).toBeVisible();
    await expect(page.getByLabel("Description (Max 120 characters)")).toBeVisible();
    await expect(page.getByLabel("Default Quantity")).toBeVisible();
    await expect(page.getByLabel("Upload Photo")).toBeVisible();
    await expect(page.getByText("Sizes")).toBeVisible();
  });

  test("fills and submits form", async ({ page }) => {
    await page.getByLabel("Product Name (Max 26 characters)").fill("Test Product");
    await expect(page.getByLabel("Product Link")).toHaveValue("test-product");

    await page.getByLabel("Price").fill("25.99");
    await page.getByLabel("Description (Max 120 characters)").fill("This is a test product");
    await page.getByLabel("Default Quantity").fill("10");

    // Select size and quantity
    await page.getByLabel("S").check();
    await page.locator('input[placeholder="Quantity"]').first().fill("3");

    await page.getByRole("button", { name: /add product/i }).click();
  });

  test("cancel button works", async ({ page }) => {
    await page.getByRole("button", { name: /cancel/i }).click();
    await expect(page).toHaveURL(/\/admin/); // Adjust if needed
  });
});
