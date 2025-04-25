import { test, expect } from "@playwright/test";

// Assume the page with HPheader is available at this URL
const URL_HOME = "http://localhost:3000";
const INSTAGRAM = "https://www.instagram.com/sltfirefightersfoundation/";
const FACEBOOK = "https://www.facebook.com/";

test.describe("Footer Loads", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_HOME); // Navigate to the page with the HPheader component
  });

  test("Footer Body Loads", async ({ page }) => {
    await page
      .locator("div")
      .filter({ hasText: "South Lake Tahoe Firefighter'" })
      .first();
  });

  test("Admin Logo Image loads", async ({ page }) => {
    await page.getByRole("link", { name: "Nonprofit Logo" });
  });
});

test.describe("Footer Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_HOME); // Navigate to the page with the HPheader component
  });

  test("501(c)3 document link", async ({ page }) => {
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "(c)(3) Documentation" }).click();
    const page1 = await page1Promise;
  });

  test("990 document link", async ({ page }) => {
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Form" }).click();
    const page2 = await page2Promise;
  });

  test("Instagram Navigation", async ({ page }) => {
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Instagram" })
      .click();
    const page1 = await page1Promise;

    // Wait for the Instagram page to load
    await page1.waitForLoadState("domcontentloaded");

    // Get the current page title
    const pageTitle = await page1.title();

    if (page1.url() == INSTAGRAM) {
      expect(page1.url()).toBe(INSTAGRAM);
    } else {
      const expectedTitles = [
        "Instagram",
        "Login • Instagram ",
        "Log into Instagram",
      ];
      expect(expectedTitles.some((t) => pageTitle.includes(t))).toBe(true);
      // Check if the pageTitle matches one of the expected titles
    }
  });

  test("Facebook Navigation", async ({ page }) => {
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Facebook" })
      .click();
    const page1 = await page1Promise;

    // Wait for the Facebook page to load
    await page1.waitForLoadState("domcontentloaded");

    // Get the current page title
    const pageTitle = await page1.title();

    // Check for possible expected titles
    if (page1.url() == FACEBOOK) {
      // If the URL is Facebook, check for the title as Facebook's homepage
      expect(page1.url()).toBe(FACEBOOK);
    } else if (page1.url().includes("facebook.com")) {
      // If the URL is a Facebook login page or another page, check for login prompt title
      expect([
        "Facebook",
        "Facebook - log in or sign up",
        "Log into Facebook",
      ]).toContain(pageTitle);
    } else {
      // Handle any other unexpected cases
      expect(page1.url()).toContain("facebook.com");
    }
  });

  //TODO change when Auth is finalized
  test("Admin Page Link", async ({ page }) => {
    await page.getByRole("link", { name: "Nonprofit Logo" }).click();
    await page.waitForURL("http://localhost:3000/admin");
  });
});
