import { chromium } from "playwright";

async function sendEmail() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("https://www.emuwo.net/");
    await page.screenshot({ path: "./screenshots/emuwoPortfolio.png" });
  } catch (e) {
    console.error("ERROR LOADING WEBPAGE: " + e);
  }

  try {
    await page.getByLabel("First name").fill("Edmund");
    await page.getByLabel("Last name").fill("Wong");
    await page.getByLabel("Email").fill("sendEmailTest@sendEmail.com");
    await page.getByLabel("Message").fill("sendEmail works!");
    // The name of a button isn't the name, but the text inside the button for some reason?
    // await page.getByRole("button", { name: "Send message" }).click();
  } catch (e) {
    console.error("ERROR FILLING SEARCH FIELD: " + e);
  }
}

sendEmail();
