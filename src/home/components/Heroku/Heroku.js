import React, { useEffect, useState } from "react";
import axios from 'axios'
import "./Heroku.css";

function Heroku() {
    const [notice, setNotice] = useState("");
  useEffect(() => {
      axios.get('https://kau-project.herokuapp.com/contents')
      .then(res => setNotice(res.data["content"]))
  }, []);

  return (
    <div className="Heroku">
      <div
        style={{ fontWeight: 700, marginTop: "0.5rem", fontSize: "1.05rem" }}
      >
        오늘의 공지
      </div>
      <div className="Quotes__borderLine"></div>
      {
          <div className="Quotes__quote">{notice}</div>
      }
    </div>
  );
}

export default Heroku;
