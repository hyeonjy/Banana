import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import useAxios from "../../useAxio";

export const Product = styled(Link)`
  ${(props) =>
    props.layout === "row" &&
    css`
      height: fit-content;
      width: 50%;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      @media screen and (max-width: 830px) {
        width: 90%;
        padding-left: 8%;
        justify-content: flex-start;
      }
    `}
  ${(props) =>
    props.layout === "col" &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 21%;
      &:not(:nth-of-type(4n + 1)) {
        margin-left: 4%;
      }
      margin-bottom: 30px;
    `}
`;

export const ProductImg = styled.img`
  ${(props) =>
    props.layout === "col" &&
    css`
      height: 200px;
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
    `}
  ${(props) =>
    props.layout === "row" &&
    css`
      width: 110px;
      height: 80px;
      object-fit: cover;
      flex-shrink: 0;
      margin-right: 10px;
    `}
`;
export const ProductDatailDiv = styled.div`
  ${(props) => props.layout === "col" && css``}
  ${(props) =>
    props.layout === "row" &&
    css`
      width: 50%;
    `}
  display: flex;
  flex-direction: column;
`;
export const ProductHeader = styled.div`
  ${(props) => props.layout === "col" && css``}
  ${(props) => props.layout === "row" && css``}
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  gap: 5px;
`;

export const ProductTitle = styled.h1`
  ${(props) =>
    props.layout === "col" &&
    css`
      font-size: 16px;
      margin: 10px 0 5px 2px;
      line-height: 20px;
      font-weight: 600;
      width: 100%;
    `}
  ${(props) =>
    props.layout === "row" &&
    css`
      font-size: 16px;
      line-height: 40px;
      font-weight: 500;
    `}

  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
`;
export const ProductState = styled.div`
  width: 25%;
  padding: 2px 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  color: white;
  background-color: ${(props) =>
    props.status === "reservate" ? "orange" : "gray"};

  border-radius: 15px;
  font-size: 10px;
`;

export const ProductDetail = styled.span`
  ${(props) =>
    props.layout === "col" &&
    css`
      font-size: 13px;
      margin-left: 2px;
      color: #232323ab;
    `}
  ${(props) =>
    props.layout === "row" &&
    css`
      font-size: 12px;
    `}
`;

///// 반응형 Components
export const ResProduct = styled.div`
  padding: 0 10px 35px 10px;
  box-sizing: inherit;
`;

export const ResProductImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ResProductTitle = styled.h1`
  font-size: 16px;
  margin: 10px 0 5px 2px;
  line-height: 20px;
  font-weight: 600;
  width: 200px;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
`;

export const ResProductDetail = styled.span`
  font-size: 13px;
  margin-left: 2px;
  color: #232323ab;
`;

//리뷰
export const EachReview = styled.div`
  width: 100%;
  border-top: 1px solid #a8a8a869;
  padding: 15px 0 20px 10px;
  &:first-of-type {
    padding-top: 5px;
    border-top: 0;
  }
`;
export const ReviewUserInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  span {
    font-size: 15px;
    font-weight: 600;
  }
`;
export const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
export const ReviewContent = styled.span`
  font-size: 14px;
  padding-left: 3px;
  line-height: 2px;
`;

export function ShowItem({
  item,
  responsive = false,
  state = false,
  layout = "col",
}) {
  if (responsive) {
    return (
      <>
        {item.map((item, index) => (
          <ResProduct key={index} as="li">
            <Link
              to={{
                pathname: `/post/${item.itemId}`,
                state: {
                  item,
                },
              }}
            >
              <ResProductImg src={require(`../../Img/${item.img[0]}.jpg`)} />
              <ResProductTitle>{item.title}</ResProductTitle>
              <ResProductDetail>
                {item.area} | {item.timeAgo}
              </ResProductDetail>
            </Link>
          </ResProduct>
        ))}
      </>
    );
  } else {
    return (
      <>
        {item.map((item, index) => {
          const datetime = new Date(item.post_date);
          const now = new Date();
          const diffInMs = now - datetime;
          const diffInMinutes = Math.round(diffInMs / (1000 * 60));
          let timeago = null;
          if (diffInMinutes < 60) {
            timeago = `${diffInMinutes}분 전`;
          } else if (diffInMinutes < 60 * 24) {
            timeago = `${Math.floor(diffInMinutes / 60)}시간 전`;
          } else {
            timeago = `${Math.floor(diffInMinutes / (60 * 24))}일 전`;
          }
          return (
            <Product
              layout={layout}
              key={index}
              to={{
                pathname: `/post/${item.post_id}`,
                state: {
                  item,
                },
              }}
            >
              <ProductImg
                layout={layout}
                src={require(`../../Data/Img/${item.img_src}`)}
              />
              <ProductDatailDiv layout={layout}>
                <ProductHeader>
                  <ProductTitle layout={layout}>{item.title}</ProductTitle>
                  {state && (
                    <>
                      {item.state === "reservate" && (
                        <ProductState status="reservate">예약중</ProductState>
                      )}
                      {item.state === "complete" && (
                        <ProductState status="complete">나눔완료</ProductState>
                      )}
                    </>
                  )}
                </ProductHeader>
                <ProductDetail layout={layout}>
                  {item.area} | {timeago}
                </ProductDetail>
              </ProductDatailDiv>
            </Product>
          );
        })}
      </>
    );
  }
}

export function ShowReview({ reviews }) {
  return (
    <>
      {reviews.map((item, index) => (
        <EachReview as="div" key={index}>
          <ReviewUserInfo>
            <UserImg src={require(`../../Img/${item.src}`)} />
            <span>{item.id}</span>
          </ReviewUserInfo>
          <ReviewContent>{item.content}</ReviewContent>
        </EachReview>
      ))}
    </>
  );
}
