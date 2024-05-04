import { chromium, FullConfig } from "@playwright/test";

export default async function globalSetup(config: FullConfig) {
  // (1) read the config
  const { baseURL, storageState, headless } = config.projects[0].use;

  // (2) instantiate
  const browser = await chromium.launch({ headless });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(`\x1b[2m\tSign in started against '${baseURL}'\x1b[0m`);

  // (3) navigate to the login page
  await page.goto(baseURL);

  console.log(`\x1b[2m\tSign in as 'username'\x1b[0m`);

  // (4-5) fill in credentials and sign in
  await page.getByPlaceholder("Syötä sähköpostiosoitteesi").fill("admin@clubapp.fi");
  await page.getByPlaceholder("Syötä sähköpostiosoitteesi").press("Tab");
  await page.getByPlaceholder("Syötä salasanasi").fill("asdfasdf!23");
  await page.getByRole("button", { name: "Kirjaudu sisään" }).click();

  console.log(`\x1b[2m\tSign in processed\x1b[0m`);
  // (6) persist the authentication state (local storage and cookies)
  await page.context().storageState({ path: storageState as string });

  // (7) close the browser
  await browser.close();
}
