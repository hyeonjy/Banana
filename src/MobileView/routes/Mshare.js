import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ShowItemFn } from "../components/ShowItem";
import { BackIcon, Header } from "./MUpload";
import { ItemObj } from "../../Data/ItemObj";
import { useRecoilValue } from "recoil";
import { postData } from "../../atom";

const Container = styled.div``;

function Mshare() {
  const location = useLocation();
  const history = useHistory();

  // url 파라미터를 통해 맞는 옷 상품과 사진 인덱스 가져오기
  const searchParams = new URLSearchParams(location.search);
  const userIdValue = searchParams.get("userId");
  const filterItemObj = ItemObj.filter((item) => item.userId === userIdValue);

  return (
    <Container>
      {/* 나눔목록 헤더 */}
      <Header style={{ position: "fixed", top: "0" }}>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
          icon={faChevronLeft}
        />
        <span>나눔목록</span>
      </Header>
      {/* 나눔 리스트 */}
      <ShowItemFn item={filterItemObj} pad={true} />
    </Container>
  );
}

export default Mshare;
