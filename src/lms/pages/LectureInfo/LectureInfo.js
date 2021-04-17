import {useEffect,useState} from 'react';
import {Link} from "react-router-dom"
import cheerio from 'cheerio'

import "./LectureInfo.css"
import LectureNotice from "../../components/LectureNotice/LectureNotice"
import LectureContents from "../../components/LectureContents/LectureContents"
const {ipcRenderer} = window.require('electron')

function LectureInfo({location}) {
    const [weekContents, setWeekContents] = useState([])
    const [lecNotice, setLecNotice] = useState([])
    useEffect(()=>{
        ipcRenderer.invoke('get-lms', location.state.link)
        .then(pageData=>{
            let $ = cheerio.load(pageData)
            new Promise((res, rej)=>{
              let notice = $('#page-container > div.course-header > div > div > div > div.col-sm-4.upcommings.hidden-xs a')
              let noticeList = []
              notice.each((indx, elem)=>{
                elem = $(elem)
                let link = elem.attr('href')
                let date = elem.find(".date").text()
                let title = elem.find("h5").text()
                noticeList.push({link, date, title})
              })
              setLecNotice(noticeList)
            })
            // new Promise((res, rej)=>{
            //   let section = $(".section.main.clearfix")
            //   let current = section[1]
            //   let weeks = Array.from(section).slice(2)
            //   setWeekContents([current, weeks])
            // })
        })
    },[])
  return (
      <div className="lecture-info" >
        <div className="top">
        <Link className="button" to={"/home/lms"}>back</Link>
        <LectureNotice noticeInfo={lecNotice}/>
        </div>
        <div className="contents">
        <LectureContents weekContents={weekContents}/>
        </div>
    </div>
  );
}

export default LectureInfo;



