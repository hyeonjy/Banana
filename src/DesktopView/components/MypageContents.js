import styled from "styled-components";
import { ShowItem } from "./ShowItem";
import { useLocation } from "react-router-dom";
import Paging, { SetPage } from "./Paging";

export const PageContainer = styled.div`
  background-color: #f5f5f594;
  height: fit-content;
  min-height: 480px;
  flex-grow: 1;
  padding-bottom: 40px;
`;
export const ItemWrap = styled.div`
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  width: 85%;
  margin: 0 auto 30px;
`;
export const NoItemPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  line-height: 300px;
`;
export const NavTitle = styled.h4`
  width: 85%;
  margin: 30px auto;
  font-weight: 600;
  font-size: 17px;
`;

function MypageContents({ item }) {
  //페이지네이션
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { currentPage, setCurrentPage, count } = SetPage(searchParams, item);
  const postPerPage = 8; // 한 페이지 아이템 수
  return (
    <PageContainer>
      <NavTitle>찜 목록 ({item.length})</NavTitle>
      <div style={{ minHeight: "430px" }}>
        <ItemWrap>
          {item ? (
            <ShowItem
              item={item.slice(
                postPerPage * (currentPage - 1),
                postPerPage * (currentPage - 1) + postPerPage
              )}
              layout="row"
            />
          ) : (
            <NoItemPage>목록이 없습니다</NoItemPage>
          )}
        </ItemWrap>
      </div>

      <Paging
        page={currentPage}
        count={count}
        setCurrentPage={setCurrentPage}
        postPerPage={postPerPage}
      />
    </PageContainer>
  );
}
export default MypageContents;
