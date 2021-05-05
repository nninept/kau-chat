import React from "react";
import Slider from "react-slick"
import Notice from "../../components/Notice/Notice";
import Virus from "../../components/Virus/Virus";
import Weather from "../../components/Weather/Weather";
import Heroku from "../../components/Heroku/Heroku";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Main.scss";

function Main() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="Main">
      <div className="Main__container">
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

export default Main;
