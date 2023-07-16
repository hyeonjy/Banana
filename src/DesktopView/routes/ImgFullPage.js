import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./ImgFullPage.css";
const ImgContainer = styled.div`
  position: fixed;
  z-index: 500;
  top: ${(props) => props.topPosition};
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
`;
const StyledSwiper = styled(Swiper)`
  width: 100%;
  max-width: 800px;
`;
const ImgSlide = styled(SwiperSlide)`
  width: 100% !important;
  position: relative;
  margin: 0 auto;
  padding: 50vh 0 50vh 0;
  height: 0;
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
  top: 20px;
  right: 25px;

  color: white;
  z-index: 600;
  background-color: #0000002b;
  padding: 8px;
  border-radius: 50%;
  height: 18px;
  width: 20px;
  cursor: pointer;
`;
const ImgFullPage = ({ item, index, setImgFullModal }) => {
  //서버에서 이미지 불러오려고 하다가 - 모달로 변경
  // 스크롤 위치
  let scrollTop = document.documentElement.scrollTop;

  return (
    <ImgContainer topPosition={scrollTop}>
      <StyledSwiper
        initialSlide={index}
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
          //el: ".img-full-pagination",
          bulletClass: "img-full-swiper-bullet",
          bulletActiveClass: "img-fulll-swiper-bullet-active",
          // renderBullet: function (index, postBullet) {
          //   return '<span class="' + postBullet + '"> </span>';
          // },
        }}
      >
        {item.imgs.map((item, index) => (
          <ImgSlide key={index}>
            <EachImg
              key={index}
              // src={require(`../../Data/Img/${item}`)}
              alt={item.filename}
              src={`data:image/jpeg;base64,${item.data}`}
            />
          </ImgSlide>
        ))}
        <GoBackBtn
          icon={faX}
          onClick={() => {
            setImgFullModal(false);
          }}
        />
        {/* <div className="img-full-pagination"></div>*/}
      </StyledSwiper>
    </ImgContainer>
  );
};
export default ImgFullPage;
