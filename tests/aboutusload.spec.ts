import { test, expect } from '@playwright/test'
test('about us page loads', async ({ page }) => {
    await page.goto('http://localhost:3000//aboutus');
})