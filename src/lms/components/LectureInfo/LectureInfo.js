import {useEffect,useState} from 'react';
import cheerio from 'cheerio'

import "./LectureInfo.css"
const {ipcRenderer} = window.require('electron')

function LectureInfo(props) {
    const [pageInfo, setPageInfo] = useState('')
    useEffect(()=>{
        ipcRenderer.invoke('get-lec-page', props.link)
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
        <a onClick={props.onClickButton}>back</a>
        <div>
        {pageInfo}
        </div>
    </div>
  );
}

export default LectureInfo;



