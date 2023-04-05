import styled, { css } from "styled-components";
import { UserObj } from "../../UserObj";

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
  margin-left: 10px;
  ${(props) => {
    if (props.isUser) {
      return css`
        display: none;
      `;
    }
  }}
`;

const BubbleBox = styled.div`
  background-color: #f2f2f5;
  padding: 13px;
  font-size: 15px;
  border-radius: 15px;
  margin-right: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  line-height: 20px;
`;

const TimeSpan = styled.span`
  opacity: 0.8;
  font-size: 14px;
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
    <>
      {isUser ? (
        <Container isUser={isUser}>
          <ContentBox isUser={isUser}>
            <div>
              <Author isUser={isUser}>{itemObj.id}</Author>
              <BubbleBox>
                <span>{itemObj.content}</span>
              </BubbleBox>
            </div>
            <TimeSpan isUser={isUser}>{itemObj.time}</TimeSpan>
          </ContentBox>
        </Container>
      ) : (
        <Container isUser={isUser}>
          <OtherImg src={require(`../../Img/${itemObj.src}`)} />
          <ContentBox isUser={isUser}>
            <div>
              <Author isUser={isUser}>{itemObj.id}</Author>
              <BubbleBox>
                <span>{itemObj.content}</span>
              </BubbleBox>
            </div>
            <TimeSpan isUser={isUser}>{itemObj.time}</TimeSpan>
          </ContentBox>
        </Container>
      )}
    </>
  );
}

export default Message;
