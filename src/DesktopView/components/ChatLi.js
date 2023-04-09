import styled from "styled-components";
import { useHistory } from "react-router-dom";
import * as chats from "../../MobileView/routes/Chats";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import ChatList from "../../MobileView/components/ChatList";
import { NoSelectChatLi } from "./Chat";
import { useState } from "react";

const ChatListContainer = styled.div`
  width: fit-content;
  background-color: white;
  position: relative;
  border-left: 1px solid whitesmoke;
  border-right: 1px solid whitesmoke;
`;

const DHeader = styled(chats.Header)`
  position: absolute;
  z-index: 0;
`;

const DHeaderTitle = styled(chats.HeaderTitle)`
  font-size: 13px;
  color: black;
  font-family: "pretendard";
  font-weight: 700;
`;
const DUserImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #80808061;
`;
const DUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DChatsList = styled(chats.ChatsList)`
  width: 300px;
  height: calc(100% - 55px);
`;
const DHeaderIcon = styled(chats.HeaderIcon)`
  font-size: 20px;
  color: orange;
`;
function ChatLi({ FilterUserObj }) {
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
  const NoChatDiv = styled(NoSelectChatLi)`
    width: 300px;
  `;

  return (
    <ChatListContainer>
      <DHeader>
        <DUser>
          <DUserImg src={require(`../../Img/${FilterUserObj.src}`)} />
          <DHeaderTitle>{FilterUserObj.id}</DHeaderTitle>
        </DUser>

        <DHeaderIcon icon={faComment} />
      </DHeader>
      <DChatsList>
        {/**FilterUserObj.chats.length === 0 */}
        {FilterUserObj.chats.length === 0 ? (
          <NoChatDiv>
            {" "}
            <h1>채팅목록이 없습니다.</h1>
          </NoChatDiv>
        ) : (
          <>
            {FilterUserObj.chats.map((chats, index) => {
              return (
                <div onClick={() => handleChatClick(chats)} key={index}>
                  <ChatList
                    chats={chats}
                    index={index}
                    isActive={selectChat === chats}
                  />
                </div>
              );
            })}
          </>
        )}
      </DChatsList>
    </ChatListContainer>
  );
}

export default ChatLi;
