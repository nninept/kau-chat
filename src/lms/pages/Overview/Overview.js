import LectureList from '../../components/LectureList/LectureList';
import CurrentUpload from '../../components/CurrentUpload/CurrentUpload'
import "./Overview.css"

function Overview({lecList, uploadList}) {
    return (
        <div className="overview">
        <div> <LectureList lectureTitle={lecList} /> </div> 
        <CurrentUpload uploadList={uploadList}/>
    </div>
    );
}

export default Overview