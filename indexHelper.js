import fs from "fs";

// Scrape for every title and URL
async function scrapePage(location, page) {
  const articles = await page.$$eval(location, (titles) => {
    return titles.map((card) => {
      const [URL] = card.querySelectorAll("a");
      return {
        title: URL.innerText,
        URL: URL.href,
      };
    });
  });
  return articles;
}

function getTop10(articles) {
  return Array.from(articles).slice(0, 10);
}

// Get only the top 10 articles and write to CSV
function writeToCSV(articles, fileName) {
  const top10Articles = getTop10(articles);
  fs.writeFile(
    `./top10CSV/${fileName}.csv`,
    objectArrayToCSV(top10Articles),
    (err) => {
      if (err) {
        console.error("FAILED TO WRITE TO FILE:", err);
      } else {
        console.log("Created " + `"${fileName}.csv"`);
      }
    }
  );
}

// Function to change the array into CSV format
function objectArrayToCSV(arr) {
  const columnNames = Object.keys(arr[0]).join(",") + "\n";
  const data = arr.map((item) => Object.values(item).join(",")).join("\n");
  return columnNames + data;
}

export { scrapePage, writeToCSV };
