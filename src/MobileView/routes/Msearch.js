import { useHistory, useLocation } from "react-router-dom";
import { ItemObj } from "../ItemObj";

import styled from "styled-components";
import { faChevronLeft, faX } from "@fortawesome/free-solid-svg-icons";
import { BackIcon, Header } from "./MUpload";
import { ShowItemFn } from "../components/ShowItem";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeMenu from "../components/HomeMenu";
const SearchContainer = styled.div``;
const SerchForm = styled.form`
  width: calc(93% - 20px);
  margin: 0 5px 0 auto;
  background: whitesmoke;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;
const SearchInput = styled.input`
  padding: 2px 10px;
  width: calc(85% - 20px);
  background: transparent;
  font-size: 15px;

  outline: none;
`;
const XIcon = styled(FontAwesomeIcon)`
  background: transparent;
  float: right;
  flex-grow: 1;
  font-size: 14px;
`;

function Msearch() {
  const { register, handleSubmit, setValue } = useForm();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("content");
  const searchItem = ItemObj.filter(
    (item) =>
      item.title.includes(searchValue) || item.content.includes(searchValue)
  );
  const history = useHistory();

  //검색 후 search input의 커서가 계속 깜박이는 문제() -> 전체 컴포넌트 렌더링
  //백엔드 도입 후 전체 페이지 로딩후 나타나는 것으로 해결
  const [pageKey, setPageKey] = useState(false);
  const pageRander = () => {
    setPageKey((prev) => !prev);
  };
  /////////////////////////
  //form 유효할 때 실행
  const onValid = (data) => {
    pageRander();
    history.push({
      pathname: "/search",
      search: `?content=${data.searchContent}`,
    });
  };

  return (
    <SearchContainer key={pageKey}>
      <Header
        style={{
          textAlign: "left",
          position: "fixed",
          top: "0",
        }}
      >
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
          icon={faChevronLeft}
        />
        <SerchForm onSubmit={handleSubmit(onValid)}>
          <SearchInput
            {...register("searchContent", {
              required: "검색어를 입력해주세요",
            })}
            defaultValue={searchValue}
            autoComplete="off"
          />
          <XIcon
            onClick={() => {
              setValue("searchContent", "");
            }}
            icon={faX}
          />
        </SerchForm>
      </Header>

      <ShowItemFn item={searchItem} pad={true} padBottom={true} query={true} />
      <HomeMenu />
    </SearchContainer>
  );
}

export default Msearch;
