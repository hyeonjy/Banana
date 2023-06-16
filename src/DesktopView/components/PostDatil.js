import styled, { css, keyframes } from "styled-components";
import { ProfileHeader, ProfileImg, ProfileName } from "../routes/MyPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPen,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { BsFillShareFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { StateSelect } from "../../MobileView/routes/MDetailpost";
import { GradeIcon, gradeList } from "../../Modal";
import { calcTimeAgo } from "./ShowItem";
import { useMutation, useQueryClient } from "react-query";
import {
  deletePost,
  deletePostApi,
  heartChangeApi,
  postStateChangeApi,
} from "../../Api";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

//-----------오른쪽 컨테이너-----------//
export const PostRightDiv = styled.div`
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

export const MembershipWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
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
  margin-top: 5px;
  font-weight: 600;
`;

//---------Post 정보--------//
export const PostContents = styled.div`
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
export const PostContent = styled.span`
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

const EllipsisDiv = styled.div`
  border-radius: 10px;
  background-color: rgb(255, 248, 202);
  width: 80px;
  height: 65px;
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s ease;
  display: flex;
  visibility: hidden;
  flex-direction: column;
  transform: scale(0.85);
  opacity: 0;
  ${(props) =>
    props.EllipsisToggle &&
    css`
      visibility: visible;
      transform: scale(1);
      opacity: 1;
    `}

  position: absolute;
  top: -75px;
  left: -55px;
  padding: 5px;
`;

const EllipsisOption = styled.div`
  border-radius: 5px;
  width: 100%;
  font-size: 13px;
  flex-grow: 1;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #fff3a5;
  }
`;

const OptionIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
`;

const EllipsisIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  cursor: pointer;
`;

const PostRightContents = ({ item, setActiveGrade, isWriter, initHeart }) => {
  // const [heart, setHeart] = useState(initHeart);
  const history = useHistory();
  const { postId } = useParams();
  const queryClient = useQueryClient();

  //나눔 상태 변경
  const { mutate: mutateState } = useMutation(
    (state) => postStateChangeApi(state),
    {
      onSuccess: (state) => {
        queryClient.invalidateQueries(["postDatail", postId]);
        alert("상태가 변경되었습니다");
      },
    }
  );
  //찜 상태 변경

  const { mutate: mutateHeart } = useMutation(
    (heart) => heartChangeApi(heart),
    {
      // onSuccess: () => {
      //   queryClient.invalidateQueries(["postDatail", postId]);
      // },

      onMutate: async (newData) => {
        // await queryClient.cancelQueries(["postDatail", postId]);
        const previousHeartData = queryClient.getQueryData([
          "postDatail",
          postId,
        ]);
        queryClient.setQueryData(["postDatail", postId], (olddata) => {
          return { ...olddata, heart: !newData.heart };
        });
        return previousHeartData;
      },
      onError: (rollback) => rollback(),
      // onSettled: () => {
      //   // 요청 성공 or 실패 후
      //   queryClient.invalidateQueries(["postDatail", postId]);
      // },
    }
  );

  //글 삭제
  const { mutate: mutateDelete } = useMutation(() => deletePostApi(postId), {
    onSuccess: () => {
      /// alert("게시물을 삭제하였습니다");
      queryClient.removeQueries(["postDatail", postId]);
      queryClient.invalidateQueries({ exact: false });
      history.push("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChangeSelect = (e) => {
    mutateState({ postId, state: e.target.value });
  };
  const handleHeart = () => {
    mutateHeart({ heart: initHeart, userId: 1, postId });
  };

  const handleDeletePost = () => {
    mutateDelete();
  };

  const handleUpdatePost = () => {
    history.push({
      pathname: "/upload",
      state: { item: item, mode: "edit", postId: postId },
    });
  };

  //채팅으로 이동
  // const handleChatClick = (postWriter, postId) => {
  //   const searchParams = new URLSearchParams();
  //   searchParams.append("userId", postWriter.id);
  //   searchParams.append("itemId", postId);
  //   history.push({
  //     pathname: "/chat",
  //     search: "?" + searchParams.toString(),
  //   });
  // };
  const timeAgo = calcTimeAgo(item);

  const EllicomponentRef = useRef(null);
  const [EllipsisToggle, setEllipsisToggle] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        EllicomponentRef.current &&
        !EllicomponentRef.current.contains(event.target)
      ) {
        setEllipsisToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <PostRightDiv>
      <Header
        as={Link}
        to={{ pathname: "/user", search: `?id=${item.userId}` }}
      >
        <ProfImg img={require(`../../Img/${item.profile}`)} />
        <ProfileName style={{ fontSize: "17px" }}>{item.nickname}</ProfileName>

        <MembershipWrap>
          <GradeIcon
            onClick={() => setActiveGrade(true)}
            src={gradeList[item.grade].icon}
          />
          <MembershipText>{gradeList[item.grade].grade}</MembershipText>
        </MembershipWrap>
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
                value={item.state}
                onChange={(e) => handleChangeSelect(e)}
              >
                <option value="wait">대기중</option>
                <option value="reservate">예약중</option>
                <option value="complete">나눔완료</option>
              </StateSelect>
            )}
            <PostDetail>
              {item.area} | {timeAgo}
              <PostView>조회수 {item.hits}</PostView>
            </PostDetail>
          </FlexColumn>
        </div>

        <ButtomBtnDiv>
          <IconBtnDiv>
            <HeartSvg
              heart={initHeart}
              width="35"
              height="35"
              viewBox="12 10 30 40"
              fill={initHeart ? "red" : "none"}
              stroke="black"
              strokeWidth="1.5"
              onClick={handleHeart}
            >
              <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" />
            </HeartSvg>
            <ShareIcon size="25" />
          </IconBtnDiv>
          {isWriter ? (
            <>
              <div style={{ position: "relative" }}>
                <EllipsisDiv
                  ref={EllicomponentRef}
                  EllipsisToggle={EllipsisToggle}
                >
                  <EllipsisOption onClick={handleUpdatePost}>
                    <OptionIcon icon={faPencil} />
                    수정하기
                  </EllipsisOption>
                  <EllipsisOption onClick={handleDeletePost}>
                    <OptionIcon icon={faTrashCan} />
                    삭제하기
                  </EllipsisOption>
                </EllipsisDiv>
                <EllipsisIcon
                  onClick={() => {
                    setEllipsisToggle((prev) => !prev);
                  }}
                  icon={faEllipsis}
                />
              </div>
            </>
          ) : (
            // <GoChatBtn>삭제하기</GoChatBtn>
            <GoChatBtn
              onClick={() => {
                //handleChatClick(postWriter, postId);
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
