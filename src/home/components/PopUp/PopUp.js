import { useState, useEffect } from "react";
import "./PopUp.css";
const PopUp = ({ content, idx }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const onClick = (e) => {
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen ? (
        <div
          className="popup"
          style={{ left: `${100 + idx * 40}px`, top: `${70 + idx * 20}px` }}
        >
          <div className="header">
            <h3>
              {content.title}{" "}
              <span className="created-date">{content.createdAt}</span>
            </h3>
          </div>
          <div className="content">{content.contents}</div>
          <div className="button">
            <input type="button" value="Close" onClick={onClick} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PopUp;
