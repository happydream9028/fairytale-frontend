import { test, expect } from "@playwright/test";

test.describe("Admin Users management views", () => {
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

  test("Create a new test user", async ({ page }) => {
    await page.locator("a").filter({ hasText: "Käyttäjät" }).click();
    await page.getByRole("link", { name: "Uusi käyttäjä" }).click();
    await expect(page.getByPlaceholder("Etunimi")).toBeVisible();
    await page.getByPlaceholder("Etunimi").fill("Testajaa");
    await page.getByPlaceholder("Sukunimi").fill("Testamo");
    await page.getByPlaceholder("Sähköpostiosoite").fill("testtajo@testi.fi");
    await page.getByPlaceholder("Salasana").fill("0123456789");
    await page.getByPlaceholder("Puhelinnumero").fill("358400758963");
    await page.getByLabel("role").selectOption("1");
    await page.getByRole("button", { name: "Lähetä" }).click();
    await expect(page.getByRole("heading", { name: "Näytetään kaikki käyttäjät" })).toBeVisible();
    await expect(page.getByRole("row", { name: "Testajaa Testamo" }).first()).toBeVisible();
  });
  test("View users list", async ({ page }) => {
    await page.locator("a").filter({ hasText: "Käyttäjät" }).click();
    await page.getByRole("link", { name: "Käyttäjäluettelo" }).click();
    await expect(page.getByRole("heading", { name: "Näytetään kaikki käyttäjät" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Etunimi" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Sukunimi" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Toiminnot" })).toBeVisible();
  });
  test("View a user profile", async ({ page }) => {
    await page.locator("a").filter({ hasText: "Käyttäjät" }).click();
    await page.getByRole("link", { name: "Käyttäjäluettelo" }).click();
    await page.getByRole("row", { name: "super star" }).getByRole("img").first().click();
    await expect(page.getByText("Käyttäjätiedot")).toBeVisible();
    await expect(page.getByText("Noin")).toBeVisible();
    await expect(page.getByText("Taidot")).toBeVisible();
  });
  test("Delete a test user", async ({ page }) => {
    await page.locator("a").filter({ hasText: "Käyttäjät" }).click();
    await page.getByRole("link", { name: "Käyttäjäluettelo" }).click();
    await page.getByRole("row", { name: "Testajaa Testamo" }).getByRole("img").last().click();
    await expect(page.getByText("Haluatko varmasti poistaa käyttäjän? Testajaa")).toBeVisible();
    await page.getByRole("button", { name: "Kyllä" }).click();
    await page.getByRole("button", { name: "Jatkaa" }).click();
  });
});
