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
import { useEffect } from "react";
import ImgFullPage from "./ImgFullPage";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { postPageApi } from "../../Api";
import jwtDecode from "jwt-decode";
import { useRecoilValue } from "recoil";
import { LoginState } from "../../atom";

const PageContainer = styled.div`
  max-width: 900px;
  min-width: 900px;
  @media screen and (max-width: 830px) {
    width: 100vw;
    min-width: unset;
  }
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
  @media screen and (max-width: 830px) {
    flex-direction: column;
    align-items: center;
  }
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
  @media screen and (max-width: 830px) {
    width: 500px;
    height: 500px;
  }
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
  @media screen and (max-width: 830px) {
    width: 500px;
    height: 500px;
  }
  object-fit: cover;
`;
//-----이미지(+swiper) 끝-----//

//스켈레톤
const SkeletonDetail = styled(Skeleton)`
  margin: 10px 0 0 0px;

  @media (max-width: 830px) {
    margin: 15px 0;
  }
`;
const SkeletonUser = styled(Skeleton)`
  margin: 0 0 10px 0px;

  @media (max-width: 830px) {
    margin: 15px 0;
  }
`;

function Post() {
  const { postId } = useParams();
  const [imgCurrentIdx, setImgCurrentIdx] = useState(0); // 현재 img 페이지 index
  const [activeGrade, setActiveGrade] = useState(false); // modal - 나머지 blur
  const isLoggedin = useRecoilValue(LoginState); //로그인 상태

  //img 1개 -> Navigation hidden
  const shouldHideNavigation = true; //item.img.length <= 1;
  const [imgFullModal, setImgFullModal] = useState(false);

  // 수정 권한 - 본인 글인지 확인
  const [isWriter, setIsWriter] = useState(false); //item.userId === LoginId;

  // 게시글 패치
  const { data, refetch } = useQuery(["postDatail", postId], () => {
    return postPageApi({
      postId,
      currentUserId: isLoggedin
        ? jwtDecode(localStorage.getItem("token")).userId
        : undefined,
    });
  });
  useEffect(() => {
    refetch();
  }, [postId]);

  useEffect(() => {
    if (data && isLoggedin) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      const currentUserId = decodedToken?.userId;
      if (currentUserId) {
        setIsWriter(currentUserId === data.post.userId);
      }
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <PageContainer
        activeGrade={activeGrade}
        activeModal={activeGrade || imgFullModal}
      >
        {!data?.post ? (
          <PostContainer>
            <Skeleton
              height={windowWidth > 830 ? "400px" : "500px"}
              width={windowWidth > 830 ? "400px" : "500px"}
            />
            <PostRightDiv>
              <SkeletonUser
                height={"55px"}
                width={windowWidth > 830 ? "440px" : "500px"}
              />

              <SkeletonDetail
                height={"250px"}
                width={windowWidth > 830 ? "440px" : "500px"}
              />
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
              user={data.user}
              isWriter={isWriter}
              isLoggedin={isLoggedin}
              initHeart={data.heart}
              // setHeart={setHeart}
            />
          </PostContainer>
        )}
        {windowWidth > 830 && <NewItem />}
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
