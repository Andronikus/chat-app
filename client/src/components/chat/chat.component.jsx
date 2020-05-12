import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import ChatHeader from "../chat-header/chat-header.component";
import Messages from "../messages/messages.component";
import SendMessage from "../send-message/send-message.component";

import styles from "./chat.module.css";

let socket;
const ENDPOINT = "localhost:5000";

const Chat = ({ location, history }) => {
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");
  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

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
    socket.emit("sendMessage", { text }, () => setText(""));
  };

  const onClickHandler = () => {
    socket.disconnect(true);
    history.push("/");
  };

  return (
    <div className={styles.container}>
      <ChatHeader nickname={nickname} clickHandler={onClickHandler} />
      <Messages user={nickname} chatMessages={chatMessages} />
      <SendMessage text={text} setText={setText} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
