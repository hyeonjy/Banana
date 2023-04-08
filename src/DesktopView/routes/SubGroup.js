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
  Product,
  ProductDetail,
  ProductImg,
  ProductTitle,
  queryArray,
  QueryLi,
  QueryUl,
  TopCate,
} from "./Gruop";
import Paging from "../components/Paging";
import { itemsGroup } from "../../Data/ItemGroup";
import { ItemObj } from "../../Data/ItemObj";

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
  const pageValue = searchParams.get("page");
  const mainGroup = itemsGroup.find((item) => item.itemId === Number(main));
  const subItems = ItemObj.filter(
    (item) => item.sub === categoryValue && item.main === mainGroup.main
  );

  const [currentIdx, setCurrentIdx] = useState(
    mainGroup.sub.indexOf(categoryValue)
  );

  //페이지네이션
  const [count, setCount] = useState(subItems.length); // 전체 아이템 개수
  const [currentPage, setCurrentPage] = useState(Number(pageValue)); // 현재 페이지 번호
  const [postPerPage] = useState(12); // 한 페이지 아이템 수

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "8px 5px 0 5px",
                }}
              >
                {/* 상단 카테고리 경로(ex:상의 > 티셔츠) */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "17px", fontWeight: "600" }}>
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
                </div>

                <QueryUl>
                  {queryArray.map((query, index) => (
                    <QueryLi key={index}>{query}</QueryLi>
                  ))}
                </QueryUl>
              </div>

              {/*Item List */}
              <ItemDiv>
                {subItems
                  .slice(
                    postPerPage * (currentPage - 1),
                    postPerPage * (currentPage - 1) + postPerPage
                  )
                  .map((item, index) => (
                    <Product
                      key={index}
                      to={{
                        pathname: `/post/${item.itemId}`,
                        state: {
                          item,
                        },
                      }}
                    >
                      <ProductImg
                        src={require(`../../Img/${item.img[0]}.jpg`)}
                      />
                      <ProductTitle>{item.title}</ProductTitle>
                      <ProductDetail>
                        {item.area}|{item.timeAgo}
                      </ProductDetail>
                    </Product>
                  ))}
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
