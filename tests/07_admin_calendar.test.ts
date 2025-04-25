import { test, expect, Page } from "@playwright/test";
import path from "path";

const URL_ADMIN = "http://localhost:3000/admin";
const EMAIL1 = "hussinirfan2@gmail.com";
const PASSWORD1 = "Password2@";

function formatDate(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

async function loginAndNavigateToCalendar(page: Page): Promise<void> {
  await page.goto(URL_ADMIN);
  await page.getByRole("textbox", { name: "Email" }).fill(EMAIL1);
  await page.getByPlaceholder("Password").fill(PASSWORD1);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL(URL_ADMIN);

  await expect(page.locator("h1.admin-h1")).toHaveText("Admin Settings");

  await page
    .getByRole("heading", { name: "Website Settings ▼" })
    .locator("span")
    .click();
  await page.waitForTimeout(3000);

  await page
    .getByRole("heading", { name: "Admin Calendar ▼" })
    .locator("span")
    .click();
  await page.locator(".calendar-container-admin").click();
}

async function createSingleDayEvent(
  page: Page,
  eventName: string,
  startTime: string = "08:30",
  endTime: string = "10:30",
  dateOverride?: Date
): Promise<void> {
  const date = (dateOverride ?? new Date()).toISOString().split("T")[0];

  await page.getByRole("button", { name: "Add Event" }).click();
  await page.getByRole("textbox", { name: "Event Title" }).fill(eventName);

  await page
    .locator("div", { hasText: /^Start Date:$/ })
    .getByRole("textbox")
    .fill(date);
  await page
    .locator("div", { hasText: /^Start Time:$/ })
    .getByRole("textbox")
    .fill(startTime);
  await page
    .locator("div", { hasText: /^End Date:$/ })
    .getByRole("textbox")
    .fill(date);
  await page
    .locator("div", { hasText: /^End Time:$/ })
    .getByRole("textbox")
    .fill(endTime);

  await page.getByRole("textbox", { name: "Location" }).fill("test location");
  await page.getByRole("textbox", { name: "Details" }).fill("test details");

  await page.getByRole("button", { name: "Save Event" }).click();
  await waitForEventToBeVisible(page, eventName);
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByText(eventName)).toBeVisible();
}

async function waitForEventToBeVisible(
  page: Page,
  eventName: string
): Promise<void> {
  for (let i = 0; i < 3; i++) {
    await page.reload();
    await page.waitForURL(URL_ADMIN);

    await expect(page.locator("h1.admin-h1")).toHaveText("Admin Settings");

    await page
      .getByRole("heading", { name: "Website Settings ▼" })
      .locator("span")
      .click();
    await page
      .getByRole("heading", { name: "Admin Calendar ▼" })
      .locator("span")
      .click();
    await page.locator(".calendar-container-admin").click();

    await page.waitForTimeout(2000);

    const event = page.getByText(eventName);
    if (await event.isVisible()) {
      await event.click();
      return;
    }

    await page.waitForTimeout(2000);
  }

  throw new Error(`Event "${eventName}" was not visible after 5 retries.`);
}

async function createAttendee(
  page: Page,
  fName: string,
  lName: string,
  partySize: string,
  sponsor: Boolean,
  email: string = fName + lName + "@test.com",
  phone: string = "555-555-5555"
): Promise<void> {
  await page.getByRole("button", { name: "Add Attendee" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^First Name:$/ })
    .getByRole("textbox")
    .fill(fName);
  await page
    .locator("div")
    .filter({ hasText: /^Last Name:$/ })
    .getByRole("textbox")
    .fill(lName);
  await page
    .locator("div")
    .filter({ hasText: /^Email:$/ })
    .getByRole("textbox")
    .fill(email);
  await page.getByRole("textbox", { name: "555-555-5555" }).fill(phone);

  const size = parseInt(partySize, 10);
  if (size > 1 && size < 10) {
    await page.getByRole("combobox").selectOption(partySize);
  }

  if (sponsor === true) {
    for (let i = 0; i < 3; i++) {
      try {
        await page.getByLabel("", { exact: true }).check();
        await page
          .getByRole("textbox", { name: "Sponsorship & Support Inquiry:" })
          .fill("test sponsor message");
        break; // If successful, exit loop
      } catch (err) {
        if (i === 2) {
          throw new Error(
            "Failed to complete sponsor fields after 3 attempts."
          );
        }
        await page.waitForTimeout(1000); // Optional wait between retries
      }
    }
  }

  await page.getByRole("button", { name: "Submit" }).click();
}

