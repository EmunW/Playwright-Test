import { chromium } from "playwright";
import { scrapePage, writeToCSV } from "./indexHelper.js";

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // go to Hacker News
  try {
    await page.goto("https://news.ycombinator.com");
    await page.screenshot({ path: "./screenshots/top10Screenshot.png" });
  } catch (e) {
    console.error("ERROR LOADING WEBPAGE: " + e);
  }

  const articles = await scrapePage(
    "tr.athing > td.title > span.titleline",
    page
  );

  writeToCSV(articles, "top10Articles");

  try {
    // Search for python related articles
    await page.locator("input").fill("PYTHON");
    await page.keyboard.press("Enter");
  } catch (e) {
    console.error("ERROR FILLING SEARCH FIELD: " + e);
  }

  try {
    await page.getByRole("button", { name: "1" }).click();
    await page.screenshot({ path: "./screenshots/top10SearchScreenshot.png" });
    const searchArticles = await scrapePage(
      "section.SearchResults > div.SearchResults_container > article.Story > div.Story_container > div.Story_data > div.Story_title",
      page
    );
    writeToCSV(searchArticles, "top10SearchArticles");
  } catch (e) {
    console.error("ERROR FETCHING TOP 10 SEARCH ARTICLES: " + e);
  }
}

(async () => {
  await saveHackerNewsArticles();
})();
