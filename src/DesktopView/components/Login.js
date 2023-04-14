import styled from "styled-components";
import * as MLogin from "../../MobileView/routes/Mlogin";
import { Container } from "../routes/Home";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginContainer = styled(Container)`
  width: 510px;
  margin: 0 auto;
  padding-top: 70px;
  height: 80vh;
`;
export const LoginDiv = styled(MLogin.Container)`
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

const ErrorP = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: red;
  padding-left: 10px;
  margin-top: 10px;
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
    console.log(data);

    // alert("등록되었습니다");
  };

  const regExpEm =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const regExgPw = /^[A-Za-z0-9]{8,12}$/;

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
          <LoginForm onSubmit={handleSubmit(onValid)}>
            <MLogin.LoginInput
              id="id"
              type="email"
              name="id"
              placeholder="이메일"
              {...register("id", {
                required: "이메일을 입력해주세요",
                patter: regExpEm,
              })}
            />
            <MLogin.LoginInput
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                pattern: regExgPw,
              })}
            />
            <div>
              {errors.id ? (
                <ErrorP>{errors.id.message}</ErrorP>
              ) : (
                <>
                  {errors.password?.type === "required" && (
                    <ErrorP>{errors.password.message}</ErrorP>
                  )}
                  {errors?.password?.type === "pattern" && (
                    <ErrorP>
                      비밀번호는 영문, 숫자 조합하여 8~12자리로 입력해 주세요.
                    </ErrorP>
                  )}
                </>
              )}
            </div>
            <MLogin.SubmitBtn
              type="submit"
              style={{ cursor: "pointer", marginTop: "20px" }}
            >
              Log In
            </MLogin.SubmitBtn>
          </LoginForm>
          <MLogin.DetailDiv>
            <Link to="/signup">
              <MLogin.DetailSpan>회원가입 | </MLogin.DetailSpan>
            </Link>
            <MLogin.DetailSpan>계정 찾기</MLogin.DetailSpan>
          </MLogin.DetailDiv>
        </LoginDiv>
      </LoginContainer>
    </div>
  );
}

export default Login;
