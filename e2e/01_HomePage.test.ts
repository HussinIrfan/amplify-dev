import { test, expect } from "@playwright/test";

const URL_HOME = "http://localhost:3000";

test.describe("Home Page Loads Correctly", () => {
     //Navigation to Home page
      test.beforeEach(async ({ page }) => {
        await page.goto(URL_HOME);
      });
    
      test("Loads", async ({ page }) => {
        await expect(page).toHaveTitle("SLT Firefighter Foundation");
      });
    
});
