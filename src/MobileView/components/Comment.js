import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Message from "./Message";
import { UserObj } from "../../UserObj";
import { LoginId } from "../../UserObj";

const DateBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  h1 {
    color: white;
    background-color: #92a4b2;
    padding: 15px;
    font-size: 13px;
    border-radius: 25px;
  }
`;

function Comment({ chatList }) {
  return (
    <>
      <DateBox>
        <h1>
          {chatList.date.slice(0, 4)}년 {chatList.date.slice(4, 6)}월{" "}
          {chatList.date.slice(6)}일
        </h1>
      </DateBox>
      {chatList.commentList.map((itemObj, index) => {
        return (
          <Message
            itemObj={itemObj}
            isUser={itemObj.id === LoginId}
            key={index}
          />
        );
      })}
    </>
  );
}

export default Comment;
