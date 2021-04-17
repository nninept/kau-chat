import {Link} from "react-router-dom"
import "./UploadNoticeForm.css"

function NoticeForm({lecLink, imgSrc, lecTitle, timeago, info}) {
    let title = lecTitle.split("-")[0];
    let week = (lecTitle.split("-")[2]) ? lecTitle.split("-")[1] + "-" + lecTitle.split("-")[2] : lecTitle.split("-")[1]

    return (
        <div className="notice-form">
        <Link to={{
          pathname : "/home/lms/detail",
          state: {
            lecLink
          }
        }}>
            <div className="media-left">
                <img className="media-object" src={imgSrc} alt=""/>
            </div>
            <div className="media-body">
                <h4 className="title">{title}</h4>
                <h4 className="week">{week}</h4>
                <p className="timeago">{timeago}</p>
                <p className="info">{info}</p></div></Link>
    </div>
    );
}

export default NoticeForm;

