import styled, { css } from "styled-components";
import Modal from "../../DesktopView/components/Modal";
import HomeMenu from "../components/HomeMenu";
import { useState } from "react";
import { LoginId, UserObj } from "../../Data/UserObj";
import User from "../components/User";
import { ShowItemFn } from "../components/ShowItem";
import { Link, useHistory, useLocation } from "react-router-dom";
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
  const userIdValue = searchParams.get("userId");
  const FilterUserObj = UserObj.find((user) => user.id === userIdValue);
  const filterItemObj = ItemObj.filter((item) => item.userId === userIdValue);
  const handleReviewClick = () => {
    const searchParams = new URLSearchParams();
    searchParams.append("userId", userIdValue);
    history.push({
      pathname: "/review",
      search: "?" + searchParams.toString(),
    });
  };

  const handleShareClick = () => {
    const searchParams = new URLSearchParams();
    searchParams.append("userId", userIdValue);
    history.push({
      pathname: "/share",
      search: "?" + searchParams.toString(),
    });
  };

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
        <User
          img={FilterUserObj.src}
          grade={FilterUserObj.grade}
          userId={FilterUserObj.id}
          setActiveGrade={setActiveGrade}
          profile="true"
        />

        <ItemBox>
          <ItemHeader>
            <h1>나눔물품</h1>
            <ItemIcon icon={faChevronRight} onClick={handleShareClick} />
          </ItemHeader>
          <ShowItemFn
            item={filterItemObj}
            profile="true"
            style={{ innerHeight: "200px" }}
          />
        </ItemBox>

        <ItemBox style={{ marginBottom: "100px" }}>
          <ItemHeader>
            <h1>나의나눔후기</h1>
            <ItemIcon icon={faChevronRight} onClick={handleReviewClick} />
          </ItemHeader>
          <ShowReview user={FilterUserObj} pad={true} profile="true" />
        </ItemBox>

        <HomeMenu />
      </Container>

      {activeGrade && (
        <Modal setActiveGrade={setActiveGrade} isMobile={"true"} />
      )}
    </>
  );
}

export default MProfileReview;
