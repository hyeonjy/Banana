import styled from "styled-components";
import * as MLogin from "../../MobileView/routes/Mlogin";
import * as Login from "../routes/Login";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { signUpApi } from "../../Api";
import { useSetRecoilState } from "recoil";
import { LoginState } from "../../atom";

const Container = styled.div`
  width: 510px;
  margin: 0 auto;
  padding: 80px 0;
`;

const SignDiv = styled(Login.LoginDiv)`
  padding: 50px 0;
`;

const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 13px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  label {
    padding-left: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
  }
`;

const Input = styled(MLogin.LoginInput)`
  border-radius: 15px;
  margin-bottom: 15px;
  height: 50px;
`;

const SubmitBtn = styled(MLogin.SubmitBtn)`
  border-radius: 15px;
  margin-top: 10px;
  cursor: pointer;
`;

const ErrorP = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: red;
  padding-left: 5px;
  margin-top: 10px;
`;

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    clearErrors,
  } = useForm();
  const history = useHistory();

  const regExpEm =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const regExgPw = /^[A-Za-z0-9]{8,12}$/;

  useEffect(() => {
    // console.log(watch("password") !== watch("passwordConfirm"));
    if (watch("password") !== watch("passwordConfirm")) {
      setError("passwordConfirm", {
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("passwordConfirm");
    }
  }, [watch("password"), watch("passwordConfirm")]);

  const setLogin = useSetRecoilState(LoginState);

  const { mutate: signUpMutate } = useMutation(
    (formdata) => signUpApi(formdata),
    {
      onSuccess: (res) => {
        //회원가입 성공
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("expiresAt", res.expiresIn);
        localStorage.setItem("refreshExpiresAt", res.refreshExpiresAt);
        setLogin(true);
        history.push("/");
      },
      onError: (error) => {
        //아이디가 중복인 경우
        if (error.response?.status === 401) {
          setError("existEmail", { message: error.response.data.error });
        }
      },
    }
  );
  const onValid = (data) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "비밀번호가 일치하지않습니다" },
        { shouldFocus: true }
      );
    } else {
      const formdata = new FormData();

      formdata.append("id", data.id);
      formdata.append("password", data.password);
      formdata.append("nickname", data.nickname);
      signUpMutate(formdata);
    }
  };

  return (
    <Container>
      <SignDiv>
        <MLogin.TitleH1 style={{ width: "unset", lineHeight: "50px" }}>
          SIGN UP
        </MLogin.TitleH1>
        <SignForm onSubmit={handleSubmit(onValid)}>
          <InputDiv>
            <label htmlFor="id">이메일</label>
            <Input
              id="id"
              type="email"
              name="id"
              autoComplete="off"
              {...register("id", {
                required: "이메일을 입력해주세요",
                patter: regExpEm,
              })}
            />
            {errors.id && <ErrorP>{errors.id.message}</ErrorP>}
          </InputDiv>
          <InputDiv>
            <label htmlFor="password">비밀번호</label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                pattern: regExgPw,
              })}
            />
            {errors.password && <ErrorP>{errors.password.message}</ErrorP>}
            {errors?.password?.type === "pattern" && (
              <ErrorP>
                비밀번호는 영문, 숫자 조합하여 8~12자리로 입력해 주세요.
              </ErrorP>
            )}
          </InputDiv>
          <InputDiv>
            <label htmlFor="passwordConfirm">비밀번호 재확인</label>
            <Input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호 재확인"
              {...register("passwordConfirm", {
                required: true,
              })}
            />
            {errors.passwordConfirm && (
              <ErrorP>{errors.passwordConfirm.message}</ErrorP>
            )}
          </InputDiv>
          <InputDiv>
            <label htmlFor="nickname">닉네임</label>
            <Input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="닉네임"
              autoComplete="off"
              {...register("nickname", {
                required: "닉네임을 입력해주세요",
                maxLength: {
                  value: 8,
                  message: "닉네임은 8자 이하로 입력해주세요",
                },
              })}
            />
            {errors.nickname && <ErrorP>{errors.nickname.message}</ErrorP>}
          </InputDiv>
          {errors.existEmail && (
            <ErrorP style={{ marginBottom: "10px" }}>
              {errors.existEmail.message}
            </ErrorP>
          )}
          <SubmitBtn
            type="submit"
            onClick={() => {
              clearErrors("existEmail");
            }}
          >
            등록
          </SubmitBtn>
        </SignForm>
      </SignDiv>
    </Container>
  );
}

export default SignUp;
