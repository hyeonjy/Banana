import Pagination from "react-js-pagination";

const Paging = ({ page, count, setPage }) => {
  return (
    <div style={{ display: "flex" }}>
      <Pagination
        activePage={page}
        itemsCountPerPage={12}
        totalItemsCount={count}
        pageRangeDisplayed={12}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={setPage}
      />
    </div>
  );
};

export default Paging;
