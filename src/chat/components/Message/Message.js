import React from "react";
import "./Message.scss";

const Message = ({ userName, message, time, my }) => {
  return (
    <div className={`Message ${my}`}>
      <div className="Message-first-line">
        <span className="Message-username">{userName}</span>
        <span className="Message-time">{time}</span>
      </div>
      <div className="message-content">{message}</div>
    </div>
  );
};

export default Message;
