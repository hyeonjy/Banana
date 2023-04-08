import styled from "styled-components";
import { Container } from "./Home";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";

function Chats() {
  return (
    <Container>
      <ChatList />
      <Chat />
    </Container>
  );
}

export default Chats;
