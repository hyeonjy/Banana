import { Link, useHistory, useParams } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { ItemObj } from "../../Data/ItemObj";
import banana from "../../Img/banana.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
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
import { useState } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import User from "../components/User";
import Modal from "../../Modal";
import { LoginId, UserObj } from "../../Data/UserObj";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { postData } from "../../atom";
import useAxios from "../../useAxio";
import Mimages from "./Mimages";

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
  align-items: center;
  //border-bottom: 1px solid #e9ecef;
  color: rgba(0, 0, 0, 0.5);
  svg {
    transition: all 0.3s;
    cursor: pointer;
  }
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
  const [hits, setHits] = useState(123); /**조회수 */
  const [heart, setHeart] = useState(false); /**좋아요 */
  const [index, setIndex] = useState(0); /**사진 인덱스 */
  const { postId } = useParams();
  const history = useHistory();
  const [postItem, setPostItem] = useState(null);

  const [activeGrade, setActiveGrade] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [SelectedState, setSelected] = useState("");
  const [timeago, setTimeago] = useState("");
  const [imgFullModal, setImgFullModal] = useState(false);

  const {
    response: postDataResponse,
    loading: postDataLoading,
    error: postDataError,
    refetch: postDataRefetch,
    executeGet: postDataExecuteGet,
  } = useAxios({
    method: "get",
    url: `http://localhost:8080/postdata/${postId}`,
  });

  const {
    response: heartClickResponse,
    loading: heartClickLoading,
    error: heartClickError,
    refetch: heartClickRefetch,
    executePost: heartClickExecutePost,
  } = useAxios({
    method: "post",
    url: `http://localhost:8080/heartclick`,
  });

  useEffect(() => {
    //refetch();
    postDataExecuteGet();
  }, []);

  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/data")
    //   .then((response) => console.log(response.data))
    //   .catch((error) => console.error(error));
    if (!postDataLoading) {
      console.log("res:", postDataResponse);
      setPostItem(postDataResponse.post);
      setIsWriter(postDataResponse.post.userId === LoginId);
      setSelected(postDataResponse.post.state);
      setHeart(postDataResponse.heart);
      console.log("postItem:", postItem);

      const datetime = new Date(postDataResponse.post.post_date);
      const now = new Date();
      const diffInMs = now - datetime;
      const diffInMinutes = Math.round(diffInMs / (1000 * 60));
      if (diffInMinutes < 60) {
        setTimeago(`${diffInMinutes}분 전`);
      } else if (diffInMinutes < 60 * 24) {
        setTimeago(`${Math.floor(diffInMinutes / 60)}시간 전`);
      } else {
        setTimeago(`${Math.floor(diffInMinutes / (60 * 24))}일 전`);
      }
    }
    console.log(postDataLoading);
    //console.log(error);
  }, [postDataResponse, postDataLoading, postDataError, postItem]);

  // const response = useRecoilValue(postData);
  // response.filter((item) => item.post_id === postId);
  // useEffect(() => {
  //   response.filter((item) => item.post_id === postId);
  // }, [response]);
  // console.log("postId: ", postId);
  // console.log("res:", response);
  // console.log("res.state:", response.state);
  // console.log("res.state:", response.state);

  // url 파라미터를 통해 맞는 옷 상품 가져오기
  // const filterItemObj = ItemObj.find((item) => item.itemId === Number(postId));
  // 작성자 user obj
  // const FilterUserObj = UserObj.find(
  //   (user) => user.id === filterItemObj.userId
  // );
  // 본인 글인지 확인

  //나눔 상태 변경

  // useEffect(() => {
  //   filterItemObj.state = SelectedState;
  // }, [SelectedState]);

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  //img 클릭 시 Fullscreen
  function handleImageClick(props) {
    const searchParams = new URLSearchParams();
    searchParams.append("object", postId);
    searchParams.append("index", index);
    history.push({
      pathname: "/images",
      search: "?" + searchParams.toString(),
    });
  }

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

  const handleHeart = () => {
    //찜 취소
    if (heart) {
      heartClickExecutePost({
        url: "http://localhost:8080/heartclick",
        data: { mode: "remove", userId: 1, postId: postId },
      });
    }
    //찜 등록
    else if (!heart) {
      heartClickExecutePost({
        url: "http://localhost:8080/heartclick",
        data: { mode: "add", userId: 1, postId: postId },
      });
    }
    setHeart(!heart);
  };

  return (
    <>
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
        {postItem ? (
          <>
            <User
              userId={postItem.userId}
              nickname={postItem.nickname}
              img={postItem.profile}
              grade={postItem.grade}
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
              {postItem.imgs.map((img, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    onClick={() => setImgFullModal(true)}
                  >
                    <PostImg src={require(`../../Data/Img/${img}`)} />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <Post>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <PostTitle>{postItem.title}</PostTitle>
                {isWriter && (
                  <StateSelect
                    value={SelectedState}
                    onChange={handleChangeSelect}
                  >
                    <option value="wait">대기중</option>
                    <option value="reservate">예약중</option>
                    <option value="complete">나눔완료</option>
                  </StateSelect>
                )}
              </div>

              <PostSubtitle>
                {postItem.sub_category} | {postItem.area} | {timeago}
              </PostSubtitle>
            </Post>

            <PostContent>{postItem.content}</PostContent>

            <PostMore>
              <HeartSvg
                heart={heart}
                width="30"
                height="30"
                viewBox="12 10 30 40"
                fill={heart ? "tomato" : "none"}
                stroke="rgba(0, 0, 0, 0.5)"
                strokeWidth="1.3"
                onClick={() => handleHeart()}
              >
                <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" />
              </HeartSvg>
              <Morehits>조회수 {postItem.hits}</Morehits>
            </PostMore>

            {isWriter ? (
              <ChatBtn>삭제하기</ChatBtn>
            ) : (
              <ChatBtn
                onClick={() => handleChatClick(postItem.user_id, postId)}
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
          imgs={postItem.imgs}
          setImgFullModal={setImgFullModal}
          index={index}
        />
      )}
    </>
  );
}

export default MDetailpost;
