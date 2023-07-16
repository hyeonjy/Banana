import { useEffect } from "react";
import { GoogleLogin, KaKaoAuthorization } from "../../Api";
import styled from "styled-components";
import { Pulsar } from "@uiball/loaders";
const Banana = styled.span`
  color: #fae100;
  font-size: 30px;
  font-family: yg-jalnan;
  margin-bottom: 20px;
`;

function Auth() {
  //인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const scope = new URL(window.location.href).searchParams.get("scope");

  useEffect(() => {
    if (code) {
      if (scope) {
        GoogleLogin(code);
      } else {
        //카카오 로그인
        const grant_type = "authorization_code";
        const client_id = `${process.env.REACT_APP_KAKAO_KEY}`;
        const REDIRECT_URL = `${process.env.REACT_APP_REDIRECT_URL}`;
        const URL = `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URL}&code=${code}`;
        KaKaoAuthorization(URL);
      }
    }
  }, []);
  return (
    <div className="loadingWrap" style={{ backgroundColor: "white" }}>
      <Banana>로그인 중</Banana>
      <Pulsar size={60} speed={1.75} color="#fae100" />
    </div>
  );
}
export default Auth;
