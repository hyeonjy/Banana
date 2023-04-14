import styled from "styled-components";
import HeaderComponent from "../components/Header";
import HomeMenu from "../components/HomeMenu";
import banana from "../../Img/banana.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorDiv } from "./MUpload";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
`;

export const PrevIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  color: #ffe84e;
  position: absolute;
  top: 10px;
  left: 15px;
`;

export const TitleH1 = styled.h1`
  width: 350px;
  font-size: 37px;
  font-family: "yg-jalnan";
  text-align: center;
  margin-bottom: 13px;
  color: #ffe84e;
`;

export const TitleSpan = styled.span`
  width: 240px;
  font-size: 15px;
  text-align: center;
  margin-bottom: 13px;
  line-height: 22px;
  font-weight: 600;
  font-style: italic;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 50px;
`;

export const LoginInput = styled.input`
  height: 50px;
  padding: 0 15px;
  border-radius: 24px;
  margin-bottom: 20px;
  border: 1px solid white;
  box-shadow: rgb(123, 129, 133, 0.2) 0px 4px 16px;
  &:focus {
    outline: 1px solid #ffe84e;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const SubmitBtn = styled.button`
  height: 50px;
  padding: 0 15px;
  border-radius: 24px;
  background-color: rgb(255, 181, 45);
  border: none;
  font-weight: 700;
`;

export const DetailDiv = styled.div`
  margin-top: 20px;
`;

export const DetailSpan = styled.span`
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
`;
export const ErrorP = styled.p`
  height: 20px;
  line-height: 20px;
  margin-top: 5px;
  color: #f92f60;
  font-weight: 700;
  display: inline-block;
  margin-left: 5px;
  padding-left: 5px;
  font-size: 12.5px;
`;
function Mlogin() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onValid = (data) => {
    console.log(data);
    //db에서 user 찾음
  };
  return (
    <Container>
      <Link to="/">
        <PrevIcon icon={faArrowLeft} />
      </Link>
      <TitleH1>Welcome to Banana</TitleH1>
      <TitleSpan>BANANA 계정이 있다면, 이메일을 통해 로그인하세요</TitleSpan>
      <LoginForm onSubmit={handleSubmit(onValid)}>
        <LoginInput
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
          type="text"
          placeholder={"이메일"}
        />
        <LoginInput
          {...register("password", {
            required: "비밀번호를 입력하세요",
          })}
          type="password"
          placeholder={"비밀번호"}
        />
        <ErrorDiv style={{ padding: "8px 0 15px" }}>
          {errors.email?.message ? (
            <p>{errors.email?.message}</p>
          ) : errors.password ? (
            <p>{errors.password.message}</p>
          ) : null}
        </ErrorDiv>
        <SubmitBtn type="submit">Log In</SubmitBtn>
      </LoginForm>
      <DetailDiv>
        <DetailSpan
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입 |{" "}
        </DetailSpan>
        <DetailSpan>계정 찾기</DetailSpan>
      </DetailDiv>
    </Container>
  );
}

export default Mlogin;
