import {Link} from "react-router-dom"

function LectureInfo({noticeInfo}) {
  return (
      <div className="lecture-info" >
          <ul>
              { (noticeInfo) ?
                  noticeInfo.map((elem, index)=>{
                      return (
                          <Link key={index} to={elem.link}> <h5 className="title">{elem.title}</h5> <span className="date">{elem.date}</span> </Link>
                      )
                  }) : <h5>Loading</h5>
              }
          </ul>
    </div>
  );
}

export default LectureInfo;



