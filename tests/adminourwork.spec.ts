import { test, expect } from '@playwright/test';

test.describe('Our Work Admin Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/admin');

    // Login
    await page.getByPlaceholder('Enter your Email').fill('hussinirfan2@gmail.com');
    await page.getByPlaceholder('Enter your Password').fill('Password2@');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Wait for dashboard
    await expect(page.getByRole('heading', { name: /Admin Settings/i })).toBeVisible();

    // Expand Website Settings → Our Work
    await page.locator('h2:has-text("Website Settings")').click();
    await page.locator('h2:has-text("Our Work")').click();
  });

  test('should fill out Our Work form and submit', async ({ page }) => {
    // Scroll to Add Business form
    const form = page.locator('form:has-text("Add Business")');
    await form.scrollIntoViewIfNeeded();

    // Fill inputs within form
    await form.getByLabel('Business:').fill('Playwright Coffee Co.');
    await form.getByLabel('Description:').fill('Automated test business entry');

    // Click "Create Entry" scoped inside form
    await form.getByRole('button', { name: /Create Entry/i }).click();

    // Optional: confirm result appears
    // await expect(page.getByText('Playwright Coffee Co.')).toBeVisible();
  });
});
