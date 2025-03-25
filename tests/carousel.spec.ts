import { test, expect } from '@playwright/test';

test.describe('Image Carousel', () => {
  test.beforeEach(async ({ page }) => {
    // Visit your site
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

    // Wait for hydration: ensure carousel is loaded visually
    await page.waitForSelector('text=Support South Lake Tahoe Firefighters');
    await page.waitForSelector('img'); // waits for the image to be rendered
    await page.waitForTimeout(500); // slight pause to ensure hydration
  });

  test('right arrow shows the image', async ({ page }) => {
    await page.locator('button:has-text("→")').click();
    await page.waitForTimeout(600); // smooth transition
    await expect(page.getByRole('heading', {
      name: 'Firefighter Apparel and Gear',
    })).toBeVisible();
  });

  test('left arrow shows the previous image', async ({ page }) => {
    await page.locator('button:has-text("←")').click();
    await page.waitForTimeout(600); // allow image to load
    await expect(page.getByRole('heading', {
      name: 'Stay Connected',
    })).toBeVisible();
  });

  test('each action button on carousel is visible with correct href', async ({ page }) => {
    const buttons = ['Donate Now', 'Shop Now', 'Sign Up'];
    const links = ['/donation', '/featured', '/calendar'];

    for (let i = 0; i < buttons.length; i++) {
      // Navigate to target slide using right arrow
      for (let click = 0; click < i; click++) {
        await page.locator('button:has-text("→")').click();
        await page.waitForTimeout(600);
      }

      // Wait for the heading to confirm correct image is active
      const headings = [
        'Support South Lake Tahoe Firefighters',
        'Firefighter Apparel and Gear',
        'Stay Connected',
      ];
      await expect(page.getByRole('heading', { name: headings[i] })).toBeVisible();

      // Locate and assert action button
      const actionButton = page.locator(`a:has-text("${buttons[i]}")`);
      await expect(actionButton).toBeVisible();

      // Assert correct link
      const href = await actionButton.getAttribute('href');
      expect(href).toBe(links[i]);

      // Reset to first slide for next test (optional)
      await page.goto('http://localhost:3000/');
      await page.waitForSelector('img');
      await page.waitForTimeout(1000);
    }
  });
});
