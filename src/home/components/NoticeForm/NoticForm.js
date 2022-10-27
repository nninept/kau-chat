import React, { useEffect, useState } from "react";
import "./NoticeForm.scss";

// const { shell } = window.require("electron");
function NoticeForm({ noticeInfo, noticeList, category }) {
  const onClick = (e) => {
    const domain =
      category == "general"
        ? "http://www.hangkong.ac.kr/web/pages/"
        : "http://college.kau.ac.kr/web/pages/";
    // shell.openExternal(domain + e.target.dataset.gcid);
  };
  return (
    <div className="school-notice-form">
      <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>
        {noticeInfo.korean + "  "}
        <span style={{ fontSize: "0.8rem", fontWeight: 400 }}>
          {noticeInfo.english}
        </span>
      </div>
      <div className="Notice__border"></div>
      <div className="Notice__container">
        {noticeList
          ? noticeList.list.map((item, idx) => (
              <article key={idx} className="article-title">
                <a onClick={onClick} data-gcid={noticeList.gcId}>
                  {item.title}
                </a>
              </article>
            ))
          : "Loading..."}
      </div>
    </div>
  );
}

export default NoticeForm;
