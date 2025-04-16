import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  test.beforeEach(async ({ page }) => {
    // Define mock cart item
    const mockCartData = [
      {
        name: "Fire Dept Tee",
        price: 55.55,
        quantity: 2,
        image: "/test-image.jpg",
        size: "L"
      }
    ];

    // Inject localStorage BEFORE page loads
    await page.addInitScript((cart) => {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }, mockCartData);

    await page.goto('http://localhost:3000/cart');
  });

  test('renders Cart title and cart totals', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible();
    await expect(page.locator('text=Subtotal:')).toBeVisible();
    await expect(page.locator('text=Tax:')).toBeVisible();
    await expect(page.locator('text=Total:')).toBeVisible();
  });

  test('displays cart item with correct name and price', async ({ page }) => {
    await expect(page.locator('text=Fire Dept Tee')).toBeVisible();
    await expect(page.locator('text=$55.55')).toBeVisible();
  });

  test('displays correct quantity and subtotal', async ({ page }) => {
    await expect(page.locator('input[type="number"]')).toHaveValue('2');
    await expect(page.locator('text=$111.10')).toBeVisible();
  });
});
