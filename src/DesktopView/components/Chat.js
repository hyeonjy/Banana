import { useHistory, useLocation } from "react-router-dom";
import { LoginId, UserObj } from "../../Data/UserObj";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Comment from "../components/Comment";
import { useEffect } from "react";
import { ItemObj } from "../../Data/ItemObj";
import { useRef } from "react";
import * as chats from "../../MobileView/routes/Chats";
import banana from "../../Img/banana.png";
import { StateSelect } from "../../MobileView/routes/MDetailpost";
const Container = styled.div`
  width: 380.4px;
  background-color: white;
  position: relative;
  border: 1px solid whitesmoke;
  height: 100%;
`;

const DHeader = styled(chats.Header)`
  position: absolute;
  z-index: 1;
  justify-content: center;
  h1 {
    font-weight: 600;
  }
`;
const WriteReview = styled.div`
  cursor: pointer;
  position: absolute;
  right: 20px;
  border: 1px solid gray;
  padding: 9px 10px;
  display: flex;
  gap: 5px;
  align-items: center;
  border-radius: 10px;
  span {
    font-size: 12px;
  }
`;

export const ItemBox = styled.div`
  margin-top: 50px;
  background-color: white;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  padding: 15px 4%;
  display: flex;
  img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 10px;
    object-fit: cover;
  }
`;
export const ItemContent = styled.div`
  width: 180px;
  h1 {
    font-size: 15px;
    margin-bottom: 3px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.5);
  }
`;
const StateSelectInChat = styled(StateSelect)`
  border: 0;
  background-color: whitesmoke;
  border: 1px solid #80808057;
  margin-left: 10px;
`;
const CommentBox = styled.div`
  overflow-y: scroll;
  height: calc(100% - 190px);
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgb(146, 164, 178); /* 스크롤바의 색상 */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(121, 121, 121, 0.3); /*스크롤바 뒷 배경 색상*/
    border-radius: 12px;
  }
`;

const MessageForm = styled.form`
  height: 50px;
  display: flex;
  background-color: rgb(255, 232, 78);
  background-color: rgb(242, 242, 245);
  align-items: center;
  justify-content: space-between;
  padding: 5px 4%;
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

export const NoSelectChatLi = styled.div`
  width: 397.5px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  gap: 10px;
  img {
    width: 85px;
    height: 150px;
  }
  h1 {
    font-weight: 600;
  }
`;

function Chat({ FilterUserObj, setAdd }) {
  const location = useLocation();
  const history = useHistory();
  const [message, setMessage] = useState("");

  // url 파라미터를 통해 맞는 옷 상품과 사진 인덱스 가져오기
  const searchParams = new URLSearchParams(location.search);
  const userIdValue = searchParams.get("userId");
  const itemIdValue = searchParams.get("itemId");

  // 채팅에 해당하는 나눔상품
  const filterItemObj = ItemObj.find(
    (item) => item.itemId === Number(itemIdValue)
  );

  // 상대방 user Obj 가져오기
  const FilterOtherUserObj = UserObj.find((item) => item.id === userIdValue);
  const OtherChatObj = FilterOtherUserObj?.chats.find(
    (item) => item.id === LoginId && item.itemId === Number(itemIdValue)
  );

  // 채팅 obj 가져오기
  const [ChatObj, setChatObj] = useState(
    FilterUserObj.chats.find(
      (item) => item.id === userIdValue && item.itemId === Number(itemIdValue)
    )
  );
  useEffect(() => {
    setChatObj(
      FilterUserObj.chats.find(
        (item) => item.id === userIdValue && item.itemId === Number(itemIdValue)
      )
    );
  }, [userIdValue, itemIdValue]);

  //나눔 거래 상태 변경
  const [SelectedState, setSelected] = useState();
  useEffect(() => {
    if (filterItemObj) {
      setSelected(filterItemObj.state);
    }
  }, [ChatObj]);
  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
    filterItemObj.state = SelectedState; //DB의 state 값 update
    alert("상태가 변경되었습니다");
  };

  // 스크롤 맨 아래로 내리기(채팅창 스크롤 맨 아래로)
  const scrollRef = useRef();
  const [focusState, setFocusState] = useState(false);
  const scrollHeightFn = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  useEffect(() => {
    if (focusState) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (scrollRef.current) {
      setTimeout(() => {
        scrollHeightFn();
      }, 10);
    }
  }, [message, focusState, scrollRef.current, userIdValue]);

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
    setAdd((prev) => prev + 1);
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
        const chatobjt = {
          id: LoginId,
          src: FilterUserObj.src,
          content: message,
          time: time,
        };
        FilterChatObj.commentList.push(chatobjt);
        FilterOtherChatObj.commentList.push(chatobjt);
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
      {filterItemObj === undefined ? (
        <NoSelectChatLi>
          <img src={banana} />
          <h1>선택한 채팅 목록이 없습니다.</h1>
        </NoSelectChatLi>
      ) : (
        <>
          <DHeader>
            <h1>{userIdValue}</h1>
          </DHeader>
          {/* 채팅 나눔 물품 */}
          <ItemBox>
            <img src={require(`../../Img/${filterItemObj.img[0]}.jpg`)} />
            <ItemContent>
              <h1>{filterItemObj.title}</h1>
              <span>
                {filterItemObj.main} {">"} {filterItemObj.sub}
              </span>
            </ItemContent>

            {/* 자기 물품일 때 - 나눔 상태 바꾸기 */}
            {filterItemObj.userId === LoginId && (
              <StateSelectInChat
                value={SelectedState}
                onChange={(e) => handleChangeSelect(e)}
              >
                <option value="wait">대기중</option>
                <option value="reservate">예약중</option>
                <option value="complete">나눔완료</option>
              </StateSelectInChat>
            )}

            {/* 나눔 받는 유저 - 나눔 완료 후 후기*/}
            {filterItemObj.state === "complete" &&
              filterItemObj.userId !== LoginId && (
                <WriteReview
                  onClick={() => {
                    history.push({
                      pathname: "/write",
                      state: { item: filterItemObj },
                    });
                  }}
                >
                  <FontAwesomeIcon style={{ fontSize: "12px" }} icon={faPen} />
                  <span>후기쓰기</span>
                </WriteReview>
              )}
          </ItemBox>

          {/* 채팅 내용 */}
          <CommentBox ref={scrollRef}>
            {ChatObj !== undefined && (
              <div>
                {ChatObj.chat.map((item, index) => {
                  return <Comment chatList={item} key={index} />;
                })}
              </div>
            )}
          </CommentBox>

          {/* 메시지 입력*/}
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
              autoComplete="off"
              onFocus={() => {}}
              onBlur={() => {
                setFocusState(false);
              }}
            />
            <button type="submit">
              <MessageIcon icon={faPaperPlane} />
            </button>
          </MessageForm>
        </>
      )}
    </Container>
  );
}

export default Chat;
