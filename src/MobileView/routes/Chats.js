import styled, { css } from "styled-components";
import HomeMenu from "../components/HomeMenu";
import { useState } from "react";
import User from "../components/User";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatList from "../components/ChatList";
import { Link } from "react-router-dom";
import { UserObj } from "../../UserObj";

const Container = styled.div``;
const Header = styled.header`
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
`;
const HeaderTitle = styled.h1`
  font-size: 20px;
  color: rgb(255, 232, 78);
  font-weight: 800;
  font-family: yg-jalnan;
`;

const HeaderIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
`;

const ChatsList = styled.div`
  margin-top: 55px;
`;

function Chats() {
  return (
    <Container>
      <Header>
        <HeaderTitle>Chat</HeaderTitle>
        <HeaderIcon icon={faComment} />
      </Header>
      <ChatsList>
        {UserObj.chats.map((user, index) => {
          return (
            <Link to={`/chat/${user.id}`} key={index}>
              <ChatList user={user} />
            </Link>
          );
        })}
      </ChatsList>
      <HomeMenu />
    </Container>
  );
}

export default Chats;
