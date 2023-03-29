import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import HomeMenu from "../components/HomeMenu";
import User from "../components/User";
import { useState } from "react";
import Modal from "../../DesktopView/components/Modal";

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  filter: ${(props) => (props.activeGrade ? "blur(2px)" : "unset")};
  ${(props) => {
    if (props.activeGrade) {
      return css`
        height: 100vh;
      `;
    }
  }}
`;

const MainWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid #e9ecef;
`;

const MainDiv = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainCircle = styled.div`
  background-color: rgb(255, 181, 45);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
`;

const MainIcon = styled(FontAwesomeIcon)`
  color: white;
`;

const MainSpan = styled.span`
  font-size: 13px;
  text-align: center;
  display: block;
  margin-top: 8px;
  font-weight: 600;
`;

const SubListDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 30px;
  width: 100%;
  height: 460px;
`;

const ListSpan = styled.span`
  font-size: 18px;
  line-height: 45px;
  color: gray;
`;

const MainList = [
  { name: "나눔목록", url: "/mypage/share", icon: <MainIcon icon={faStore} /> },
  {
    name: "찜목록",
    url: "/mypage/basket",
    icon: <MainIcon icon={faCartShopping} />,
  },
  {
    name: "로그아웃",
    url: "/login",
    icon: <MainIcon icon={faRightFromBracket} />,
  },
];

const SubList = [
  { name: "테마설정(리스트)", url: "/mypage" },
  { name: "공지사항", url: "/mypage" },
  { name: "알림설정", url: "/mypage" },
  { name: "고객센터", url: "/mypage" },
  { name: "개인정보 처리방침", url: "/mypage" },
  { name: "잠금화면설정", url: "/mypage" },
  { name: "알람", url: "/mypage" },
  { name: "설정 및 개인정보", url: "/mypage" },
  { name: "버전정보", url: "/mypage" },
];

function Mmypage() {
  const [activeGrade, setActiveGrade] = useState(false);

  return (
    <>
      <Container activeGrade={activeGrade}>
        <User
          img="bananaface.png"
          grade="bananaIcon.png"
          setActiveGrade={setActiveGrade}
        />
        <MainWrap>
          {MainList.map((li, index) => (
            <MainDiv key={index}>
              <Link to={li.url}>
                <MainCircle>{li.icon}</MainCircle>
                <MainSpan>{li.name}</MainSpan>
              </Link>
            </MainDiv>
          ))}
        </MainWrap>
        <SubListDiv>
          {SubList.map((li, index) => (
            <Link to={li.url} key={index}>
              <ListSpan key={li.name}>{li.name}</ListSpan>
            </Link>
          ))}
        </SubListDiv>

        <HomeMenu />
      </Container>

      {activeGrade && (
        <Modal setActiveGrade={setActiveGrade} isMobile={"true"} />
      )}
    </>
  );
}

export default Mmypage;
