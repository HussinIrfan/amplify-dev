import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sltfirefoundation.org/');
  const page1Promise = page.waitForEvent('popup');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: '(c)(3) Documentation' }).click();
  const page1 = await page1Promise;
  const download = await downloadPromise;
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Form' }).click();
  const page2 = await page2Promise;
  const page3Promise = page.waitForEvent('popup');
  await page.getByText('Instagram').click();
  const page3 = await page3Promise;
  const page4Promise = page.waitForEvent('popup');
  await page.getByText('Facebook').click();
  const page4 = await page4Promise;
  await page.getByRole('heading', { name: 'South Lake Tahoe Firefighter\'' }).click();
});