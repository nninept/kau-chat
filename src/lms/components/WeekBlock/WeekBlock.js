import "./WeekBlock.css"

function WeekBlock({blockContents}) {
  return (
      <div className="week-block" >
          <h4>{blockContents.title}</h4>
          {
              blockContents.weekBlockContents.map((elem, index)=>{
                return (
                  <div key={index} className="content">
                <a href={elem.contentLink}>
                  <img src={elem.imgSrc}/>
                  <span>{elem.text}</span>
              </a>
              </div>
              )
              })
          }
    </div>
  );
}

export default WeekBlock;



