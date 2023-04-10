import styled from "styled-components";
import { LoginId, UserObj } from "../../Data/UserObj";
// import EmptyPage from "../components/ShowItem";

const Container = styled.div`
  margin-top: 60px;
  width: 100%;
  height: auto;
  font-family: "Pretendard";
  min-height: calc(100vh - 360px - 160px);
`;
const ReviewBox = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid #e9ecef;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    border: 1px solid #e9ecef;
    border-radius: 50%;
    padding: 5px;
    margin-right: 10px;
    object-fit: cover;
  }
  h1 {
    font-size: 15px;
    font-weight: 600;
  }
`;
const Content = styled.h1`
  font-size: 13px;
  padding: 5px;
  line-height: 20px;
`;

const EmptyPage = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 500;
  width: 100%;
  align-items: center;
  font-family: "Pretendard";
  min-height: calc(100vh - 360px - 160px);
`;

function ShowReview({ user, profile = false }) {
  const reviewList = user.reviews;
  return (
    <>
      {reviewList.length !== 0 ? (
        <>
          {profile ? (
            <Container style={{ marginTop: "10px" }}>
              {reviewList.slice(0, 2).map((review, index) => {
                return (
                  <ReviewBox>
                    <Header>
                      <img src={require(`../../Img/${review.src}`)} />
                      <h1>{review.id}</h1>
                    </Header>
                    <Content>{review.content}</Content>
                  </ReviewBox>
                );
              })}
            </Container>
          ) : (
            <Container>
              {reviewList.map((review, index) => {
                return (
                  <ReviewBox>
                    <Header>
                      <img src={require(`../../Img/${review.src}`)} />
                      <h1>{review.id}</h1>
                    </Header>
                    <Content>{review.content}</Content>
                  </ReviewBox>
                );
              })}
            </Container>
          )}
        </>
      ) : (
        <EmptyPage>나눔후기가 없습니다</EmptyPage>
      )}
    </>
  );
}
export default ShowReview;
