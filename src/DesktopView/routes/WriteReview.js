import styled from "styled-components";
import { Container } from "./Home";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ItemBox, ItemContent } from "../components/Chat";
import { useForm } from "react-hook-form";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginId, UserObj } from "../../Data/UserObj";

const WriteContainer = styled(Container)`
  max-width: 600px;
  min-width: 550px;
  width: 80%;
  margin: 0 auto;
`;

const ContentWrap = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 35px;
  margin-bottom: 50px;
`;
const Header = styled.header`
  //border-bottom: gray 1px solid;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    font-size: 18px;
    font-weight: 600;
    height: 35px;
  }
  span {
    font-size: 14px;
    color: gray;
  }
`;
const Item = styled(ItemBox)`
  margin-top: 0;
  padding: 15px 0;
  border-bottom: 0;
  box-shadow: 0;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-end;
  span {
    font-size: 15px;
  }
`;
const ReviewInput = styled.textarea`
  background-color: whitesmoke;
  height: 250px;
  resize: none;
  width: calc(100% - 30px);
  border-radius: 5px;
  padding: 15px;
  &:focus {
    outline: none;
  }
`;
const ReviewBtn = styled.button`
  width: 70px;
  height: 40px;
  border: 0;
  font-weight: 600;
  background-color: yellow;
  border-radius: 15px;
`;

const NotValidPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
`;
function WriteReview() {
  const location = useLocation();
  const item = location.state?.item;
  const [user, setUser] = useState();

  //내 프로필사진 정보
  const me = UserObj.find((user) => user.id === LoginId);
  const history = useHistory();
  useEffect(() => {
    if (item) {
      setUser(UserObj.find((user) => user.id === item.userId));
    }
  }, [item]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onValid = (data) => {
    user.reviews.push({
      id: LoginId,
      src: me.src,
      content: data.review,
    });
    console.log(user);

    alert("등록되었습니다");
    history.push("/");
  };
  return (
    <WriteContainer>
      <ContentWrap>
        {item ? (
          <>
            <Header>
              <div>
                <h2>
                  <FontAwesomeIcon
                    style={{ fontSize: "12px", marginRight: "5px" }}
                    icon={faPen}
                  />
                  나눔 후기 작성하기
                </h2>
                <span>- 해당 나눔에 대해 후기를 작성해주세요</span>
              </div>
              <Item>
                <img src={require(`../../Img/${item.img[0]}.jpg`)} />
                <ItemContent>
                  <h1>{item.title}</h1>
                  <span>{item.userId}</span>
                </ItemContent>
              </Item>
            </Header>
            <ReviewForm onSubmit={handleSubmit(onValid)}>
              <ReviewInput
                {...register("review", {
                  required: "최소 5자 이상 입력해주세요",
                })}
              />
              {errors && <span>{errors.review?.message}</span>}
              <ReviewBtn type="submit">작성하기</ReviewBtn>
            </ReviewForm>
          </>
        ) : (
          <NotValidPage>유효하지 않은 페이지 입니다</NotValidPage>
        )}
      </ContentWrap>
    </WriteContainer>
  );
}

export default WriteReview;
