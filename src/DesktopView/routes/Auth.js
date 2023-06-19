import { useEffect } from "react";
import { Authorization } from "../../Api";

function Auth() {
  //인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    console.log("code:", code);
    const grant_type = "authorization_code";
    const client_id = `${process.env.REACT_APP_KAKAO_KEY}`;
    const REDIRECT_URL = `${process.env.REACT_APP_REDIRECT_URL}`;
    const URL = `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URL}&code=${code}`;
    Authorization(URL);
  }, []);
  return <></>;
}
export default Auth;
