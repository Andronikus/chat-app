import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./message/message.component";

import styles from "./messages.module.css";

const Messages = ({ user, chatMessages }) => {
  return (
    <div className={styles.container}>
      <ScrollToBottom>
        {chatMessages.map((message, idx) => (
          <Message key={idx} user={user} message={message} />
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default Messages;
