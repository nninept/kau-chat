import { useEffect, useState } from "react";
import "./Home.scss"

import React from "react";
import Notice from "../components/Notice/Notice";
import Virus from "../components/Virus/Virus";
import DepartmentNotice from "../components/DepartmentNotice/DepartmentNotice";
import CountDown from "../components/CountDown/CountDown";

import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
function Home() {

  const [backgroundIndex, setBackgroundIndex] = useState(0);
  useEffect(() => {
    setBackgroundIndex(Math.floor((Math.random() * 100) % 16) + 1);
  }, []);
  const styles = {
    background: {
      backgroundImage: `url(./background/background${backgroundIndex}.jpg)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  };
  return (
    <div className="home" style={styles.background}>

    <Carousel>
    {/* <Paper> */}
      <div className="main">
        <article className="Main__container__upper">
          <section className="Main__dday">
            <CountDown/>
          </section>
          <section className="main-virus">
            <Virus/>
          </section>
        </article>
        <article className="Main__container__lower">
          <section className="Main__schedule">
              <DepartmentNotice/>
          </section>
          <section className="Main__notice">
            <Notice></Notice>
          </section>
        </article>
    </div>
        {/* </Paper> */}
        <Paper className="second">
          <div>
            <h2>test2</h2>
            <p>test2
            </p>
            </div>
            {/* <Button className="CheckButton">
                Check it out!
            </Button> */}
        </Paper>
    </Carousel>
    </div>
  );
}

export default Home;
