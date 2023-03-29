import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import Nav from "../components/Nav";
import { itemsGroup } from "../ItemGroup";
import { ProductList } from "../ItemObject";
import {
  CateContainer,
  Categoryli,
  CategoryMain,
  CategoryUl,
  ItemDiv,
  Product,
  ProductDetail,
  ProductImg,
  ProductTitle,
  TopCate,
} from "./Gruop";
import { Container } from "./Home";
const SubCateContainer = styled(CateContainer)``;
function SubGroup() {
  const location = useLocation();
  const { main } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const categoryValue = searchParams.get("subitem"); // id( = main category)
  const mainGroup = itemsGroup.find((item) => item.id === Number(main));
  const subItems = ProductList.filter(
    (item) => item.sub === categoryValue && item.main === mainGroup.main
  );
  return (
    <>
      <Nav />
      <SubCateContainer>
        <TopCate>
          <CategoryMain>{mainGroup.main}</CategoryMain>
          <CategoryUl>
            {mainGroup.sub.map((sub, index) => (
              <Categoryli
                to={{ pathname: `/group/${main}`, search: `?subitem=${sub}` }}
                key={index}
              >
                {sub}
              </Categoryli>
            ))}
          </CategoryUl>
        </TopCate>
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
      </SubCateContainer>
    </>
  );
}
export default SubGroup;
