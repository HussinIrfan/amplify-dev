import { test, expect } from "@playwright/test";

const URL_HOME = "http://localhost:3000";
const INSTAGRAM = "https://www.instagram.com/sltfirefightersfoundation/";
const FACEBOOK = "https://www.facebook.com/";

test.describe("NavBar Loads Correctly", () => {
  //Navigation to Home page
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_HOME);
  });

  test("Tab Has correct Title", async ({ page }) => {
    await expect(page).toHaveTitle("SLT Firefighter Foundation");
  });

  // Header Image Loads
  test("Header Image Loads", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Navbar" })).toBeVisible();
  });

  // Toolbar Links
  test("Home Link is Visible", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  });

  test("About Us Link is Visible", async ({ page }) => {
    await expect(page.getByRole("link", { name: "About Us" })).toBeVisible();
  });

  test("Out Work Link is Visible", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Our Work" })).toBeVisible();
  });

  test("Calendar Link is Visible", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Calendar" })).toBeVisible();
  });

  test("Donation Link is Visible", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Donation" })).toBeVisible();
  });

  test("Store Link is Visible", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Store" })).toBeVisible();
  });

  test("Instagram Link is Visible", async ({ page }) => {
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Instagram" })
    ).toBeVisible();
  });

  test("Facebook Link is Visible", async ({ page }) => {
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Facebook" })
    ).toBeVisible();
  });

  //Navigation
  test("Home Page Navigation", async ({ page }) => {
    await page.getByRole("link", { name: "Home" }).click();
    await page.waitForURL("http://localhost:3000/");
  });

  test("About Us Navigation", async ({ page }) => {
    await page.getByRole("link", { name: "About Us" }).click();
    await page.waitForURL("http://localhost:3000/aboutus");
  });

  test("Our Work Navigation", async ({ page }) => {
    await page.getByRole("link", { name: "Our Work" }).click();
    await page.waitForURL("http://localhost:3000/ourwork");
  });

  test("Calendar Navigation", async ({ page }) => {
    await page.getByRole("link", { name: "Calendar" }).click();
    await page.waitForURL("http://localhost:3000/calendar");
  });

  test("Donation Navigation", async ({ page }) => {
    await page.getByRole("link", { name: "Donation" }).click();
    await page.waitForURL("http://localhost:3000/donation");
  });

  test("Store Navigation", async ({ page }) => {
    await page.getByRole("link", { name: "Store" }).click();
    await page.waitForURL("http://localhost:3000/featured");
  });

  test("Contact Us Navigation", async ({ page }) => {
    await page.getByRole("link", { name: "contact Us" }).click();
    await page.waitForURL("http://localhost:3000/contactus");
  });

  test("Instagram Navigation", async ({ page }) => {
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Instagram" })
      .click();
    const page1 = await page1Promise;

    if (page.url() == INSTAGRAM) {
      expect(page1.url()).toBe(INSTAGRAM);
    } else {
      // Check for login redirect
      expect(page1.url()).toBe(
        "https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fsltfirefightersfoundation%2F&is_from_rle"
      );
    }
  });

  test("FaceBook Navigation", async ({ page }) => {
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Facebook" })
      .click();
    const page1 = await page1Promise;
    expect(page1.url()).toBe(FACEBOOK);
  });
});
