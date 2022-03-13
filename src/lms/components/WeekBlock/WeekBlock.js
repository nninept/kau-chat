import "./WeekBlock.scss";
const { ipcRenderer} = window.require("electron");

function WeekBlock({ blockContents }) {
  const onClick = async (e)=>{
    console.log(e.currentTarget.href)
    e.preventDefault()
    if(e.currentTarget.type=="동영상"){
      ipcRenderer.invoke("open-vod", e.currentTarget.href.replace('view','viewer'))}
    else {
      ipcRenderer.invoke("download", e.currentTarget.href)
    }
  }
  return (
    <div className="week-block">
      <h4>{blockContents.title}</h4>
      {blockContents.weekBlockContents.map((elem, index) => {
        return (
          <div key={index} className="content" >
            <a href={elem.contentLink} onClick={onClick} type={elem.type}>
            
              <img src={elem.imgSrc} />
              <span>{elem.text}</span>
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default WeekBlock;
