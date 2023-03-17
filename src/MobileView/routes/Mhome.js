import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./MobileView.css";
import ShowItem from "../components/ShowItem";

import banana from "../../Img/banana.png";
import HomeMenu from "../components/HomeMenu";
import Footer from "../components/Footer";
import { categoryList } from "../components/CategoryIist";
import { useState } from "react";
const Container = styled.div``;
const Header = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: white;
  width: 92%;
  height: 25px;
  padding: 15px 4% 15px 4%;
  z-index: 999;
  align-items: center;
`;
const Logo = styled.span`
  font-size: 20px;
  color: #ffe84e;
  font-weight: 800;
  //font-family: "Pretendard";
  font-family: "yg-jalnan";
`;
const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 18%;
  font-size: 25px;
  svg {
    &:first-child {
      font-size: 23px;
    }
  }
`;
const Vanner = styled.div`
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
      <Header>
        <Logo>BANANA</Logo>
        <Icons>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />
          <FontAwesomeIcon icon={faHeart} color="red" />
        </Icons>
      </Header>
      <Vanner>
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
      </Vanner>
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

      <ShowItem />
      <HomeMenu />
      <WriteBtn>+ 글쓰기</WriteBtn>
      <Footer />
    </Container>
  );
}
export default Mhome;
