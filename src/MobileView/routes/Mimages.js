import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const StyledSlider = styled(Slider)`
  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 30px;

    li button:before {
      color: white;
    }
  }
`;

const Container = styled.div`
  background-color: black;
  position: relative;
  overflow: hidden;
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

const PostImgDiv = styled.div`
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
  const filterItemObj =
    location.state?.obj.filterItemObj; /**Link to를 통해서 전달한 props 받기 */
  const history = useHistory();

  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container>
      {/* X 버튼 */}
      <XDiv onClick={() => history.goBack()}>
        <XIcon icon={faX} />
      </XDiv>

      {/* 이미지 슬라이더 */}
      <StyledSlider {...settings}>
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
