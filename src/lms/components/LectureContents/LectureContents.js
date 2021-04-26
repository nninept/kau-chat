import "./LectureContents.css"
import WeekBlock from "../WeekBlock/WeekBlock"

function LectureContent({weekContents}) {

  return (
      <div className="lecture-contents" >
        <div className="this-week">
        {(weekContents) ? <WeekBlock blockContents={weekContents[0]}/>
            : "Loading"}
        </div>
        <div className="weeks">
            {(weekContents) ? Array.from(weekContents).slice(1).map((elem,index)=>{
              return <WeekBlock key={index} blockContents={elem}/>
            }): "Loading"}
        </div>
    </div>
  );
}

export default LectureContent;


