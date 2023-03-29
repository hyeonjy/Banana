import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

const Header = styled.div`
  height: 30px;
  display: flex;
  padding: 10px 20px;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
`;

const PrevIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  justify-content: flex-start;
`;

const HeaderSpan = styled.span`
  font-size: 18px;
  width: 100%;
  text-align: center;
  margin-right: 5px;
`;

const ItemDiv = styled.div`
  width: 100%;
  height: auto;
  font-family: "Pretendard";
  min-height: calc(100vh - 360px - 160px); ;
`;
const ItemTitle = styled.span``;
const ItemContent = styled.span``;
const ItemArea = styled.span``;
const ItemTimeAgo = styled.span``;
const ItemText = styled.div`
  width: 60%;
  margin-top: 10px;
  ${ItemTitle} {
    font-size: 15px;
    font-weight: 800;
    display: block;
    margin-bottom: 7px;
  }
  ${ItemContent} {
    display: block;
    overflow: hidden; // 을 사용해 영역을 감출 것
    text-overflow: ellipsis; // 로 ... 을 만들기
    white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
    word-break: break-all;
    height: 20px;
    font-size: 13px;
    width: 100%;
    margin-bottom: 0px;
  }
  ${ItemArea} {
    margin-right: 6px;
    font-size: 12px;
    color: gray;
  }
  ${ItemTimeAgo} {
    font-size: 11px;
    color: gray;
  }
`;
const ItemImg = styled.img`
  width: 24%;
  height: 100%;
`;
const Item = styled.div`
  height: 90px;
  border-bottom: 1px solid #b6b6b663;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const EmptyPage = styled.div`
  width: 100%;
  height: calc(100vh - 360px - 160px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;

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
];

function Mbasket() {
  const history = useHistory();

  return (
    <Container>
      {/* 찜 목록 헤더 */}
      <Header>
        <PrevIcon
          onClick={() => {
            history.goBack();
          }}
          icon={faChevronLeft}
        />
        <HeaderSpan>찜 목록</HeaderSpan>
      </Header>

      {/* 찜 리스트*/}
      <>
        {basketList.length > 0 ? (
          <ItemDiv>
            {basketList.map((item, index) => (
              <Link to={`/clothes/${item.id}`} key={item.id}>
                <Item>
                  <ItemText>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemContent>{item.content}</ItemContent>
                    <ItemArea>{item.area}</ItemArea>
                    <ItemTimeAgo>{item.timeAge}</ItemTimeAgo>
                  </ItemText>
                  <ItemImg src={require(`../../Img/${item.img[0]}.jpg`)} />
                </Item>
              </Link>
            ))}
          </ItemDiv>
        ) : (
          <EmptyPage>찜이 없습니다</EmptyPage>
        )}
      </>
    </Container>
  );
}

export default Mbasket;
