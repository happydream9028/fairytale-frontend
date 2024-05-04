import { test, expect } from "@playwright/test";

test.describe("Admin Apps management views", () => {
  test.beforeEach("Navigate to site and sign in", async ({ page }) => {
    await page.goto("http://localhost:3000/private/dashboard/home");
    await page.getByPlaceholder("Syötä sähköpostiosoitteesi").fill("admin@clubapp.fi");
    await page.getByPlaceholder("Syötä sähköpostiosoitteesi").press("Tab");
    await page.getByPlaceholder("Syötä salasanasi").fill("asdfasdf!23");
    await page.getByRole("button", { name: "Kirjaudu sisään" }).click();
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });
  test.afterEach("Signout", async ({ page }) => {
    await page.goto("http://localhost:3000/private/dashboard/home");
  });
  test("Create a new app", async ({ page }) => {
    await expect(page.locator("a").filter({ hasText: "Sovellukset" })).toBeVisible();
    await page.locator("a").filter({ hasText: "Sovellukset" }).click();
    await expect(page.getByRole("link", { name: "Luo sovellus" })).toBeVisible();
    await page.getByRole("link", { name: "Luo sovellus" }).click();
    await page.getByPlaceholder("esim fairytale").fill("testaa");
    await page.getByPlaceholder("esim fairytale").press("Tab");
    await page.getByPlaceholder("esim. fairytale.test.app").fill("testaa.test.app");
    await page.getByRole("button", { name: "Lähetä" }).click();
    await expect(
      page.getByRole("heading", { name: "Näyttää kaikki Fairytaleen rekisteröidyt sovellukset" })
    ).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Sovelluksen nimi" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "App Storen tunnus" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Tila" })).toBeVisible();
  });

  test("View apps list", async ({ page }) => {
    await expect(page.locator("a").filter({ hasText: "Sovellukset" })).toBeVisible();
    await page.locator("a").filter({ hasText: "Sovellukset" }).click();
    await expect(page.getByRole("link", { name: "Luo sovellus" })).toBeVisible();
    await page.getByRole("link", { name: "Sovellusluettelo" }).click();
    await expect(
      page.getByRole("heading", { name: "Näyttää kaikki Fairytaleen rekisteröidyt sovellukset" })
    ).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Sovelluksen nimi" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "App Storen tunnus" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Tila" })).toBeVisible();
  });

  test("View an existing app", async ({ page }) => {
    await expect(page.locator("a").filter({ hasText: "Sovellukset" })).toBeVisible();
    await page.locator("a").filter({ hasText: "Sovellukset" }).click();
    await expect(page.getByRole("link", { name: "Luo sovellus" })).toBeVisible();
    await page.getByRole("link", { name: "Sovellusluettelo" }).click();
    await expect(
      page.getByRole("heading", { name: "Näyttää kaikki Fairytaleen rekisteröidyt sovellukset" })
    ).toBeVisible();
    await page
      .getByRole("row", { name: "Centralizedv6 centralizedv6.drive.app Kyllä" })
      .getByRole("img")
      .first()
      .click();
    await expect(page.getByRole("heading", { name: "Olet muokkaamassa Centralizedv6 app" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Syötteet ja ilmoitukset" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Integraatiot" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Mainokset ja kampanjat" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Asetukset" })).toBeVisible();
  });

  test("Delete a test app", async ({ page }) => {
    await expect(page.locator("a").filter({ hasText: "Sovellukset" })).toBeVisible();
    await page.locator("a").filter({ hasText: "Sovellukset" }).click();
    await expect(page.getByRole("link", { name: "Luo sovellus" })).toBeVisible();
    await page.getByRole("link", { name: "Sovellusluettelo" }).click();
    await expect(
      page.getByRole("heading", { name: "Näyttää kaikki Fairytaleen rekisteröidyt sovellukset" })
    ).toBeVisible();
    await page.getByRole("row", { name: "testaa testaa.test.app Kyllä" }).getByRole("img").last().click();
    await page.getByRole("button", { name: "Kyllä" }).click();
    await page.getByRole("button", { name: "Kyllä" }).click();
    //await expect(page.getByRole('row', { name: 'testaa testaa.test.app Kyllä' })).toBeHidden(); TODO: find another way
  });

  test("Edit an existing app", async ({ page }) => {});

  test("view and Edit selected app feed properties", async ({ page }) => {});

  test("Delete a feed from a selected app", async ({ page }) => {});
  test("Create new feed for selected app", async ({ page }) => {});

  test("view and Edit selected app integration properties", async ({ page }) => {});

  test("Delete a integration from a selected app", async ({ page }) => {});
  test("Create new integration for selected app", async ({ page }) => {});

  test("view and Edit selected app campaign properties", async ({ page }) => {});

  test("Delete a campaign from a selected app", async ({ page }) => {});
  test("Create new campaign for selected app", async ({ page }) => {});

  test("view and Edit selected app settings properties", async ({ page }) => {});

  test("Delete a setting from a selected app", async ({ page }) => {});
  test("Create new settings for selected app", async ({ page }) => {});
});
