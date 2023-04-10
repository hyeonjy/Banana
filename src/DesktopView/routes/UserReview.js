import { Link, useLocation } from "react-router-dom";
import {
  Header,
  MembershipText,
  ProfImg,
  MembershipIcon,
} from "../components/PostDatil";
import { ProfileName } from "../routes/MyPage";
import { UserObj } from "../../Data/UserObj";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Container } from "./More";
import { Product, ProductDetail, ProductImg, ProductTitle } from "./Home";
import { ItemObj } from "../../Data/ItemObj";
import { NoItemPage } from "./ShareList";
import { EachReview, ReviewContent, ReviewUserInfo, UserImg } from "./Review";
import { useState } from "react";
import Modal from "../components/Modal";
const UserContainer = styled(Container)`
  max-width: 800px;
  padding-top: 90px;
  filter: ${(props) => (props.activeGrade ? "blur(2px)" : "unset")};
`;
const UserWrap = styled.div`
  padding: 30px 45px;
  border-radius: 25px;
  min-width: 400px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
const EachCate = styled(Link)`
  font-size: 14px;
  line-height: 40px;
  &:first-of-type {
    border-right: 1px solid #80808052;
  }
  background-color: ${(props) => (props.isActive ? "#ffe914" : "transparent")};
`;
const CateDiv = styled.div`
  display: flex;
  height: 40px;
  background-color: whitesmoke;
  align-items: center;
  ${EachCate} {
    flex-grow: 1;
    text-align: center;
  }
`;
const ItemDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 20px;
`;

function UserInfo() {
  //작성 유저 정보 찾기
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id");
  const reviewPage = searchParams.get("review");
  const postWriter = UserObj.find((user) => user.id === userId);

  //포스트 + 리뷰
  const reviews = postWriter.reviews;
  const posts = postWriter.itemIdList;

  //모달
  const [activeGrade, setActiveGrade] = useState(false); // modal - 나머지 blur
  return (
    <>
      <UserContainer activeGrade={activeGrade}>
        <UserWrap>
          <Header as="div">
            <ProfImg img={require(`../../Img/${postWriter.src}`)} />
            <ProfileName style={{ fontSize: "17px" }}>
              {postWriter.id}
            </ProfileName>
            <div style={{ cursor: "pointer" }}>
              <MembershipIcon
                icon={faSeedling}
                onClick={() => setActiveGrade(true)}
              />
              <MembershipText>새싹</MembershipText>
            </div>
          </Header>
          <CateDiv>
            <EachCate
              isActive={reviewPage === null ? 1 : 0}
              to={{ pathname: "/user", search: `?id=${postWriter.id}` }}
            >
              판매 목록
            </EachCate>
            <EachCate
              isActive={reviewPage ? 1 : 0}
              to={{ search: `id=${postWriter.id}&review=${true}` }}
            >
              나눔 후기
            </EachCate>
          </CateDiv>
          <ItemDiv>
            {/* 유저 나눔 목록 & 후기 목록 */}

            {reviewPage ? (
              reviews.length > 0 ? (
                reviews.map((item, index) => (
                  <EachReview as="div" key={index}>
                    <ReviewUserInfo>
                      <UserImg
                        style={{ width: "30px", height: "auto" }}
                        src={require(`../../Img/${item.src}`)}
                      />
                      <span>{item.id}</span>
                    </ReviewUserInfo>
                    <ReviewContent>{item.content}</ReviewContent>
                  </EachReview>
                ))
              ) : (
                <NoItemPage>후기가 없습니다</NoItemPage>
              )
            ) : posts.length > 0 ? (
              posts.map((postId, index) => {
                //아이템에서 해당 유저가 올린 post 전부 찾기
                const item = ItemObj.find((item) => item.itemId === postId);
                return (
                  <Product key={index}>
                    <Link
                      to={{
                        pathname: `/post/${item.itemId}`,
                        state: {
                          item,
                        },
                      }}
                    >
                      <ProductImg
                        style={{ height: "150px" }}
                        src={require(`../../Img/${item.img[0]}.jpg`)}
                      />
                      <ProductTitle>{item.title}</ProductTitle>
                      <ProductDetail>
                        {item.area} | {item.timeAgo}
                      </ProductDetail>
                    </Link>
                  </Product>
                );
              })
            ) : (
              <NoItemPage>나눔이 없습니다</NoItemPage>
            )}
          </ItemDiv>
        </UserWrap>
      </UserContainer>
      {/* 클릭 시 모달 */}
      {activeGrade && <Modal setActiveGrade={setActiveGrade} />}
    </>
  );
}

export default UserInfo;
