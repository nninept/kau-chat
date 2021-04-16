import LectureTitle from '../LectureTitle/LectureTitle';



function LectureList({lectureTitle}) {
  return (
    <div className="lms">
        <ul className="lecture-title">
            { (lectureTitle) ? lectureTitle.map((item,index)=>{
                return <LectureTitle key={index} link={item.link} title = {item.title} />
            }) : <h3>Loading</h3>
          }
        </ul>
  </div>
  );
}

export default LectureList;

