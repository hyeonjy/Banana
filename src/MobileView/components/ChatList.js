import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { LoginId, UserObj } from "../../Data/UserObj";

export const Container = styled.div`
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

export const ChatContent = styled.div`
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

function ChatList({ chats }) {
  const commentLength =
    chats.chat[chats.chat.length - 1].commentList.length - 1;
  return (
    <Container>
      <img src={require(`../../Img/${chats.src}`)} />
      <ChatContent>
        <h1>{chats.id}</h1>
        <span>
          {chats.chat[chats.chat.length - 1].commentList[commentLength].content}
        </span>
      </ChatContent>
    </Container>
  );
}

export default ChatList;
