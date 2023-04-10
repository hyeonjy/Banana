import { useLocation } from "react-router-dom";
import Paging from "../components/Paging";
import { ItemWrap, NavTitle, NoItemPage, PageContainer } from "./ShareList";
import { useState } from "react";
import { LoginId, UserObj } from "../../Data/UserObj";
import styled from "styled-components";

export const ReviewWrap = styled(ItemWrap)`
  flex-direction: column;
  flex-wrap: unset;
  padding-left: 10px;
`;
export const EachReview = styled.div`
  width: 100%;
  border-top: 1px solid #a8a8a869;
  padding: 15px 0 20px 10px;
  &:first-of-type {
    padding-top: 5px;
    border-top: 0;
  }
`;
export const ReviewUserInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  span {
    font-size: 15px;
    font-weight: 600;
  }
`;
export const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
export const ReviewContent = styled.span`
  font-size: 14px;
  padding-left: 3px;
  line-height: 2px;
`;
function Review() {
  const currentUserObj = UserObj.find((user) => user.id === LoginId);
  const reviews = currentUserObj.reviews;
  //페이지네이션

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageValue = searchParams.get("page");
  const [count, setCount] = useState(reviews.length); // 전체 아이템 개수
  const [currentPage, setCurrentPage] = useState(Number(pageValue)); // 현재 페이지 번호
  const [postPerPage] = useState(5); // 한 페이지 아이템 수
  return (
    <PageContainer>
      <NavTitle>나의 나눔 후기 ({reviews.length})</NavTitle>
      <div style={{ minHeight: "430px" }}>
        <ReviewWrap>
          {reviews ? (
            reviews
              .slice(
                postPerPage * (currentPage - 1),
                postPerPage * (currentPage - 1) + postPerPage
              )
              .map((review, index) => (
                <EachReview as="div" key={index}>
                  <ReviewUserInfo>
                    <UserImg src={require(`../../Img/${review.src}`)} />
                    <span>{review.id}</span>
                  </ReviewUserInfo>
                  <ReviewContent>{review.content}</ReviewContent>
                </EachReview>
              ))
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
