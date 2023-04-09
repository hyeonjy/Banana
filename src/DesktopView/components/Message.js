import styled, { css } from "styled-components";
import { UserObj } from "../../Data/UserObj";

const Container = styled.div`
  display: flex;
  /* background-color: orange; */
  padding: 10px;
  margin-bottom: 15px;

  ${(props) => {
    if (props.isUser) {
      return css`
        justify-content: flex-end;
      `;
    }
  }}
`;

const OtherImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 15px;
  border: 1px solid #e9ecef;
  border-radius: 15px;
  margin-right: 10px;
  object-fit: cover;
`;

const ContentBox = styled.div`
  display: flex;
  align-items: flex-end;
  ${(props) => {
    if (props.isUser) {
      return css`
        flex-direction: row-reverse;
      `;
    }
  }}/* div {
    background-color: #f2f2f5;
    padding: 13px;
    font-size: 15px;
    border-radius: 15px;
    margin-right: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    line-height: 20px;
  } */
`;

const Author = styled.h1`
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 14px;
  ${(props) => {
    if (props.isUser) {
      return css`
        display: none;
      `;
    }
  }}
`;

const BubbleBox = styled.div`
  background-color: ${(props) =>
    props.isUser ? "rgba(255, 200, 98, 0.93)" : " #f2f2f5"};
  color: ${(props) => (props.isUser ? "white" : " black")};

  padding: 13px;
  font-size: 13px;
  border-radius: 15px;
  margin-right: 5px;
  max-width: 240px;
  font-weight: ${(props) => (props.isUser ? "600" : " 500")};
  h1 {
    display: inline-block;
    max-width: 230px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
`;

const TimeSpan = styled.span`
  opacity: 0.8;
  font-size: 12px;
  ${(props) => {
    if (props.isUser) {
      return css`
        margin-right: 5px;
      `;
    }
  }}
`;

function Message({ itemObj, isUser }) {
  return (
    <Container isUser={isUser}>
      {!isUser && <OtherImg src={require(`../../Img/${itemObj.src}`)} />}

      <ContentBox isUser={isUser}>
        <div>
          <Author isUser={isUser}>{itemObj.id}</Author>
          <BubbleBox isUser={isUser}>
            <h1>{itemObj.content}</h1>
          </BubbleBox>
        </div>
        <TimeSpan isUser={isUser}>{itemObj.time}</TimeSpan>
      </ContentBox>
    </Container>
  );
}

export default Message;
