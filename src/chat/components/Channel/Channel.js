import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import io from "socket.io-client";
import "./Channel.scss";
import { useLocation } from "react-router-dom";
import Message from "../Message/Message";
import address from "../../../address-info";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 1rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    fontSize: "10px",
    borderRadius: "50%",
    padding: "0.3rem",
    minHeight: "32px",
    minWidth: "32px",
  },
}));

function Channel() {
  let onTextChange;
  let onMessageSubmit;
  const location = useLocation();
  const channelName = location.pathname.split("/")[2];
  const classes = useStyles();
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [currentSocket, setCurrentSocket] = useState(null);
  useEffect(() => {
    const socket = io(address.url, { reconnection: false });
    setCurrentSocket(socket);
    socket.on("message", (message) => {
      setMsgList((msgList) => [...msgList, message]);
    });

    return () => {
      setMsgList([]);
      socket.disconnect();
    };
  }, []);

  onTextChange = (e) => {
    setMsg(e.target.value);
  };

  onMessageSubmit = (e) => {
    e.preventDefault();
    currentSocket.emit("sendMessage", { msg, name: "unknown" });
    setMsg("");
  };

  return (
    <div className="channel">
      <div className="message-list">
        {msgList.map((msg, idx) => (
          <Message
            key={idx}
            userName={msg.user}
            message={msg.message}
            time={msg.time}
          ></Message>
        ))}
      </div>

      <form onSubmit={onMessageSubmit} className="message-form">
        <input
          className="message-text"
          value={msg}
          onChange={onTextChange}
        ></input>
        <Fab color="primary" aria-label="add" className={classes.button}>
          <ArrowUpwardOutlinedIcon fontSize="small" />
        </Fab>
      </form>
    </div>
  );
}

export default Channel;
