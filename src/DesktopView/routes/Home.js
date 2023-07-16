import styled from "styled-components";
import Nav from "../components/Nav";
import { useHistory } from "react-router-dom";
import Banner from "../components/Banner";
import { useState } from "react";
import { useEffect } from "react";
import { ShowItem } from "../components/ShowItem";
import useAxios from "../../useAxio";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery, useQueryClient } from "react-query";
import { HitsDataApi, LastDataApi } from "../../Api";

export const Container = styled.div`
  padding-top: 140px; /**header와 nav의 fixed 때문에 겹치는 문제 해결 */
  min-height: calc(100vh - 300px); //300px은 footer height
`;

const Products = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  //margin-bottom: 100px;
  /* width: 1050px; */
  width: 75vw;
  @media (max-width: 768px) {
    width: 85vw;
  }
  margin: 0 auto;
`;

const ProductsTitle = styled.h1`
  width: 95%;

  font-size: 22px;

  font-weight: 700;
  margin-bottom: 30px;
  margin-left: 20px;
  text-align: first;
`;

const ProductsBox = styled.div`
  display: flex;
  width: 95%;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 5%;
`;

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 21%;
  &:not(:nth-of-type(4n + 1)) {
    margin-left: 4%;
  }
  margin-bottom: 30px;
`;

export const ProductImg = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const ProductTitle = styled.h1`
  font-size: 16px;
  margin: 10px 0 5px 2px;
  line-height: 20px;
  font-weight: 600;
  width: 100%;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
`;

export const ProductDetail = styled.span`
  font-size: 13px;
  margin-left: 2px;
  color: #232323ab;
`;

const MoreBtn = styled.div`
  width: 80px;
  height: 45px;
  font-size: 18px;
  //border: 1px solid gray;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: 500;
  //border: 6px solid rgb(255, 230, 0);
  background-color: rgb(255, 230, 0);
  cursor: pointer;
`;

/*상품 리스트 - 끝*/

function Home() {
  const { error: error1, data: lastItem } = useQuery("lastPost", LastDataApi, {
    // staleTime: 60000,
  });
  const { error: error2, data: histItem } = useQuery("hitPost", HitsDataApi);

  const history = useHistory();
  const handleImageClick = (type, object) => {
    const searchParams = new URLSearchParams();
    searchParams.append("type", type);
    history.push({
      pathname: "/more",
      search: "?" + searchParams.toString(),
    });
  };
  // const { response, loading, executeGet } = useAxios({
  //   method: "get",
  //   url: "http://localhost:8080/data/last",
  // });
  // useEffect(() => {
  //   executeGet();
  // }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     setLastItem(response.slice(0, 8));
  //   }
  // }, [loading]);
  // useEffect(() => {
  //   if (!isLoading) {
  //     setLastItem(data.slice(0, 8));
  //   }
  // }, [isLoading]);

  return (
    <>
      {!error1 && !error2 ? (
        <>
          <Nav />
          <Container>
            {/* 배너 3개 */}
            <div style={{ Width: "100vw" }}>
              <Banner />
            </div>

            {/* New 상품 리스트 */}
            <Products>
              <ProductsTitle>NEW! 나눔 물품</ProductsTitle>
              {lastItem ? (
                <>
                  <ProductsBox>
                    <ShowItem item={lastItem.slice(0, 8)} isHome={true} />
                  </ProductsBox>
                  <MoreBtn onClick={() => handleImageClick("new")}>
                    더보기
                  </MoreBtn>
                </>
              ) : (
                <ProductsBox>
                  {Array(8)
                    .fill()
                    .map((_, index) => (
                      <Product key={index}>
                        <Skeleton height={"200px"} width={"100%"} />
                      </Product>
                    ))}
                </ProductsBox>
              )}
            </Products>

            {/* Hot 상품 리스트 */}
            <Products>
              <ProductsTitle>HOT! 주목받는 물품</ProductsTitle>
              {histItem ? (
                <>
                  <ProductsBox>
                    <ShowItem item={histItem.slice(0, 8)} />
                  </ProductsBox>
                  <MoreBtn onClick={() => handleImageClick("hot")}>
                    더보기
                  </MoreBtn>
                </>
              ) : (
                <ProductsBox>
                  {Array(8)
                    .fill()
                    .map((_, index) => (
                      <Product key={index}>
                        <Skeleton height={"200px"} width={"100%"} />
                      </Product>
                    ))}
                </ProductsBox>
              )}
            </Products>
          </Container>
        </>
      ) : (
        <span>Sever ERROR!</span>
      )}
    </>
  );
}

export default Home;
