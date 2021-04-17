import {useEffect,useState} from 'react';
import {Link} from "react-router-dom"
import cheerio from 'cheerio'

import "./LectureContents.css"
const {ipcRenderer} = window.require('electron')

function LectureContent({weekContents}) {

  return (
      <div className="lecture-contents" >
        <div className="this-week">
            {(weekContents) ? weekContents: "Loading"}
        </div>
        <div className="weeks">
        </div>
    </div>
  );
}

export default LectureContent;



