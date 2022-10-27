import { useEffect, useState } from "react";
import "./Virus.scss";
import CountUp from "react-countup";
import Arrow from "../Arrow/Arrow";
import axios from 'axios'
import address from "../../../address-info"

// const {shell} = window.require('electron')
const Virus = () => {
  const [seoul, setSeoul] = useState({});
  const [gyeonggi, setGyeonggi] = useState({});
  const [yesterday, setYesterday] = useState(
    new Date(new Date().valueOf() - 1000 * 60 * 60 * 24).toLocaleDateString()
  );
  const [today, setToday] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    axios.get(address.url + '/api/external/virus')
    .then(res =>
      {
        let data = res.data.result
        setSeoul(data.seoul);
        setGyeonggi(data.gyeonggi);
      })
  }, []);

  const openVirusInfo = ()=>{
    // shell.openExternal('http://ncov.mohw.go.kr/')
  }
  return (
    <div className="virus-background" >
    <div className="virus" onClick={openVirusInfo}>
      <h3>{today} 신규 확진자</h3>
      <div className="Virus__borderLine"></div>
      <div className="Virus__victims">
        <div>
          <span>서울 : </span>
          <CountUp
            start={0}
            end={seoul?.newCase ? Number(seoul?.newCase.replace(/,/g,"")) : 0}
            suffix="명"
            duration={2.75}
          />
          <span className="Virus__diff">
            (
            <Arrow state="down" />
            44명)
          </span>
        </div>
        <div>
          <span>경기 : </span>
          <CountUp
            start={0}
            end={gyeonggi?.newCase ? Number(gyeonggi?.newCase.replace(/,/g,"")) : 0
            }
            suffix="명"
            duration={2.75}
          />
          <span className="Virus__diff">
            (<Arrow state="up" />
            12명)
          </span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Virus;
