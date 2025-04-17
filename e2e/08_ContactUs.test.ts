import { test, expect } from "@playwright/test";

test.describe("Home Page Loads", () => {
    test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/contactus');
    await page.getByRole('heading', { name: 'Contact Us' }).click();
    await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
    await expect(page.getByText('Please submit any questions,')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    })
    
  });