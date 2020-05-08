import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./join.module.css";

const Join = () => {
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");

  const changeHandler = (e) => {
    switch (e.target.name) {
      case "nickname":
        setNickname(e.target.value);
        break;
      case "room":
        setRoom(e.target.value);
        break;
      default:
        console.log();
    }
  };

  return (
    <div className={styles.container}>
      <h1>Join</h1>
      <div className={styles.inputContainer}>
        <label htmlFor="nickname">nickname</label>
        <input
          type="text"
          placeholder="Your nickname"
          onChange={changeHandler}
          name="nickname"
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="room">room</label>
        <select name="room" onChange={changeHandler}>
          <option defaultValue value="">
            Select room
          </option>
          <option value="javascript">Javascript</option>
          <option value="html">Html</option>
          <option value="css">Css</option>
        </select>
      </div>

      <Link
        to={{ pathname: `/chat?nickname=${nickname}&room=${room}` }}
        className={styles.joinButton}
      >
        <button type="submit">Join now!</button>
      </Link>
    </div>
  );
};

export default Join;
