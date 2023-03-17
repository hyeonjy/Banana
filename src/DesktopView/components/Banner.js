import styled from "styled-components";
import banana from "../../Img/banana.png";
import earth3 from "../../Img/earth3.png";

const Container = styled.div`
  width: 100%;
  height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/*배너 1 - 시작 */

const Banner1 = styled(Container)`
  /* background-color: #ff8868; */
  /* background-color: #ff7d37; */
  background-color: #fae100;
`;

const ImgCircle = styled.div`
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
`;

const Banner1Img = styled.img.attrs({
  src: `${banana}`,
})`
  width: 350px;
  height: 500px;
  margin-top: 10px;
  margin-left: 40px;
`;

const Banner1Detail = styled.div`
  width: 400px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 120px;
`;

const Banner1TitleBox = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const Banner1TitleSpan = styled.span``;

const Banner1Title = styled.div`
  color: black;
  font-weight: 600;
  /* margin-top: 20px; */
  display: inline;
  ${Banner1TitleSpan} {
    font-size: 45px;
    font-weight: 500;
    font-family: yg-jalnan;
    /* color: rgb(82 82 82); */
    span {
      //font-style: italic;
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

const Banner1ContentBox = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
`;

const Banner1Content = styled.h1`
  font-size: 25px;
  color: white;
  margin: 5px;
  font-weight: 600;
`;

/*배너 1 - 끝 */

/**배너2 = 시작 */

const Banner2 = styled(Container)`
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
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Banner2TitleBox = styled.div`
  width: 550px;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Banner2TitleSpan = styled.span``;

const Banner2Title = styled.div`
  color: black;
  font-weight: 600;
  /* margin-top: 20px; */
  /* display: inline; */
  ${Banner2TitleSpan} {
    font-size: 50px;
    font-weight: 500;
    font-family: yg-jalnan;
    /* color: rgb(82 82 82); */
    span {
      //font-style: italic;
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

function Banner() {
  return (
    <>
      <Banner1>
        <ImgCircle>
          <Banner1Img />
        </ImgCircle>
        <Banner1Detail>
          <Banner1TitleBox>
            <Banner1Title>
              <Banner1TitleSpan>
                <span>바</span>로
              </Banner1TitleSpan>
            </Banner1Title>
            <Banner1Title>
              <Banner1TitleSpan>
                <span>나</span>누고
              </Banner1TitleSpan>
            </Banner1Title>
            <Banner1Title>
              <Banner1TitleSpan>
                <span>나</span>눔 받자
              </Banner1TitleSpan>
            </Banner1Title>
          </Banner1TitleBox>
          <Banner1ContentBox>
            <Banner1Content>Banana는 의류 나눔을 통해</Banner1Content>
            <Banner1Content>친환경적인 세상을 만듭니다.</Banner1Content>
          </Banner1ContentBox>
        </Banner1Detail>
      </Banner1>

      <Banner2>
        <Banner2Detail>
          <Banner2TitleBox>
            <Banner2Title>
              <Banner2TitleSpan>
                나는 <span style={{ color: "#E06666" }}>옷</span>가
                <span style={{ color: "#38761D" }}>지구</span>
              </Banner2TitleSpan>
            </Banner2Title>
            <Banner2Title>
              <Banner2TitleSpan>
                지구와 <span style={{ color: "#E06666" }}>친해</span>
                <span style={{ color: "#38761D" }}>지구</span>
              </Banner2TitleSpan>
            </Banner2Title>
          </Banner2TitleBox>
        </Banner2Detail>
        <Banner2Img />
        <Banner2Triangle />
      </Banner2>
    </>
  );
}

export default Banner;
