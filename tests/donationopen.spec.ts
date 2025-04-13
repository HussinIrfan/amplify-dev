import { test, expect } from '@playwright/test'

test('donation open button works correctly', async ({ page }) => {
    await page.goto('https://sltfirefoundation.org/admin', { waitUntil: 'networkidle' });

    await page.getByLabel('Email').fill('hussinirfan2@gmail.com');
    await page.getByRole('textbox', { name: 'Password '}).fill('Password2@');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.waitForURL('**/admin');

    await expect(page.getByText('Admin Settings')).toBeVisible();

    const websiteSettings = page.getByRole('heading', { name: /Website Settings/i });
    await expect(websiteSettings).toBeVisible();
    await websiteSettings.click();

    const donationsSettings = page.getByRole('heading', { name: /Donations/i });
    await expect(donationsSettings).toBeVisible();
    await donationsSettings.click();

    await expect(
        page.getByRole('button', { name: /❌ Donations Closed/i })
          .or(page.getByRole('button', { name: /✅ Donations Open/i }))
      ).toBeVisible();

    const closeDonations = page.getByRole('button', { name: /❌ Donations Closed/i });

    if (await closeDonations.count() > 0) {
        await closeDonations.first().click();
        const openDonations = page.getByRole('button', { name: /✅ Donations Open/i });
        await openDonations.waitFor({ state: 'visible', timeout: 7000 });
        await expect(openDonations).toBeVisible();
    } else {
        await expect(page.getByRole('button', { name: /✅ Donations Open/i })).toBeVisible();
    }

    await page.goto('https://sltfirefoundation.org', { waitUntil: 'networkidle' });

    const donationPage = page.getByRole('link', { name: /Donation/i });
    await expect(donationPage).toBeVisible();
    await donationPage.click();
    await expect(page).toHaveURL(/.*\/donation/i);
    await expect(page.getByText(/Donate Now/i)).toBeVisible();
})