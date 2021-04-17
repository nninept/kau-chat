import {Link} from "react-router-dom"
import "./LectureTitle.css"

function LectureTitle({link, title, prof}) {
  let newSpan = ""
  if (title.endsWith("NEW")){
    newSpan = "NEW"
    title = title.slice(0, title.length-3)
  } 
  
  return (
    <div className="lecture-title" >
        <Link to={{
          pathname : "/home/lms/detail",
          state: {
            link
          }
        }}>
          <div className="course">
            <h3 className="title">{title}<span clssName="new">{newSpan}</span></h3>
            <p className="prof">{prof}</p></div>
        </Link>
    </div>
  );
}

export default LectureTitle;
