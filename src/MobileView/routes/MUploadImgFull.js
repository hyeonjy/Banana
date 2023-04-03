import { useEffect } from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "../../DesktopView/routes/ImgFullPage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  background: black;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledSwiper = styled(Swiper)`
  height: 100%;
  position: relative;
`;
const ImgSlide = styled(SwiperSlide)`
  width: 100% !important;
  position: relative;
  margin: 0 auto;
  //padding: 100% 0;
  height: 100%;
`;
const EachImg = styled.img`
  height: auto;
  width: 100%;
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: transparent;
`;

const GoBackBtn = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  right: 10px;

  color: white;
  z-index: 600;
  background-color: #0000002b;
  padding: 8px;
  border-radius: 50%;
  height: 25px;
  width: 29px;
  cursor: pointer;
`;

function MUploadImgFull({ showImages, setImgFull, idx }) {
  useEffect(() => {
    //모바일 브라우저 상단 링크 헤더, 하단 바를 포함해서 100vh로 설정되는 문제 해결
    function setScreenSize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setScreenSize();
  }, []);

  const SwiperProps = {
    initialSlide: idx,
    modules: [Navigation, Pagination],
    spaceBetween: 0,
    slidesPerView: 1,
    navigation: {},
    centeredSlides: true,
    pagination: {
      clickable: true,
      bulletClass: "img-full-swiper-bullet",
      bulletActiveClass: "img-fulll-swiper-bullet-active",
    },
  };
  return (
    <Container>
      {showImages ? (
        <StyledSwiper {...SwiperProps}>
          {showImages.map((item, index) => (
            <ImgSlide key={index}>
              <EachImg key={index} src={item} />
            </ImgSlide>
          ))}
          <GoBackBtn
            icon={faX}
            onClick={() => {
              setImgFull(false);
            }}
          />
        </StyledSwiper>
      ) : (
        <span style={{ fontWeight: "700", fontSize: "20px" }}>
          NO VALID PAGE
        </span>
      )}
    </Container>
  );
}
export default MUploadImgFull;
