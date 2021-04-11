import "./LectureTitle.css"

function LectureTitle(props) {
  const addOnClicked = ()=>{
    props.onClicked(props.src)
    console.log(props.src)
  }
  return (
    <div className="title" >
        <a onClick={addOnClicked}>{props.title}</a>
    </div>
  );
}

export default LectureTitle;
