import { Link } from "react-router-dom";

// "Article" is a child of "Results.jsx"
const Article = (props) => {
  return (
    <div>
      <div className="box">
        <h2 className="flex-1">{props.score} - </h2>
        {/*Click on the link to return to the home page*/}
        <div className="flex-6">
          <h2 id={props.id}>
            <Link to={props.url}>{props.title}</Link> -{" "}
            <Link to={`/discussion/${props.id}`} className="comment-link">
              Comments
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Article;
