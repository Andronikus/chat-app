import React, { useState } from "react";

import UserContext from '../../contexts';

export const UserProvider = ({ children }) => {
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");

  return (
    <UserContext.Provider value={{ nickname, room, setNickname, setRoom }}>
      {children}
    </UserContext.Provider>
  );
};
