
import "./LectureContents.scss";
import WeekBlock from "../WeekBlock/WeekBlock";

function LectureContent({ weekContents }) {
  return (
    <div className="lecture-contents">
      <div className="this-week">
        {weekContents ? (
          <WeekBlock blockContents={weekContents[0]} />
        ) : (
          <h3>Loading</h3>
        )}
      </div>
      <div className="weeks">
        {weekContents ? (
          Array.from(weekContents)
            .slice(1)
            .map((elem, index) => {
              return <WeekBlock key={index} blockContents={elem} />;
            })
        ) : (
          <h3>Loading</h3>
        )}
      </div>
    </div>
  );
};

export default LectureContent;
