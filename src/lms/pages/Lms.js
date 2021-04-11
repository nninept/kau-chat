import cheerio from 'cheerio'
import {useState, useEffect} from 'react'
import LectureList from '../components/LectureList/LectureList';
import LectureInfo from '../components/LectureInfo/LectureInfo'
const {ipcRenderer} = window.require('electron')




function Lms() {
    const renderPageNum = {"titleList":0, "lecInfo":1}
    const [lecUrl, setLecUrl]= useState("None") 
    const [renderPage, setRenderPage] = useState(renderPageNum["titleList"])
    const addTitleClickHandler = (pageUrl) => {
        setLecUrl(pageUrl)
        setRenderPage(renderPageNum["lecInfo"])
        console.log("good")
    }

    const addButtonClickHandler = () => {
        setRenderPage(renderPageNum["titleList"])
    }

    const [lecList, setLecList] = useState([])
    useEffect(()=>{
    ipcRenderer.invoke('get-lec-lists')
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
    },[renderPage])

    return (
        <div className="lms">
        {renderPage===0 && <LectureList lectureTitle={lecList} onClickTitle={addTitleClickHandler}/>}
        {renderPage===1 && <LectureInfo link={lecUrl} onClickButton={addButtonClickHandler} />}
    </div>
    );
}

export default Lms;

