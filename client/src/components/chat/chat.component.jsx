import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import styles from "./chat.module.css";

let socket;
const ENDPOINT = "localhost:5000";

const Chat = ({ location }) => {
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const { nickname, room } = queryString.parse(location.search);
    setNickname(nickname);
    setRoom(room);

    socket = io(ENDPOINT);

    socket.emit("join", { nickname, room });

    return () => {
      socket.off();
    };
  }, [location.search]);

  return <h1>Chat</h1>;
};

export default Chat;