async function deleteEvent(page:Page, eventName: string) {
  
  await waitForEventToBeVisible(page, eventName);

  page.once("dialog", async (dialog) => await dialog.accept());
  await page.getByRole("button", { name: "Delete" }).click();
  await page.waitForTimeout(500);
  await expect(page.getByText(eventName)).toHaveCount(0, { timeout: 5000 });

}

test.setTimeout(125_000); // 2.5 minutes Timeout for all test

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(3000);
});

test.describe("Admin Calendar Workflow Test", () => {
  test("Event CRUD & PDF Upload", async ({ page }) => {
    await loginAndNavigateToCalendar(page);

    const eventName = "test event 1";
    const editName = "edit test";
    const today = new Date();

    await test.step("Step 1: Create Event", async () => {
      await createSingleDayEvent(page, eventName);
      await waitForEventToBeVisible(page, eventName);
    });

    await test.step("Step 2: Read & Close Button", async () => {
      await expect(page.getByRole("img", { name: "Logo" })).toBeVisible();
      await page.getByRole("button", { name: "Close" }).click();
      await expect(page.getByText(eventName)).toBeVisible();
    });

    await test.step("Step 3: Edit Event", async () => {
      await waitForEventToBeVisible(page, eventName);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];

      await page.getByRole("button", { name: "Edit" }).click();
      await page.getByRole("textbox", { name: "Event Title" }).fill(editName);
      await page
        .locator("div", { hasText: /^Start Date:$/ })
        .getByRole("textbox")
        .fill(tomorrowStr);
      await page
        .locator("div", { hasText: /^End Date:$/ })
        .getByRole("textbox")
        .fill(tomorrowStr);
      await page
        .locator("div", { hasText: /^Start Time:$/ })
        .getByRole("textbox")
        .fill("13:00");
      await page
        .locator("div", { hasText: /^End Time:$/ })
        .getByRole("textbox")
        .fill("14:00");
      await page
        .getByRole("textbox", { name: "Location" })
        .fill("edit location");
      await page.getByRole("textbox", { name: "Details" }).fill("edit details");
      await page.getByRole("button", { name: "Save Event" }).click();
    });

    await test.step("Step 4: Delete Event", async () => {
      await page.getByText(editName).click();

      page.once("dialog", async (dialog) => await dialog.accept());
      await page.getByRole("button", { name: "Delete" }).click();
      await page.waitForTimeout(500);
      await expect(page.getByText(editName)).toHaveCount(0, { timeout: 5000 });
    });

    await test.step("Step 5: Upload PDF", async () => {
      await page.getByRole("button", { name: "Add Event" }).click();
      const pdfPath = path.resolve(
        __dirname,
        "THIS IS A TEST PDF DOCUMENT FOR SLTFF WEBSITE.pdf"
      );
      await page.locator('input[type="file"]').setInputFiles(pdfPath);
      await page.getByRole("button", { name: "Upload 1 file" }).click();
      await expect(page.getByText("Uploaded", { exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Cancel" }).click();
    });
  });
});

test.describe("Admin Attendee List test", () => {
  
  const eventName = "Attendee Testing";
  const fName = "Ben";
  const lName = "Johns";

  test("Attendee CRUD LONG TEST", async ({ page }) => {
    await loginAndNavigateToCalendar(page);

    await test.step("Step 1: Create single non Sponsor Attendee", async () => {
      const fName = "John";
      const lName = "Smith";
      const partySize = "1";
      const sponsor = false;

      await createSingleDayEvent(page, eventName);
      await waitForEventToBeVisible(page, eventName);
      await page.getByRole("button", { name: "List Attendees" }).click();
      await createAttendee(page, fName, lName, partySize, sponsor);
      await page.waitForTimeout(2000); // Allow backend to settle

      await waitForEventToBeVisible(page, eventName);
      await page.getByRole("button", { name: "List Attendees" }).click();
      await expect(
        page.getByRole("cell", { name: `${fName} ${lName}` })
      ).toBeVisible();

      await page.waitForTimeout(2000); // Pause before next step
    });

    await test.step("Step 2: Create multi non Sponsor Attendee", async () => {
      const fName = "Ben";
      const lName = "Johns";
      const partySize = "5";
      const sponsor = false;

      await createAttendee(page, fName, lName, partySize, sponsor);
      await page.waitForTimeout(2000);

      await waitForEventToBeVisible(page, eventName);
      await page.getByRole("button", { name: "List Attendees" }).click();
      await expect(
        page.getByRole("cell", { name: partySize, exact: true })
      ).toBeVisible();

      await page.waitForTimeout(2000);
    });

    await test.step("Step 3: Create single Sponsor Attendee", async () => {
      const fName = "James";
      const lName = "Elliot";
      const partySize = "1";
      const sponsor = true;

      await createAttendee(page, fName, lName, partySize, sponsor);
      await page.waitForTimeout(2000);

      await waitForEventToBeVisible(page, eventName);
      await page.getByRole("button", { name: "List Attendees" }).click();

      await expect(page.getByRole("cell", { name: "X" })).toBeVisible();
      await expect(
        page.getByRole("cell", { name: "test sponsor message" })
      ).toBeVisible();

      await page.waitForTimeout(2000);
    });

    await test.step("Step 4: Create multi Sponsor Attendee", async () => {
      const fName = "Luke";
      const lName = "Davis";
      const partySize = "8";
      const sponsor = true;

      await createAttendee(page, fName, lName, partySize, sponsor);
      await page.waitForTimeout(2000);

      await waitForEventToBeVisible(page, eventName);
      await page.getByRole("button", { name: "List Attendees" }).click();
      
      await expect(
        page.getByRole("cell", { name: partySize, exact: true })
      ).toBeVisible();
    });

    await test.step("Step 5: Delete Event", async () => {
      await deleteEvent(page, eventName)
    });
    
  });
  
  // The Above test needs to be completed successfully for this one to pass
  test("Attendee Search test", async ({ page }) => {
    await loginAndNavigateToCalendar(page);
    await createSingleDayEvent(page, eventName);
    await waitForEventToBeVisible(page, eventName);
    await page.getByRole("button", { name: "List Attendees" }).click();
    
    const fName1 = "Luke";
    const lName1 = "Davis";
    
    await test.step("Step 1: Create Attendees", async () => {
      const partySize = "1";
      const sponsor = false;
      
      await createAttendee(page, fName, lName, partySize, sponsor);
      await page.waitForTimeout(2000); // Allow backend to settle
      const partySize1 = "8";
      const sponsor1 = true;
      
      
      await page.getByRole("button", { name: "List Attendees" }).click();
      await createAttendee(page, fName1, lName1, partySize1, sponsor1);
      await page.waitForTimeout(2000); // Allow backend to settle
      
      await page.getByRole("button", { name: "List Attendees" }).click();
      await expect(page.getByRole("cell", { name: `${fName} ${lName}` })).toBeVisible();
      await expect(page.getByRole("cell", { name: "X" })).toBeVisible();
      await expect(page.getByRole("cell", { name: "test sponsor message" })).toBeVisible();
  
      await page.waitForTimeout(2000);
    });
    
    
    // Perform search
    await page.getByRole('textbox').fill(fName + lName + '@test.com');
    await page.getByRole('button', { name: 'Search' }).click();
    
    // Assert only the expected search result is visible
    const searchResult = page.getByRole('cell', { name: fName + lName + '@test.com' });
    await expect(searchResult).toBeVisible();
    
    await expect(page.getByRole('cell', { name: fName1 + lName1 + '@test.com' })).toHaveCount(0);
    await expect(page.getByText('test sponsor message')).toHaveCount(0);
    
    await page.getByRole('button', { name: 'Search' }).click();
    
    await expect(page.getByRole("cell", { name: `${fName} ${lName}` })).toBeVisible();
    await expect(page.getByRole("cell", { name: "X" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "test sponsor message" })).toBeVisible();

    await deleteEvent(page, eventName);
  });
  
  test("Attendee Close Button", async ({ page }) => {
    await loginAndNavigateToCalendar(page);
    await createSingleDayEvent(page, eventName);
    await waitForEventToBeVisible(page, eventName);
    await page.getByRole("button", { name: "List Attendees" }).click();
    
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByText(eventName)).toBeVisible();
    await page.getByText(eventName).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByText(eventName)).toBeVisible();
    await deleteEvent(page, eventName);
    
  });
});