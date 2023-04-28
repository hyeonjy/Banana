import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Container, ProductsBox } from "./More";
import { QueryDiv, QueryLi, QueryUl, queryArray } from "./Gruop";
import NoItem from "../components/NoItem";
import Paging, { SetPage } from "../components/Paging";
import { useEffect } from "react";
import { ShowItem } from "../components/ShowItem";
import { useRecoilValue } from "recoil";
import { postData } from "../../atom";

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
  const data = useRecoilValue(postData);
  const searchItem = data.filter(
    (item) =>
      item.title.includes(searchValue) || item.content.includes(searchValue)
  );

  const { pageValue, currentPage, setCurrentPage, count, setCount } = SetPage(
    searchParams,
    searchItem
  );
  const postPerPage = 15; // 한 페이지 아이템 수

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
            <ShowItem
              item={searchItem.slice(
                postPerPage * (currentPage - 1),
                postPerPage * (currentPage - 1) + postPerPage
              )}
              responsive={true}
            />
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
