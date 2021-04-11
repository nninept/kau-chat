import Home from '../../../home/pages/Home'
import Lms from '../../../lms/pages/Lms'
import Links from '../../components/Links/Links'
import NPotal from '../../../npotal/NPotal'
import "./Skeleton.css"
import {useState} from "react"

function Skeleton() {
  const pages = {"home":0,"lms" : 1, "total" : 2}
  const [pageNum, setPageNum] = useState(pages["home"])
  return (
    <div className="Skeleton" >
    <Links className="Links" onChangePage={setPageNum}/>
    {pageNum === 0 && <Home />}
    {pageNum === 1 &&  <Lms />}
    </div>
  );
}

export default Skeleton;
