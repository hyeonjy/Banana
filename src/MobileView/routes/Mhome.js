import styled from "styled-components";
import "../../App.css";
import ShowItem from "../components/ShowItem";

import HomeMenu from "../components/HomeMenu";
import Footer from "../components/Footer";
import { categoryList } from "../components/CategoryIist";
import { useState } from "react";
import { Banner1, Banner2, Banner3 } from "../components/Banner";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper";
import HeaderComponent from "../components/Header";

const Container = styled.div``;

const StyledSwiperSlide = styled(SwiperSlide)`
  height: fit-content !important;
`;
const CategoryLi = styled.span`
  transition: all 0.2s;
  color: ${(props) => (props.isActive ? "#ffb52d" : "#515151")};
  font-weight: ${(props) => (props.isActive ? "900" : "700")};
  font-size: ${(props) => (props.isActive ? "14px" : "13px")};
`;
const Category = styled.div`
  width: 96%;
  padding: 0 2%;
  background-color: whitesmoke;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Pretendard";
  ${CategoryLi} {
    cursor: pointer;
    display: block;
    padding: 1px 5px;
  }
`;
const SubCategoryLi = styled.div`
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  background-color: ${({ isActive }) => (isActive ? "#ffb52d" : "white")};
  border: ${({ isActive }) =>
    isActive ? "0px solid white" : "1px solid #bbbbbb"};
`;
const SubCategory = styled.div`
  /* hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* hide scrollbar for Firefox */
  scrollbar-width: none;

  /* hide scrollbar for IE, Edge, and other browsers */
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;

  width: 95%;
  display: flex;
  align-items: center;
  background-color: white;
  height: 55px;
  overflow: auto;
  padding-left: 4%;
  font-weight: 600;
  font-family: "Pretendard";
  ${SubCategoryLi} {
    cursor: pointer;
    white-space: nowrap;
    float: left;
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 12px;
    margin-right: 10px;
  }
  border-bottom: 0.5px solid #86868685;
`;
const CategoryWrap = styled.div`
  position: sticky;
  top: 55px;
`;
const WriteBtn = styled.div`
  position: fixed;
  right: 22px;
  bottom: 80px;
  width: fit-content;
  background-color: #ffb52d;
  padding: 15px;
  font-size: 17px;
  font-weight: 700;
  font-family: "Pretendard";
  border-radius: 20px;
  height: fit-content;
  letter-spacing: 0.5px;
  color: white;
`;

function Mhome() {
  const [currentCate, setCurrentCate] = useState(categoryList[0]);
  const [currentSubCate, setCurrentSubCate] = useState(categoryList[0].sub[0]);
  return (
    <Container>
      <HeaderComponent />
      <Swiper
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
      >
        <StyledSwiperSlide>
          <Banner1 />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Banner2 />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Banner3 />
        </StyledSwiperSlide>
      </Swiper>
      <CategoryWrap>
        <Category>
          {categoryList.map((categoryItem) => (
            <CategoryLi
              key={categoryItem.id}
              onClick={() => {
                setCurrentCate(categoryItem);
                setCurrentSubCate(categoryItem.sub[0]);
              }}
              isActive={categoryItem === currentCate}
            >
              {categoryItem.main}
            </CategoryLi>
          ))}
        </Category>
        {currentCate && (
          <SubCategory>
            {currentCate.sub.map((subItem, index) => (
              <SubCategoryLi
                key={index}
                onClick={() => setCurrentSubCate(subItem)}
                isActive={subItem === currentSubCate}
              >
                {subItem}
              </SubCategoryLi>
            ))}
          </SubCategory>
        )}
      </CategoryWrap>
      <ShowItem main={currentCate.main} sub={currentSubCate} />
      <HomeMenu />
      <WriteBtn>+ 글쓰기</WriteBtn>
      <Footer />
    </Container>
  );
}
export default Mhome;
