import { useLocation } from "react-router-dom";
import Paging from "../components/Paging";
import {
  ItemWrap,
  NavTitle,
  PageContainer,
  NoItemPage,
} from "../components/MypageContents";
import styled from "styled-components";
import {
  EachReview,
  ReviewContent,
  ReviewUserInfo,
  ShowReview,
} from "../components/ShowItem";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonReview } from "./SkeletonOfMypage";

export const ReviewWrap = styled(ItemWrap)`
  flex-direction: column;
  flex-wrap: unset;
  padding-left: 10px;
`;

function Review({ reviews, loading }) {
  // const currentUserObj = UserObj.find((user) => user.id === LoginId);
  // const reviews = currentUserObj.reviews;

  //페이지네이션
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageValue = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(Number(pageValue));
  const [count, setCount] = useState(reviews.length);

  const postPerPage = 5; // 한 페이지 아이템 수
  return (
    <PageContainer>
      <NavTitle>나의 나눔 후기 ({reviews ? reviews.length : 0})</NavTitle>
      {reviews ? (
        <>
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
            currentPage={currentPage}
            count={count}
            setCurrentPage={setCurrentPage}
            postPerPage={postPerPage}
          />
        </>
      ) : (
        <SkeletonReview />
      )}
    </PageContainer>
  );
}
export default Review;
