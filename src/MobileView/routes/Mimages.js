import styled from "styled-components";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ItemObj } from "../ItemObj";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { useState } from "react";

const StyledSlider = styled(Slider)`
  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 30px;

    li button:before {
      color: white;
    }
  }
  height: 100%;
`;

const Container = styled.div`
  background-color: black;
  position: relative;
  overflow: hidden;

  height: calc(var(--vh, 1vh) * 100);
`;

const XDiv = styled.div`
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
  z-index: 3;
`;

const XIcon = styled(FontAwesomeIcon)`
  font-size: 13px;
  color: white;
`;

const PostImgDiv = styled(SwiperSlide)`
  position: relative;
  height: 100vh;
`;

const PostImg = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Mimages() {
  const location = useLocation();
  const history = useHistory();

  // url 파라미터를 통해 맞는 옷 상품과 사진 인덱스 가져오기
  const searchParams = new URLSearchParams(location.search);
  const objectValue = searchParams.get("object");
  const filterItemObj = ItemObj.find((item) => item.id === Number(objectValue));
  const index = Number(searchParams.get("index"));

  const settings = {
    dots: true,
    speed: 1000,
    slidesToScroll: 1,
    Infinite: true,
  };

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  }, []);

  return (
    <Container>
      {/* X 버튼 */}
      <XDiv onClick={() => history.goBack()}>
        <XIcon icon={faX} />
      </XDiv>

      {/* 이미지 슬라이더 */}
      <StyledSlider {...settings} initialSlide={index}>
        {filterItemObj.img.map((img, index) => {
          return (
            <PostImgDiv key={index}>
              <PostImg src={require(`../../Img/${img}.jpg`)} />
            </PostImgDiv>
          );
        })}
      </StyledSlider>
    </Container>
  );
}

export default Mimages;
