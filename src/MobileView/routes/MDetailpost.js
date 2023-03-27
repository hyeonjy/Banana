import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ItemObj } from "../ItemObj";
import banana from "../../Img/banana.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

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

const Container = styled.div``;

const Box = styled.div`
  height: 60px;
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid #e9ecef;
`;

// 게시글(제목, 서브제목, 이미지 내용)
const Post = styled(Box)`
  flex-direction: column;
  justify-content: space-evenly;
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
`;

const PostContent = styled.div`
  padding: 20px;
  font-size: 18px;
  line-height: 25px;
`;

// 게시글(좋아요, 조회수)
const PostMore = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  color: rgba(0, 0, 0, 0.5);
`;

const Moreheart = styled(FontAwesomeIcon)`
  font-size: 22px;
  margin-right: 10px;
`;

const Morehits = styled.span`
  font-size: 14px;
`;

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

function MDetailpost() {
  const [hits, setHits] = useState(123); /**조회수 */
  const [heart, setHeart] = useState(false); /**좋아요 */
  const { clothesid } = useParams();

  // url 파라미터를 통해 맞는 옷 상품 가져오기
  const filterItemObj = {
    ...ItemObj.filter((item) => item.id === parseInt(clothesid))[0],
  };

  return (
    <Container>
      {/* 유저 정보 */}
      <User img="banana.png" grade="bananaIcon.png" />

      {/* 게시글 제목 - 카테고리|지역|시간 */}
      <Post>
        <PostTitle>{filterItemObj.title}</PostTitle>
        <PostSubtitle>
          {filterItemObj.sub} | {filterItemObj.area} | {filterItemObj.timeAge}
        </PostSubtitle>
      </Post>

      {/* 게시글 이미지  */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
      >
        {filterItemObj.img.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <PostImg src={require(`../../Img/${img}.jpg`)} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* 게시글 내용 */}
      <PostContent>{filterItemObj.content}</PostContent>

      {/* 게시글 하트, 조회수 */}
      <PostMore>
        <Moreheart icon={faHeart} />
        <Morehits>조회수 {hits}</Morehits>
      </PostMore>

      {/* 채팅하기 버튼 */}
      <ChatBtn>채팅하기</ChatBtn>
    </Container>
  );
}

export default MDetailpost;
