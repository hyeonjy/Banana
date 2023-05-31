import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: auto;
  font-family: "Pretendard";
  min-height: calc(100vh - 360px - 160px);
  padding-top: ${(props) => (props.pad ? "55px" : "0px")};
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
  margin-top: ${(props) => (props.profile === "true" ? "0" : "60px")};
  min-height: ${(props) =>
    props.profile ? "110px" : "calc(100vh - 360px - 160px)"};
  color: rgba(0, 0, 0, 0.3);
`;

function ShowReview({ pad, reviews, profile = "false" }) {
  return (
    <>
      {reviews.length !== 0 ? (
        <Container pad={pad}>
          {reviews.map((review, index) => {
            return (
              <ReviewBox key={index}>
                <Header>
                  <img src={require(`../../Img/${review.profile}`)} />
                  <h1>{review.nickname}</h1>
                </Header>
                <Content>{review.review_content}</Content>
              </ReviewBox>
            );
          })}
        </Container>
      ) : (
        <EmptyPage pad={pad} profile={profile}>
          나눔후기가 없습니다
        </EmptyPage>
      )}
    </>
  );
}
export default ShowReview;
