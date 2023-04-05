import { useHistory, useParams } from "react-router-dom";
import { UserObj } from "../../UserObj";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Comment from "../components/Comment";
import { useEffect } from "react";
import { useCallback } from "react";
import { set } from "react-hook-form";

const Container = styled.div``;

const Header = styled.div`
  height: 25px;
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  background-color: white;
  padding: 15px 4%;
  z-index: 999;
  width: 92%;
  border: 1px solid #e9ecef;

  h1 {
    font-size: 20px;
    color: rgb(255, 232, 78);
    font-weight: 800;
    font-family: yg-jalnan;
  }
`;

const HeaderIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
`;

const CommentBox = styled.div`
  margin-top: 70px;
`;

function Chat(props) {
  const { userId } = useParams();
  const ChatObj = UserObj.chats.find((item) => item.id === userId);
  const history = useHistory();

  return (
    <Container>
      <Header>
        <HeaderIcon
          onClick={() => {
            history.goBack();
          }}
          icon={faChevronLeft}
        />
        <h1>{ChatObj.id}</h1>
        <HeaderIcon icon={faBars} />
      </Header>

      <CommentBox>
        {ChatObj.chat.map((item, index) => {
          return (
            <>
              <Comment chatList={item} />
            </>
          );
        })}
      </CommentBox>
    </Container>
  );
}

export default Chat;
