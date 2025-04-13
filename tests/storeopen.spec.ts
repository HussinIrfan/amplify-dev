import { test, expect } from '@playwright/test'

test('store open button works correctly', async ({ page }) => {
    await page.goto('https://sltfirefoundation.org/admin', { waitUntil: 'networkidle' });

    await page.getByLabel('Email').fill('hussinirfan2@gmail.com');
    await page.getByRole('textbox', { name: 'Password '}).fill('Password2@');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.waitForURL('**/admin');

    await expect(page.getByText('Admin Settings')).toBeVisible();
    
    const storeSettings = page.getByRole('heading', { name: /Store/i });
    await expect(storeSettings).toBeVisible();
    await storeSettings.click();

    const closeStore = page.getByRole('button', { name: /❌ Store is Closed/i });
    const openStore = page.getByRole('button', { name: /✅ Store is Open/i });

    if (await closeStore.isVisible()) {
        await closeStore.click();
        await expect(openStore).toBeVisible();
    } else {
        await expect(openStore).toBeVisible();
    }

    await page.goto('https://sltfirefoundation.org', { waitUntil: 'networkidle' });

    const storePage = page.getByRole('link', { name: /Store/i });
    await expect(storePage).toBeVisible();
    await storePage.click();
    await expect(page).toHaveURL(/.*\/featured/i);
    await expect(page.getByText(/Featured Products/i)).toBeVisible();
})