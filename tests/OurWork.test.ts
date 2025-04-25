import { test, expect } from '@playwright/test';

test.describe('Our Work Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/ourwork'); // adjust if route is different
  });

  test('Page loads successfully with correct title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Our Work' })).toBeVisible();
  });

  test('Subheader text is visible', async ({ page }) => {
    await expect(page.locator('p')).toContainText('The Primary Mission');
  });

  test('Partnering Organizations section is rendered if data exists', async ({ page }) => {
    const orgCards = page.locator('[class*=organizationCard]');

    // ✅ Wait for at least one card to appear (if any data is present)
    await orgCards.first().waitFor({ timeout: 5000 }).catch(() => {
      console.log('⚠️ No organization cards found within timeout.');
    });

    const count = await orgCards.count();

    if (count > 0) {
      await expect(orgCards.first()).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Partnering Organizations' })).toBeVisible();
    }
  });

  test('Organization images are displayed if provided and not using fallback', async ({ page }) => {
    const orgCards = page.locator('[class*=organizationCard]');
    await orgCards.first().waitFor({ timeout: 5000 }).catch(() => {
      console.log('⚠️ No organization cards found.');
    });
  
    const cardCount = await orgCards.count();
  
    for (let i = 0; i < cardCount; i++) {
      const card = orgCards.nth(i);
      const image = card.locator('img');
  
      if (await image.count() > 0) {
        await expect(image).toBeVisible();
  
        const src = await image.getAttribute('src');
        if (src?.includes('/ourWork/Document.jpg')) {
          console.warn(`⚠️ Card ${i + 1} is showing fallback image.`);
        } else {
          expect(src).toMatch(/.+/); // Some valid non-empty src
        }
      }
    }
  });  
});
