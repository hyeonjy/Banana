import { ProductList } from "../ItemObject";
import {
  ItemDetail,
  ItemDetailDiv,
  ItemDiv,
  ItemImg,
  ItemTitle,
  ItemWrap,
  NavTitle,
  NoItemPage,
  PageContainer,
} from "./ShareList";

function HeartList() {
  return (
    <PageContainer>
      <NavTitle>찜 목록 ({ProductList.slice(0, 3).length})</NavTitle>
      <ItemWrap>
        {ProductList ? (
          ProductList.slice(0, 3).map((item, index) => (
            <ItemDiv key={index} to={`/post/${item.id}`}>
              <ItemImg src={item.imgURL} />
              <ItemDetailDiv>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDetail>{item.detail}</ItemDetail>
              </ItemDetailDiv>
            </ItemDiv>
          ))
        ) : (
          <NoItemPage>나눔 상품이 없습니다</NoItemPage>
        )}
      </ItemWrap>
    </PageContainer>
  );
}

export default HeartList;
