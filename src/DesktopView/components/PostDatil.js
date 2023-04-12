import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { ProfileHeader, ProfileImg, ProfileName } from "../routes/MyPage";

import {
  faSeedling,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsFillShareFill } from "react-icons/bs";
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginId, UserObj } from "../../Data/UserObj";
import { StateSelect } from "../../MobileView/routes/MDetailpost";

//-----------오른쪽 컨테이너-----------//
const PostRightDiv = styled.div`
  width: 470px;
  height: 400px;
`;

//---------Header(유저프로필)--------//

export const Header = styled(ProfileHeader)`
  height: 55px;
  padding: 1.5% 2%;
  width: 95%;
`;
export const ProfImg = styled(ProfileImg)`
  width: 40px;
  height: 40px;
  object-fit: cover;
`;
export const MembershipIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  display: block;
  margin: 0 auto 10px;
  color: green;
`;
export const MembershipText = styled.span`
  font-size: 10px;
  text-align: center;
  display: block;
  font-weight: 600;
`;

//---------Post 정보--------//
const PostContents = styled.div`
  padding: 17px 15px;
`;
const PostTitle = styled.div`
  line-height: 20px;
  margin-bottom: 14px;
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  word-break: keep-all;
  display: flex;
  gap: 10px;
  align-items: center;
  span {
    display: block;

    white-space: break-spaces;
    word-break: break-all;
  }
  ${StateSelect} {
    height: 35px;
    border-radius: 15px;
    option {
      height: 30px;
    }
  }
`;
const PostDetail = styled.span`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: end;
`;
const PostContent = styled.span`
  line-height: 24px;

  white-space: break-spaces;
  word-break: break-all;
  height: 190px;
  padding-bottom: 15px;
`;
const PostView = styled.span`
  font-size: 13px;
  color: gray;
  text-align: right;
`;

//---------하단 버튼--------//
const ButtomBtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const heartAnimation = keyframes`
  0%{ 
    scale:1;
    opacity: 1;
  }
  100%{
    scale:2; 
    opacity: 0;
  }

`;
const HeartSvg = styled.svg`
  flex-grow: 0.5;
  ${(props) =>
    props.heart &&
    css`
      animation: ${heartAnimation} 0.3s 1 linear;
    `}
`;
const ShareIcon = styled(BsFillShareFill)``;
const IconBtnDiv = styled.div`
  display: flex;
  font-size: 28px;
  width: 90px;
  align-items: center;
  ${ShareIcon} {
    flex-grow: 1;
    cursor: pointer;
  }
  svg {
    transition: all 0.3s;
    cursor: pointer;
  }
`;
const GoChatBtn = styled.button`
  width: 88px;
  height: 45px;
  border-radius: 13px;
  background-color: yellow;
  border: 1px solid rgb(255 224 70 / 86%);
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.6px;
  font-family: "Pretendard";
  cursor: pointer;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const PostRightContents = ({ item, setActiveGrade, isWriter }) => {
  const history = useHistory();
  const [heart, setHeart] = useState(false); //하트 toggle
  const { postId } = useParams();
  //나눔 상태 변경
  const [SelectedState, setSelected] = useState(item.state);
  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
    item.state = SelectedState; //DB의 state 값 update
    alert("상태가 변경되었습니다");
  };

  //작성 유저 정보 찾기
  const postWriter = UserObj.find((user) => user.id === item.userId);

  //채팅으로 이동
  const handleChatClick = (postWriter, postId) => {
    const searchParams = new URLSearchParams();
    searchParams.append("userId", postWriter.id);
    searchParams.append("itemId", postId);
    history.push({
      pathname: "/chat",
      search: "?" + searchParams.toString(),
    });
  };

  return (
    <PostRightDiv>
      <Header
        as={Link}
        to={{ pathname: "/user", search: `?id=${item.userId}` }}
      >
        <ProfImg img={require(`../../Img/${postWriter.src}`)} />
        <ProfileName style={{ fontSize: "17px" }}>{item.userId}</ProfileName>
        <div style={{ cursor: "pointer" }}>
          <MembershipIcon
            icon={faSeedling}
            onClick={() => setActiveGrade(true)}
          />
          <MembershipText>새싹</MembershipText>
        </div>
      </Header>
      <PostContents>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "5px",
          }}
        >
          <FlexColumn style={{ width: "75%" }}>
            <PostTitle>
              <span>{item.title}</span>
            </PostTitle>
            <PostContent>{item.content}</PostContent>
          </FlexColumn>
          <FlexColumn style={{ gap: "15px" }}>
            {isWriter && (
              <StateSelect
                value={SelectedState}
                onChange={(e) => handleChangeSelect(e)}
              >
                <option value="wait">대기중</option>
                <option value="reservate">예약중</option>
                <option value="complete">나눔완료</option>
              </StateSelect>
            )}
            <PostDetail>
              {item.area} | {item.timeAgo}
              <PostView>조회수 {item.meta.view}</PostView>
            </PostDetail>
          </FlexColumn>
        </div>

        <ButtomBtnDiv>
          <IconBtnDiv>
            <HeartSvg
              heart={heart}
              width="35"
              height="35"
              viewBox="12 10 30 40"
              fill={heart ? "red" : "none"}
              stroke="black"
              strokeWidth="1.5"
              onClick={() => setHeart(!heart)}
            >
              <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" />
            </HeartSvg>
            <ShareIcon size="25" />
          </IconBtnDiv>
          {isWriter ? (
            <GoChatBtn>삭제하기</GoChatBtn>
          ) : (
            <GoChatBtn
              onClick={() => {
                handleChatClick(postWriter, postId);
              }}
            >
              채팅하기
            </GoChatBtn>
          )}
        </ButtomBtnDiv>
      </PostContents>
    </PostRightDiv>
  );
};
export default PostRightContents;
