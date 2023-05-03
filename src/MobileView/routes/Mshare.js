import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { ShowItemFn } from "../components/ShowItem";
import { BackIcon, Header } from "./MUpload";
import { ItemObj } from "../../Data/ItemObj";
import { useRecoilValue } from "recoil";
import { postData } from "../../atom";
import useAxios from "../../useAxio";
import { useEffect } from "react";
import { LoginId } from "../../Data/UserObj";
import { useState } from "react";

const Container = styled.div``;

function Mshare() {
  const location = useLocation();
  const history = useHistory();

  // url 파라미터를 통해 맞는 옷 상품과 사진 인덱스 가져오기
  const searchParams = new URLSearchParams(location.search);
  // const userIdValue = searchParams.get("userId");
  // const userIdValue = "바나나좋아";
  const { userId } = useParams();
  // const filterItemObj = ItemObj.filter((item) => item.userId === userIdValue);
  const [postItem, setPostItem] = useState();
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState();

  const { response, loading, error } = useAxios({
    method: "get",
    url: `http://localhost:8080/userpage/data/${userId}`,
  });
  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/data")
    //   .then((response) => console.log(response.data))
    //   .catch((error) => console.error(error));
    if (!loading) {
      console.log("share:", response);
      setUser(response.user);
      setUserPosts(response.posts);
      // console.log("postItem:", postItem);
    }
    console.log(loading);
    //console.log(error);
  }, [response, loading, error]);

  return (
    <Container>
      {/* 나눔 리스트 */}
      {userPosts && user ? (
        <>
          {/* 나눔목록 헤더 */}
          <Header style={{ position: "fixed", top: "0" }}>
            <BackIcon
              onClick={() => {
                history.goBack();
              }}
              icon={faChevronLeft}
            />
            <span>{user.nickname}님 나눔목록</span>
          </Header>
          <ShowItemFn item={userPosts} pad={true} />
        </>
      ) : (
        <h1>loading...</h1>
      )}

      {/* <ShowItemFn item={filterItemObj} pad={true} /> */}
    </Container>
  );
}

export default Mshare;
