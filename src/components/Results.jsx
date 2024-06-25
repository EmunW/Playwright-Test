import Article from "./Article";

// "Results.jsx" is a child of "Sort.jsx"
// Displays top 10 articles in a row by passing down props the "Article.jsx" component
export default function Results({ articleInfo }) {
  return (
    <div className="results">
      <div className="box-no-border">
        <h2 className="flex-1">Score</h2>
        <h2 className="flex-6">Title</h2>
      </div>
      {!articleInfo.length ? (
        <h1>No articles Found</h1>
      ) : (
        // Go through the articleInfo array and pass down the properties to "Article.jsx"
        articleInfo.map((article) => (
          <Article
            title={article.title}
            id={article.id}
            commentIds={article.kids}
            score={article.score}
            url={article.url}
            time={article.time}
            key={article.id}
          />
        ))
      )}
    </div>
  );
}
