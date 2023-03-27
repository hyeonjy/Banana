import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import banana from "../../Img/banana.png";

const Box = styled.div`
  height: 60px;
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid #e9ecef;
`;

const PrevIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  justify-content: flex-start;
`;

// 유저 정보(이름, 프로필이미지, 등급) - 시작
const UserBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border: 1px solid #e9ecef;
  border-radius: 50%;
  padding: 5px;
  margin-right: 10px;
  object-fit: cover;
`;

const UserName = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const UserGrade = styled.img`
  width: 30px;
  height: 30px;
  padding: 5px;
  color: #92d050;
`;

function User(props) {
  return (
    <UserBox>
      <UserInfo>
        <h1>{props.url}</h1>
        <UserImg src={require(`../../Img/${props.img}`)} />
        <UserName>맛있으면바나나</UserName>
      </UserInfo>
      <UserGrade src={require(`../../Img/${props.grade}`)}></UserGrade>
    </UserBox>
  );
}

export default User;
