import React from "react";
import ReactEmoji from "react-emoji";

import { getHHMMFromDate } from "../../../utils/dateUtils";

import styles from "./message.module.css";

const Message = ({ nickname, message, showWhatUserSendMessage }) => {

  const containerStyles = [styles.container];
  const userInfoStyles = [];
  const messageStyles = [];
  const textStyles = [styles.text];

  let userInfo;

  if (!showWhatUserSendMessage) {
    userInfoStyles.push(styles["not-display"]);
  }

  if (message.nickname === "admin") {
    containerStyles.push(styles["alignCenter"]);
    userInfoStyles.push(styles["not-display"]);
    messageStyles.push(styles["welcome-message"]);
  } else if (message.nickname === nickname) {
    containerStyles.push(styles.alignRight);
    userInfoStyles.push(styles["user"]);
    messageStyles.push(styles["message"]);
    messageStyles.push(styles["message-background"]);

    userInfo = `${getHHMMFromDate(message.sendAt)}`;

  } else {
    containerStyles.push(styles.alignLeft);
    userInfoStyles.push(styles["user"]);
    messageStyles.push(styles["message"]);
    messageStyles.push(styles["message-background"]);

    userInfo = `${message.nickname}, ${getHHMMFromDate(message.sendAt)}`;
  }

  return (
    <div className={containerStyles.join(" ")}>
      <p className={userInfoStyles.join(" ")}>{userInfo}</p>
      <div className={messageStyles.join(" ")}>
        <p className={textStyles.join(" ")}>{ReactEmoji.emojify(message.text)}</p>
      </div>
    </div>
  );
};
export default Message;
