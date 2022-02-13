import { useState, useEffect } from "react";
import "./PopUp.scss";

function PopUp({ content, idx }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [idCheck, setIdCheck] = useState("");

  const onClick = (e) => {
    setIsModalOpen(false);
  };

  //24시간 동안 안보기를 클릭했을 때
  const onClick24 = (e) => {
    setIsModalOpen(false);
    var object = { contentID: content.id, timestamp: new Date().getTime() };
    const clicked24 = JSON.parse(localStorage.getItem("notShow24h"));
    if (clicked24 == null) {
      localStorage.setItem("notShow24h", JSON.stringify([object]));
    }
    if (clicked24 != null) {
      localStorage.setItem(
        "notShow24h",
        JSON.stringify([...clicked24, object])
      );
    }
  };

  //렌더링할 때 마다 각 요소의 시간이 지났는지 확인
  useEffect(() => {
    var valid = JSON.parse(localStorage.getItem("notShow24h"));
    if (valid != null) {
      valid = valid.filter((item) => {
        return item.timestamp > new Date().getTime() - 86400000;
      });
    } else {
      return;
    }
    localStorage.setItem("notShow24h", JSON.stringify(valid));
    setIdCheck(valid.map((item) => item.contentID));
  }, []);

  return (
    <>
      {isModalOpen && !idCheck.includes(content.id) ? (
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
            <input
              type="button"
              value="오늘 하루동안 열지 않기"
              onClick={onClick24}
              style={{ fontSize: "12px" }}
            />
            <input type="button" value="Close" onClick={onClick} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default PopUp;
