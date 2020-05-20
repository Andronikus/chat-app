import React from "react";

import styles from "./chat-header.module.css";

export const ChatHeader = ({ nickname, clickHandler }) => {
  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.statusIcon}>
          <ion-icon name="ellipse-outline"></ion-icon>
        </div>
        <p className={styles.username}>{nickname}</p>
      </div>
      <div>
        <div className={styles.closeIcon} onClick={clickHandler}>
          <ion-icon name="close-circle-outline"></ion-icon>
        </div>
      </div>
    </div>
  );
};