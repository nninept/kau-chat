import React from "react";
import { Link } from "react-router-dom";
import "./Room.scss";

function Room({ major, id, current }) {
  return (
    <div className="Room">
      <Link to={`/home/chat/${id}`}>
        <div className="Room-container">
          <h3 className="Room-name">{major}</h3>
          <div>{current}/100</div>
        </div>
      </Link>
    </div>
  );
}

export default Room;
