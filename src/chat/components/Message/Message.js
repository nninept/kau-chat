import React from "react";
import "./Message.scss";

function Message({ userName, message, time, my }) {
  return (
    <div className={`Message ${my}`}>
      <div className="Message-container">
        <div className="Message-first-line">
          <span className="Message-username">{userName}</span>
          <span className="Message-time">{time}</span>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
}

export default Message;
