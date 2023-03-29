import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProductList } from "../ItemObject";

export const PageContainer = styled.div`
  background-color: #f5f5f594;
  height: fit-content;
  min-height: 480px;
  flex-grow: 1;
`;
export const ItemWrap = styled.div`
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  width: 85%;
  margin: 0 auto 30px;
`;

export const ItemDiv = styled(Link)`
  height: fit-content;
  width: 50%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  @media screen and (max-width: 830px) {
    width: 90%;
    padding-left: 8%;
    justify-content: flex-start;
  }
`;
export const ItemImg = styled.img`
  width: 110px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 10px;
`;
export const ItemDetailDiv = styled.div`
  width: 50%;
`;
export const ItemTitle = styled.div`
  font-size: 16px;
  line-height: 40px;
  font-weight: 500;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
`;
export const ItemDetail = styled.div`
  font-size: 12px;
`;
export const NoItemPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  line-height: 300px;
`;
export const NavTitle = styled.h4`
  width: 85%;
  margin: 30px auto;
  font-weight: 600;
  font-size: 17px;
  @media screen and (max-width: 830px) {
    width: 70%;
  }
`;

function ShareList() {
  return (
    <PageContainer>
      <NavTitle>나눔 목록 ({ProductList.length})</NavTitle>
      <ItemWrap>
        {ProductList ? (
          ProductList.map((item, index) => (
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
export default ShareList;
