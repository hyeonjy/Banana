import styled from "styled-components";
import { Container } from "./Home";
import Chat from "../components/Chat";
import ChatLi from "../components/ChatLi";
const ChatContainer = styled(Container)`
  display: flex;
  padding-top: 70px;
  width: 80%;
  margin: 0 auto;
`;
function Chats() {
  return (
    <ChatContainer>
      <ChatLi />
      <Chat />
    </ChatContainer>
  );
}

export default Chats;
