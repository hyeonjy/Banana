import styled from "styled-components";
import Header from "../components/Header";
import Nav from "../components/Nav";
import banana from "../../Img/banana.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faN } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import { useEffect, useRef } from "react";

const Container = styled.div`
  padding-top: 140px; /**header와 nav의 fixed 때문에 겹치는 문제 해결 */
`;

const ProductList = [
  {
    imgURL:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMDNfNDcg%2FMDAxNjQ2MjkwNzY4MTQw.a0zttEs2wrt2La7WnvRn1cTUv3oWGNwiuYqVPgceaxIg.HymdJ1VTq4-VKp2SC361AXtYhWEQ4AL6zcbUbYHlzK4g.JPEG.caroline77f%2F1097546_16.jpg&type=a340",
    title: "핑크색 블라우스",
    detail: "광진구 | 11시간전",
  },
  {
    imgURL:
      "https://search.pstatic.net/sunny/?src=http%3A%2F%2Fhawaiiseoulcdn.bunjang.net%2Fproduct%2F62244276_1_1478659249_w640.jpg&type=a340",
    title: "니트, 치마 세트",
    detail: "일산 | 10시간 전",
  },
  {
    imgURL:
      "https://search.pstatic.net/sunny/?src=http%3A%2F%2Fseoul-p-studio.bunjang.net%2Fproduct%2F70485637_1_1497101153_w640.jpg&type=sc960_832",
    title: "남자 슬랙스",
    detail: "일산 | 8시간 전",
  },
  {
    imgURL:
      "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fd2192bm55jmxp1.cloudfront.net%2Fresize%2Fl%2Farticle%2F201709%2F81E00B7DA926F42E5516A860B5031182EADFF2ADDAAFD8B3A6DE0337BA79A235.jpg&type=a340",
    title: "자켓",
    detail: "부산 | 6시간 전",
  },
  {
    imgURL:
      "https://search.pstatic.net/sunny/?src=http%3A%2F%2Fhawaiiseoulcdn.bunjang.net%2Fproduct%2F64529415_1_1483944028_w640.jpg&type=a340",
    title: "멜빵 치마",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA4MzFfOTMg%2FMDAxNTA0MTU3OTc0NzQ4.LIZoLMF1BLMqpoVUb7a0CfON7FXIfDrTkNUkPaMdvZcg.4XraEmmSlXm_FMeHBOixKO_RGpE0eaXVS54VvLxYdjog.JPEG.snsdml88%2F1.jpeg&type=a340",
    title: "검정색 에코백",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fccimg.hellomarket.com%2Fimages%2F2018%2Fitem%2F11%2F14%2F22%2F4014_2021699_1.jpg%3Fsize%3Ds4&type=a340",
    title: "체크무늬 블라우스",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/sunny/?src=http%3A%2F%2Fseoul-p-studio.bunjang.net%2Fproduct%2F72820533_1_1502812035_w640.jpg&type=a340",
    title: "세트",
    detail: "지역 | 1분전",
  },
];

/*상품 리스트 - 시작*/

const Products = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const ProductsTitle = styled.h1`
  width: 90%;
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
  max-width: 90%;
  display: flex;
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
  width: 250px;
  height: 280px;
  border-radius: 8px;
`;

const ProductTitle = styled.h1`
  font-size: 20px;
  margin-top: 10px;
  margin-left: 5px;
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
    <Container>
      <Header />
      <Nav />
      {/* 배너 */}
      {/* <Banner>
        <BannerImg />
        <BannerDetail>
          <BannerTitleBox>
            <BannerTitle>
              <BannerTitleSpan>
                <span>바</span>로
              </BannerTitleSpan>
            </BannerTitle>
            <BannerTitle>
              <BannerTitleSpan>
                <span>나</span>누고
              </BannerTitleSpan>
            </BannerTitle>
            <BannerTitle>
              <BannerTitleSpan>
                <span>나</span>눔 받자
              </BannerTitleSpan>
            </BannerTitle>
          </BannerTitleBox>
          <BannerContentBox>
            <BannerContent>Banana는 의류 나눔을 통해</BannerContent>
            <BannerContent>친환경적인 세상을 만듭니다.</BannerContent>
          </BannerContentBox>
        </BannerDetail>
      </Banner> */}
      <Banner />
      {/* New 상품 리스트 */}
      <Products>
        <ProductsTitle>
          <ProductsTitleIcon icon={faN} color={"orange"} />
          ew
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

      <Footer />
    </Container>
  );
}

export default Home;
