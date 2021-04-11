import LectureTitle from '../LectureTitle/LectureTitle';



function LectureList(props) {
  return (
    <div className="lms">
        <ul className="lecture-title">
            {props.lectureTitle.map((item,index)=>{
                return <LectureTitle key={index} src={item.link} title = {item.title} onClicked={props.onClickTitle}/>
            })}
        </ul>
  </div>
  );
}

export default LectureList;

