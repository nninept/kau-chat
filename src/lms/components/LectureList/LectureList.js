import LectureTitle from "../LectureTitle/LectureTitle";
import "./LectureList.scss";

function LectureList({ lectureTitle }) {
  return (
    <div className="lecture-titles">
      <ul>
        {lectureTitle ? (
          lectureTitle.map((item, index) => {
            return (
              <LectureTitle
                key={index}
                lecLink={item.link}
                title={item.title}
                prof={item.prof}
              />
            );
          })
        ) : (
          <h3>Loading</h3>
        )}
      </ul>
    </div>
  );
}

export default LectureList;
