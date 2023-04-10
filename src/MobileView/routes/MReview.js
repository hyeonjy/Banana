import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ShowItemFn } from "../components/ShowItem";
import { BackIcon, Header } from "./MUpload";
import { LoginId, UserObj } from "../../Data/UserObj";
import ShowReview from "../components/ShowReview";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

function MReview(props) {
  // const history = useHistory();
  // const location = useLocation();
  // const userId = location.state.userId;
  // const filterUserObj = UserObj.find((user) => user.id === userId);
  // console.log(userId);

  const location = useLocation();
  const history = useHistory();

  // url 파라미터를 통해 맞는 옷 상품과 사진 인덱스 가져오기
  const searchParams = new URLSearchParams(location.search);
  const userIdValue = searchParams.get("userId");
  const filterUserObj = UserObj.find((user) => user.id === userIdValue);
  console.log(userIdValue);
  return (
    <Container>
      {/* 나눔후기 목록 헤더 */}
      <Header style={{ position: "fixed", top: "0" }}>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
          icon={faChevronLeft}
        />
        <span>{userIdValue}님 나눔후기</span>
      </Header>
      {/* 나눔 후기 리스트 */}
      <ShowReview user={filterUserObj} pad={true} />
    </Container>
  );
}

export default MReview;
