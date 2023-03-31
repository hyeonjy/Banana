import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";
import NoItem from "../components/NoItem";
import SideNav from "../components/SideNav";
import { itemsGroup } from "../ItemGroup";
import { ProductList } from "../ItemObject";
import { Container } from "./Home";

export const CateContainer = styled(Container)`
  width: 950px;
  //margin: 0 auto;
  padding-top: 0;
  padding-bottom: 70px;
`;

//--------상위 카테고리-------//
export const TopCate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 30px;
  border-bottom: 3px solid rgb(167 167 167 / 28%);
`;
export const CategoryMain = styled.span`
  font-size: 26px;
  font-weight: 700;
  line-height: 85px;
  width: 50%;
  text-align: center;
  margin-bottom: 10px;
`;
export const CategoryUl = styled.ul`
  display: flex;
  width: 60%;
  position: relative;
  line-height: 30px;
`;
export const Categoryli = styled(Link)`
  //flex-grow: 1;
  width: 20%;
  text-align: center;
  cursor: pointer;

  z-index: 20;
  &:hover {
    font-weight: 800;
  }
`;

//------------Item Query-----------//
export const QueryDiv = styled.div``;

export const QueryUl = styled.ul`
  width: 30%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0;
`;
export const QueryLi = styled.li`
  font-size: 14px;
  padding-left: 10px;
  &:not(:first-of-type) {
    border-left: 1px solid gray;
    padding-left: 20px;
    margin-left: 20px;
  }
  &:hover {
    font-weight: 700;
  }
  cursor: pointer;
`;

//--------Item List-------//
export const ItemDiv = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  min-height: 60vh;
  padding-left: 10px;
`;
export const Product = styled(Link)`
  &:not(:nth-of-type(4n + 1)) {
    margin-left: 4%;
  }
  margin-bottom: 30px;
  width: 21%;
`;
export const ProductImg = styled.img`
  //width: 250px;
  height: 200px;
  width: 100%;
  object-fit: cover;
  margin-bottom: 10px;
`;
export const ProductTitle = styled.h1`
  font-weight: 600;
  font-size: 16px;

  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
  margin-bottom: 5px;
`;
export const ProductDetail = styled.span`
  font-size: 13px;
  color: #232323ab;
`;

//배너?
export const BackGround = styled.div`
  position: absolute;
  top: 0px;
  z-index: 0;
  min-width: 1300px;
  width: 100%;
  //height: 293px;
  //background-color: beige;
  height: 549px;
  background: linear-gradient(360deg, rgba(255, 255, 255, 1) 0%, #ffffba 100%);

  transform: translate(0, -39%);
`;
//----------------end-------------------//
export const queryArray = ["최신등록순", "조회순", "관심순"];
function Group() {
  //url - 현재 카테고리 정보
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryValue = searchParams.get("category"); // id( = main category)
  const Group = itemsGroup.find((item) => item.id === Number(categoryValue));

  //현재 cate에 해당하는 item
  const cateItem = ProductList.filter((item) => item.main === Group.main);
  return (
    <div style={{ position: "relative" }}>
      <BackGround />
      <div
        style={{
          justifyContent: "space-evenly",
          display: "flex",
          width: "1300px",
          //margin: "0 auto",
          margin: " 157px auto",
          zIndex: "1",
          position: "relative",
          backgroundColor: "white",
          borderRadius: "21px",
          //box-shadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 25px 100px -20px, rgba(0, 0, 0, 0.3) 0px 25px 60px -30px",
        }}
      >
        <SideNav />
        <CateContainer>
          {/* 카테고리 Link */}
          <TopCate>
            <CategoryMain>{Group.main}</CategoryMain>
            <CategoryUl>
              {Group.sub.map((sub, index) => (
                <Categoryli
                  to={{
                    pathname: `/group/${categoryValue}`,
                    search: `?subitem=${sub}`,
                  }}
                  key={index}
                >
                  {sub}
                </Categoryli>
              ))}
            </CategoryUl>
          </TopCate>
          {/* 카테고리 끝 */}
          {cateItem.length > 0 ? (
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
                    {Group.main} - 전체({cateItem.length})
                  </span>
                </div>
                <QueryUl>
                  {queryArray.map((query, index) => (
                    <QueryLi key={index}>{query}</QueryLi>
                  ))}
                </QueryUl>
              </div>

              <ItemDiv>
                {cateItem.map((item, index) => (
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
          {/*Query*/}
        </CateContainer>
      </div>
    </div>
  );
}
export default Group;
