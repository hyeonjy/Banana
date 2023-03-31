import styled from "styled-components";
import * as MLogin from "../../MobileView/routes/Mlogin";
import { Container } from "../routes/Home";

const LoginContainer = styled(Container)`
  width: 510px;
  margin: 0 auto;
  padding-top: 70px;
  height: 80vh;
`;
const LoginDiv = styled(MLogin.Container)`
  justify-content: flex-start;

  padding: 70px 0;
  margin: 30px 0;
  height: fit-content;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: #f5f5f599;
`;
const LoginForm = styled(MLogin.LoginForm)`
  width: 70%;
  margin-top: 20px;
`;
function Login() {
  return (
    <div style={{}}>
      <LoginContainer>
        <LoginDiv>
          <MLogin.TitleH1 style={{ width: "unset", lineHeight: "50px" }}>
            Welcome to BANANA
          </MLogin.TitleH1>
          <MLogin.TitleSpan
            style={{ fontStyle: "unset", width: "unset", color: "gray" }}
          >
            이메일 혹은 아이디를 통해 로그인하세요
          </MLogin.TitleSpan>
          <LoginForm>
            <MLogin.LoginInput type="text" placeholder={"아이디"} />
            <MLogin.LoginInput type="password" placeholder={"비밀번호"} />
            <MLogin.SubmitBtn type="submit" style={{ cursor: "pointer" }}>
              Log In
            </MLogin.SubmitBtn>
          </LoginForm>
          <MLogin.DetailDiv>
            <MLogin.DetailSpan>회원가입 | </MLogin.DetailSpan>
            <MLogin.DetailSpan>계정 찾기</MLogin.DetailSpan>
          </MLogin.DetailDiv>
        </LoginDiv>
      </LoginContainer>
    </div>
  );
}

export default Login;
