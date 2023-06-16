import { Link, useHistory, useParams } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { ItemObj } from "../../Data/ItemObj";
import banana from "../../Img/banana.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEllipsis,
  faHouse,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper";
import { useRef, useState } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import User from "../components/User";
import Modal from "../../Modal";
import { LoginId, UserObj } from "../../Data/UserObj";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { postData } from "../../atom";
import useAxios from "../../useAxio";
import Mimages from "./Mimages";
import { calcTimeAgo } from "../components/ShowItem";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deletePostApi,
  heartChangeApi,
  postPageApi,
  postStateChangeApi,
} from "../../Api";

const Container = styled.div`
  background-color: white;
  filter: ${(props) => (props.activeGrade ? "blur(2px)" : "unset")};
  ${(props) => {
    if (props.activeGrade) {
      return css`
        height: 100vh;
      `;
    }
  }}
`;

const Box = styled.div`
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid #e9ecef;
`;

// Header
const Header = styled.div`
  width: 90%;
  height: 25px;
  padding: 15px 5%;
  background-color: yellow;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #37352f;
  position: fixed;
  z-index: 2;
  top: ${(props) => (props.activeGrade ? "-56px" : "0")};
`;

const HeaderTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-left: 5px;
`;

const PrevIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
`;

// 게시글(제목, 서브제목, 이미지 내용)
const Post = styled(Box)`
  flex-direction: column;
  border-bottom: none;
`;

const PostTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  margin-bottom: 3px;
`;

const PostSubtitle = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.3);
`;

const PostImg = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 20px;
  padding-top: 0px;
  font-size: 14.5px;
  line-height: 25px;
`;

// 게시글(좋아요, 조회수)
const PostMore = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //border-bottom: 1px solid #e9ecef;
  color: rgba(0, 0, 0, 0.5);
  svg {
    transition: all 0.3s;
    cursor: pointer;
  }
`;

const MoreBox = styled.div`
  display: flex;
  align-items: center;
`;

const heartAnimation = keyframes`
  0%{
    transform: none;
  }
  60%{
    transform: scale(1.3);
  }
  100%{
    transform: none;
  }
`;

const HeartSvg = styled.svg`
  margin-right: 7px;
  ${(props) =>
    props.heart &&
    css`
      animation: ${heartAnimation} 0.3s 1 linear;
    `}
`;

const Morehits = styled.span`
  font-size: 13px;
`;

const EllipseIcon = styled(FontAwesomeIcon)`
  color: rgba(0, 0, 0, 0.3);
  font-size: 25px;
`;

const EllipsisDiv = styled.div`
  width: 120px;
  height: 80px;
  align-items: center;
  display: ${(prop) => (prop.EllipsisToggle ? "block" : "none")};
  position: absolute;
  top: -60px;
  left: -95px;
  background-color: white;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const EllipsisOption = styled.div`
  width: 100%;
  font-size: 17px;
  margin: 15px 10px;
  color: #666666;
`;

// 채팅하기 버튼
const ChatBtn = styled.div`
  width: fit-content;
  background-color: rgb(255, 181, 45);
  position: fixed;
  right: 22px;
  bottom: 20px;
  border-radius: 20px;
  height: fit-content;
  padding: 15px;
  letter-spacing: 0.5px;
  color: white;
  font-weight: 700;
  font-size: 14.5px;
`;

export const StateSelect = styled.select`
  background-color: white;
  border: 1px solid #808080a6;
  padding: 5px;
  width: 90px;

  border-radius: 5px;
  font-size: 13px;
