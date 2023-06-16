import React from "react";
import { useParams } from "react-router-dom";
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

import PostRightContents, {
  Header,
  PostContent,
  PostContents,
  PostRightDiv,
} from "../components/PostDatil";
import { LoginId } from "../../Data/UserObj";
import { useEffect } from "react";
import ImgFullPage from "./ImgFullPage";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { postPageApi } from "../../Api";

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
  const [loopIdx, setLoopIdx] = useState(0);
  const [activeGrade, setActiveGrade] = useState(false); // modal - 나머지 blur

  //img 1개 -> Navigation hidden
  const shouldHideNavigation = true; //item.img.length <= 1;
  const [imgFullModal, setImgFullModal] = useState(false);

  // 수정 권한 - 본인 글인지 확인
  const [isWriter, setIsWriter] = useState(false); //item.userId === LoginId;

  // 패치
  const { data, refetch } = useQuery(["postDatail", postId], () =>
    postPageApi(postId)
  );
  useEffect(() => {
    refetch();
  }, [postId]);

  useEffect(() => {
    if (data) {
      console.log(data.post.imgs);
      setIsWriter(LoginId === data.post.nickname);
    }
  }, [data]);

  // swiper onSlideChange 시 - 현재 img index 저장
  const handleSlideChange = (swiper) => {
    setImgCurrentIdx(swiper.realIndex);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (imgFullModal || activeGrade) {
      body.classList.add("no-scroll");
    } else if (!imgFullModal && !activeGrade) {
      body.classList.remove("no-scroll");
    }
    return () => body.classList.remove("no-scroll");
  }, [imgFullModal, activeGrade]);

  return (
    <>
      <PageContainer
        activeGrade={activeGrade}
        activeModal={activeGrade || imgFullModal}
      >
        {!data?.post ? (
          <PostContainer>
            <Skeleton height={"400px"} width={"400px"} />
            <PostRightDiv>
              <Header styled={{ paddingLeft: "30px" }}>
                <Skeleton height={"55px"} width={440} />
              </Header>
              <PostContents>
                <PostContent>
                  <Skeleton height={"190px"} width={"100%"} />
                </PostContent>
              </PostContents>
            </PostRightDiv>
          </PostContainer>
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
                {data.post.imgs.map((src, index) => (
                  <ImgSlide
                    key={index}
                    onClick={() => {
                      setImgFullModal(true);
                    }}
                  >
                    <PostImg
                      alt={src.filename}
                      src={`data:image/jpeg;base64,${src.data}`}

                      // src={require(`../../../upload/${src}`)}
                      // src={require(`../../Data/Img/${src}`)}
                    />
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
            <PostRightContents
              setActiveGrade={setActiveGrade}
              item={data.post}
              isWriter={isWriter}
              initHeart={data.heart}
              // setHeart={setHeart}
            />
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
          item={data.post}
          index={imgCurrentIdx}
          setImgFullModal={setImgFullModal}
        />
      )}
    </>
  );
}
export default Post;
