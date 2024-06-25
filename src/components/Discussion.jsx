import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comment from "./Comment";

export default function Discussion() {
  // Comment ids fetched by the API.
  const [commentIds, setCommentIds] = useState([]);
  // Title of the article.
  const [title, setTitle] = useState("");
  // URL to the actual article.
  const [URL, setURL] = useState("");
  // Grab the ":id" parameter from the URL which we can find by looking at "App.jsx".
  const { id } = useParams();

  async function requestCommentIds() {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    const parent = await res.json();
    setTitle(parent.title);
    setCommentIds(parent.kids);
    setURL(parent.url);
  }

  useEffect(() => {
    requestCommentIds();
  }, []);

  return (
    <div className="discussion">
      <a href={URL}>
        <h2>{title}</h2>
      </a>
      {/* Pass down each commentId to "Comment.jsx" */}
      {!commentIds ? (
        <h1>No comments found</h1>
      ) : (
        commentIds.map((commentId) => <Comment id={commentId} />)
      )}
    </div>
  );
}
