import { Link, useHistory, useParams } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { ItemObj } from "../ItemObj";
import banana from "../../Img/banana.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faHouse,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper";
import { useState } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import User from "../components/User";
import Modal from "../../DesktopView/components/Modal";
import { LoginId, UserObj } from "../../UserObj";

const Container = styled.div`
  background-color: white;
  filter: ${(props) => (props.activeGrade ? "blur(2px)" : "unset")};
  ${(props) => {
    if (props.activeGrade) {
      return css`
        height: 100vh;
      `;
    }
  }}
`;

const Box = styled.div`
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid #e9ecef;
`;

// Header
const Header = styled.div`
  width: 90%;
  height: 25px;
  padding: 15px 5%;
  background-color: yellow;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #37352f;
`;

const HeaderTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-left: 5px;
`;

const PrevIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
`;

// 게시글(제목, 서브제목, 이미지 내용)
const Post = styled(Box)`
  flex-direction: column;
  border-bottom: none;
`;

const PostTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  margin-bottom: 3px;
`;

const PostSubtitle = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.3);
`;

const PostImg = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 20px;
  padding-top: 0px;
  font-size: 14.5px;
  line-height: 25px;
`;

// 게시글(좋아요, 조회수)
const PostMore = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  //border-bottom: 1px solid #e9ecef;
  color: rgba(0, 0, 0, 0.5);
  svg {
    transition: all 0.3s;
    cursor: pointer;
  }
`;

const heartAnimation = keyframes`
  0%{
    transform: none;
  }
  60%{
    transform: scale(1.3);
  }
  100%{
    transform: none;
  }
`;

const HeartSvg = styled.svg`
  margin-right: 7px;
  ${(props) =>
    props.heart &&
    css`
      animation: ${heartAnimation} 0.3s 1 linear;
    `}
`;

const Morehits = styled.span`
  font-size: 13px;
`;

// 채팅하기 버튼
const ChatBtn = styled.div`
  width: fit-content;
  background-color: rgb(255, 181, 45);
  position: fixed;
  right: 22px;
  bottom: 20px;
  border-radius: 20px;
  height: fit-content;
  padding: 15px;
  letter-spacing: 0.5px;
  color: white;
  font-weight: 700;
  font-size: 14.5px;
`;

function MDetailpost(props) {
  const [hits, setHits] = useState(123); /**조회수 */
  const [heart, setHeart] = useState(false); /**좋아요 */
  const [index, setIndex] = useState(0); /**사진 인덱스 */
  const { clothesid } = useParams();
  const history = useHistory();

  const [activeGrade, setActiveGrade] = useState(false);

  // url 파라미터를 통해 맞는 옷 상품 가져오기
  const filterItemObj = ItemObj.find((item) => item.id === Number(clothesid));
  const FilterUserObj = UserObj.find(
    (item) => item.id === filterItemObj.userId
  );

  //img 클릭 시 Fullscreen
  function handleImageClick(props) {
    const searchParams = new URLSearchParams();
    searchParams.append("object", clothesid);
    searchParams.append("index", index);
    history.push({
      pathname: "/images",
      search: "?" + searchParams.toString(),
    });
  }

  // swiper onSlideChange 시 - 현재 img index 저장
  const handleSlideChange = (currentIndex) => {
    setIndex(currentIndex.activeIndex);
  };

  //채팅목록 클릭 이벤트
  const handleChatClick = (userId, clothesId) => {
    const searchParams = new URLSearchParams();
    searchParams.append("userId", userId);
    searchParams.append("itemId", clothesId);
    history.push({
      pathname: "/chat",
      search: "?" + searchParams.toString(),
    });
  };

  return (
    <>
      <Container activeGrade={activeGrade}>
        {/* Header */}
        <Header>
          <PrevIcon
            onClick={() => {
              history.goBack();
            }}
            icon={faChevronLeft}
          />
          <HeaderTitle>BANANA</HeaderTitle>
          <Link to="/">
            <PrevIcon icon={faHouse} />
          </Link>
        </Header>
        {/* 유저 정보 */}
        <User
          userId={FilterUserObj.id}
          img={FilterUserObj.src}
          grade={FilterUserObj.grade}
          setActiveGrade={setActiveGrade}
        />
        {/* 게시글 이미지  */}
        {/* 사진 클릭하면 Mimages.js로 이동, obj와 클릭한 사진 인덱스 전달 */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {}}
          onSlideChange={handleSlideChange}
        >
          {filterItemObj.img.map((img, index) => {
            return (
              <SwiperSlide key={index} onClick={handleImageClick}>
                <PostImg src={require(`../../Img/${img}.jpg`)} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* 게시글 제목 - 카테고리|지역|시간 */}
        <Post>
          <PostTitle>{filterItemObj.title}</PostTitle>
          <PostSubtitle>
            {filterItemObj.sub} | {filterItemObj.area} | {filterItemObj.timeAge}
          </PostSubtitle>
        </Post>
        {/* 게시글 내용 */}
        <PostContent>{filterItemObj.content}</PostContent>
        {/* 게시글 하트, 조회수 */}
        <PostMore>
          <HeartSvg
            heart={heart}
            width="30"
            height="30"
            viewBox="12 10 30 40"
            fill={heart ? "tomato" : "none"}
            stroke="rgba(0, 0, 0, 0.5)"
            strokeWidth="1.3"
            onClick={() => setHeart(!heart)}
          >
            <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" />
          </HeartSvg>
          <Morehits>조회수 {hits}</Morehits>
        </PostMore>
        {/* 채팅하기 버튼 */}
        {FilterUserObj.id === LoginId ? (
          <ChatBtn>삭제하기</ChatBtn>
        ) : (
          <ChatBtn onClick={() => handleChatClick(FilterUserObj.id, clothesid)}>
            채팅하기
          </ChatBtn>
        )}
      </Container>
      {activeGrade && (
        <Modal setActiveGrade={setActiveGrade} isMobile={"true"} />
      )}
    </>
  );
}

export default MDetailpost;
