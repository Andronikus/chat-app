import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import styles from "./chat.module.css";

let socket;
const ENDPOINT = "localhost:5000";

const Chat = ({ location }) => {
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  console.log("Chat Render");

  useEffect(() => {
    const { nickname, room } = queryString.parse(location.search);
    setNickname(nickname);
    setRoom(room);

    socket = io(ENDPOINT);

    socket.on("message", (message) => {
      setChatMessages((chatMessages) => [...chatMessages, message]);
    });

    socket.emit("join", { nickname, room }, (error) => {
      if (error) console.log(error);
    });

    return () => {
      socket.off();
    };
  }, [location.search]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { message }, () => setMessage(""));
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
    </div>
  );
};

export default Chat;
