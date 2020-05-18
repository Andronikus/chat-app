import React, { useState } from "react";

import { BACKEND_URL } from "../../utils/constants";

import styles from "./join.module.css";

const Join = ({ history }) => {
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");
  const [inputValidation, setInputValidation] = useState({ status: "valid", reason: "", styles: [styles["nickname-input"]] });


  const changeHandler = (e) => {
    switch (e.target.name) {
      case "nickname":
        setNickname(e.target.value);

        if (inputValidation && inputValidation.status === "invalid") {
          setInputValidation({ status: "valid", reason: "", styles: [styles["nickname-input"]] });
        }
        break;
      case "room":
        setRoom(e.target.value);
        break;
      default:
    }
  };

  const onClickHandler = () => {

    if (!nickname || !room) {
      return;
    }

    fetch(`${BACKEND_URL}/getUser?nickname=${nickname}&room=${room}`, { method: 'GET', cache: 'no-cache' })
      .then(response => response.json())
      .then(data => {
        if (data.nickname) {
          setInputValidation((inputValidation) => ({ status: "invalid", reason: "nickname already taken", styles: [...inputValidation.styles, styles["invalid-input"]] }));
        } else {
          history.push(`/chat?nickname=${nickname}&room=${room}`);
        }
      })
      .catch(error => console.log(error));
  }

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
          className={inputValidation.styles.join(" ")}
        />
        {inputValidation.status === "invalid" ? <span className={styles["invalid-reason"]}>{inputValidation.reason}</span> : null}
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="room">room</label>
        <select name="room" className={styles["room-select"]} onChange={changeHandler}>
          <option defaultValue value="">
            Select room
          </option>
          <option value="javascript">Javascript</option>
          <option value="html">Html</option>
          <option value="css">Css</option>
        </select>
      </div>
      <div className={styles.joinButton}>
        <button onClick={() => onClickHandler()} >Join now!</button>
      </div>
    </div>
  );
};

export default Join;
