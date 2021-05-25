import React, { useEffect, useState } from "react";
import axios from "axios"
import "./DepartmentNotice.scss";

function DepartmentNotice() {
  const DEPARTMENT_INFO = {
    postLink : "/notice/web/bbs/bbsListApi.gen",
    125 : {
      department : "soft",
      siteFlag : "sw_www",
      bbsId: "0032"
    },
    121 : {
      department : "mecha",
      siteFlag : "am_www",
      bbsId: "0024"
    },
    124 : {
      department : "elec",
      siteFlag : "eie_www",
      bbsId: "0015"
    },
    106 : {
      department : "material",
      siteFlag : "materials_www",
      bbsId: "0096"
    },
    128 : {
      department : "engin",
      siteFlag : "eng_www",
      bbsId: "0112"
    },
    129 : {
      department : "dron",
      siteFlag : "smartdrone_www",
      bbsId: "0101"
    },
    123 : {
      department : "airlogistics",
      siteFlag : "attll_www",
      bbsId: "0048"
    },
    126 : {
      department : "business",
      siteFlag : "biz_www",
      bbsId: "0056"
    },
    101 : {
      department : "flight",
      siteFlag : "hw_www",
      bbsId: "0003"
    },
    127 : {
      department : "free",
      siteFlag : "free_www",
      bbsId: "0072"
    },
  }

  const [titles, setTitles] = useState(null)
  useEffect(() => {
    const departmentNumber = JSON.parse(window.localStorage.getItem("loginInfo"))["id"].substr(4,3)

    axios.post(DEPARTMENT_INFO['postLink'], {"bbsAuth" : "30", "pageIndex" : 1, 
            "siteFlag":DEPARTMENT_INFO[departmentNumber]["siteFlag"], "bbsId" : DEPARTMENT_INFO[departmentNumber]["bbsId"]})
    .then(response => console.log(response))
  },[]);

  return (
    <div className="department-notice">
      <h3>학과 공지</h3>
      <div className="title">
        <ul>
          {}
        </ul>
      </div>
    </div>
  );
}

export default DepartmentNotice;
