import React from "react";
import { Link } from "react-router-dom";

import styles from "./chat-header.module.css";

const ChatHeader = ({ nickname }) => {
  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.statusIcon}>
          <ion-icon name="ellipse-outline"></ion-icon>
        </div>
        <p className={styles.username}>{nickname}</p>
      </div>
      <div>
        <Link to="/">
          <div className={styles.closeIcon}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChatHeader;
