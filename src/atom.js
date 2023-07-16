import { atom } from "recoil";

export const postData = atom({
  key: "postAll",
  default: [],
});
export const LoginState = atom({
  key: "LoginState",
  default: false,
});
