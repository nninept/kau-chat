import React from "react";
import Room from "../Room/Room";
import "./ChannelList.scss";

function Chat() {
  return (
    <div className="Chat">
      <div><h3>채널</h3></div>
      <div className="Chat-container">
        <section className="Chat-half">
          <Room major="경영학부" id="business" current={2}></Room>
          <Room major="스마트드론공학과" id="smartdrone" current={2}></Room>
          <Room major="소프트웨어학과" id="software" current={2}></Room>
          <Room major="항공교통물류학부" id="logistics" current={2}></Room>
        </section>
        <section className="Chat-half">
          <Room
            major="항공우주 및 기계공학부"
            id="mechanical"
            current={2}
          ></Room>
          <Room major="항공운항학과" id="flight" current={2}></Room>
          <Room major="항공전자정보공학부" id="electronic" current={2}></Room>
          <Room major="항공재료공학과" id="material" current={2}></Room>
        </section>
      </div>
    </div>
  );
}

export default Chat;
