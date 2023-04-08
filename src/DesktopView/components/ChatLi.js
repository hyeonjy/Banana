import styled from "styled-components";
import Chats from "../../MobileView/routes/Chats";
import { LoginId, UserObj } from "../../Data/UserObj";
import { useHistory } from "react-router-dom";
import * as chats from "../../MobileView/routes/Chats";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import ChatList from "../../MobileView/components/ChatList";
const ChatListContainer = styled.div`
  width: fit-content;
  background-color: white;
  position: relative;
  border: 1px solid whitesmoke;
`;

const DHeader = styled(chats.Header)`
  position: absolute;
`;
const DHeaderTitle = styled(chats.HeaderTitle)``;

const DChatsList = styled(chats.ChatsList)``;
const DHeaderIcon = styled(chats.HeaderIcon)``;
function ChatLi() {
  const FilterUserObj = UserObj.find((item) => item.id === LoginId);
  const history = useHistory();

  //채팅목록 클릭 이벤트
  const handleChatClick = (props) => {
    const searchParams = new URLSearchParams();
    searchParams.append("userId", props.id);
    searchParams.append("itemId", props.itemId);
    history.push({
      pathname: "/chat",
      search: "?" + searchParams.toString(),
    });
  };

  return (
    <ChatListContainer>
      <DHeader>
        <DHeaderTitle>Chat</DHeaderTitle>
        <DHeaderIcon icon={faComment} />
      </DHeader>
      <DChatsList>
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
            {FilterUserObj.chats.map((user, index) => {
              return (
                <div onClick={() => handleChatClick(user)} key={index}>
                  <ChatList user={user} />
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
