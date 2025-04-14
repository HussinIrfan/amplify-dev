import { test, expect } from '@playwright/test';

test.describe('About Us Admin Page', () => {
  test.beforeEach(async ({ page }) => {
    // Go to admin page
    await page.goto('http://localhost:3000/admin');

    // Login
    await page.getByPlaceholder('Enter your Email').fill('hussinirfan2@gmail.com');
    await page.getByPlaceholder('Enter your Password').fill('Password2@');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Wait for dashboard to load
    await expect(page.getByRole('heading', { name: /Admin Settings/i })).toBeVisible();

    // Expand the correct collapsible panels
    await page.locator('h2:has-text("Website Settings")').click();
    await page.locator('h2:has-text("About Us")').click();
  });

  test('should load About Us section and display team members', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Team Members/i })).toBeVisible();
  });

  test('should show Edit and Delete buttons for team members', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Edit/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Delete/i }).first()).toBeVisible();
  });

  test('should fill out Create Entry form and submit', async ({ page }) => {
    // Scroll to form
    const form = page.locator('form:has-text("Add Team Member")');
    await form.scrollIntoViewIfNeeded();

    // Fill fields within the form
    await form.getByLabel('Name:').fill('Test User');
    await form.getByLabel('Title:').fill('Tester');
    await form.getByLabel('Description (Optional):').fill('Automated test entry');

    // Click Create Entry inside this form
    await form.getByRole('button', { name: /Create Entry/i }).click();

    // Optional verification (if UI updates immediately)
    // await expect(page.getByText('Test User')).toBeVisible();
  });
});
