import cheerio from 'cheerio'
import {useState, useEffect} from 'react'
import {Route} from "react-router-dom";
import LectureInfo from '../LectureInfo/LectureInfo'
import Overview from "../Overview/Overview"
import "./Lms.css"
const {ipcRenderer} = window.require('electron')



function Lms({match}) {
    const [lecList, setLecList] = useState([])
    const [uploadList, setUploadList] = useState([])

    useEffect(async ()=>{
        let pageData = await ipcRenderer.invoke('get-lms', 'http://lms.kau.ac.kr/')
        console.log("title promise")
        let lecTemp = []
        let $ = cheerio.load(pageData)
        let lec = $('#region-main > div > div.progress_courses > div.course_lists > ul ')
        lec.find('a').each((index, elem)=>{
            let jElem = $(elem)
            let link = jElem.attr('href')
            let title = jElem.find('h3').text()
            let prof = jElem.find('.prof').text()
            lecTemp.push({title, link, prof})
        })
        setLecList(lecTemp)
    },[])

    useEffect(async ()=>{
        let pageData = await ipcRenderer.invoke('get-lms', 'http://lms.kau.ac.kr/local/ubnotification/index.php')
        console.log("upload Props")
        let noticeTemp = []
        let $ = cheerio.load(pageData)
        let lec = $('#region-main > div > div > div.well.wellnopadding')
        lec.find('a').each((index, elem)=>{
            let jElem = $(elem)
            let lecLink = jElem.attr('href')
            let imgSrc = jElem.find('img').attr('src')
            let lecTitle = jElem.find('h4').text()
            let pTag = jElem.find('p')
            let timeago = $(pTag[0]).text()
            let info = $(pTag[1]).text()
            noticeTemp.push({lecLink, imgSrc, lecTitle,timeago, info})
        })
        setUploadList(noticeTemp)

        // new Promise( async(res, rej)=> {
        //     let pageData = await ipcRenderer.invoke('get-lms', 'http://lms.kau.ac.kr/')
        //     let noticeTemp = []
        //     let $ = cheerio.load(pageData)
        //     let lec = $('#region-main > div > div.progress_courses > div.course_lists > ul')
        //     lec.find('a').each(async (index, elem)=>{
        //         let jElem = $(elem)
        //         let lecLink = jElem.attr('href')
        //         new Promise(async (res, rej)=> {
        //             let lecInfo = await ipcRenderer.invoke('get-lms', lecLink)
        //             let $ = cheerio.load(lecInfo)
        //             let lists = $('#coursemos-course-menu > ul > li:nth-child(2) > div > div.content')
        //             let aList = lists.find("a")
        //             let quiz;
        //             aList.each((index, elem)=>{
        //                 let text = $(elem).text()
        //                 if(text == "퀴즈")
        //                     console.log("there is!")
        //             })
        //         })
        //     })
        //     })

    },[])

    return (
        <div className="lms">
        <Route exact path={match.path} render={()=><Overview lecList={lecList} uploadList={uploadList}/>}/>
        <Route path={match.path + "/detail"} component={LectureInfo}/>
    </div>
    );
}

export default Lms;

