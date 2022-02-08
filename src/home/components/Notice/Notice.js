import React, { useEffect, useState } from "react";
import axios from "axios";
import NoticeForm from "../NoticeForm/NoticForm";
import "./Notice.scss";
import address from "../../../address-info"

const Notice = () => {
  const [generalNotiList, setGeneralNotiList] = useState(null);
  const [schoolNotiList, setSchoolNotiList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // 일반공지
    axios.post(address.url + "/api/kaunotices/",{bbsId : "0119", bbsAuth : "30", pageIndex:1, siteFlag:"www"}, {params : {category : "general"}})
      .then((res) => {
        setGeneralNotiList({ list: res.data.result, gcId: "gc32172b.do" });
      });
  }, []);
  useEffect(() => {
    // 학사공지
    axios.post(address.url + "/api/kaunotices/",{bbsId : "0120", bbsAuth : "30", pageIndex:1, siteFlag:"www"}, {params : {category : "general"}})
      .then((res) => {
        setSchoolNotiList({ list: res.data.result, gcId: "gc14561b.do" });
      });
  }, []);

  return (
    <div className="Notice">
      <NoticeForm
        noticeInfo={{ korean: "일반공지", english: "General Notice" }}
        noticeList={generalNotiList}
        category={"general"}
      />
      <NoticeForm
        noticeInfo={{ korean: "학사공지", english: "Academic Notice" }}
        noticeList={schoolNotiList}
        category={"general"}
      />
    </div>
  );
};

export default Notice;
