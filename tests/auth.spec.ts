import { test, expect } from "@playwright/test";

test.describe("Admin authentication related tests", () => {
  test.beforeEach("Navigate to site", async ({ page }) => {
    await page.goto("http://localhost:3000/private/dashboard/home");
  });

  test("Signin works", async ({ page }) => {
    await page.getByPlaceholder("Syötä sähköpostiosoitteesi").fill("admin@clubapp.fi");
    await page.getByPlaceholder("Syötä sähköpostiosoitteesi").press("Tab");
    await page.getByPlaceholder("Syötä salasanasi").fill("asdfasdf!23");
    await page.getByRole("button", { name: "Kirjaudu sisään" }).click();
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });

  test("Resetting password works", async ({ page }) => {
    await expect(page.getByText("SKirjaudu tilillesi jatkaaksesi")).toBeVisible();
    await expect(page.getByRole("link", { name: "Unohtuiko salasana?" })).toBeVisible();
    await page.getByRole("link", { name: "Unohtuiko salasana?" }).click();
    await expect(page.getByRole("heading", { name: "Nollaa salasana" })).toBeVisible();
    await page.getByPlaceholder("Syötä sähköpostiosoitteesi").fill("admin@clubapp.fi");
    await page.getByRole("button", { name: "Nollaa salasana" }).click();
    await expect(page.getByText("Password reset email sent, please check you email for instructions.")).toBeVisible();
  });
});
