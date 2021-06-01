import React, { useEffect, useState } from "react";
import axios from "axios"
import NoticeForm from "../NoticeForm/NoticForm"
import "./DepartmentNotice.scss";

function DepartmentNotice() {
  const DEPARTMENT_INFO = {
    postLink : "http://52.79.130.113:3000/kaunotices/",
    125 : {
      department : "soft",
      siteFlag : "sw_www",
      bbsId: "0032",
      gcId : "gc911b.do"
    },
    121 : {
      department : "mecha",
      siteFlag : "am_www",
      bbsId: "0024",
      gcId : "gc1986b.do"
    },
    124 : {
      department : "elec",
      siteFlag : "eie_www",
      bbsId: "0015",
      gcId : "gc23761b.do"
    },
    106 : {
      department : "material",
      siteFlag : "materials_www",
      bbsId: "0096",
      gcId : "gc46806b.do"
    },
    128 : {
      department : "engin",
      siteFlag : "eng_www",
      bbsId: "0112",
      gcId : "gc16458b.do"
    },
    129 : {
      department : "dron",
      siteFlag : "smartdrone_www",
      bbsId: "0101",
      gcId : "gc13106b.do"
    },
    123 : {
      department : "airlogistics",
      siteFlag : "attll_www",
      bbsId: "0048",
      gcId : "gc93464b.do"
    },
    126 : {
      department : "business",
      siteFlag : "biz_www",
      bbsId: "0056",
      gcId : "gc25685b.do"
    },
    101 : {
      department : "flight",
      siteFlag : "hw_www",
      bbsId: "0003",
      gcId : "gc61682b.do"
    },
    127 : {
      department : "free",
      siteFlag : "free_www",
      bbsId: "0072",
      gcId : "gc46051b.do"
    },
  }

  const [departmentNoticeList, setDepartmentNotice] = useState(null)
  useEffect(() => {
    const departmentNumber = JSON.parse(window.localStorage.getItem("loginInfo"))["id"].substr(4,3)

    axios.post(DEPARTMENT_INFO['postLink'], {"bbsAuth" : "30", "pageIndex" : 1, 
            "siteFlag":DEPARTMENT_INFO[departmentNumber]["siteFlag"], "bbsId" : DEPARTMENT_INFO[departmentNumber]["bbsId"]},{params : {category:"department"}})
            .then(response => {
              setDepartmentNotice({list : response.data.result, gcId :DEPARTMENT_INFO[departmentNumber]["gcId"]})})
  },[]);

  return (
    <div className="department-notice">
      <NoticeForm noticeInfo={{korean :"학과공지", english : "Department Notice"}} noticeList={departmentNoticeList} category={"academic"} />
    </div>
  );
}

export default DepartmentNotice;
