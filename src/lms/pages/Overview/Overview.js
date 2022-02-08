import LectureList from '../../components/LectureList/LectureList';
import CurrentUpload from '../../components/CurrentUpload/CurrentUpload'
import "./Overview.css"
const electron = window.require('electron')

function Overview({lecList, uploadList}) {

    const onClick = ()=>{
        electron.ipcRenderer.invoke('open-lms')
    }
    return (
        <div className="overview">
            <div><button onClick={onClick}>go to lms</button></div>
        <div> <LectureList lectureTitle={lecList} /> </div> 
        <CurrentUpload uploadList={uploadList}/>
    </div>
  );
};

export default Overview;
