import styled from "styled-components";
import { Container } from "./Home";
import Chat from "../components/Chat";
import ChatLi from "../components/ChatLi";
import { LoginId, UserObj } from "../../Data/UserObj";
import { useEffect, useState } from "react";
const ChatContainer = styled(Container)`
  padding-top: 70px;
  width: 1000px;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  height: 600px;
`;
const ChatDiv = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  justify-content: center;
`;
function Chats() {
  // 본인 userObj
  const FilterUserObj = UserObj.find((item) => item.id === LoginId);

  //두 컴포넌트 렌더링 연결 : 마지막 메세지 display
  const [add, setAdd] = useState(0);

  return (
    <ChatContainer>
      <ChatDiv>
        <ChatLi FilterUserObj={FilterUserObj} add={add} />
        <Chat FilterUserObj={FilterUserObj} setAdd={setAdd} />
      </ChatDiv>
    </ChatContainer>
  );
}

export default Chats;
