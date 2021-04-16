import cheerio from 'cheerio'
import {useState, useEffect} from 'react'
import {Route} from "react-router-dom";
import LectureList from '../components/LectureList/LectureList';
import LectureInfo from '../components/LectureInfo/LectureInfo'
const {ipcRenderer} = window.require('electron')




function Lms({match}) {
    const [lecList, setLecList] = useState([])

    useEffect(()=>{
    ipcRenderer.invoke('get-lms', 'http://lms.kau.ac.kr/')
    .then((pageData) => {
        let lecTemp = []
        let $ = cheerio.load(pageData)
        let lec = $('#region-main > div > div.progress_courses > div.course_lists > ul ')
        lec.find('a').each((index, elem)=>{
            let jElem = $(elem)
            let link = jElem.attr('href')
            let title = jElem.find('h3').text()
            lecTemp.push({title, link})
        })
        setLecList(lecTemp)
    })
    },[])

    return (
        <div className="lms">
        <Route exact path={match.path}> <LectureList lectureTitle={lecList} /> </Route>
        <Route path={match.path + "/detail"} component={LectureInfo}/>
    </div>
    );
}

export default Lms;

