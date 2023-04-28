import styled, { keyframes } from "styled-components";
import Nav from "../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faN } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
import Banner from "../components/Banner";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ItemObj } from "../../Data/ItemObj";
import { ShowItem } from "../components/ShowItem";
import { useRecoilValue } from "recoil";
import { postData } from "../../atom";

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
  width: 1050px;
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
  const history = useHistory();
  const [newList, setNewList] = useState([...ItemObj]);
  const [hotList, setHotList] = useState([...ItemObj]);

  //최신상품과 인기상품 List 저장
  useEffect(() => {
    let length = ItemObj.length > 25 ? 25 : ItemObj.length;

    /**New는 최신순으로 slice만 진행 */
    setNewList(newList.slice(0, length));
    /**hot은 heart 순으로 정렬 */
    setHotList(
      hotList
        .sort(function (a, b) {
          return Number(b.meta.heart) - Number(a.meta.heart);
        })
        .slice(0, length)
    );
  }, []);

  const handleImageClick = (type, object) => {
    const searchParams = new URLSearchParams();
    searchParams.append("type", type);
    history.push({
      pathname: "/more",
      state: {
        object,
      },
      search: "?" + searchParams.toString(),
    });
  };
  // const { response, loading, error } = useAxios({
  //   method: "get",
  //   url: "http://localhost:8080/data",
  // });
  // useEffect(() => {
  //   // axios
  //   //   .get("http://localhost:8080/data")
  //   //   .then((response) => console.log(response.data))
  //   //   .catch((error) => console.error(error));
  //   console.log(response);
  //   console.log(loading);
  //   //console.log(error);
  // }, [response, loading, error]);
  const response = useRecoilValue(postData);
  return (
    <>
      <Nav />
      <Container>
        {/* 배너 3개 */}
        <div style={{ minWidth: "1015px" }}>
          <Banner />
        </div>

        {/* New 상품 리스트 */}
        <Products>
          <ProductsTitle>NEW! 나눔 물품</ProductsTitle>
          <ProductsBox>
            <ShowItem item={response} />
          </ProductsBox>
          <MoreBtn onClick={() => handleImageClick("new", newList)}>
            더보기
          </MoreBtn>
        </Products>

        {/* Hot 상품 리스트 */}
        <Products>
          <ProductsTitle>HOT! 주목받는 물품</ProductsTitle>
          <ProductsBox>
            <ShowItem item={response} />
          </ProductsBox>
          <MoreBtn onClick={() => handleImageClick("hot", hotList)}>
            더보기
          </MoreBtn>
        </Products>
      </Container>
    </>
  );
}

export default Home;
