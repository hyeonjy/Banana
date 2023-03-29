import styled from "styled-components";
import Nav from "../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faN } from "@fortawesome/free-solid-svg-icons";

import Banner from "../components/Banner";
import { ProductList } from "../ItemObject";
import { Link } from "react-router-dom";

export const Container = styled.div`
  padding-top: 140px; /**header와 nav의 fixed 때문에 겹치는 문제 해결 */
  min-height: calc(100vh - 300px); //300px은 footer height
`;

const Products = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  //margin-bottom: 100px;
  width: 80%;
  min-width: 1015px;
  margin: 0 auto;
`;

const ProductsTitle = styled.h1`
  width: 95%;

  font-size: 30px;
  font-weight: 600;
  margin-bottom: 30px;
  margin-left: 20px;
  text-align: first;
`;

const ProductsTitleIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  color: ${(props) => props.color};
  margin-right: 5px;
`;

const ProductsBox = styled.div`
  display: flex;
  width: 95%;
  align-items: center;
  flex-wrap: wrap;
`;

const Product = styled.div`
  /* width: 250px; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px;
`;

const ProductImg = styled.img`
  width: 210px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductTitle = styled.h1`
  font-size: 20px;
  margin-top: 10px;
  margin-left: 5px;
  width: 210px;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
`;

const ProductDetail = styled.span`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 10px;
  margin-left: 5px;
`;

const MoreBtn = styled.div`
  width: 100px;
  height: 50px;
  font-size: 25px;
  border: 1px solid gray;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
`;

/*상품 리스트 - 끝*/

function Home() {
  return (
    <>
      <Nav />
      <Container>
        <div style={{ minWidth: "1015px" }}>
          <Banner />
        </div>

        {/* New 상품 리스트 */}
        <Products>
          <ProductsTitle>
            <ProductsTitleIcon icon={faN} color={"orange"} />
            ew
          </ProductsTitle>
          <ProductsBox>
            {ProductList.map((item, index) => (
              <Product key={index}>
                <Link
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
                </Link>
              </Product>
            ))}
          </ProductsBox>
          <MoreBtn>더보기</MoreBtn>
        </Products>

        {/* Hot 상품 리스트 */}

        <Products>
          <ProductsTitle>
            <ProductsTitleIcon icon={faFire} color={"red"} />
            Hot
          </ProductsTitle>
          <ProductsBox>
            {ProductList.map((item, index) => (
              <Product key={index}>
                <ProductImg src={item.imgURL} />
                <ProductTitle>{item.title}</ProductTitle>
                <ProductDetail>{item.detail}</ProductDetail>
              </Product>
            ))}
          </ProductsBox>
        </Products>
      </Container>
    </>
  );
}

export default Home;
