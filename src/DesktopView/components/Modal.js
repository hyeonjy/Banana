import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faTree,
  faLemon,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

const ExplainGrade = styled.div`
  position: fixed;
  z-index: 999;
  top: 50vh;
  left: 50vw;
  width: 300px;
  height: 340px;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid lightgrey;
  h3 {
    display: inline-block;
    font-weight: 700;
  }
  ${(props) =>
    props.isMobile &&
    css`
      top: 350px;
    `}
`;
const XIcon = styled(FontAwesomeIcon)`
  float: right;
  font-size: 18px;
  vertical-align: middle;
  cursor: pointer;
`;

const gradeList = [
  {
    grade: "새싹",
    detail:
      "나눔을 시작하는 새싹 등급으로 나눔 글 작성이 하루 당 1회로 제한됩니다",

    icon: faSeedling,
    iconColor: "green",
  },
  {
    grade: "나무",
    detail:
      "나눔 5회 이상 시 나무 등급으로 등업하며 나눔 글 작성이 하루 당 3회로 제한됩니다",

    icon: faTree,
    iconColor: "#a67d00",
  },
  {
    grade: "초록 바나나",
    detail:
      "나눔 10회 이상 시 초록 바나나 등급으로 등업하며 나눔 글 작성이 하루 당 5회로 제한됩니다",

    icon: faLemon,
    iconColor: "green",
  },
  {
    grade: "노란 바나나",
    detail:
      "나눔 20회 이상 시 노란 바나나 등급으로 등업하며 무제한으로 글을 작성할 수 있습니다. ",
    icon: faLemon,
    iconColor: "yellow",
  },
];
const EachGradeDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
  margin-top: 5px;
  div {
    margin-top: 3px;
    width: 80%;
    word-break: keep-all;
    font-weight: 500;
    h4 {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 2px;
    }
    span {
      font-size: 11px;
      color: #393838;
    }
  }
`;
const GradeIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
`;

function Modal({ setActiveGrade, isMobile }) {
  const greadeRef = useRef();

  //esc 입력 시 모달 해제
  useEffect(() => {
    // esc 키가 눌렸는지 확인하는 함수
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setActiveGrade(false);
      }
    };
    // 컴포넌트가 마운트될 때 document에 keydown 이벤트 리스너 추가
    document.addEventListener("keydown", handleEsc);
    // 컴포넌트가 언마운트될 때 document에서 keydown 이벤트 리스너 제거
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  //외부 클릭 시 모달 해제
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (greadeRef.current && !greadeRef.current.contains(event.target)) {
        setActiveGrade(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside); // 모바일 대응
    };
  }, []);

  return (
    <ExplainGrade ref={greadeRef} isMobile={isMobile}>
      <div style={{ height: "25px", lineHeight: "25px", marginBottom: "15px" }}>
        <h3>멤버십 등급</h3>
        <XIcon onClick={() => setActiveGrade(false)} icon={faX} />
      </div>

      {gradeList.map((grade, index) => (
        <EachGradeDiv key={index}>
          <GradeIcon icon={grade.icon} color={grade.iconColor} />
          <div style={{ display: "inline-block" }}>
            <h4>{grade.grade}</h4>
            <span>{grade.detail}</span>
          </div>
        </EachGradeDiv>
      ))}
    </ExplainGrade>
  );
}
export default Modal;
