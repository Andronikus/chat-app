import { createContext } from "react";

export const UserContext = createContext({
  nickname: "",
  room: "",
  setNickname: () => {},
  setRoom: () => {},
});

UserContext.displayName = "UserContext";
