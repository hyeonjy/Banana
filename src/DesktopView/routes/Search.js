import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Container, ProductsBox } from "./More";
import { QueryDiv, QueryLi, QueryUl, queryArray } from "./Gruop";
import NoItem from "../components/NoItem";
import Paging from "../components/Paging";
import { useEffect } from "react";
import { ResProduct, ShowItem } from "../components/ShowItem";
import { useState } from "react";
import useAxios from "../../useAxio";
import Skeleton from "react-loading-skeleton";

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
  font-weight: ${(props) => (props.isActive ? "800" : "500")};
`;

function Search() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("content"); // id( = main category)

  const [searchItem, setSearchItem] = useState([]);
  const [currentQuery, setCurrentQuery] = useState(0);

  const pageValue = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(Number(pageValue));
  const [count, setCount] = useState();

  const postPerPage = 12; // 한 페이지 아이템 수

  const { response, loading, error, executeGet } = useAxios({
    method: "get",
    url: `http://localhost:8080/searchdata/${searchValue}/${currentQuery}`,
  });

  useEffect(() => {
    executeGet();
  }, [searchValue, currentQuery]);

  useEffect(() => {
    if (!loading && !error) {
      setSearchItem(response);
    }
  }, [response, loading, error]);

  //강제 렌더링
  useEffect(() => {
    if (searchItem) {
      setCount(searchItem.length);
    }
  }, [searchItem]);

  function changeQuery(index) {
    const searchParams = new URLSearchParams(location.search);
    setCurrentQuery(index);
    searchParams.set("query", index);
    history.push({
      pathname: `/search`,
      search: `?${searchParams}`,
    });
  }

  return (
    <>
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
              <SearchQueryLi
                onClick={() => {
                  changeQuery(index);
                }}
                as="div"
                key={index}
                isActive={index === currentQuery}
              >
                {query}
              </SearchQueryLi>
            ))}
          </SearchQueryUl>
        </QueryDiv>

        {!loading ? (
          searchItem.length > 0 ? (
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
                currentPage={currentPage}
                count={count}
                setCurrentPage={setCurrentPage}
                postPerPage={postPerPage}
              />
            </div>
          ) : (
            <NoItem />
          )
        ) : (
          <div>
            <ProductsBox as="ul" style={{ minHeight: "450px" }}>
              {Array(15)
                .fill()
                .map((_, index) => (
                  <ResProduct key={index} as="li">
                    <Skeleton height={"200px"} width={"100%"} />
                  </ResProduct>
                ))}
            </ProductsBox>
          </div>
        )}
      </SearchContainer>
    </>
  );
}

export default Search;
