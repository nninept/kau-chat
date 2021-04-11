import React from "react";
import CheckUpdate from "../../components/CheckUpdate/CheckUpdate";
import Clock from "../../components/Clock/Clock";
import Quotes from "../../components/Quotes/Quotes";
import Subway from "../../components/Subway/Subway";
import Suggestion from "../../components/Suggestion/Suggestion";
import "./Footer.scss";

function Footer() {
  return (
    <div className="Footer">
      <CheckUpdate></CheckUpdate>
      <Suggestion></Suggestion>
    </div>
  );
}

export default Footer;
