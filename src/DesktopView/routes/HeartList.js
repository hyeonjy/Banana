import { useLocation } from "react-router-dom";
import { ProductList } from "../ItemObject";
import {
  ItemDetail,
  ItemDetailDiv,
  ItemDiv,
  ItemImg,
  ItemTitle,
  ItemWrap,
  NavTitle,
  NoItemPage,
  PageContainer,
} from "./ShareList";
import { useState } from "react";
import Paging from "../components/Paging";

function HeartList() {
  //페이지네이션

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageValue = searchParams.get("page");
  const [count, setCount] = useState(ProductList.length); // 전체 아이템 개수
  const [currentPage, setCurrentPage] = useState(Number(pageValue)); // 현재 페이지 번호
  const [postPerPage] = useState(8); // 한 페이지 아이템 수
  return (
    <PageContainer>
      <NavTitle>찜 목록 ({ProductList.slice(0, 3).length})</NavTitle>
      <div style={{ minHeight: "430px" }}>
        <ItemWrap>
          {ProductList ? (
            ProductList.slice(0, 3)
              .slice(
                postPerPage * (currentPage - 1),
                postPerPage * (currentPage - 1) + postPerPage
              )
              .map((item, index) => (
                <ItemDiv key={index} to={`/post/${item.id}`}>
                  <ItemImg src={item.imgURL} />
                  <ItemDetailDiv>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemDetail>{item.detail}</ItemDetail>
                  </ItemDetailDiv>
                </ItemDiv>
              ))
          ) : (
            <NoItemPage>나눔 상품이 없습니다</NoItemPage>
          )}
        </ItemWrap>
      </div>

      <Paging
        page={currentPage}
        count={count}
        //setPage={setPage}
        setCurrentPage={setCurrentPage}
        postPerPage={postPerPage}
      />
    </PageContainer>
  );
}

export default HeartList;
