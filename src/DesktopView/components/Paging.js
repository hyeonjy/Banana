import Pagination from "react-js-pagination";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const PageNationItem = styled(Pagination)``;
const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  .pagination {
    display: flex;
    align-items: center;
    width: fit-content;
    justify-content: center;
    li {
      height: 28px;
      line-height: 28px;
      width: 25px;
      font-size: 17px;
      font-weight: 600;
      padding: 7px;
      text-align: center;
      border: 1px solid #80808066;
      &:hover:not(.active) {
        background: whitesmoke;
      }
      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      &.active {
        background: orange;
        color: white;
        border: 1px solid orange;
      }
    }
  }
`;
const ArrowIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  color: gray;
`;
// export function SetPage(searchParams, searchItem) {
//   const pageValue = searchParams.get("page"); // id( = main category)
//   console.log(searchItem);
//   const [count, setCount] = useState(searchItem); // 전체 아이템 개
//   const [currentPage, setCurrentPage] = useState(Number(pageValue)); // 현재 페이지 번호
//   return { pageValue, count, setCount, currentPage, setCurrentPage };
// }

const Paging = ({ currentPage, count, setCurrentPage, postPerPage }) => {
  const location = useLocation();
  const history = useHistory();
  const setPage = (page) => {
    setCurrentPage(page);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", page);
    history.push({ search: queryParams.toString() });
    window.scrollTo(0, 0);
  };

  return (
    <PaginationDiv>
      <PageNationItem
        activePage={currentPage}
        itemsCountPerPage={postPerPage}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={<ArrowIcon icon={faAngleLeft} />}
        nextPageText={<ArrowIcon icon={faAngleRight} />}
        firstPageText={<ArrowIcon icon={faAngleDoubleLeft} />}
        lastPageText={<ArrowIcon icon={faAngleDoubleRight} />}
        onChange={setPage}
      />
    </PaginationDiv>
  );
};

export default Paging;
