import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { ShowItemFn } from "../components/ShowItem";
import { BackIcon, Header } from "./MUpload";
import { LoginId, UserObj } from "../../Data/UserObj";
import ShowReview from "../components/ShowReview";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import useAxios from "../../useAxio";

const Container = styled.div``;

function MReview(props) {
  const location = useLocation();
  const history = useHistory();

  const { userId } = useParams();
  const [user, setUser] = useState();
  const [reviews, setReviews] = useState();

  const { response, loading, error, executeGet } = useAxios({
    method: "get",
    url: `http://localhost:8080/userpage/data/${userId}`,
  });

  useEffect(() => {
    //refetch();
    executeGet();
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("reviews:", response);
      setUser(response.user);
      setReviews(response.reviews);
      // console.log("postItem:", postItem);
    }
    console.log(loading);
    //console.log(error);
  }, [response, loading, error]);

  return (
    <Container>
      {/* 나눔후기 리스트 */}
      {reviews && user ? (
        <>
          {/* 나눔후기 목록 헤더 */}
          <Header style={{ position: "fixed", top: "0" }}>
            <BackIcon
              onClick={() => {
                history.goBack();
              }}
              icon={faChevronLeft}
            />
            <span>{user.nickname}님의 나눔후기</span>
          </Header>
          {/* 나눔 후기 리스트 */}
          <ShowReview reviews={reviews} pad={true} />
        </>
      ) : (
        <h1>loading...</h1>
      )}
    </Container>
  );
}

export default MReview;
