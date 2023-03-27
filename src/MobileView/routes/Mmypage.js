import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeMenu from "../components/HomeMenu";
import User from "../components/User";

const Container = styled.div``;

const MyListDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 30px;
  /* border-bottom: 1px solid #e9ecef; */
`;

const MyList = [
  { name: "나눔목록", url: "/mypage/share" },
  { name: "찜목록", url: "/mypage/basket" },
  { name: "테마설정(리스트)", url: "/mypage" },
  { name: "공지사항", url: "/mypage" },
  { name: "알림설정", url: "/mypage" },
  { name: "고객센터", url: "/mypage" },
  { name: "개인정보 처리방침", url: "/mypage" },
  { name: "로그아웃", url: "/mypage" },
];

const ListSpan = styled.span`
  font-size: 20px;
  line-height: 45px;
  color: gray;
`;

function Mmypage() {
  return (
    <Container>
      <User img="banana.png" grade="bananaIcon.png" />
      <MyListDiv>
        {MyList.map((li, index) => (
          <Link to={li.url} key={index}>
            <ListSpan>{li.name}</ListSpan>
          </Link>
        ))}
      </MyListDiv>

      <HomeMenu />
    </Container>
  );
}

export default Mmypage;
