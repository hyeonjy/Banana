import styled from "styled-components";

import { useLocation } from "react-router-dom";
import { ShowItem } from "../components/ShowItem";
import { useRecoilValue } from "recoil";
import { postData } from "../../atom";
import { useEffect, useState } from "react";
import useAxios from "../../useAxio";

export const Container = styled.div`
  padding: 120px 30px 60px;
  max-width: 1250px;
  margin: 0 auto;
  box-sizing: border-box;
  @media screen and (min-width: 1200px) {
    ul > li {
      width: 20%;
    }
  }
  @media (max-width: 1200px) and (min-width: 950px) {
    li {
      width: 25%;
    }
  }
  @media (max-width: 950px) and (min-width: 740px) {
    li {
      width: 33.3%;
    }
  }
  @media (max-width: 740px) and (min-width: 490px) {
    li {
      width: 50%;
    }
    img {
      height: 220px;
    }
  }
  @media (max-width: 490px) {
    li {
      width: 60%;
      margin-left: 20%;
      margin-right: 20%;
    }
  }
`;

const MoreTitle = styled.h1`
  font-size: 18px;
  border-bottom: 1px solid black;
  padding-bottom: 35px;
  margin-bottom: 35px;
  padding-left: 10px;
  font-weight: 600;

  @media (max-width: 450px) {
    display: none;
  }
`;

export const ProductsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
  box-sizing: border-box;
`;

export const Product = styled.div`
  padding: 0 10px 35px 10px;
  box-sizing: inherit;
`;

export const ProductImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ProductTitle = styled.h1`
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

export const ProductDetail = styled.span`
  font-size: 13px;
  margin-left: 2px;
  color: #232323ab;
`;

const More = (props) => {
  const location = useLocation();

  const [data, setData] = useState(useRecoilValue(postData));
  //const searchItem = location.state?.object; //new or hot의 object item 저장
  const searchParams = new URLSearchParams(location.search);
  const typeValue = searchParams.get("type"); // type이  new or hot 인지 확인

  const { loading, error, response, executeGet } = useAxios({
    method: "get",
    url: "http://localhost:8080/data/hits",
  });
  useEffect(() => {
    if (typeValue === "hot") {
      console.log(typeValue);
      executeGet();
      // hot일 경우 -> 조회순 rank top 20 -> 서버 (정렬 요청)
    }
    // else (new) 최신순 -> app.js에서 recoil로 저장한 최신순 데이터 그대로
  }, []);

  useEffect(() => {
    if (response && !error) {
      setData(data);
      console.log(data);
    }
  }, [loading]);

  return (
    <Container>
      <MoreTitle>
        {typeValue === "new"
          ? "바나나 농장의 최신목록!"
          : "실시간 베스트 상품!"}
      </MoreTitle>
      <ProductsBox as="ul">
        <ShowItem item={data.slice(0, 12)} responsive={true} />
      </ProductsBox>
    </Container>
  );
};

export default More;
