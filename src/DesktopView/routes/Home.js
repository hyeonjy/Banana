import styled from "styled-components";
import Header from "../components/Header";
import Nav from "../components/Nav";
import banana from "../../Img/banana.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faN } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

/*첫번째 배너 코드- 시작*/

const Banner = styled.div`
  width: 100%;
  height: 550px;
  background-color: #efeb6d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgCircle = styled.div`
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
`;

const BannerImg = styled.img.attrs({
  src: `${banana}`,
})`
  width: 350px;
  height: 500px;
  margin-top: 10px;
  margin-left: 40px;
`;

const BannerDetail = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 120px;
`;

const BannerTitleBox = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
`;

const BannerTitle = styled.h1`
  font-size: 40px;
  color: black;
  font-weight: 600;
  margin-top: 20px;
`;

const BannerContentBox = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
`;

const BannerContent = styled.h1`
  font-size: 25px;
  color: white;
  margin: 5px;
  font-weight: 600;
`;
/*첫번째 배너 그림 - 끝*/

const ProductList = [
  {
    imgURL:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8114288%2F81142883676.jpg&type=f372_372",
    title: "제목",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8114288%2F81142883676.jpg&type=f372_372",
    title: "제목",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8114288%2F81142883676.jpg&type=f372_372",
    title: "제목",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8114288%2F81142883676.jpg&type=f372_372",
    title: "제목",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8114288%2F81142883676.jpg&type=f372_372",
    title: "제목",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8114288%2F81142883676.jpg&type=f372_372",
    title: "제목",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8114288%2F81142883676.jpg&type=f372_372",
    title: "제목",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8114288%2F81142883676.jpg&type=f372_372",
    title: "제목",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8114288%2F81142883676.jpg&type=f372_372",
    title: "제목",
    detail: "지역 | 1분전",
  },
  {
    imgURL:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8114288%2F81142883676.jpg&type=f372_372",
    title: "제목",
    detail: "지역 | 1분전",
  },
];

/*상품 리스트 - 시작*/

const Products = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const ProductsTitle = styled.h1`
  width: 90%;
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 30px;
  margin-left: 20px;
`;

const ProductsTitleIcon = styled(FontAwesomeIcon)`
  font-size: 35px;
  color: ${(props) => props.color};
  margin-right: 5px;
`;

const ProductsBox = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Product = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
`;

const ProductImg = styled.img`
  width: 230px;
  height: 230px;
  border-radius: 15px;
`;

const ProductTitle = styled.h1`
  font-size: 25px;
  margin: 10px;
`;

const ProductDetail = styled.span`
  font-size: 15px;
  color: rgba(0, 0, 0, 0.4);
  margin: 10px;
`;

/*상품 리스트 - 끝*/

function Home() {
  return (
    <>
      <Header />
      <Nav />
      {/* 배너 */}
      <Banner>
        <ImgCircle>
          <BannerImg />
        </ImgCircle>
        <BannerDetail>
          <BannerTitleBox>
            <BannerTitle>바로</BannerTitle>
            <BannerTitle>나누고</BannerTitle>
            <BannerTitle>나눔받자</BannerTitle>
          </BannerTitleBox>
          <BannerContentBox>
            <BannerContent>Banana는 의류 나눔을 통해</BannerContent>
            <BannerContent>친환경적인 세상을 만듭니다.</BannerContent>
          </BannerContentBox>
        </BannerDetail>
      </Banner>

      {/* New 상품 리스트 */}
      <Products>
        <ProductsTitle>
          <ProductsTitleIcon icon={faN} color={"orange"} />
          ew
        </ProductsTitle>
        <ProductsBox>
          {ProductList.map((item) => (
            <Product>
              <ProductImg src={item.imgURL} />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductDetail>{item.detail}</ProductDetail>
            </Product>
          ))}
        </ProductsBox>
      </Products>

      {/* Hot 상품 리스트 */}

      <Products>
        <ProductsTitle>
          <ProductsTitleIcon icon={faFire} color={"red"} />
          Hot
        </ProductsTitle>
        <ProductsBox>
          {ProductList.map((item) => (
            <Product>
              <ProductImg src={item.imgURL} />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductDetail>{item.detail}</ProductDetail>
            </Product>
          ))}
        </ProductsBox>
      </Products>

      <Footer />
    </>
  );
}

export default Home;
