import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import banana from "../../Img/banana.png";
import earth3 from "../../Img/earth3.png";
import present from "../../Img/present.png";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../Desktop.css";

const Container = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/*배너 1 - 시작 */
const Banner1Box = styled(Container)`
  background-color: #fae100;
`;

const Banner1Img = styled.div`
  border-radius: 50%;
  box-shadow: rgba(199, 164, 102, 0.45) 11px 7px 0px 1px;
  width: 250px;
  height: 250px;
  background-color: white;
  background-image: url(${banana});
  background-size: auto 125%;
  background-position: 67% -38%;
  background-repeat: no-repeat;
`;

const Banner1Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 120px;
  height: 380px;
`;

const Banner1TitleSpan = styled.span``;

const Banner1TitleBox = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  //margin-bottom: 10px;
  ${Banner1TitleSpan} {
    font-size: 20px;
    font-weight: 500;
    font-family: yg-jalnan;
    color: white;
    span {
      font-style: italic;
      font-size: 50px;
      font-weight: 800;
      margin-right: 30px;
      color: rgb(255 245 181);
      //color: rgb(248 255 157);
      //color: rgb(253 160 0);
      font-family: "yg-jalnan";
      //text-shadow: rgb(106 106 106 / 66%) 1px 1px,, rgb(255, 197, 96) 0px 0px,
      // rgb(253 160 0) 5px 0px, rgb(255 165 8) 8px 2px;
      text-shadow: rgb(106 106 106 / 66%) 0px 0px, rgb(255, 197, 96) 0px 0px,
        rgb(253 160 0) 7px 6px, rgb(253 160 0) 7px 6px;
    }
  }
`;

const Banner1ContentBox = styled.div`
  line-height: 20px;
  border-radius: 20px;
  padding: 15px 22px;
  background-color: rgb(27 27 27 / 8%); ;
`;
const Banner1Content = styled.h1`
  font-size: 12px;
  color: rgb(255 255 255 / 90%);
  //margin: 5px;
  font-family: "Pretendard";
  font-weight: 800;
`;
/*배너 1 - 끝 */

/**배너2 = 시작 */
const Banner2Box = styled(Container)`
  background-color: #cef2be;
  position: relative;
  overflow: hidden;
`;

const Banner2Img = styled.img.attrs({
  src: `${earth3}`,
})`
  width: 400px;
  height: 400px;
  z-index: 2;
  margin-left: 15px;
`;

const Banner2Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Banner2TitleSpan = styled.span``;

const Banner2TitleBox = styled.div`
  //width: 480px;

  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  ${Banner2TitleSpan} {
    font-size: 30px;
    font-weight: 500;
    font-family: yg-jalnan;
    span {
      font-size: 50px;
      font-weight: 800;
      font-family: "yg-jalnan";
      margin-left: 20px;
    }
  }
`;

const Banner2Triangle = styled.div`
  transform: rotate(317deg) translate(0%, 90%);
  background-color: rgb(128, 208, 146);
  width: 968px;
  height: 518px;
  position: fixed;
  right: -15%;
  bottom: 30%;
`;
/**배너2 - 끝 */

/*배너3 -시작*/
const Banner3Box = styled(Container)`
  background-color: #fac2c2;
`;

const Banner3Detail = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Banner3Content = styled.h1`
  width: 145px;
  text-align: end;
  font-size: 15px;
  color: white;
  font-weight: 600;
  background-color: #eba2a2;
  border-radius: 20px;
  padding: 11px 20px;
  transform: rotate(352deg) translate(0%, -75%);
  position: relative;
`;

const BananaIcon = styled(FontAwesomeIcon)`
  font-size: 40px;
  color: rgb(250, 225, 0);
  margin-right: 8px;
  position: absolute;
  top: -2px;
  left: -0px;
`;

const Banner3TitleSpan = styled.span``;

const Banner3TitleBox = styled.div`
  font-style: italic;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  transform: rotate(352deg);
  margin-top: -20px;
  ${Banner3TitleSpan} {
    font-size: 50px;
    font-weight: 500;
    font-family: yg-jalnan;
    margin-bottom: 30px;
  }
`;

const Banner3Img = styled.img.attrs({
  src: `${present}`,
})`
  width: 350px;
  //position: fixed;
  //right: 10%;
`;
/*배너3 -끝*/

const Banner1 = () => {
  return (
    <Banner1Box>
      <Banner1Img />
      <Banner1Detail>
        <Banner1TitleBox>
          <Banner1TitleSpan>
            <span>바</span>로
          </Banner1TitleSpan>
          <Banner1TitleSpan>
            <span>나</span>누고
          </Banner1TitleSpan>
          <Banner1TitleSpan>
            <span>나</span>눔 받자
          </Banner1TitleSpan>
        </Banner1TitleBox>
        <Banner1ContentBox>
          <Banner1Content>
            <span style={{ fontSize: "larger" }}>BANANA</span> 는 의류 나눔을
            통해
          </Banner1Content>
          <Banner1Content style={{ paddingLeft: "15px" }}>
            친환경적인 세상을 만듭니다.
          </Banner1Content>
        </Banner1ContentBox>
      </Banner1Detail>
    </Banner1Box>
  );
};

const Banner2 = () => {
  return (
    <Banner2Box>
      <Banner2Detail>
        <Banner2TitleBox>
          <Banner2TitleSpan>
            나는 <span style={{ color: "#E06666" }}>옷</span>가
            <span style={{ color: "#38761D" }}>지구</span>
          </Banner2TitleSpan>
          <Banner2TitleSpan>
            지구와 <span style={{ color: "#E06666" }}>친해</span>
            <span style={{ color: "#38761D" }}>지구</span>
          </Banner2TitleSpan>
        </Banner2TitleBox>
      </Banner2Detail>
      <Banner2Img />
      <Banner2Triangle />
    </Banner2Box>
  );
};

const Banner3 = () => {
  return (
    <Banner3Box>
      <Banner3Detail>
        <Banner3Content>
          <BananaIcon icon={faLeaf} />
          노랑 멤버십 달성 시
        </Banner3Content>
        <Banner3TitleBox>
          <Banner3TitleSpan>업사이클링 의류</Banner3TitleSpan>
          <Banner3TitleSpan>선택 증정</Banner3TitleSpan>
        </Banner3TitleBox>
      </Banner3Detail>

      <Banner3Img />
    </Banner3Box>
  );
};

function Banner() {
  return (
    <>
      <Swiper
        speed={1000}
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        //autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <SwiperSlide>
          <Banner1 />
        </SwiperSlide>
        <SwiperSlide>
          <Banner2 />
        </SwiperSlide>
        <SwiperSlide>
          <Banner3 />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Banner;
