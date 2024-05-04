import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("http://localhost:3000/private/dashboard/home");
  await page.getByPlaceholder("Syötä sähköpostiosoitteesi").fill("admin@clubapp.fi");
  await page.getByPlaceholder("Syötä sähköpostiosoitteesi").press("Tab");
  await page.getByPlaceholder("Syötä salasanasi").fill("asdfasdf!23");
  await page.getByRole("button", { name: "Kirjaudu sisään" }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.goto("http://localhost:3000/private/dashboard/home");
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
