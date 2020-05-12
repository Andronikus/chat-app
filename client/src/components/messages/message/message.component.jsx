import React from "react";
import ReactEmoji from "react-emoji";

import styles from "./message.module.css";

const Message = ({ user, message }) => {
  const containerStyles = [styles.container];
  const textStyles = [styles.message];

  user = user.trim().toLowerCase();

  console.log("Message::", user, message);

  if (user === message.user) {
    containerStyles.push(styles.alignRight);
    textStyles.push(styles.message_align_right);
  } else if (message.user === "admin") {
    containerStyles.push(styles.alignCenter);
    textStyles.push(styles.message_align_center);
    textStyles.push(styles.mb_10px);
  } else {
    containerStyles.push(styles.alignLeft);
  }

  return (
    <div className={containerStyles.join(" ")}>
      <div className={textStyles.join(" ")}>
        <p className={styles.text}>{ReactEmoji.emojify(message.text)}</p>
      </div>
    </div>
  );
};

export default Message;
