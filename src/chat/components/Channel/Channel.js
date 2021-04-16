import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import io from "socket.io-client";
import "./Channel.scss";
import { useLocation } from "react-router-dom";
import Message from "../Message/Message";

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
    // const socket = io("http://localhost:5000", { reconnection: false });
    const socket = io('https://kau-project.herokuapp.com/',{ reconnection: false });
    console.log(socket)
    setCurrentSocket(socket);
    socket.emit("joinRoom", { username: "chanmin", room: channelName });
    socket.on("message", (message) => {
      setMsgList((msgList) => [message, ...msgList]);
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
    e.target.elements[0].focus();
    currentSocket.emit("sendMessage", msg);
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
      </div>{" "}
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
