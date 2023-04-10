import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import Modal from "../components/Modal";
import NewItem from "../components/NewItem";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Post.css";

import PostRightContents from "../components/PostDatil";
import { ItemObj } from "../../Data/ItemObj";
import { LoginId } from "../../Data/UserObj";

const PageContainer = styled.div`
  max-width: 900px;
  min-width: 900px;
  margin: 70px auto;
  padding-top: 30px;
  filter: ${(props) => (props.activeGrade ? "blur(2px)" : "unset")};
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(187, 187, 187, 0.42);
  padding-bottom: 30px;
`;

//-----------이미지(+Swiper)-----------//

const NavLeft = styled(FontAwesomeIcon)`
  left: -28px;
  opacity: 0;
  transition: all 0.5s;
`;
const NavRight = styled(FontAwesomeIcon)`
  right: -28px;
  opacity: 0;
  transition: all 0.5s;
`;
const StyledSwiper = styled(Swiper)`
  width: 400px;
  position: relative;
  &:hover {
    ${NavLeft} {
      left: 0px;
    }
    ${NavRight} {
      right: 0px;
    }
    ${NavLeft}, ${NavRight} {
      opacity: 1;
    }
  }
`;
const ImgSlide = styled(SwiperSlide)``;
const PostImg = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
`;
//-----이미지(+swiper) 끝-----//

function Post() {
  const history = useHistory(); // img Full screen 이동
  const { postId } = useParams();
  const item = ItemObj.find((item) => item.itemId === Number(postId)); // Post info query
  const [imgCurrentIdx, setImgCurrentIdx] = useState(0); // 현재 img 페이지 index
  const [activeGrade, setActiveGrade] = useState(false); // modal - 나머지 blur

  //img 클릭 시 Fullscreen
  function handleImageClick() {
    const searchParams = new URLSearchParams();
    searchParams.append("object", item.itemId);
    searchParams.append("index", imgCurrentIdx);
    history.push({
      pathname: "/img",
      state: { index: imgCurrentIdx }, //현재 이미지 index
      search: "?" + searchParams.toString(), //query string
    });
  }
  // swiper onSlideChange 시 - 현재 img index 저장
  const handleSlideChange = (currentIndex) => {
    setImgCurrentIdx(currentIndex.activeIndex);
  };

  //img 1개 -> Navigation hidden
  const shouldHideNavigation = item.img.length <= 1;

  // 수정 권한
  // 본인 글인지 확인
  const isWriter = item.userId === LoginId;

  return (
    <>
      <PageContainer activeGrade={activeGrade}>
        <PostContainer>
          {/* Post Image Slider */}
          <div>
            <StyledSwiper
              //containerClassName="post-swiper"
              className="post-swiper"
              onSlideChange={handleSlideChange}
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              loop={true}
              grabCursor={true}
              slidesPerView={1}
              navigation={{
                //Navi custom
                nextEl: ".post-next",
                prevEl: ".post-prev",
                onlyInViewport: true,
                disabledClass: "post-disabled",
                hiddenClass: "post-disabled",
                hidden: shouldHideNavigation, //swiper에서 제공하는 속성은 x (기본 속성)
              }}
              pagination={{
                clickable: true,
                //el: ".post-pagination",
                bulletClass: "post-swiper-bullet",
                bulletActiveClass: "post-swiper-bullet-active",
              }}
            >
              {/* PostImg */}
              {item.img.map((item, index) => (
                <ImgSlide key={index} onClick={handleImageClick}>
                  <PostImg src={require(`../../Img/${item}.jpg`)} />
                </ImgSlide>
              ))}
              {/* CustomNav */}
              <NavRight icon={faChevronRight} className="post-next"></NavRight>
              <NavLeft icon={faChevronLeft} className="post-prev"></NavLeft>
              {/*세밀하게 custom 할 때 div className="post-pagination"></div> */}
            </StyledSwiper>
          </div>

          {/* 오른쪽 Post Info + 공유/찜/채팅하기 */}
          <PostRightContents
            setActiveGrade={setActiveGrade}
            item={item}
            isWriter={isWriter}
          />
        </PostContainer>
        <NewItem />
      </PageContainer>

      {/* 클릭 시 모달 */}
      {activeGrade && <Modal setActiveGrade={setActiveGrade} />}
    </>
  );
}
export default Post;
