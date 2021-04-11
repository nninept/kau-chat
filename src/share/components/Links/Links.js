import React from "react";
import "./Links.scss";
import IconLink from "../IconLink/IconLink";

function Links(props) {
  return (
    <div className="Links">
      <ul className="Links__line1">
      <IconLink
          title="학교 홈페이지"
          onLinkClicked={props.onChangePage}
          pageNum={0}
          src="./university.svg"
          alt="학교 메인"
          width="50"
        />
        <IconLink
          title="LMS"
          onLinkClicked={props.onChangePage}
          pageNum={1}
          src="./lms.svg"
          alt="LMS"
          width="50"
        />
        <IconLink
          title="종합정보시스템"
          onLinkClicked={props.onChangePage}
          pageNum={2}
          src="./system.svg"
          alt="종합정보시스템"
          width="50"
        />
        <IconLink
          title="일자리센터"
          onLinkClicked={props.onChangePage}
          pageNum={0}
          src="./job.svg"
          alt="일자리센터"
          width="50"
        />
        {/* </ul> */}
        {/* 두번째 라인 */}
        {/* <ul className="Links__line2"> */}
        <IconLink
          title="수강신청"
          onLinkClicked={props.onChangePage}
          pageNum={0}
          src="./pick.svg"
          alt="수강신청"
          width="50"
        />
        <IconLink
          title="역량관리시스템"
          onLinkClicked={props.onChangePage}
          pageNum={0}
          src="./manage.svg"
          alt="역량관리시스템"
          width="50"
        />
        <IconLink
          title="중앙도서관"
          onLinkClicked={props.onChangePage}
          pageNum={0}
          src="./library.svg"
          alt="중앙도서관"
          width="50"
        />
      </ul>
      {/* <div className="Links__borderLine"></div> */}
    </div>
  );
}

export default Links;
