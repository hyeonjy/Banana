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
import { useQuery } from "react-query";
import { userPageApi } from "../../Api";

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
  const { userId } = useParams();

  // 패치
  const { data, refetch } = useQuery(["userpage", userId], () =>
    userPageApi(userId)
  );

  useEffect(() => {
    refetch();
  }, [userId]);

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
        {data?.posts && data?.reviews ? (
          <>
            <User
              img={data.user.profile}
              grade={data.user.grade}
              nickname={data.user.nickname}
              userId={data.user.user_id}
              setActiveGrade={setActiveGrade}
              profile="true"
            />
            <ItemBox>
              <Link to={`/share/${data.user.user_id}`}>
                <ItemHeader>
                  <h1>나눔물품 profile</h1>
                  <ItemIcon icon={faChevronRight} />
                </ItemHeader>
              </Link>
              <ShowItemFn item={data.posts} profile="true" />
            </ItemBox>

            <ItemBox style={{ marginBottom: "100px" }}>
              <Link to={`/review/${data.user.user_id}`}>
                <ItemHeader>
                  <h1>나눔후기</h1>
                  <ItemIcon icon={faChevronRight} />
                </ItemHeader>
              </Link>
              <ShowReview reviews={data.reviews} profile="true" />
            </ItemBox>
          </>
        ) : (
          <h1>loading...</h1>
        )}

        <HomeMenu />
      </Container>

      {activeGrade && (
        <Modal setActiveGrade={setActiveGrade} isMobile={"true"} />
      )}
    </>
  );
}

export default MProfileReview;
