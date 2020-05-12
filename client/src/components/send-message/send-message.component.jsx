import React from "react";

import styles from "./send-message.module.css";

const SendMessage = ({ text, setText, sendMessage }) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <button
        type="submit"
        className={styles.button}
        onClick={(e) => sendMessage(e)}
      >
        {" "}
        <ion-icon name="send-outline"></ion-icon>
      </button>
    </div>
  );
};

export default SendMessage;
