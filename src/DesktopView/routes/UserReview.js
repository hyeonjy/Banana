import { Link, useLocation } from "react-router-dom";
import {
  Header,
  MembershipText,
  ProfImg,
  MembershipIcon,
  MembershipWrap,
} from "../components/PostDatil";
import { ProfileName } from "../routes/MyPage";
import { LoginId, UserObj } from "../../Data/UserObj";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Container } from "./More";
import { ItemObj } from "../../Data/ItemObj";
import { useEffect, useState } from "react";
import Modal, { GradeIcon, gradeList } from "../../Modal";
import { ShowItem, ShowReview } from "../components/ShowItem";
import NoItem from "../components/NoItem";
import useAxios from "../../useAxio";
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
  background-color: ${(props) => (props.active ? "#ffe914" : "transparent")};
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
  //const postWriter = UserObj.find((user) => user.id === userId);

  //포스트 + 리뷰
  //const reviews = postWriter.reviews;
  //아이템에서 해당 유저가 올린 post 들
  //const items = ItemObj.filter((item) => item.userId === userId);
  // 패치
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState();
  const [reviews, setReviews] = useState();
  const { response, loading, error, executeGet } = useAxios({
    method: "get",
    url: `http://localhost:8080/userpage/data/${userId}`,
  });
  useEffect(() => {
    executeGet();
  }, []);
  useEffect(() => {
    if (!loading) {
      setUser(response.user);
      setUserPosts(response.posts);
      setReviews(response.reviews);
    }
  }, [response, loading, error]);

  //모달
  const [activeGrade, setActiveGrade] = useState(false); // modal - 나머지 blur

  return (
    <>
      {user && userPosts ? (
        <UserContainer activeGrade={activeGrade}>
          <UserWrap>
            <Header as="div">
              <ProfImg img={require(`../../Img/${user.profile}`)} />
              <ProfileName style={{ fontSize: "17px" }}>
                {user.nickname}
              </ProfileName>
              <MembershipWrap>
                <GradeIcon
                  onClick={() => setActiveGrade(true)}
                  src={gradeList[user.grade].icon}
                />
                <MembershipText>{gradeList[user.grade].grade}</MembershipText>
              </MembershipWrap>
            </Header>
            <CateDiv>
              <EachCate
                active={reviewPage === null ? 1 : 0}
                to={{ pathname: "/user", search: `?id=${userId}` }}
              >
                판매 목록
              </EachCate>
              <EachCate
                active={reviewPage ? 1 : 0}
                to={{ search: `id=${userId}&review=${true}` }}
              >
                나눔 후기
              </EachCate>
            </CateDiv>
            <ItemDiv>
              {/* 유저 나눔 목록 & 후기 목록 */}
              {reviewPage ? (
                reviews ? (
                  <ShowReview reviews={reviews} />
                ) : (
                  <NoItem content={"후기가"}>후기가 없습니다</NoItem>
                )
              ) : userPosts.length > 0 ? (
                <ShowItem item={userPosts} />
              ) : (
                <NoItem content={"나눔이"}>나눔이 없습니다</NoItem>
              )}
            </ItemDiv>
          </UserWrap>
        </UserContainer>
      ) : (
        <span>loading...</span>
      )}

      {/* 클릭 시 모달 */}
      {activeGrade && <Modal setActiveGrade={setActiveGrade} />}
    </>
  );
}

export default UserInfo;
