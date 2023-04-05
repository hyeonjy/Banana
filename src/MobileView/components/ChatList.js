import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    border-radius: 15px;
    margin-right: 15px;
    border: 1px solid #e9ecef;
  }
  border-bottom: 1px solid #e9ecef;
`;

const ChatContent = styled.div`
  h1 {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 8px;
  }
  span {
    color: rgba(0, 0, 0, 0.3);
    font-size: 13px;

    display: block;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function ChatList(props) {
  const [chatLength, setChatLength] = useState(0);
  const [commentLength, setCommentLength] = useState(0);

  useEffect(() => {
    setChatLength(props.user.chat.length - 1);
    setCommentLength(
      props.user.chat[props.user.chat.length - 1].commentList.length - 1
    );
  }, []);

  return (
    <Container>
      <img src={require(`../../Img/${props.user.src}`)} />
      <ChatContent>
        <h1>{props.user.id}</h1>
        <span>
          {props.user.chat[chatLength].commentList[commentLength].content}
        </span>
      </ChatContent>
    </Container>
  );
}

export default ChatList;
