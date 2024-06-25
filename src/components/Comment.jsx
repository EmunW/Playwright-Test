import { useState, useEffect } from "react";

// The tags from the comments are returned with the API call so we must remove them.
function removeTags(str) {
  if (!str) return;
  else str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, "");
}

// "Comment" is a child of "Discussion.jsx".
export default function Comment(props) {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  async function requestComment() {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`
    );
    const commentInfo = await res.json();

    // The special characters in the comments do not show up properly using the API so we must decode them.
    // This is a very inefficent way to decode the text but I couldn't figure out another way to do it.
    function decode(str) {
      const s = "<b>" + str + "</b>";
      let e = document.createElement("decodeIt");
      e.innerHTML = s;
      return e.innerText;
    }

    setComment(decode(removeTags(commentInfo.text)));
    setAuthor(commentInfo.by);
  }
  useEffect(() => {
    requestComment();
  }, []);
  console.log(comment);
  return (
    <div className="box">
      <p className="author flex-1">{author}</p>
      <p className="comment flex-6">{comment}</p>
    </div>
  );
}
