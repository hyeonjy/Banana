import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Container } from "./Home";
import NoItem from "../components/NoItem";
import SideNav from "../components/SideNav";

import Paging from "../components/Paging";
import { itemsGroup } from "../../Data/ItemGroup";
import { ItemObj } from "../../Data/ItemObj";

export const WrapDiv = styled(Container)`
  justify-content: space-evenly;
  display: flex;
  width: 1300px;
  padding: 0;
  margin: 140px auto;
  z-index: 1;
  position: relative;
  background-color: white;
  border-radius: 21px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 25px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 25px 60px -30px;
`;

export const CateContainer = styled.div`
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
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  //min-height: 60vh;
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
export const ProductHeader = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  gap: 5px;
`;
export const ProductTitle = styled.h1`
  font-weight: 600;
  font-size: 16px;
  width: 70%;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
`;
export const ProductState = styled.div`
  width: 25%;
  padding: 2px 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  color: white;
  background-color: ${(props) =>
    props.status === "reservate" ? "orange" : "gray"};

  border-radius: 15px;
  font-size: 10px;
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
  const pageValue = searchParams.get("page");
  const Group = itemsGroup.find((item) => item.id === Number(categoryValue));

  //현재 cate에 해당하는 item
  const cateItem = ItemObj.filter((item) => item.main === Group.main);

  //페이지네이션
  const [count, setCount] = useState(cateItem.length); // 전체 아이템 개수
  const [currentPage, setCurrentPage] = useState(Number(pageValue)); // 현재 페이지 번호
  const [postPerPage] = useState(12); // 한 페이지 아이템 수

  //강제 렌더링
  useEffect(() => {
    setCurrentPage(Number(pageValue));
    setCount(cateItem.length);
  }, [categoryValue]);

  return (
    <div style={{ position: "relative" }}>
      <BackGround />
      <WrapDiv>
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
                    search: `?subitem=${sub}&page=${1}`,
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
                {/*Query*/}
                <QueryUl>
                  {queryArray.map((query, index) => (
                    <QueryLi key={index}>{query}</QueryLi>
                  ))}
                </QueryUl>
              </div>

              <ItemDiv>
                {cateItem
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
                      <ProductHeader>
                        <ProductTitle>{item.title}</ProductTitle>
                        {item.state === "reservate" && (
                          <ProductState status="reservate">예약중</ProductState>
                        )}
                        {item.state === "complete" && (
                          <ProductState status="complete">
                            나눔완료
                          </ProductState>
                        )}
                      </ProductHeader>

                      <ProductDetail>
                        {item.area} | {item.timeAgo}
                      </ProductDetail>
                    </Product>
                  ))}
              </ItemDiv>
              <Paging
                page={currentPage}
                count={count}
                //setPage={setPage}
                setCurrentPage={setCurrentPage}
                postPerPage={postPerPage}
              />
            </>
          ) : (
            <NoItem />
          )}
        </CateContainer>
      </WrapDiv>
    </div>
  );
}
export default Group;
