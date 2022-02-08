import React from "react";
import Room from "../Room/Room";
import "./ChannelList.scss";

const Chat = () => {
  const DEPARTMENT_INFO = {
    125: {
      id: "soft",
      major: "소프트웨어학과",
    },
    121: {
      id: "mecha",
      major: "항공우주 및 기계공학부",
    },
    124: {
      id: "elec",
      major: "항공전자정보공학부",
    },
    106: {
      id: "material",
      major: "항공재료공학과",
    },
    128: {
      id: "engin",
      major: "공학융합학부",
    },
    129: {
      id: "dron",
      major: "스마트드론공학과",
    },
    123: {
      id: "airlogistics",
      major: "항공교통물류학부",
    },
    126: {
      id: "business",
      major: "경영학부",
    },
    101: {
      id: "flight",
      major: "항공운항학과",
    },
    127: {
      id: "free",
      major: "자유전공학부",
    },
  };
  const departmentNumber = window.localStorage.getItem("department-number");
  console.log(departmentNumber);

  return (
    <div className="Chat">
      <div>
        <h3>채널</h3>
      </div>
      <div className="Chat-container">
        <section className="Chat-half">
          {/* <Room major="경영학부" id="business" current={2}></Room>
          <Room major="스마트드론공학과" id="smartdrone" current={2}></Room>
          <Room major="소프트웨어학과" id="software" current={2}></Room>
          <Room major="항공교통물류학부" id="logistics" current={2}></Room> */}
          <Room
            major={DEPARTMENT_INFO[departmentNumber].major}
            id="logistics"
            current={2}
          ></Room>
        </section>
        <section className="Chat-half">
          {/* <Room
            major="항공우주 및 기계공학부"
            id="mechanical"
            current={2}
          ></Room>
          <Room major="항공운항학과" id="flight" current={2}></Room>
          <Room major="항공전자정보공학부" id="electronic" current={2}></Room>
          <Room major="항공재료공학과" id="material" current={2}></Room> */}
        </section>
      </div>
    </div>
  );
};

export default Chat;
