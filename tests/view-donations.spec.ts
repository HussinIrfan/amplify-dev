import { test, expect } from '@playwright/test';

test('Donation page loads and shows correct donation elements', async ({ page }) => {
  await page.goto('http://localhost:3000/donation', { waitUntil: 'networkidle' });

  // Check heading is visible
  await expect(page.getByRole('heading', { name: 'Donate Now' })).toBeVisible();

  // Check input with placeholder '$' is visible
  await expect(page.getByPlaceholder('$')).toBeVisible();

});
