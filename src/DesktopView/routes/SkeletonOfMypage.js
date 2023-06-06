import {
  ItemWrap,
  NavTitle,
  PageContainer,
} from "../components/MypageContents";
import Skeleton from "react-loading-skeleton";
import {
  EachReview,
  Product,
  ProductDatailDiv,
  ReviewContent,
  ReviewUserInfo,
} from "../components/ShowItem";
import { ProductHeader } from "./Gruop";
import { ProductDetail, ProductTitle } from "./Home";
import { ReviewWrap } from "./Review";

function SkeletonofMypage() {
  return (
    <PageContainer>
      <NavTitle>
        <Skeleton width={"20%"} height={"30px"} />
      </NavTitle>
      <div style={{ minHeight: "430px" }}>
        <ItemWrap>
          {Array(8)
            .fill()
            .map((_, index) => (
              <Product as="div" layout="row" key={index}>
                <Skeleton
                  height={"80px"}
                  width={"110px"}
                  style={{ flexShrink: 0, marginRight: "10px" }}
                />
                <ProductDatailDiv>
                  <ProductHeader>
                    <ProductTitle layout="row">
                      <Skeleton height={"40px"} width={"160px"} />
                    </ProductTitle>
                  </ProductHeader>
                  <ProductDetail layout="row">
                    <Skeleton height={"15px"} width={"160px"} />
                  </ProductDetail>
                </ProductDatailDiv>
              </Product>
            ))}
        </ItemWrap>
      </div>
    </PageContainer>
  );
}

export function SkeletonReview() {
  return (
    <div style={{ minHeight: "430px" }}>
      <ReviewWrap>
        <EachReview>
          <ReviewUserInfo>
            <Skeleton height={30} width={30} style={{ borderRadius: "50%" }} />
            <Skeleton height={25} width={60} />
          </ReviewUserInfo>
          <ReviewContent>
            <Skeleton height={30} width={"80%"} />
          </ReviewContent>
        </EachReview>
      </ReviewWrap>
    </div>
  );
}
export default SkeletonofMypage;