`;

function MDetailpost() {
  const [index, setIndex] = useState(0); /**사진 인덱스 */
  const { postId } = useParams();
  const history = useHistory();
  const [timeago, setTimeago] = useState();
  const [activeGrade, setActiveGrade] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [imgFullModal, setImgFullModal] = useState(false);
  const [EllipsisToggle, setEllipsisToggle] = useState(false);
  const dropMenuRef = useRef();

  const { data, refetch } = useQuery(["postDatail", postId], () =>
    postPageApi(postId)
  );

  useEffect(() => {
    refetch();
  }, [postId]);

  useEffect(() => {
    if (data) {
      setIsWriter(LoginId === data.post.nickname);
      setTimeago(calcTimeAgo(data.post));
    }
  }, [data]);

  useEffect(() => {
    const handleOutsideClose = (e) => {
      // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
      if (EllipsisToggle && !dropMenuRef.current.contains(e.target))
        setEllipsisToggle(false);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [EllipsisToggle]);

  // swiper onSlideChange 시 - 현재 img index 저장
  const handleSlideChange = (currentIndex) => {
    setIndex(currentIndex.activeIndex);
  };

  //채팅목록 클릭 이벤트
  const handleChatClick = (userId, postId) => {
    const searchParams = new URLSearchParams();
    searchParams.append("userId", userId);
    searchParams.append("itemId", postId);
    history.push({
      pathname: "/chat",
      search: "?" + searchParams.toString(),
    });
  };

  //나눔 상태 변경
  const { mutate: mutateState } = useMutation(
    (state) => postStateChangeApi(state),
    {
      onSuccess: (state) => {
        alert("상태가 변경되었습니다");
        queryClient.invalidateQueries(["postDatail", postId]);
      },
    }
  );
  //찜 상태 변경
  const queryClient = useQueryClient();
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
  const { mutate: mutateDelete } = useMutation(
    (state) => deletePostApi(postId),
    {
      onSuccess: (state) => {
        alert("게시글이 삭제되었습니다");
        queryClient.removeQueries(["postDatail", postId]);
        queryClient.invalidateQueries({ exact: false });
        history.push("/");
      },
    }
  );

  //글 수정 클릭 이벤트
  const handleUpdateClick = (title, content, main, sub) => {
    const searchParams = new URLSearchParams();
    searchParams.append("title", title);
    searchParams.append("content", content);
    searchParams.append("main", main);
    searchParams.append("sub", sub);
    history.push({
      pathname: "/upload",
      search: "?" + searchParams.toString(),
    });
  };

  const handleChangeSelect = (e) => {
    mutateState({ postId, state: e.target.value });
  };
  const handleHeart = () => {
    mutateHeart({ heart: data.heart, userId: 1, postId });
  };

  const handleDeletePost = () => {
    mutateDelete({ postId });
  };

  return (
    <div>
      <Container activeGrade={activeGrade}>
        {/* Header */}
        <Header activeGrade={activeGrade}>
          <PrevIcon
            onClick={() => {
              history.goBack();
            }}
            icon={faChevronLeft}
          />
          <HeaderTitle>BANANA</HeaderTitle>
          <Link to="/">
            <PrevIcon icon={faHouse} />
          </Link>
        </Header>
        {data?.post ? (
          <>
            <User
              userId={data.post.userId}
              nickname={data.post.nickname}
              img={data.post.profile}
              grade={data.post.grade}
              setActiveGrade={setActiveGrade}
              profile="true"
            />

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {}}
              onSlideChange={handleSlideChange}
            >
              {data.post.imgs.map((src, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    onClick={() => setImgFullModal(true)}
                  >
                    <PostImg
                      alt={src.filename}
                      src={`data:image/jpeg;base64,${src.data}`}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <Post>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <PostTitle>{data.post.title}</PostTitle>
                {isWriter && (
                  <StateSelect
                    value={data.post.state}
                    onChange={(e) => handleChangeSelect(e)}
                  >
                    <option value="wait">대기중</option>
                    <option value="reservate">예약중</option>
                    <option value="complete">나눔완료</option>
                  </StateSelect>
                )}
              </div>

              <PostSubtitle>
                {data.post.sub_category} | {data.post.area} | {timeago}
              </PostSubtitle>
            </Post>

            <PostContent>{data.post.content}</PostContent>

            <PostMore>
              <MoreBox>
                <HeartSvg
                  heart={data.heart}
                  width="30"
                  height="30"
                  viewBox="12 10 30 40"
                  fill={data.heart ? "tomato" : "none"}
                  stroke="rgba(0, 0, 0, 0.5)"
                  strokeWidth="1.3"
                  onClick={handleHeart}
                >
                  <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" />
                </HeartSvg>
                <Morehits>조회수 {data.post.hits}</Morehits>
              </MoreBox>
              {isWriter && (
                <div style={{ position: "relative" }} ref={dropMenuRef}>
                  {EllipsisToggle && (
                    <EllipsisDiv EllipsisToggle={EllipsisToggle}>
                      <EllipsisOption
                        onClick={() =>
                          handleUpdateClick(
                            data.post.title,
                            data.post.content,
                            data.post.main_category,
                            data.post.sub_category
                          )
                        }
                      >
                        수정하기
                      </EllipsisOption>
                      <EllipsisOption onClick={handleDeletePost}>
                        삭제하기
                      </EllipsisOption>
                    </EllipsisDiv>
                  )}
                  <EllipseIcon
                    icon={faEllipsis}
                    onClick={() => {
                      setEllipsisToggle((prev) => !prev);
                    }}
                  />
                </div>
              )}
            </PostMore>

            {!isWriter && (
              <ChatBtn
                onClick={() => handleChatClick(data.post.user_id, postId)}
              >
                채팅하기
              </ChatBtn>
            )}
          </>
        ) : (
          <h1>loading</h1>
        )}
      </Container>
      {activeGrade && (
        <Modal setActiveGrade={setActiveGrade} isMobile={"true"} />
      )}
      {imgFullModal && !activeGrade && (
        <Mimages
          imgs={data.post.imgs}
          setImgFullModal={setImgFullModal}
          index={index}
        />
      )}
    </div>
  );
}

export default MDetailpost;
