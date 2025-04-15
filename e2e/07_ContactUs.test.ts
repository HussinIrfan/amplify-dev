import { test, expect } from '@playwright/test';
// Assume the page with HPheader is available at this URL
const URL_HOME = "http://localhost:3000/contactus"; // Adjust to the correct URL where the component is rendered

test.describe("Contact Page Loads", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_HOME); 
  });

  test("Header text is rendered correctly", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
    await expect(page.getByText('Please submit any questions,')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Phone' })).toBeVisible();
    await expect(page.getByLabel('Subject')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeEmpty();
    
  });

});
