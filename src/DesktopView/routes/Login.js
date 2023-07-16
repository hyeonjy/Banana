import styled from "styled-components";
import * as MLogin from "../../MobileView/routes/Mlogin";
import { Container } from "./Home";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import kakao from "../../Img/kakao.png";
import google from "../../Img/google.png";
import { useMutation } from "react-query";
import { loggedInApi } from "../../Api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { LoginState } from "../../atom";
import { useSetRecoilState } from "recoil";

const LoginContainer = styled(Container)`
  width: 510px;
  margin: 0 auto;
  padding-top: 70px;
  height: 80vh;
`;
export const LoginDiv = styled(MLogin.Container)`
  justify-content: flex-start;

  padding: 60px 0 25px;
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

export const ErrorP = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: red;
  padding-left: 10px;
  margin-top: 10px;
`;

const SocaiLoginContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const SocialLoggedinBtn = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  background-position: center;
`;
const KakaoLogin = styled(SocialLoggedinBtn)`
  background-image: url(${kakao});
  background-size: contain;
  background-color: transparent;
`;
const GoogleLogin = styled(SocialLoggedinBtn)`
  background-image: url(${google});
  background-size: 30px 30px;
  background-color: white;
  background-repeat: no-repeat;
  border: 1px solid #80808045;
`;

function Login() {
  //카카오 로그인 -  인가 코드 받기(로그인 창)
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`;
  const kakaoLogin = () => {
    window.location.href = kakaoAuthUrl;
  };

  //구글 로그인
  const googleLogin = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLINET_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URL;
    const responseType = "code";
    const scope =
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    window.location.href = url;
  };

  //일반 로그인
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const setLogin = useSetRecoilState(LoginState);
  const { mutate: loginMutate } = useMutation(
    (formdata) => loggedInApi(formdata),
    {
      onSuccess: (res) => {
        //로그인 성공 후 jwt 설정
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("expiresAt", res.expiresIn);
        localStorage.setItem("refreshExpiresAt", res.refreshExpiresAt);

        setLogin(true);
        history.push("/");
      },
      onError: (error) => {
        if (error.response?.status === 401) {
          //유저가 아닌 경우
          setError("NotUser", { message: error.response.data.error });
        }
      },
    }
  );
  const onValid = (data) => {
    const formdata = new FormData();
    formdata.append("email", data.id);
    formdata.append("password", data.password);
    loginMutate(formdata);
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
              autoComplete="off"
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
                  {errors.password?.type === "required" ? (
                    <ErrorP>{errors.password.message}</ErrorP>
                  ) : errors?.password?.type === "pattern" ? (
                    <ErrorP>
                      비밀번호는 영문, 숫자 조합하여 8~12자리로 입력해 주세요.
                    </ErrorP>
                  ) : errors?.NotUser ? (
                    <ErrorP>{errors.NotUser.message}</ErrorP>
                  ) : null}
                </>
              )}
            </div>
            <MLogin.SubmitBtn
              type="submit"
              style={{ cursor: "pointer", marginTop: "20px" }}
              onClick={() => {
                clearErrors("NotUser");
              }}
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

          <SocaiLoginContainer>
            <KakaoLogin onClick={kakaoLogin} />
            <GoogleLogin onClick={googleLogin} />
          </SocaiLoginContainer>
        </LoginDiv>
      </LoginContainer>
    </div>
  );
}

export default Login;
