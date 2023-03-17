import styled from "styled-components";
import banana from "../../Img/banana.png";
import earth3 from "../../Img/earth3.png";
const BannerFirst = styled.div`
  width: 100%;
  height: 200px;
  background-color: antiquewhite;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 55px;
`;
const MainCharacter = styled.div`
  border-radius: 50%;
  box-shadow: 5px 3px 0px 1px rgb(199 164 102 / 45%);
  width: 143px;
  height: 143px;
  background-color: #ffb52d;
  background-image: url(${banana});
  background-size: auto 120%;
  background-position: 45% -20%;
  background-repeat: no-repeat;
`;
const MainCharImg = styled.div``;
const MainTitleSpan = styled.span``;
const MainTitleDiv = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: "yg-jalnan";
  transform: rotate(-0deg);
  ${MainTitleSpan} {
    font-size: 15px;
    font-weight: 500;
    color: rgb(82 82 82);
    span {
      //font-style: italic;
      font-size: 30px;
      font-weight: 800;
      margin-right: 15px;
      color: rgb(255 232 78);
      font-family: "yg-jalnan";
      text-shadow: rgb(255 197 96) 0px 0px, rgb(255 197 96) 0px 0px,
        rgb(255 197 96) 3px 0px, rgb(255 197 96) 3px 2px;
    }
  }
`;

const BannerSec = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #cef2be;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 55px;
  overflow: hidden;
`;
const MainTitleDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  justify-content: center;
  height: 90%;
  padding-bottom: 5%;
  font-family: "yg-jalnan";
`;
const MainSubtitle = styled.div`
  font-size: 12px;
  display: block;
  font-weight: 600;
  margin-bottom: 20px;
  color: #4f4f4f;
`;
const MainTitleSpan2 = styled.span`
  font-size: 20px;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
  font-family: "yg-jalnan";
  color: #4f4f4f;
  span {
    font-family: "yg-jalnan";
    display: inline-block;
    margin-left: 6px;
    color: green;
    font-weight: 700;
    font-size: 21px;
  }
`;
const MainEarth = styled.img`
  width: 160px;
  height: 160px;
  z-index: 50;
`;
const Clothes = styled.img`
  position: absolute;
  top: 0;
  left: -10px;
  width: 30px;
  height: 30px;
`;
const Triangle = styled.div`
  transform: rotate(-42deg) translate(0%, 77%);
  background-color: #80d092;
  width: 315px;
  height: 269px;
  position: absolute;
  right: 0%;
  bottom: 0%;
`;
export const Banner1 = () => {
  return (
    <BannerFirst>
      <MainCharacter />
      <MainTitleDiv>
        <MainTitleSpan>
          <span>바</span>로
        </MainTitleSpan>
        <MainTitleSpan>
          <span>나</span>누고
        </MainTitleSpan>
        <MainTitleSpan>
          <span>나</span>눔받자!
        </MainTitleSpan>
      </MainTitleDiv>
    </BannerFirst>
  );
};
export const Banner2 = () => {
  return (
    <BannerSec>
      <MainTitleDiv2>
        <MainSubtitle>환경을 바꾸는 작은 실천</MainSubtitle>
        <MainTitleSpan2>
          나는 <span style={{ color: "#ff821e" }}>옷</span> 가<span>지구</span>
        </MainTitleSpan2>
        <MainTitleSpan2>
          지구와 <span style={{ color: "#ff821e" }}>친해</span>
          <span>지구</span>
        </MainTitleSpan2>
      </MainTitleDiv2>
      <MainEarth src={earth3} />
      <Triangle />
    </BannerSec>
  );
};

export const Vanner3 = () => {
  return <></>;
};
