import styled from "styled-components";
import { Container } from "./Home";
import Chat from "../components/Chat";
import ChatLi from "../components/ChatLi";
const ChatContainer = styled(Container)`
  padding-top: 70px;
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const ChatDiv = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  justify-content: center;
`;
function Chats() {
  return (
    <ChatContainer>
      <ChatDiv>
        <ChatLi />
        <Chat />
      </ChatDiv>
    </ChatContainer>
  );
}

export default Chats;
