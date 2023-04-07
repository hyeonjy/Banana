import styled, { css } from "styled-components";
import { BackIcon, Header } from "./MUpload";
import { faCaretDown, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import { ShowItemFn } from "../components/ShowItem";
import { ItemObj } from "../ItemObj";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { set } from "react-hook-form";
import area from "../../DesktopView/components/Area";
import HomeMenu from "../components/HomeMenu";
import { useEffect } from "react";

const RegionContainer = styled.div``;
const RegionCate = styled.div`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;
const RegionList = styled.div`
  ${(props) =>
    props.regionActive &&
    css`
      position: absolute;
      top: 60px;
      width: 100vw;
      height: calc(98vh - 120px);
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      li {
        list-style: none;
        flex-grow: 1;
        padding-right: 10px;

        &:hover {
          background-color: whitesmoke;
        }
        span {
          line-height: 38px;
          font-size: 15px;
        }
        &:active span {
          font-weight: 700;
        }
      }
    `}
`;
function Region() {
  const [regionActive, setRegionActive] = useState(false);
  const [currentRegion, setCurrentRegion] = useState();
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const region = searchParams.get("region");

  //강제 렌더링
  useEffect(() => {
    setCurrentRegion(region);
  }, [region]);

  const selectRegion = (area) => {
    //setCurrentRegion(area);
    setRegionActive(false);
    searchParams.set("region", area);
    history.push({
      pathname: `/region`,
      search: `?${searchParams}`,
    });
  };
  //지역 쿼리 추가
  //const regionItem = ItemObj.filter((item)=>item.region===currentRegion);
  return (
    <RegionContainer>
      <Header
        style={{
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
        <RegionCate
          onClick={() => {
            setRegionActive((prev) => !prev);
          }}
        >
          <span>{currentRegion}</span>
          <FontAwesomeIcon icon={faCaretDown} />
        </RegionCate>
      </Header>
      {/* 지역리스트 or 아이템 목록 */}
      {regionActive ? (
        <RegionList regionActive={regionActive}>
          {area.map((area, index) => (
            <li
              key={index}
              onClick={() => {
                selectRegion(area);
              }}
            >
              <span> {area}</span>
            </li>
          ))}
        </RegionList>
      ) : (
        <ShowItemFn item={ItemObj} pad={true} padBottom={true} />
      )}
      <HomeMenu />
    </RegionContainer>
  );
}

export default Region;
