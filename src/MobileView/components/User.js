import styled, { css } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { GradeIcon, gradeList } from "../../Modal";

// 유저 정보(이름, 프로필이미지, 등급) - 시작
const UserBox = styled.div`
  height: 60px;
  display: flex;
  padding: 0 4% 0 3%;
  width: 93%;
  //padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid #e9ecef; */
  border-top: ${(props) => (props.profile ? "1px solid #e9ecef" : null)};
  margin-top: ${(props) => (props.profile ? "56px" : "0")};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border: 1px solid #e9ecef;
  border-radius: 50%;
  padding: 5px;
  margin-right: 10px;
  object-fit: cover;
`;

const UserName = styled.h1`
  font-size: 13px;
  font-weight: 600;
`;

const UserGrade = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 65%;
  gap: 5px;
`;

const GradeName = styled.h1`
  font-size: 8px;
  font-weight: 600;
`;

function User(props) {
  const history = useHistory();

  //채팅목록 클릭 이벤트
  const handleChatClick = () => {
    const searchParams = new URLSearchParams();
    searchParams.append("userId", props.userId);
    history.push({
      pathname: "/profile",
      search: "?" + searchParams.toString(),
    });
  };
  return (
    <>
      <UserBox profile={props.profile}>
        <UserInfo onClick={handleChatClick}>
          <UserImg src={require(`../../Img/${props.img}`)} />
          <UserName>{props.userId}</UserName>
        </UserInfo>
        <UserGrade
          onClick={() => {
            props.setActiveGrade(
              true
            ); /**부모 요소(MDetailPost)로 전달 => 그래야 배경을 흐릿하게 설정가능 */
          }}
        >
          <GradeIcon src={gradeList[0].icon} />
          <GradeName> {gradeList[0].grade}</GradeName>
        </UserGrade>
      </UserBox>
    </>
  );
}

export default User;
