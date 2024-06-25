import { useState, useEffect } from "react";
import Results from "./Results";

// Sorting options to be used in the form.
const stories = [
  "topstories",
  "newstories",
  "beststories",
  "askstories",
  "showstories",
  "jobstories",
];

const Sort = () => {
  // The current sorting type.
  const [sortType, setSortType] = useState("topstories");

  // Information that will be passed down to "Results.jsx"
  const [articleInfo, setArticleInfo] = useState([]);

  useEffect(() => {
    requestArticleIds();
  }, []);

  // Fetched article ids based on the current sorting type.
  const requestArticleIds = async () => {
    setArticleInfo([]);
    console.log("sortType: ", sortType);
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/${sortType}.json?print=pretty`
    );
    const ids = Array.from(await res.json()).slice(0, 10);
    const articles = [];
    for (const id of ids) {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );
      articles.push(await res.json());
    }
    setArticleInfo(articles);
    await fetchArticleList(ids);
  };

  // Saves information about each article based on their id.
  const fetchArticleList = async (articleIds) => {
    const articles = [];
    for (const id of articleIds) {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );
      articles.push(await res.json());
    }
    setArticleInfo(articles);
  };

  return (
    <div className="sort-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestArticleIds();
          fetchArticleList();
        }}
      >
        <label htmlFor="sortType">
          Sort By:
          <select
            id="sortType"
            value={sortType}
            // Updates sortType each time a new option is picked.
            onChange={(e) => {
              setSortType(e.target.value);
            }}
          >
            <option />
            {stories.map((article) => (
              <option key={article}>{article}</option>
            ))}
          </select>
        </label>
        <button>Sort</button>
      </form>
      {/*Pass down articleInfo to "Results.jsx"*/}
      <Results articleInfo={articleInfo} />
    </div>
  );
};

export default Sort;
