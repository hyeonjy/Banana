import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";
import { itemsGroup } from "../ItemGroup";
import { ProductList } from "../ItemObject";
import { Container } from "./Home";

export const CateContainer = styled(Container)`
  width: 900px;
  margin: 0 auto;
`;
export const TopCate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 30px;
  border-bottom: 1px solid #80808047;
`;
export const CategoryMain = styled.span`
  font-size: 22px;
  font-weight: 700;
  line-height: 60px;
  width: 50%;
  text-align: center;
  margin-bottom: 10px;
`;

export const CategoryUl = styled.ul`
  display: flex;
  width: 50%;
`;
export const Categoryli = styled(Link)`
  flex-grow: 1;
  text-align: center;
  cursor: pointer;
`;

export const ItemDiv = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export const Product = styled(Link)`
  &:not(:nth-of-type(3n + 1)) {
    margin-left: 4%;
  }
  margin-bottom: 20px;
  width: 30%;
`;
export const ProductImg = styled.img`
  //width: 250px;
  height: 250px;
  width: 100%;
  object-fit: cover;
  margin-bottom: 10px;
`;
export const ProductTitle = styled.h1`
  font-weight: 600;
  font-size: 17px;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
  margin-bottom: 5px;
`;
export const ProductDetail = styled.span`
  font-size: 13px;
`;
function Group() {
  //url - 현재 카테고리 정보
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryValue = searchParams.get("category"); // id( = main category)
  const Group = itemsGroup.find((item) => item.id === Number(categoryValue));

  //현재 cate에 해당하는 item
  const cateItem = ProductList.filter((item) => item.main === Group.main);
  return (
    <>
      <Nav />
      <CateContainer>
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
      </CateContainer>
    </>
  );
}
export default Group;
