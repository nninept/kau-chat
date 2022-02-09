import NoticeForm from "../UploadNoticeForm/UploadNoticeForm";
import "./CurrentUpload.scss";

function CurrentUpload({ uploadList }) {
  return (
    <div className="current-upload">
      {uploadList ? (
        uploadList.map((elem, index) => (
          <NoticeForm
            key={index}
            lecLink={elem.lecLink}
            imgSrc={elem.imgSrc}
            lecTitle={elem.lecTitle}
            timeago={elem.timeago}
            info={elem.info}
          />
        ))
      ) : (
        <h3>Loading</h3>
      )}
    </div>
  );
}

export default CurrentUpload;
