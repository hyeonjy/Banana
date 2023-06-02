import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import Modal from "../../Modal";
import NewItem from "../components/NewItem";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Post.css";

import PostRightContents from "../components/PostDatil";
import { LoginId } from "../../Data/UserObj";
import { useEffect } from "react";
import useAxios from "../../useAxio";
import ImgFullPage from "./ImgFullPage";

const PageContainer = styled.div`
  max-width: 900px;
  min-width: 900px;
  margin: ${(props) =>
    props.activeModal && !props.activeGrade ? "0px auto" : "70px auto"};
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
  const { postId } = useParams();
  const [imgCurrentIdx, setImgCurrentIdx] = useState(0); // 현재 img 페이지 index
  const [activeGrade, setActiveGrade] = useState(false); // modal - 나머지 blur

  //img 1개 -> Navigation hidden
  const shouldHideNavigation = true; //item.img.length <= 1;
  const [imgFullModal, setImgFullModal] = useState(false);

  // 수정 권한 - 본인 글인지 확인
  const [isWriter, setIsWriter] = useState(false); //item.userId === LoginId;

  // 패치
  const [item, setItem] = useState();
  const [heart, setHeart] = useState();
  const { response, loading, error, refetch, executeGet } = useAxios({
    method: "get",
    url: `http://localhost:8080/postdata/${postId}`,
  });
  useEffect(() => {
    //refetch();
    executeGet();
  }, [postId]);

  useEffect(() => {
    if (!loading) {
      setItem(response.post);
      setHeart(response.heart);
      console.log(response.post.nickname);
      if (response.post.nickname === LoginId) {
        setIsWriter(true);
      } else {
        setIsWriter(false);
      }
    } else {
      if (error) {
        console.log("error:", error);
      }
    }
  }, [response, loading, error, postId]);

  //img 클릭 시 Fullscreen

  // swiper onSlideChange 시 - 현재 img index 저장
  const handleSlideChange = (currentIndex) => {
    setImgCurrentIdx(currentIndex.activeIndex);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (imgFullModal || activeGrade) {
      body.classList.add("no-scroll");
    } else if (!imgFullModal && !activeGrade) {
      body.classList.remove("no-scroll");
    }
  }, [imgFullModal, activeGrade]);
  return (
    <>
      <PageContainer
        activeGrade={activeGrade}
        activeModal={activeGrade || imgFullModal}
      >
        {!item ? (
          <span>Loading..</span>
        ) : (
          <PostContainer>
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
                {item.imgs.map((src, index) => (
                  <ImgSlide
                    key={index}
                    onClick={() => {
                      setImgFullModal(true);
                    }}
                  >
                    <PostImg src={require(`../../Data/Img/${src}`)} />
                  </ImgSlide>
                ))}
                {/* CustomNav */}
                <NavRight
                  icon={faChevronRight}
                  className="post-next"
                ></NavRight>
                <NavLeft icon={faChevronLeft} className="post-prev"></NavLeft>
                {/*세밀하게 custom 할 때 div className="post-pagination"></div> */}
              </StyledSwiper>
            </div>

            {/* 오른쪽 Post Info + 공유/찜/채팅하기 */}
            {item && (
              <PostRightContents
                setActiveGrade={setActiveGrade}
                item={item}
                isWriter={isWriter}
                heart={heart}
                setHeart={setHeart}
              />
            )}
          </PostContainer>
        )}

        <NewItem />
      </PageContainer>

      {/* 모달 : 등급 & 이미지 full */}
      {activeGrade && !imgFullModal && (
        <Modal setActiveGrade={setActiveGrade} />
      )}
      {imgFullModal && !activeGrade && (
        <ImgFullPage
          item={item}
          index={imgCurrentIdx}
          setImgFullModal={setImgFullModal}
        />
      )}
    </>
  );
}
export default Post;
