import { test, expect } from "@playwright/test";

// Assume the page with HPheader is available at this URL
const URL_HOME = "http://localhost:3000"; // Adjust to the correct URL where the component is rendered

test.describe("Home Page Loads", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_HOME); // Navigate to the page with the HPheader component
  });

  test("Header text is rendered correctly", async ({ page }) => {
    const headerText = await page.locator("h1.hp-header");
    await expect(headerText).toHaveText(
      "THE BETTER TRAINED THEY ARE, THE SAFER OUR COMMUNITY IS"
    );
  });

  test("Support SLT Image", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Support South Lake Tahoe" })
    ).toBeVisible();
  });

  test("Firefighter Apparel & Gear Image", async ({ page }) => {
    // Wait for 6 seconds before checking the image
    await page.waitForTimeout(6500); // 6.5 seconds
    await expect(
      page.getByRole("img", { name: "Firefighter Apparel and Gear" })
    ).toBeVisible();
  });

  test("Stay Connected Image", async ({ page }) => {
    // Wait for 6 seconds before checking the image
    await page.waitForTimeout(12500); // 12.5 seconds
    await expect(
      page.getByRole("img", { name: "Stay Connected" })
    ).toBeVisible();
  });

  test("Keep up with organization Loads", async ({ page }) => {
    await page
      .locator("div")
      .filter({ hasText: /^Keep up with our organization$/ });
  });

  test("Contact Us Loads", async ({ page }) => {
    await page.getByText('Contact UsPlease submit any')
  });
});
