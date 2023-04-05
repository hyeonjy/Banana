import styled from "styled-components";
import { ProductList } from "../ItemObject";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./NewItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const NewContainer = styled.div`
  width: 96%;
  margin: 30px auto;
`;

//----상단 : New 타이틀 + pagination/Navigation----//
const Header = styled.div`
  display: flex;
  line-height: 50px;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-right: 10px;
`;
const Newtitle = styled.span`
  font-size: 18px;
  font-weight: 700;

  letter-spacing: 1px;
  span {
    font-family: "yg-jalnan";
    font-size: 26px;
    color: yellow;
    display: inline-block;
    margin-right: 3px;
  }
`;

const NavWrap = styled.div`
  position: relative;
  width: 110px;
  height: 40px;
  line-height: 40px;

  border-radius: 10px;
  text-align: center;
`;
const NavSpan = styled.span`
  font-size: 15px;
  letter-spacing: 0.5px;
  font-weight: 600;

  color: black;
`;

//----하단 : Post List----//
const ItemDiv = styled(Swiper)``;
const EachItem = styled(Link)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
const EachThum = styled.img`
  width: 190px;
  height: 150px;
  object-fit: cover;
`;
const EachTitle = styled.span`
  font-weight: 600;
  line-height: 35px;
  display: block;
  margin-top: 3px;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
`;
const EachDetail = styled.span`
  font-size: 12px;
`;
//------------------------------//

function NewItem() {
  const NewtList = ProductList.slice(0, 8);
  const [currentPage, setCurrentPage] = useState(1); // Swiper 현재 Page
  return (
    <>
      <NewContainer>
        <Header>
          <Newtitle>
            <span>N</span>EW
          </Newtitle>

          <NavWrap>
            <FontAwesomeIcon
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className="prev"
              icon={faAngleLeft}
            />
            <NavSpan>
              {currentPage}/{Math.ceil(NewtList.length / 4)}
            </NavSpan>
            <FontAwesomeIcon
              onClick={() => {
                if (currentPage < Math.ceil(NewtList.length / 4))
                  setCurrentPage(currentPage + 1);
              }}
              className="next"
              icon={faAngleRight}
            />
          </NavWrap>
        </Header>
        <ItemDiv
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={4}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
            onlyInViewport: true,
          }}
        >
          {NewtList.map((item, index) => (
            <SwiperSlide key={index}>
              <EachItem to={`/post/${item.id}`}>
                <EachThum src={item.imgURL[0]} />
                <EachTitle>{item.title}</EachTitle>
                <EachDetail>{item.detail}</EachDetail>
              </EachItem>
            </SwiperSlide>
          ))}
        </ItemDiv>
      </NewContainer>
    </>
  );
}

export default NewItem;
