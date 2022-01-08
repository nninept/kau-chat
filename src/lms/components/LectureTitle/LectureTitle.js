import { Link } from "react-router-dom";
import "./LectureTitle.css";

const LectureTitle = ({ lecLink, title, prof }) => {
  let newSpan = "";
  if (title.endsWith("NEW")) {
    newSpan = "NEW";
    title = title.slice(0, title.length - 3);
  }

  return (
    <div className="lecture-title">
      <Link
        to={{
          pathname: "/home/lms/detail",
          state: {
            lecLink,
          },
        }}
      >
        <div className="course">
          <h3 className="title">
            {title}
            <span className="new">{newSpan}</span>
          </h3>
          <p className="prof">{prof}</p>
        </div>
      </Link>
    </div>
  );
};

export default LectureTitle;
