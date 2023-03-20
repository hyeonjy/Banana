import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import banana from "../../Img/banana.png";
import earth3 from "../../Img/earth3.png";
import present from "../../Img/present.png";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../Desktop.css";

const Container = styled.div`
  height: 650px;
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
  width: 400px;
  height: 400px;
  background-color: white;
  background-image: url(${banana});
  background-size: auto 122%;
  background-position: 67% -25%;
  background-repeat: no-repeat;
`;

const Banner1Detail = styled.div`
  width: 400px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 120px;
`;

const Banner1TitleSpan = styled.span``;

const Banner1TitleBox = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 30px;
  ${Banner1TitleSpan} {
    font-size: 45px;
    font-weight: 500;
    font-family: yg-jalnan;
    span {
      font-size: 72px;
      font-weight: 800;
      margin-right: 30px;
      color: rgb(255 245 181);
      font-family: "yg-jalnan";
      text-shadow: rgb(255, 197, 96) 0px 0px, rgb(255, 197, 96) 0px 0px,
        rgb(253 160 0) 5px 0px, rgb(255 165 8) 8px 2px;
    }
  }
`;

const Banner1Content = styled.h1`
  font-size: 25px;
  color: white;
  margin: 5px;
  font-weight: 600;
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
  width: 600px;
  height: 600px;
  z-index: 2;
  margin-left: 15px;
`;

const Banner2Detail = styled.div`
  width: 500px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Banner2TitleSpan = styled.span``;

const Banner2TitleBox = styled.div`
  width: 550px;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  ${Banner2TitleSpan} {
    font-size: 50px;
    font-weight: 500;
    font-family: yg-jalnan;
    span {
      font-size: 70px;
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
  position: absolute;
  right: 0%;
  bottom: 30%;
`;
/**배너2 - 끝 */

/*배너3 -시작*/
const Banner3Box = styled(Container)`
  background-color: #fac2c2;
`;

const Banner3Detail = styled.div`
  width: 600px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Banner3Content = styled.h1`
  width: 230px;
  text-align: end;
  font-size: 25px;
  color: white;
  font-weight: 600;
  background-color: #eba2a2;
  border-radius: 15px;
  padding: 15px 20px;
  transform: rotate(352deg) translate(0%, -75%);
  position: relative;
`;

const BananaIcon = styled(FontAwesomeIcon)`
  font-size: 60px;
  color: rgb(250, 225, 0);
  margin-right: 8px;
  position: absolute;
  top: -6px;
  left: -11px;
`;

const Banner3TitleSpan = styled.span``;

const Banner3TitleBox = styled.div`
  width: 450px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  transform: rotate(352deg);
  margin-top: -20px;
  ${Banner3TitleSpan} {
    font-size: 60px;
    font-weight: 500;
    font-family: yg-jalnan;
    margin-bottom: 30px;
  }
`;

const Banner3Img = styled.img.attrs({
  src: `${present}`,
})`
  width: 550px;
  height: 420px;
  margin-top: 50px;
  margin-left: -140px;
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
        <Banner1Content>Banana는 의류 나눔을 통해</Banner1Content>
        <Banner1Content>친환경적인 세상을 만듭니다.</Banner1Content>
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
        autoplay={{ delay: 3000, disableOnInteraction: false }}
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
