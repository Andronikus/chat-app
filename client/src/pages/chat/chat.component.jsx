import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";

import { ChatHeader, Messages, SendMessage } from '../../components';
import UserContext from '../../contexts';


import styles from "./chat.module.css";

let socket;

export const Chat = ({ history }) => {

  const { nickname, room } = useContext(UserContext);

  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket = io("/");

    socket.on("message", ({ nickname, text }) => {
      setChatMessages((chatMessages) => [...chatMessages, { nickname, text, sendAt: new Date() }]);
    });

    socket.emit("join", { nickname, room }, (error) => {
      if (error) console.log(error);
    });

    return () => {
      socket.off();
    };
  }, [nickname, room]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (text && text.trim().length > 0) {
      socket.emit("sendMessage", { text }, () => setText(""));
    }
  };

  const onClickHandler = () => {
    socket.disconnect(true);
    history.push("/");
  };

  return (
    <div className={styles.container}>
      <ChatHeader nickname={nickname} clickHandler={onClickHandler} />
      <Messages nickname={nickname} chatMessages={chatMessages} />
      <SendMessage text={text} setText={setText} sendMessage={sendMessage} />
    </div>
  );
};
