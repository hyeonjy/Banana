import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";
import NoItem from "../components/NoItem";
import SideNav from "../components/SideNav";
import { itemsGroup } from "../ItemGroup";
import { ProductList } from "../ItemObject";
import {
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
  const subItems = ProductList.filter(
    (item) => item.sub === categoryValue && item.main === mainGroup.main
  );

  const [currentIdx, setCurrentIdx] = useState(
    mainGroup.sub.indexOf(categoryValue)
  );
  //강제 렌더링
  useEffect(() => {
    setCurrentIdx(mainGroup.sub.indexOf(categoryValue));
  }, [categoryValue]);

  return (
    <div style={{ position: "relative" }}>
      <BackGround />
      <div
        style={{
          //padding: "70px 20px",
          display: "flex",
          justifyContent: "space-evenly",
          width: "1300px",
          //margin: "0 auto",
          margin: " 157px auto",
          zIndex: "1",
          position: "relative",
          backgroundColor: "white",
          borderRadius: "21px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 25px 100px -20px, rgba(0, 0, 0, 0.3) 0px 25px 60px -30px",
        }}
      >
        <SideNav />
        <SubCateContainer>
          {/* 카테고리 Link */}
          <TopCate>
            <MainCate
              title="전체보기"
              as={Link}
              to={{
                pathname: `/group`,
                search: `?category=${main}`,
              }}
            >
              {mainGroup.main}
            </MainCate>

            <CategoryUl>
              {mainGroup.sub.map((sub, index) => (
                <SubCateLi
                  to={{ pathname: `/group/${main}`, search: `?subitem=${sub}` }}
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "17px", fontWeight: "600" }}>
                    <Link
                      to={{
                        pathname: `/group`,
                        search: `?category=${main}`,
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
                {subItems.map((item, index) => (
                  <Product
                    key={index}
                    to={{
                      pathname: `/post/${item.id}`,
                      state: {
                        item,
                      },
                    }}
                  >
                    <ProductImg src={item.imgURL[0]} />
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductDetail>{item.detail}</ProductDetail>
                  </Product>
                ))}
              </ItemDiv>
            </>
          ) : (
            <NoItem />
          )}
        </SubCateContainer>
      </div>
    </div>
  );
}
export default SubGroup;
