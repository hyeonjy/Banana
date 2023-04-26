import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  Container,
  ErrorP,
  LoginForm,
  LoginInput,
  PrevIcon,
  SubmitBtn,
  TitleH1,
} from "./Mlogin";
import { useForm } from "react-hook-form";
import { ErrorDiv } from "./MUpload";
import { useEffect } from "react";
const SignupContainer = styled(Container)`
  justify-content: flex-start;
`;

const Title = styled(TitleH1)`
  //font-size:;
  font-size: 30px;
  margin-bottom: 0;
  padding: 10px 0;
`;
const EachInputDiv = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;
const EachLable = styled.label`
  line-height: 25px;
  margin-bottom: 5px;
  padding-left: 10px;
  font-size: 15px;
`;
const SignUpInput = styled(LoginInput)`
  margin-bottom: 5px;
  height: 45px;
`;

const SignupForm = styled(LoginForm)`
  margin: 0;
`;

function SignUp() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    clearErrors,
  } = useForm();
  const onValid = (data) => {
    console.log(data);

    //아이디가 이미 있는 경우 -

    if (data.password !== data.passwordValid) {
      setError(
        "passwordValid",
        { message: "비밀번호가 일치하지 않습니다." }, // 에러 메세지
        { shouldFocus: true } // 에러가 발생한 input으로 focus 이동)
      );
    } else {
      history.push("/login");
    }
  };
  useEffect(() => {
    console.log(watch("password") !== watch("passwordValid"));
    if (watch("password") !== watch("passwordValid")) {
      setError("passwordValid", {
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("passwordValid");
    }
  }, [watch("password"), watch("passwordValid")]);

  return (
    <SignupContainer>
      <Link to="/">
        <PrevIcon icon={faArrowLeft} />
      </Link>
      <div style={{ flexGrow: "0.2", display: "flex", alignItems: "center" }}>
        <Title>SIGN UP</Title>
      </div>

      <SignupForm onSubmit={handleSubmit(onValid)}>
        <EachInputDiv>
          <EachLable htmlFor="email">이메일</EachLable>
          <SignUpInput
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
            type="text"
            id="email"
            placeholder={"이메일"}
          />
          <ErrorP>{errors?.email?.message}</ErrorP>
        </EachInputDiv>
        <EachInputDiv>
          <EachLable htmlFor="password">비밀번호</EachLable>
          <SignUpInput
            {...register("password", {
              required: "비밀번호를 입력하세요",
              pattern: {
                value: /^[A-Za-z0-9]{8,12}$/,
                message:
                  "비밀번호는 영문, 숫자 조합하여 8~12자리로 입력해주세요.",
              },
            })}
            id="password"
            type="password"
            placeholder={"비밀번호"}
          />
          <ErrorP>{errors?.password?.message}</ErrorP>
        </EachInputDiv>
        <EachInputDiv>
          <EachLable htmlFor="passwordValid">비밀번호 재확인</EachLable>
          <SignUpInput
            {...register("passwordValid", {
              required: "비밀번호가 일치하지 않습니다",
            })}
            id="passwordValid"
            type="password"
            placeholder={"비밀번호 재확인"}
          />
          <ErrorP>{errors?.passwordValid?.message}</ErrorP>
        </EachInputDiv>
        <EachInputDiv>
          <EachLable htmlFor="nickname">닉네임</EachLable>
          <SignUpInput
            type="text"
            id="nickname"
            placeholder={"닉네임"}
            {...register("nickname", {
              required: "닉네임을 입력하세요",
              maxLength: {
                value: 8,
                message: "닉네임은 8자 이하로 입력해주세요",
              },
            })}
          />
          <ErrorP>{errors?.nickname?.message}</ErrorP>
        </EachInputDiv>

        <SubmitBtn style={{ marginTop: "15px", height: "55px" }} type="submit">
          회원가입
        </SubmitBtn>
      </SignupForm>
    </SignupContainer>
  );
}
export default SignUp;
