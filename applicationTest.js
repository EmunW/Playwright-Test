import { chromium } from "playwright";
import { screenshotAndCSV } from "./applicationHelper.js";

// Playwright testing for the React application.
async function applicationTest() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:5173/");
    await page.waitForTimeout(500);
    await page.screenshot({ path: "./screenshots/app/applicationLoaded.png" });
  } catch (e) {
    console.error("ERROR LOADING WEBPAGE: " + e);
  }
  try {
    // Screenshot and write a CSV file for every sort.
    await screenshotAndCSV(page, "topstories", "applicationTopStories");
    await screenshotAndCSV(page, "newstories", "applicationNewStories");
    await screenshotAndCSV(page, "beststories", "applicationBestStories");
    await screenshotAndCSV(page, "askstories", "applicationAskStories");
    await screenshotAndCSV(page, "showstories", "applicationShowStories");
    await screenshotAndCSV(page, "jobstories", "applicationJobStories");
  } catch (e) {
    console.error("ERROR WITH SUBMIT BUTTON: " + e);
  }
  try {
    // Go to the comment section of an article
    await page.getByLabel("Sort By:").selectOption("topstories");
    await page.getByRole("button", { name: "Sort" }).click();
    await page.getByText("No articles found").click();
    await page.locator(".flex-1 >> nth=1").click();
    await page.locator(".flex-6 >> .comment-link >> nth=0").click();
  } catch (e) {
    console.error("ERROR FAILED TO CLICK COMMENT SECTION: " + e);
  }
}

applicationTest();
