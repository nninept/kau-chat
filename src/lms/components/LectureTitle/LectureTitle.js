import {Link} from "react-router-dom"
import "./LectureTitle.css"

function LectureTitle({link, title}) {
  return (
    <div className="title" >
        <Link to={{
          pathname : "/home/lms/detail",
          state: {
            link
          }
        }}>{title}</Link>
    </div>
  );
}

export default LectureTitle;
