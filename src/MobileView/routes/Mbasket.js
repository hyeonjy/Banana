import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ShowItemFn } from "../components/ShowItem";
import { BackIcon, Header } from "./MUpload";

const Container = styled.div``;

const basketList = [
  {
    title: "아기 신발 무료나눔해요",
    content:
      "200 운동화 아이가 발이 쑥쑥 커서 맞지 않아 나눔합니다 상태 나쁘지 않습니다 ",
    area: "서울시",
    timeAge: "1분전",
    img: ["shoes"],
    main: "상의",
    sub: "티셔츠",
    id: 11117,
  },

  {
    title: "새 목걸이 가져가실 분",
    content: "선물 받았는데 취향에 맞지 않아 나눔해요",
    area: "인천시",
    timeAge: "2분전",
    img: ["necklace"],
    main: "상의",
    sub: "티셔츠",
    id: 11118,
  },
  {
    title: "블라우스 나눔합니다!!",
    content: "거의 새거입니다~  ",
    area: "부산시",
    timeAge: "3분전",
    img: ["necklace"],
    main: "상의",
    sub: "블라우스",
    id: 11119,
  },
  {
    title: "블라우스 나눔합니다!!",
    content: "거의 새거입니다~  ",
    area: "부산시",
    timeAge: "3분전",
    img: ["blouse"],
    main: "상의",
    sub: "블라우스",
    id: 11120,
  },
  {
    title: "블라우스 나눔합니다!!",
    content: "거의 새거입니다~  ",
    area: "부산시",
    timeAge: "3분전",
    img: ["blouse"],
    main: "상의",
    sub: "블라우스",
    id: 11121,
  },
  {
    title: "블라우스 나눔합니다!!",
    content: "거의 새거입니다~  ",
    area: "부산시",
    timeAge: "3분전",
    img: ["blouse"],
    main: "상의",
    sub: "블라우스",
    id: 11122,
  },
  {
    title: "블라우스 나눔합니다!!",
    content: "거의 새거입니다~  ",
    area: "부산시",
    timeAge: "3분전",
    img: ["blouse"],
    main: "상의",
    sub: "블라우스",
    id: 11122,
  },
  {
    title: "블라우스 나눔합니다!!",
    content: "거의 새거입니다~  ",
    area: "부산시",
    timeAge: "3분전",
    img: ["blouse"],
    main: "상의",
    sub: "블라우스",
    id: 11122,
  },
  {
    title: "블라우스 나눔합니다!!",
    content: "거의 새거입니다~  ",
    area: "부산시",
    timeAge: "3분전",
    img: ["blouse"],
    main: "상의",
    sub: "블라우스",
    id: 11122,
  },
  {
    title: "블라우스 나눔합니다!!",
    content: "거의 새거입니다~  ",
    area: "부산시",
    timeAge: "3분전",
    img: ["blouse"],
    main: "상의",
    sub: "블라우스",
    id: 11122,
  },
  {
    title: "블라우스 나눔합니다!!",
    content: "거의 새거입니다~  ",
    area: "부산시",
    timeAge: "3분전",
    img: ["blouse"],
    main: "상의",
    sub: "블라우스",
    id: 11122,
  },
  {
    title: "블라우스 나눔합니다!!",
    content: "거의 새거입니다~  ",
    area: "부산시",
    timeAge: "3분전",
    img: ["blouse"],
    main: "상의",
    sub: "블라우스",
    id: 11122,
  },
];

function Mbasket() {
  const history = useHistory();

  return (
    <Container>
      {/* 찜 목록 헤더 */}
      <Header style={{ position: "fixed", top: "0" }}>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
          icon={faChevronLeft}
        />
        <span>찜 목록</span>
      </Header>
      {/* 찜 리스트*/}
      <ShowItemFn item={basketList} pad={true} />
    </Container>
  );
}

export default Mbasket;
