import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal, { GradeIcon, gradeList } from "../../Modal";
import Review from "./Review";
import HeartList from "./HeartList";
import ShareList from "./ShareList";
import { LoginId, UserObj } from "../../Data/UserObj";

import nuts from "../../Img/nuts.png";
import sprout from "../../Img/sprout.png";
import treeGrade from "../../Img/tree-grade.png";
import bananaGrade from "../../Img/banana-grade.png";
import useAxios from "../../useAxio";

const Container = styled.div`
  padding-top: 70px;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  filter: ${(props) => (props.activeGrade ? "blur(2px)" : "unset")};
`;

//--------Header----------//
export const ProfileHeader = styled.div`
  width: 90%;
  height: 100px;
  padding: 1.5% 3% 1.5% 7%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #bbbbbb6b;
`;

export const ProfileImg = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;

  background-image: ${(props) => (props.img ? `url(${props.img})` : "")};
  background-color: whitesmoke;
  background-size: contain;
  margin-right: 15px;
`;
export const ProfileName = styled.div`
  flex-grow: 1;
  font-weight: 700;
  font-size: 18px;
`;
export const MembershipTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
`;
const ExplainBtn = styled.button`
  vertical-align: middle;
  width: 60px;
  font-size: 9px;
  height: 23px;
  border-radius: 15px;
  background-color: white;
  border: 1px solid black;
  margin-left: 8px;
  cursor: pointer;
`;
const MembershipDetail = styled.span`
  font-size: 13px;
  width: fit-content;
  line-height: 18px;
  display: flex;
  span {
    width: 85%;
  }
`;
export const MembershipDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  float: right;
`;
export const MembershipIcon = styled(FontAwesomeIcon)`
  color: green;
  margin-left: 5px;
  display: inline-block;

  font-size: 25px;
`;

//--------Contents----------//
const ContentDiv = styled.div`
  width: 100%;
  display: flex;
  min-height: 500px;
  height: auto;
`;
const navItem = [
  { title: "나눔 목록", path: "/mypage/share" },
  { title: "찜 목록", path: "/mypage/heart" },
  { title: "나눔 후기", path: "/mypage/review" },
  { title: "테마설정", path: "/mypage" },
  { title: "공지사항", path: "/mypage" },
  { title: "고객센터", path: "/mypage" },
  { title: "개인정보 처리방침", path: "" },
  { title: "로그아웃", path: "/login" },
];
const SideNav = styled.div`
  width: 180px;
  height: 100%;
  flex-shrink: 0;
  float: left;
  padding: 15px 10px;
  background-color: white;
`;
const NavLiUl = styled.ul`
  text-align: center;
`;
const NavLi = styled.li`
  font-size: 17px;
  line-height: 55px;
  font-weight: 500;
  font-size: ${(props) => (props.isActive ? "18px" : "16px")};
  font-weight: ${(props) => (props.isActive ? "700" : "500")};
  transition: all 0.3s;
`;

function MyPage() {
  const [activeGrade, setActiveGrade] = useState(false); // Modal
  const [currentPage, setCurrentPage] = useState(""); // sideNav 현재 페이지에 따라 Active
  const heartPage = useRouteMatch("/mypage/heart"); //현재 찜 페이지인지 여부 (t/f)
  const sharePage = useRouteMatch("/mypage/share"); // .. 나눔목록 페이지
  const reviewPage = useRouteMatch("/mypage/review"); // .. 리뷰 페이지

  // 패치
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState();
  const [heartPosts, setHeartPosts] = useState();
  const { response, loading, error, refetch, executeGet } = useAxios({
    method: "get",
    url: `http://localhost:8080/userpage/data/1`,
  });

  useEffect(() => {
    executeGet();
  }, []);
  useEffect(() => {
    if (!loading) {
      setUser(response.user);
      setUserPosts(response.posts);
    } else {
      if (error) {
        console.log("error:", error);
      }
    }
  }, [response, loading, error]);

  //페이지 이동
  useEffect(() => {
    if (heartPage) setCurrentPage("/mypage/heart");
    else if (sharePage) setCurrentPage("/mypage/share");
    else if (reviewPage) setCurrentPage("/mypage/review");
    else setCurrentPage("");
  }, [heartPage, sharePage, reviewPage]);

  return (
    <>
      {user && userPosts ? (
        <>
          <Container activeGrade={activeGrade}>
            <ProfileHeader>
              <ProfileImg img={require(`../../Img/${user.profile}`)} />
              <ProfileName>{user.nickname} 님</ProfileName>
              <MembershipDiv>
                <MembershipTitle>
                  <span style={{ verticalAlign: "middle" }}>
                    멤버십 등급 : {gradeList[user.grade].grade}
                  </span>
                  <ExplainBtn onClick={() => setActiveGrade(true)}>
                    등급 상세
                  </ExplainBtn>
                </MembershipTitle>
                <MembershipDetail>
                  <span>
                    노랑 멤버십 회원이 되시면 회원 일부에게 모바일 상품권 혜택을
                    받으실 수 있습니다
                  </span>
                  <div
                    style={{
                      width: "15%",
                      background: "white",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <GradeIcon src={gradeList[user.grade].icon} />
                  </div>
                </MembershipDetail>
              </MembershipDiv>
            </ProfileHeader>
            <ContentDiv>
              <SideNav>
                <NavLiUl>
                  {navItem.map((item, index) => (
                    <Link
                      key={index}
                      to={{ pathname: `${item.path}`, search: `?page=${1}` }}
                    >
                      <NavLi
                        onClick={() => {
                          setCurrentPage(`${item.path}`);
                        }}
                        isActive={
                          currentPage === `${item.path}` && currentPage !== ""
                        }
                      >
                        {item.title}
                      </NavLi>
                    </Link>
                  ))}
                </NavLiUl>
              </SideNav>

              <Switch>
                <Route path="/mypage/heart">
                  <HeartList />
                </Route>
                <Route path="/mypage/share">
                  <ShareList item={userPosts} />
                </Route>
                <Route path="/mypage/review">
                  <Review />
                </Route>
              </Switch>
            </ContentDiv>
          </Container>
          {activeGrade && <Modal setActiveGrade={setActiveGrade} />}
        </>
      ) : (
        <span>loading..</span>
      )}
    </>
  );
}

export default MyPage;
