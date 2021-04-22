import React from "react";
import "./Nav.scss";
import {Link} from "react-router-dom"
import IconLink from "../IconLink/IconLink";

function Links(props) {
  const logoutHandler = ()=>{
    console.log(window.localStorage.clear())
  }
  return (
    <div className="links">
      <ul >
      <IconLink
          title="학교 홈페이지"
          src="./university.svg"
          alt="학교 메인"
          link="/home"
        />
        <IconLink
          title="LMS"
          src="./lms.svg"
          alt="LMS"
          link="/home/lms"
        />
        <IconLink
          title="종합정보시스템"
          src="./system.svg"
          alt="종합정보시스템"
          link="npotal"
        />
        <IconLink
          title="채팅방"
          src="./job.svg"
          alt="채팅방"
          link="/home/chat"
        />

        <IconLink
          title="KAU 위키"
          src="./pick.svg"
          alt="KAU 위키"
          link="/home/wiki"
        />
        <IconLink
          title="역량관리시스템"
          src="./manage.svg"
          alt="역량관리시스템"
          link="/home"
        />
        <IconLink
          title="중앙도서관"
          src="./library.svg"
          alt="중앙도서관"
          link="/home"
        />
        <Link className="logout" to={"/"} onClick={logoutHandler}>Logout</Link>
      </ul>
    </div>
  );
}

export default Links;
