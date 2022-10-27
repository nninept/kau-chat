import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import IconLink from "../IconLink/IconLink";

function Links(props) {
  const logoutHandler = () => {
    console.log(window.localStorage.clear());
  };
  return (
    <div className="links">
      <ul>
        <IconLink
          title="학교 홈페이지"
          src="./university.svg"
          alt="학교 메인"
          link="/home"
        />
        <IconLink title="LMS" src="./lms.svg" alt="LMS" link="/home/lms" />
        <IconLink
          title="채팅방"
          src="./job.svg"
          alt="채팅방"
          link="/home/chat"
        />
        <IconLink
          title="커뮤니티"
          src="./community.png"
          alt="커뮤니티"
          link="/home/community"
        />

        <Link className="logout" to={"/"} onClick={logoutHandler}>
          Logout
        </Link>
      </ul>
    </div>
  );
}
export default Links;
