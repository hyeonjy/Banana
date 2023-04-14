import styled from "styled-components";
import { LoginId, UserObj } from "../../Data/UserObj";
import * as MLogin from "../../MobileView/routes/Mlogin";
import * as Login from "../components/Login";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

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
`;

const ErrorP = styled.p`
  font-size: 14px;
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
    console.log(watch("password") !== watch("passwordConfirm"));
    if (watch("password") !== watch("passwordConfirm")) {
      setError("passwordConfirm", {
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("passwordConfirm");
    }
  }, [watch("password"), watch("passwordConfirm")]);

  const onValid = (data) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "비밀번호가 일치하지않습니다" },
        { shouldFocus: true }
      );
    } else {
      UserObj.push({
        chats: [],
        id: data.nickname,
        src: "bananaface.png",
        grade: "bananaIcon.png",
        itemIdList: [],
        reviews: [],
      });
      console.log(UserObj);
      history.push("/login");
    }

    // alert("등록되었습니다");
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
              {...register("nickname", {
                required: "닉네임을 입력해주세요",
              })}
            />
            {errors.nickname && <ErrorP>{errors.nickname.message}</ErrorP>}
          </InputDiv>
          <SubmitBtn type="submit">등록</SubmitBtn>
        </SignForm>
      </SignDiv>
    </Container>
  );
}

export default SignUp;
