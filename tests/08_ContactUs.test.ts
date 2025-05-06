import { test, expect } from '@playwright/test';

test.describe("Contact Us Page Loads", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/contactus");
  });

  test("Redirects to contact us page and form is visible", async ({ page }) => {
    await expect(page.getByText('Contact UsPlease submit any')).toBeVisible();
    await expect(page.getByText('First NameLast NameEmailPhoneSubjectGeneral InquiryStore')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  });
});

test.describe("Contact Form Functionality", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000/contactus");
    });
  
    test("Succeeds with valid credentials", async ({ page }) => {
        await page.getByRole('textbox', { name: 'First Name' }).fill('John');
        await page.getByRole('textbox', { name: 'Last Name' }).fill("Test");
        await page.getByRole('textbox', { name: 'Email' }).fill("dummyemail1@gmail.com");
        await page.getByRole('textbox', { name: 'Message' }).fill('test message');
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.getByText('Your message has been sent')).toBeVisible();

    });

});