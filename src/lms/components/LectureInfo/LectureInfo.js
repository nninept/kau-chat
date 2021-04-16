import {useEffect,useState} from 'react';
import {Link} from "react-router-dom"
import cheerio from 'cheerio'

import "./LectureInfo.css"
const {ipcRenderer} = window.require('electron')

function LectureInfo({location}) {
    const [pageInfo, setPageInfo] = useState('')
    useEffect(()=>{
        ipcRenderer.invoke('get-lms', location.state.link)
        .then(pageData=>{
            let $ = cheerio.load(pageData)
            console.log(pageData)
            let thisWeek = $('#region-main > div > div > div.course_box.course_box_current')
            let lec = $('#region-main > div > div > div.total_sections')
            setPageInfo($.html(lec))
        })
    })
  return (
      <div className="LectureInfo" >
        <Link to={"/home/lms"}>back</Link>
        <div>
        {pageInfo}
        </div>
    </div>
  );
}

export default LectureInfo;



