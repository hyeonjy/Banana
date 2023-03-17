import styled from "styled-components";
import { ItemObj } from "../ItemObj";
const ItemDiv = styled.div`
  width: 100%;
  height: auto;
  font-family: "Pretendard";
`;
const ItemTitle = styled.span``;
const ItemContent = styled.span``;
const ItemArea = styled.span``;
const ItemTimeAgo = styled.span``;
const ItemText = styled.div`
  width: 60%;
  margin-top: 10px;
  ${ItemTitle} {
    font-size: 15px;
    font-weight: 800;
    display: block;
    margin-bottom: 7px;
  }
  ${ItemContent} {
    display: block;
    overflow: hidden; // 을 사용해 영역을 감출 것
    text-overflow: ellipsis; // 로 ... 을 만들기
    white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
    word-break: break-all;
    height: 20px;
    font-size: 13px;
    width: 100%;
    margin-bottom: 0px;
  }
  ${ItemArea} {
    margin-right: 6px;
    font-size: 12px;
    color: gray;
  }
  ${ItemTimeAgo} {
    font-size: 11px;
    color: gray;
  }
`;
const ItemImg = styled.img`
  width: 24%;
  height: 100%;
`;
const Item = styled.div`
  height: 90px;
  border-bottom: 1px solid #b6b6b663;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

function ShowItem() {
  return (
    <ItemDiv>
      {ItemObj.map((item, index) => (
        <Item key={index}>
          <ItemText>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemContent>{item.content}</ItemContent>
            <ItemArea>{item.area}</ItemArea>
            <ItemTimeAgo>{item.timeAge}</ItemTimeAgo>
          </ItemText>
          <ItemImg src={require(`../../Img/${item.img}`)} />
        </Item>
      ))}
    </ItemDiv>
  );
}
export default ShowItem;
