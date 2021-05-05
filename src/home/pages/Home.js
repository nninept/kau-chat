import { useEffect, useState } from "react";
import "./Home.scss"

import React from "react";
import Slider from "react-slick"
import Notice from "../components/Notice/Notice";
import Virus from "../components/Virus/Virus";
import Weather from "../components/Weather/Weather";
import Heroku from "../components/Heroku/Heroku";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

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
      <div className="main">
        <article className="Main__container__upper">
          <section className="Main__dday">
            <Heroku/>
          </section>
          <section className="home-slider">
            <div className="weather" >
              <Weather />
            </div>
          </section>
        </article>
        <article className="Main__container__lower">
          <section className="Main__schedule">
            <Virus></Virus>
          </section>
          <section className="Main__notice">
            <Notice></Notice>
          </section>
        </article>
    </div>
    </div>
  );
}

export default Home;
