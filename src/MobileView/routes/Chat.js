import { useHistory, useLocation, useParams } from "react-router-dom";
import { LoginId, UserObj } from "../../UserObj";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronLeft,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Comment from "../components/Comment";
import { useEffect } from "react";
import { useCallback } from "react";
import { set } from "react-hook-form";
import { ItemObj } from "../ItemObj";
import { useRef } from "react";

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

const ItemBox = styled.div`
  position: fixed;
  top: 56.6px;
  background-color: white;
  /* margin-top: 56.6px; */
  /* background-color: orange; */
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  padding: 15px 4%;
  z-index: 999;
  width: 92%;
  img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 10px;
    object-fit: cover;
  }
`;
const ItemContent = styled.div`
  h1 {
    font-size: 15px;
    margin-bottom: 3px;
    font-weight: 600;
  }
  span {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const CommentBox = styled.div`
  margin-top: 150px;
  margin-bottom: 80px;
  overflow-y: scroll;
`;

const MessageForm = styled.form`
  height: 50px;
  display: flex;
  background-color: rgb(255, 232, 78);
  background-color: rgb(242, 242, 245);
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  padding: 5px 4%;
  z-index: 999;
  width: 92%;
  button {
    border: none;
    padding: 0;
  }
`;
const MessageIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
`;

const MessageInput = styled.input`
  width: 75%;
  height: 35px;
  border-radius: 20px;
  padding: 5px 10px;
  &:focus {
    outline: none;
  }
`;

function Chat(props) {
  const location = useLocation();
  const history = useHistory();
  const [message, setMessage] = useState("");

  // url 파라미터를 통해 맞는 옷 상품과 사진 인덱스 가져오기
  const searchParams = new URLSearchParams(location.search);
  const userIdValue = searchParams.get("userId");
  const itemIdValue = searchParams.get("itemId");
  const filterItemObj = ItemObj.find((item) => item.id === Number(itemIdValue));

  // 유저 Obj 가져오기
  const FilterUserObj = UserObj.find((item) => item.id === LoginId);
  const FilterOtherUserObj = UserObj.find((item) => item.id === userIdValue);

  // 채팅 obj 가져오기
  const [ChatObj, setChatObj] = useState(
    FilterUserObj.chats.find(
      (item) => item.id === userIdValue && item.itemId === Number(itemIdValue)
    )
  );
  const OtherChatObj = FilterOtherUserObj.chats.find(
    (item) => item.id === LoginId && item.itemId === Number(itemIdValue)
  );

  // 스크롤 맨 아래로 내리기(메시지 입력시 스크롤 맨 아래로)
  const scrollRef = useRef();
  useEffect(() => {
    if (scrollRef.current) {
      window.scrollTo({ top: window.innerHeight, left: 0, behavior: "smooth" });
    }
  }, [message]);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "message") {
      setMessage(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // 메시지 보낸 날짜(연도,월,일과 time) 저장
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const messageDate = year + month + day;
    const hour = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const time = `${hour}:${min}`;
    // 채팅을 주고 받은 적이 없는 경우,
    if (ChatObj === undefined) {
      FilterUserObj.chats.push({
        id: filterItemObj.userId,
        src: FilterOtherUserObj.src,
        itemId: Number(itemIdValue),
        chat: [
          {
            date: messageDate,
            commentList: [
              {
                id: LoginId,
                src: FilterUserObj.src,
                content: message,
                time: time,
              },
            ],
          },
        ],
      });
      FilterOtherUserObj.chats.push({
        id: LoginId,
        src: UserObj.find((item) => item.id === userIdValue).src,
        itemId: Number(itemIdValue),
        chat: [
          {
            date: messageDate,
            commentList: [
              {
                id: LoginId,
                src: FilterUserObj.src,
                content: message,
                time: time,
              },
            ],
          },
        ],
      });
      setChatObj(
        FilterUserObj.chats.find(
          (item) =>
            item.id === userIdValue && item.itemId === Number(itemIdValue)
        )
      );
    }
    // 채팅을 주고 받은 적이 있는 경우,
    else {
      const FilterChatObj = ChatObj.chat.find(
        (item) => item.date === messageDate
      );
      const FilterOtherChatObj = OtherChatObj.chat.find(
        (item) => item.date === messageDate
      );
      // 오늘 날짜에 주고 받은 채팅이 있는 경우
      if (FilterChatObj !== undefined) {
        FilterChatObj.commentList.push({
          id: LoginId,
          src: FilterUserObj.src,
          content: message,
          time: time,
        });
        FilterOtherChatObj.commentList.push({
          id: LoginId,
          src: FilterUserObj.src,
          content: message,
          time: time,
        });
      }
      // 오늘 날짜에 주고 받은 채팅이 없는 경우
      else {
        ChatObj.chat.push({
          date: messageDate,
          commentList: [
            {
              id: LoginId,
              src: FilterUserObj.src,
              content: message,
              time: time,
            },
          ],
        });
        OtherChatObj.chat.push({
          date: messageDate,
          commentList: [
            {
              id: LoginId,
              src: FilterUserObj.src,
              content: message,
              time: time,
            },
          ],
        });
      }
    }
    setMessage("");
  };
  return (
    <Container>
      {/* 상대방 ID 헤더 */}
      <Header>
        <HeaderIcon
          onClick={() => {
            history.goBack();
          }}
          icon={faChevronLeft}
        />
        <h1>{userIdValue}</h1>
        <HeaderIcon icon={faBars} />
      </Header>

      {/* 채팅 나눔 물품 */}
      <ItemBox>
        <img src={require(`../../Img/${filterItemObj.img[0]}.jpg`)} />
        <ItemContent>
          <h1>{filterItemObj.title}</h1>
          <span>
            {filterItemObj.main} {">"} {filterItemObj.sub}
          </span>
        </ItemContent>
      </ItemBox>

      {/* 채팅 내용 */}
      <CommentBox ref={scrollRef}>
        {ChatObj !== undefined && (
          <div>
            {ChatObj.chat.map((item, index) => {
              return <Comment chatList={item} key={index} />;
            })}
            {/* <div ref={scrollRef}></div> */}
          </div>
        )}
      </CommentBox>

      {/* 메시지 입력창*/}
      <MessageForm onSubmit={onSubmit}>
        <div>
          <MessageIcon icon={faPlus} />
        </div>
        <MessageInput
          type="text"
          placeholder="메시지를 입력해주세요"
          name="message"
          value={message}
          onChange={onChange}
          required
        />
        <button type="submit">
          <MessageIcon icon={faPaperPlane} />
        </button>
      </MessageForm>
    </Container>
  );
}

export default Chat;