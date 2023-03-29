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
import { Navigation, Pagination, Autoplay } from "swiper";
import { useState } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import User from "../components/User";
import Modal from "../../DesktopView/components/Modal";

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
  height: 60px;
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid #e9ecef;
`;

// 이전 버튼
const PrevBox = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #37352f;
`;

const PrevSpan = styled.span`
  font-size: 15px;
  margin-left: 5px;
`;

const PrevIcon = styled(FontAwesomeIcon)``;

// 게시글(제목, 서브제목, 이미지 내용)
const Post = styled(Box)`
  flex-direction: column;
  justify-content: space-evenly;
  border-bottom: none;
`;

const PostTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
`;

const PostSubtitle = styled.span`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.3);
`;

const PostImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 20px;
  padding-top: 0px;
  font-size: 16px;
  line-height: 25px;
`;

// 게시글(좋아요, 조회수)
const PostMore = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
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
  margin-right: 5px;
  ${(props) =>
    props.heart &&
    css`
      animation: ${heartAnimation} 0.3s 1 linear;
    `}
`;

const Morehits = styled.span`
  font-size: 14px;
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

  return (
    <>
      <Container activeGrade={activeGrade}>
        {/* 이전 버튼 */}
        <PrevBox>
          <PrevIcon
            onClick={() => {
              history.goBack();
            }}
            icon={faChevronLeft}
          />
          <PrevSpan>바나나룸</PrevSpan>
          <Link to="/">
            <PrevIcon icon={faHouse} />
          </Link>
        </PrevBox>

        {/* 유저 정보 */}
        {/* <User img="banana.png" grade="bananaIcon.png" /> */}
        <User
          img="bananaface.png"
          grade="bananaIcon.png"
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
            width="25"
            height="25"
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
        <ChatBtn>채팅하기</ChatBtn>
      </Container>
      {activeGrade && (
        <Modal setActiveGrade={setActiveGrade} isMobile={"true"} />
      )}
    </>
  );
}

export default MDetailpost;
