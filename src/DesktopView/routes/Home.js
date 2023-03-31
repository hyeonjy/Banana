import styled, { keyframes } from "styled-components";
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
const BounceAni = keyframes`
100% {
    transform: translateY(-10px);
    text-shadow: 0 1px 0 rgb(255 148 63),
                 0 2px 0 rgb(255 148 63),
                 0 3px 0 rgb(255 148 63),
                 0 4px 0 rgb(255 148 63),
                 0 5px 0 rgb(255 148 63),
                 0 6px 0 rgb(255 148 63),
                 0 7px 0 rgb(255 148 63),
                 0 8px 0 rgb(255 148 63),
                 0 9px 0 rgb(255 148 63),
                 0 50px 25px rgba(0, 0, 0, .2);
  }
`;
const Products = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  //margin-bottom: 100px;
  width: 1050px;
  margin: 0 auto;
`;

const ProductsTitle = styled.h1`
  width: 95%;

  font-size: 35px;

  font-weight: 600;
  margin-bottom: 30px;
  margin-left: 20px;
  text-align: first;
  color: #ffe466;
  text-shadow: 0 1px 0 rgb(255 148 63), 0 2px 0 rgb(255 148 63),
    0 3px 0 rgb(255 148 63), 0 4px 0 rgb(255 148 63), 0 5px 0 rgb(255 148 63),
    0 6px 0 transparent, 0 7px 0 transparent, 0 8px 0 transparent,
    0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
  span {
    font-family: "KOTRA_BOLD-Bold";
    display: inline-block;
    animation: ${BounceAni} 0.6s 0.2s ease infinite alternate;
    &:nth-of-type(2) {
      animation-delay: 0.3s;
    }
    &:nth-of-type(3) {
      animation-delay: 0.4s;
    }
  }
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
  padding-left: 5%;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 21%;
  &:not(:nth-of-type(4n + 1)) {
    margin-left: 4%;
  }
  margin-bottom: 30px;
`;

const ProductImg = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductTitle = styled.h1`
  font-size: 16px;
  margin: 10px 0 5px 2px;
  line-height: 20px;
  font-weight: 600;
  width: 210px;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
`;

const ProductDetail = styled.span`
  font-size: 13px;
  margin-left: 2px;
  color: #232323ab;
`;

const MoreBtn = styled.div`
  width: 80px;
  height: 45px;
  font-size: 18px;
  //border: 1px solid gray;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: 500;
  //border: 6px solid rgb(255, 230, 0);
  background-color: rgb(255, 230, 0);
  cursor: pointer;
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
            {/**  <ProductsTitleIcon icon={faN} color={"orange"} /> */}
            <span>N</span>
            <span>E</span>
            <span>W</span>
          </ProductsTitle>
          <ProductsBox>
            {ProductList.slice(0, 8).map((item, index) => (
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
            {/**  <ProductsTitleIcon icon={faFire} color={"red"} />
             */}
            Hot
          </ProductsTitle>
          <ProductsBox>
            {ProductList.slice(0, 4).map((item, index) => (
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
