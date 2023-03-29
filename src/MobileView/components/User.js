import styled from "styled-components";
import banana from "../../Img/banana.png";
import { Link, useHistory } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "../../DesktopView/components/Modal";

const Box = styled.div`
  height: 60px;
  display: flex;
  padding: 10px 20px;
`;

// 유저 정보(이름, 프로필이미지, 등급) - 시작
const UserBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
  /* padding-top: 50px; */
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
  font-size: 15px;
  font-weight: 600;
`;

const UserGrade = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GradeImg = styled.img`
  width: 30px;
  height: 30px;
  padding: 5px;
  color: #92d050;
`;

const GradeName = styled.h1`
  font-size: 10px;
  font-weight: 700;
`;

function User(props) {
  return (
    <>
      <UserBox>
        <UserInfo>
          <h1>{props.url}</h1>
          <UserImg src={require(`../../Img/${props.img}`)} />
          <UserName>에브리띵</UserName>
        </UserInfo>
        <UserGrade
          onClick={() => {
            props.setActiveGrade(
              true
            ); /**부모 요소(MDetailPost)로 전달 => 그래야 배경을 흐릿하게 설정가능 */
          }}
        >
          <GradeImg src={require(`../../Img/${props.grade}`)} />
          <GradeName>노란 바나나</GradeName>
        </UserGrade>
      </UserBox>
    </>
  );
}

export default User;
