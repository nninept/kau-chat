import {useEffect,useState} from 'react';
import {Link} from "react-router-dom"
import cheerio from 'cheerio'
import { LeakRemove } from '@material-ui/icons';
const {ipcRenderer} = window.require('electron')

function LectureInfo({noticeInfo}) {
  return (
      <div className="lecture-info" >
          <ul>
              { (noticeInfo) ?
                  noticeInfo.map((elem, index)=>{
                      return (
                          <Link to={elem.link}> <h5 className="title">{elem.title}</h5> <span className="date">{elem.date}</span> </Link>
                      )
                  }) : <h5>Loading</h5>
              }
          </ul>
    </div>
  );
}

export default LectureInfo;



