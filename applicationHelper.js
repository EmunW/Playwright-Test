import { writeToCSV, scrapePage } from "./indexHelper.js";

async function clickSort(page) {
  // The name of a button isn't the name, but the text inside the button for some reason?
  await page.getByRole("button", { name: "Sort" }).click();
  await page.locator(".flex-1 >> nth=1").click();
}

async function screenshotAndCSV(page, sortType, fileName) {
  await page.getByLabel("Sort By:").selectOption(sortType);
  await clickSort(page);
  await page.getByText("No articles found");
  await page.locator(".flex-1 >> nth=1").click();
  let articles = await scrapePage("div.box", page);
  await page.screenshot({
    path: `./screenshots/app/${fileName}.png`,
  });
  writeToCSV(articles, "/app/" + fileName);
}

export { clickSort, screenshotAndCSV };
