// import { test, expect } from "@playwright/test";

// test.describe("Featured Products Page", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:3000/featured");
//   });
  
//   test.skip('Store is closed, skipping featured page tests', async ({ page }) => {
//     await page.goto("http://localhost:3000/featured");
//     const closedMessage = await page.locator("text=Store Closed").isVisible();
//     test.skip(closedMessage, "Store is closed, skipping test");
//   });
  
//   test("loads featured heading and product grid", async ({ page }) => {
//     // If the store is closed, this will fail
//     await expect(page.getByRole("heading", { name: /featured products/i })).toBeVisible();
//     await expect(page.locator(".product-grid")).toBeVisible();
//   });

//   test("displays product cards if products are loaded", async ({ page }) => {
//     const productCards = page.locator(".product-card");
//     await expect(productCards.first()).toBeVisible();
//     //await expect(productCards).toHaveCountGreaterThan(0);
//   });

//   test("each product has image, name, description, and price", async ({ page }) => {
//     const card = page.locator(".product-card").first();

//     await expect(card.locator("img")).toBeVisible();
//     await expect(card.locator(".product-name")).toBeVisible();
//     await expect(card.locator(".product-description")).toBeVisible();
//     await expect(card.locator(".product-price")).toContainText("$");
//   });
// });
