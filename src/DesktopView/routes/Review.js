import { useLocation } from "react-router-dom";
import Paging, { SetPage } from "../components/Paging";
import {
  ItemWrap,
  NavTitle,
  PageContainer,
  NoItemPage,
} from "../components/MypageContents";
import { LoginId, UserObj } from "../../Data/UserObj";
import styled from "styled-components";
import { ShowReview } from "../components/ShowItem";

export const ReviewWrap = styled(ItemWrap)`
  flex-direction: column;
  flex-wrap: unset;
  padding-left: 10px;
`;

function Review() {
  const currentUserObj = UserObj.find((user) => user.id === LoginId);
  const reviews = currentUserObj.reviews;

  //페이지네이션
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { currentPage, setCurrentPage, count } = SetPage(searchParams, reviews);
  const postPerPage = 5; // 한 페이지 아이템 수
  return (
    <PageContainer>
      <NavTitle>나의 나눔 후기 ({reviews.length})</NavTitle>
      <div style={{ minHeight: "430px" }}>
        <ReviewWrap>
          {reviews ? (
            <ShowReview
              reviews={reviews.slice(
                postPerPage * (currentPage - 1),
                postPerPage * (currentPage - 1) + postPerPage
              )}
            />
          ) : (
            <NoItemPage>나눔 후기가 없습니다</NoItemPage>
          )}
        </ReviewWrap>
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
export default Review;
