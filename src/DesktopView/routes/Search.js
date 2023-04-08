import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Product,
  ProductDetail,
  ProductImg,
  ProductTitle,
  ProductsBox,
} from "./More";
import { QueryDiv, QueryLi, QueryUl, queryArray } from "./Gruop";
import NoItem from "../components/NoItem";
import { useState } from "react";
import Paging from "../components/Paging";
import { useEffect } from "react";
import { ItemObj } from "../../Data/ItemObj";

const SearchContainer = styled(Container)`
  min-height: 750px;
`;
const SearchHeader = styled.header`
  border-bottom: 1px solid #8080807a;
  padding-bottom: 15px;
  line-height: 30px;

  span {
    .border {
      font-weight: 700;
      font-size: larger;
      padding: 0 7px;
    }
  }
`;
const SearchQueryUl = styled(QueryUl)`
  width: 280px;
  justify-content: unset;
`;
const SearchQueryLi = styled(QueryLi)`
  padding-right: 20px;
  padding-left: 0;
  &:not(:first-of-type) {
    margin-left: 0px;
    padding-left: 20px;
  }
`;

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("content"); // id( = main category)
  const pageValue = searchParams.get("page"); // id( = main category)
  const searchItem = ItemObj.filter(
    (item) =>
      item.title.includes(searchValue) || item.content.includes(searchValue)
  );

  const [count, setCount] = useState(searchItem.length); // 전체 아이템 개수
  const [currentPage, setCurrentPage] = useState(Number(pageValue)); // 현재 페이지 번호
  const [postPerPage] = useState(15); // 한 페이지 아이템 수

  //강제 렌더링
  useEffect(() => {
    setCurrentPage(Number(pageValue));
    setCount(searchItem.length);
  }, [searchParams]);

  return (
    <SearchContainer>
      <SearchHeader>
        <span>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span className="border">"{searchValue}"</span>에 대한 검색결과 - (
          {searchItem.length})
        </span>
      </SearchHeader>
      <QueryDiv style={{ marginBottom: "10px" }}>
        <SearchQueryUl as="div">
          {queryArray.map((query, index) => (
            <SearchQueryLi as="div" key={index}>
              {query}
            </SearchQueryLi>
          ))}
        </SearchQueryUl>
      </QueryDiv>
      {searchItem.length > 0 ? (
        <div>
          <ProductsBox as="ul" style={{ minHeight: "450px" }}>
            {searchItem
              .slice(
                postPerPage * (currentPage - 1),
                postPerPage * (currentPage - 1) + postPerPage
              )
              .map((item, index) => (
                <Product key={index} as="li">
                  <Link
                    to={{
                      pathname: `/post/${item.itemId}`,
                      state: {
                        item,
                      },
                    }}
                  >
                    <ProductImg src={require(`../../Img/${item.img[0]}.jpg`)} />
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductDetail>
                      {item.area} |{item.timeAgo}
                    </ProductDetail>
                  </Link>
                </Product>
              ))}
          </ProductsBox>
          <Paging
            page={currentPage}
            count={count}
            setCurrentPage={setCurrentPage}
            postPerPage={postPerPage}
          />
        </div>
      ) : (
        <NoItem />
      )}
    </SearchContainer>
  );
}

export default Search;
