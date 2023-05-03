import styled, { css } from "styled-components";
import Modal from "../../Modal";
import HomeMenu from "../components/HomeMenu";
import { useState } from "react";
import { LoginId, UserObj } from "../../Data/UserObj";
import User from "../components/User";
import { ShowItemFn } from "../components/ShowItem";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { ItemObj } from "../../Data/ItemObj";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHouse,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import ShowReview from "../components/ShowReview";
import { BackIcon, Header } from "./MUpload";
import useAxios from "../../useAxio";
import { useEffect } from "react";

const Container = styled.div`
  filter: ${(props) => (props.activeGrade ? "blur(2px)" : "unset")};
  ${(props) => {
    if (props.activeGrade) {
      return css`
        height: 100vh;
      `;
    }
  }}
`;

const DHeader = styled(Header)`
  top: ${(props) => (props.activeGrade ? "-56px" : "0")};
  z-index: 2;
`;

const ShareBox = styled.div``;
// const FilterItemObj = UserObj.filter((user) => user.id === LoginId);

const ItemBox = styled.div`
  margin-top: 25px;
  height: 260px;
  &:last-child {
    margin-bottom: 150px;
  }
`;
const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  padding: 10px 30px;
  margin-bottom: 5px;
  /* border-bottom: 1px solid #e9ecef; */
  h1 {
    font-weight: 600;
  }
`;
const ItemIcon = styled(FontAwesomeIcon)``;

function MProfileReview() {
  const [activeGrade, setActiveGrade] = useState(false);

  const location = useLocation();
  const history = useHistory();

  // url 파라미터를 통해 맞는 옷 상품과 사진 인덱스 가져오기
  const searchParams = new URLSearchParams(location.search);
  // const userIdValue = searchParams.get("userId");
  const { userId } = useParams();
  const FilterUserObj = UserObj.find((user) => user.id === "바나나좋아");
  const filterItemObj = ItemObj.filter((item) => item.userId === "바나나좋아");
  // const [shareItem, setShareItem] = useState();
  const [user, setUser] = useState();
  const [userPost, setUserPosts] = useState();

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

  // const handleReviewClick = () => {
  //   const searchParams = new URLSearchParams();
  //   searchParams.append("userId", usernickname);
  //   history.push({
  //     pathname: "/review",
  //     search: "?" + searchParams.toString(),
  //   });
  // };

  // const handleShareClick = () => {
  //   const searchParams = new URLSearchParams();
  //   searchParams.append("userId", usernickname);
  //   history.push({
  //     pathname: "/share",
  //     search: "?" + searchParams.toString(),
  //   });
  // };

  return (
    <>
      <Container activeGrade={activeGrade}>
        <DHeader activeGrade={activeGrade} style={{ position: "fixed" }}>
          <BackIcon
            onClick={() => {
              history.goBack();
            }}
            icon={faChevronLeft}
          />
          <span>프로필</span>
        </DHeader>
        {userPost ? (
          <>
            <User
              img={user.profile}
              grade={user.grade}
              nickname={user.nickname}
              userId={user.user_id}
              setActiveGrade={setActiveGrade}
              profile="true"
            />
            <ItemBox>
              <Link to={`/share/${user.user_id}`}>
                <ItemHeader>
                  <h1>나눔물품</h1>
                  <ItemIcon icon={faChevronRight} />
                </ItemHeader>
                <ShowItemFn item={userPost} profile="true" />
              </Link>
            </ItemBox>
          </>
        ) : (
          <h1>loading...</h1>
        )}
        {/* <User
          img={shareItem[0].profile}
          grade={shareItem[0].grade}
          userId={shareItem[0].nickname}
          setActiveGrade={setActiveGrade}
          profile="true"
        /> */}

        {/* <ItemBox>
          <ItemHeader onClick={handleShareClick}>
            <h1>나눔물품</h1>
            <ItemIcon icon={faChevronRight} />
          </ItemHeader>
          <ShowItemFn item={shareItem} profile="true" />
        </ItemBox> */}

        {/* <ItemBox style={{ marginBottom: "100px" }}>
          <ItemHeader onClick={handleReviewClick}>
            <h1>나의나눔후기</h1>
            <ItemIcon icon={faChevronRight} />
          </ItemHeader>
          <ShowReview
            reviews={FilterUserObj.reviews.slice(0, 2)}
            profile="true"
          />
        </ItemBox> */}

        <HomeMenu />
      </Container>

      {activeGrade && (
        <Modal setActiveGrade={setActiveGrade} isMobile={"true"} />
      )}
    </>
  );
}

export default MProfileReview;
