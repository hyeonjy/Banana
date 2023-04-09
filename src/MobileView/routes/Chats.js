import styled, { css } from "styled-components";
import HomeMenu from "../components/HomeMenu";
import { useState } from "react";
import User from "../components/User";
import { faComment, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatList from "../components/ChatList";
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginId, UserObj } from "../../Data/UserObj";

const Container = styled.div``;
export const Header = styled.header`
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
export const HeaderTitle = styled.h1`
  font-size: 20px;
  color: rgb(255, 232, 78);
  font-weight: 800;
  font-family: yg-jalnan;
`;

export const HeaderIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
`;

export const ChatsList = styled.div`
  margin-top: 55px;
  /* background-color: orange; */
`;

function Chats() {
  const FilterUserObj = UserObj.find((item) => item.id === LoginId);
  const history = useHistory();
  const [selectChat, setSelectChat] = useState("");
  //채팅목록 클릭 이벤트
  const handleChatClick = (props) => {
    setSelectChat(props);
    const searchParams = new URLSearchParams();
    searchParams.append("userId", props.id);
    searchParams.append("itemId", props.itemId);
    history.push({
      pathname: "/chat",
      search: "?" + searchParams.toString(),
    });
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Chat</HeaderTitle>
        <HeaderIcon icon={faComment} />
      </Header>
      <ChatsList>
        {FilterUserObj.chats.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "100vh",
              alignItems: "Center",
              justifyContent: "center",
              marginTop: "-55px",
              color: "gray",
              fontSize: "23px",
            }}
          >
            채팅목록이 없습니다.
          </div>
        ) : (
          <>
            {FilterUserObj.chats.map((chats, index) => {
              return (
                <div onClick={() => handleChatClick(chats)} key={index}>
                  <ChatList chats={chats} isActive={selectChat === chats} />
                </div>
              );
            })}
          </>
        )}
      </ChatsList>
      <HomeMenu />
    </Container>
  );
}

export default Chats;
