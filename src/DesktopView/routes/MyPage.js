import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import profile from "../../Img/profile.jpg";
import { Link, Route, Switch } from "react-router-dom";
import HeartList from "./HeartList";
import ShareList from "./ShareList";
import { useState } from "react";
import Modal from "../components/Modal";

const Container = styled.div`
  padding-top: 90px;
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
  padding: 1.5% 5%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #bbbbbb6b;
`;

export const ProfileImg = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-image: url(${profile});
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
  { title: "나눔 목록", path: "share" },
  { title: "찜 목록", path: "heart" },
  { title: "테마설정", path: "" },
  { title: "공지사항", path: "" },
  { title: "알림설정", path: "" },
  { title: "고객센터", path: "" },
  { title: "개인정보 처리방침", path: "" },
  { title: "로그아웃", path: "" },
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
  const [currentPage, setCurrentPage] = useState("share");
  const [activeGrade, setActiveGrade] = useState(false);
  return (
    <>
      <Container activeGrade={activeGrade}>
        <ProfileHeader>
          <ProfileImg />
          <ProfileName>바나나 님</ProfileName>
          <MembershipDiv>
            <MembershipTitle>
              <span style={{ verticalAlign: "middle" }}>
                멤버십 등급 : 새싹
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
              <div style={{ width: "15%", background: "white" }}>
                <MembershipIcon icon={faSeedling} />
              </div>
            </MembershipDetail>
          </MembershipDiv>
        </ProfileHeader>
        <ContentDiv>
          <SideNav>
            <NavLiUl>
              {navItem.map((item, index) => (
                <Link key={index} to={`/mypage/${item.path}`}>
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
              <ShareList />
            </Route>
          </Switch>
        </ContentDiv>
      </Container>
      {activeGrade && <Modal setActiveGrade={setActiveGrade} />}
    </>
  );
}

export default MyPage;
