import cheerio from "cheerio";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import LectureInfo from "../LectureInfo/LectureInfo";
import Overview from "../Overview/Overview";
import "./Lms.scss";
const { ipcRenderer } = window.require("electron");

function Lms({ match }) {
  const [lecList, setLecList] = useState([]);
  const [uploadList, setUploadList] = useState([]);

  useEffect(() => {
    ipcRenderer.invoke("get-lms", "http://lms.kau.ac.kr/").then((res) => {
      let lecTemp = [];
      let $ = cheerio.load(res);
      let lec = $(
        "#region-main > div > div.progress_courses > div.course_lists > ul "
      );
      lec.find("a").each((index, elem) => {
        let jElem = $(elem);
        let link = jElem.attr("href");
        let title = jElem.find("h3").text();
        let prof = jElem.find(".prof").text();
        lecTemp.push({ title, link, prof });
      });
      setLecList(lecTemp);
    });
  }, []);

  useEffect(() => {
    ipcRenderer
      .invoke("get-lms", "http://lms.kau.ac.kr/local/ubnotification/index.php")
      .then((res) => {
        let noticeTemp = [];
        let $ = cheerio.load(res);
        let lec = $("#region-main > div > div > div.well.wellnopadding");
        lec.find("a").each((index, elem) => {
          let jElem = $(elem);
          let lecLink = jElem.attr("href");
          let imgSrc = jElem.find("img").attr("src");
          let lecTitle = jElem.find("h4").text();
          let pTag = jElem.find("p");
          let timeago = $(pTag[0]).text();
          let info = $(pTag[1]).text();
          noticeTemp.push({ lecLink, imgSrc, lecTitle, timeago, info });
        });
        setUploadList(noticeTemp);
      });
  }, []);

  return (
    <div className="lms">
      <Route
        exact
        path={match.path}
        render={() => <Overview lecList={lecList} uploadList={uploadList} />}
      />
      <Route path={match.path + "/detail"} component={LectureInfo} />
    </div>
  );
}

export default Lms;
