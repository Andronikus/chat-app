import React, { useRef, useEffect } from "react";

import Message from "./message/message.component";

import styles from "./messages.module.css";

export const Messages = ({ nickname, chatMessages }) => {

  const containerElem = useRef(null);
  const scrollElem = useRef(null);

  useEffect(() => {
    if (containerElem.current.clientHeight < containerElem.current.scrollHeight) {
      scrollElem.current.scrollIntoView();
    }
  }, [chatMessages]);

  return (
    <div className={styles.container} ref={containerElem}>
      {
        chatMessages.map((message, idx) => {

          let showWhenSendMessage = true;

          if (chatMessages[idx - 1] &&
            chatMessages[idx - 1].nickname === chatMessages[idx].nickname) {
            showWhenSendMessage = false;
          }

          return (<Message key={idx} nickname={nickname} message={message} showWhatUserSendMessage={showWhenSendMessage} />);
        })
      }
      <div ref={scrollElem}></div>
    </div>
  );
};
