import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NoItem from "../components/NoItem";
import SideNav from "../components/SideNav";
import {
  WrapDiv,
  BackGround,
  CateContainer,
  Categoryli,
  CategoryMain,
  CategoryUl,
  ItemDiv,
  queryArray,
  QueryLi,
  QueryUl,
  TopCate,
  CurrentCateAndQuery,
  CurrentCate,
} from "./Gruop";
import Paging, { SetPage } from "../components/Paging";
import { itemsGroup } from "../../Data/ItemGroup";
import { ItemObj } from "../../Data/ItemObj";
import { ShowItem } from "../components/ShowItem";

const SubCateContainer = styled(CateContainer)``;
const MainCate = styled(CategoryMain)`
  &:hover {
    text-decoration: underline;
  }
`;
const SubCateLi = styled(Categoryli)`
  font-weight: ${(props) => (props.iscategory ? "800" : "500")};
  &:hover {
    font-weight: 800;
  }
`;
//sub Menu 클릭 -> 해당 background
const CurrentIndex = styled.div`
  position: absolute;
  transition: all 0.3s;
  background-color: #ffe600;
  border-radius: 20px;
  left: ${(props) => `${props.left * 20 + 10}%`};
  transform: translate(-50%, -15%);
  height: 43px;
  z-index: 0;
  top: 0px;
  width: 15%;
`;

function SubGroup() {
  const { main } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const categoryValue = searchParams.get("subitem"); // id( = main category)
  const mainGroup = itemsGroup.find((item) => item.id === Number(main));
  const subItems = ItemObj.filter(
    (item) => item.sub === categoryValue && item.main === mainGroup.main
  );

  const [currentIdx, setCurrentIdx] = useState(
    mainGroup.sub.indexOf(categoryValue)
  );

  //페이지네이션
  const { pageValue, currentPage, setCurrentPage, count, setCount } = SetPage(
    searchParams,
    subItems
  );
  const postPerPage = 12; // 한 페이지 아이템 수

  //강제 렌더링
  useEffect(() => {
    setCurrentIdx(mainGroup.sub.indexOf(categoryValue));
    setCurrentPage(Number(pageValue));
    setCount(subItems.length);
  }, [categoryValue]);

  return (
    <div style={{ position: "relative" }}>
      <BackGround />
      <WrapDiv>
        <SideNav />
        <SubCateContainer>
          {/* 카테고리 Link */}
          <TopCate>
            <MainCate
              title="전체보기"
              as={Link}
              to={{
                pathname: `/group`,
                search: `?category=${main}&page=${1}`,
              }}
            >
              {mainGroup.main}
            </MainCate>

            <CategoryUl>
              {mainGroup.sub.map((sub, index) => (
                <SubCateLi
                  to={{
                    pathname: `/group/${main}`,
                    search: `?subitem=${sub}&page=${1}`,
                  }}
                  key={index}
                  iscategory={categoryValue === sub ? 1 : 0}
                  onClick={() => {
                    setCurrentIdx(index);
                  }}
                >
                  {sub}
                </SubCateLi>
              ))}
              <CurrentIndex left={`${currentIdx}`} />
            </CategoryUl>
          </TopCate>

          {/*Query*/}
          {subItems.length > 0 ? (
            <>
              <CurrentCateAndQuery>
                {/* 상단 카테고리 경로(ex:상의 > 티셔츠) */}
                <CurrentCate style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    <Link
                      to={{
                        pathname: `/group`,
                        search: `?category=${main}&page=${1}`,
                      }}
                    >
                      {mainGroup.main}
                    </Link>
                    &nbsp; &gt; &nbsp;{categoryValue} ({subItems.length})
                  </span>
                </CurrentCate>

                <QueryUl>
                  {queryArray.map((query, index) => (
                    <QueryLi key={index}>{query}</QueryLi>
                  ))}
                </QueryUl>
              </CurrentCateAndQuery>

              {/*Item List */}
              <ItemDiv>
                <ShowItem
                  item={subItems.slice(
                    postPerPage * (currentPage - 1),
                    postPerPage * (currentPage - 1) + postPerPage
                  )}
                  state={true}
                />
              </ItemDiv>

              {/*Pagination */}
              <Paging
                page={currentPage}
                count={count}
                setCurrentPage={setCurrentPage}
                postPerPage={postPerPage}
              />
            </>
          ) : (
            <NoItem />
          )}
        </SubCateContainer>
      </WrapDiv>
    </div>
  );
}
export default SubGroup;
