import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
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
import { Product, ShowItem, Thum } from "../components/ShowItem";
import { useRecoilValue } from "recoil";
import { postData } from "../../atom";
import useAxios from "../../useAxio";
import { useQuery } from "react-query";
import { subPostApi } from "../../Api";
import Skeleton from "react-loading-skeleton";

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

  // const [subItem, setSubItem] = useState(subItems);
  const [currentIdx, setCurrentIdx] = useState(
    mainGroup.sub.indexOf(categoryValue)
  );

  //페이지네이션

  const pageValue = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(Number(pageValue));
  const [count, setCount] = useState();
  const postPerPage = 12; // 한 페이지 아이템 수

  const [currentQuery, setCurrentQuery] = useState(0);
  const history = useHistory();

  function changeQuery(index) {
    const searchParams = new URLSearchParams(location.search);
    setCurrentQuery(index);
    searchParams.set("query", index);
    history.push({ search: searchParams.toString() });
  }

  const { data: subItem, refetch } = useQuery(
    [categoryValue, currentQuery],
    () => subPostApi(categoryValue, currentQuery)
  );

  useEffect(() => {
    if (subItem) {
      setCurrentIdx(mainGroup.sub.indexOf(categoryValue));
      setCurrentPage(Number(pageValue));
      setCount(subItem.length);
    }
  }, [subItem]);

  //강제 렌더링
  useEffect(() => {
    refetch();
  }, [categoryValue, currentQuery]);

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
          {subItem ? (
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
                    &nbsp; &gt; &nbsp;{categoryValue} ({subItem.length})
                  </span>
                </CurrentCate>

                <QueryUl>
                  {queryArray.map((query, index) => (
                    <QueryLi
                      key={index}
                      onClick={() => {
                        changeQuery(index);
                      }}
                      isActive={index === currentQuery}
                    >
                      {query}
                    </QueryLi>
                  ))}
                </QueryUl>
              </CurrentCateAndQuery>

              {subItem.length > 0 ? (
                <>
                  {/*Item List */}
                  <ItemDiv>
                    <ShowItem
                      item={subItem?.slice(
                        postPerPage * (currentPage - 1),
                        postPerPage * (currentPage - 1) + postPerPage
                      )}
                      state={true}
                    />
                  </ItemDiv>

                  {/*Pagination */}
                  <Paging
                    currentPage={currentPage}
                    count={count}
                    setCurrentPage={setCurrentPage}
                    postPerPage={postPerPage}
                  />
                </>
              ) : (
                <NoItem />
              )}
            </>
          ) : (
            <>
              <CurrentCateAndQuery>
                <CurrentCate>
                  <Skeleton height={35} width={100} />
                </CurrentCate>
                <QueryUl>
                  <Skeleton height={35} width={150} />
                </QueryUl>
              </CurrentCateAndQuery>

              <ItemDiv>
                {Array(12)
                  .fill()
                  .map((_, index) => (
                    <Product key={index} layout="col">
                      <Thum layout="col">
                        <Skeleton height={200} width={200} />
                      </Thum>
                    </Product>
                  ))}
              </ItemDiv>
            </>
          )}
        </SubCateContainer>
      </WrapDiv>
    </div>
  );
}
export default SubGroup;
