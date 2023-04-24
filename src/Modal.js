import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faTree,
  faLemon,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

import nuts from "./Img/nuts.png";
import sprout from "./Img/sprout.png";
import treeGrade from "./Img/tree-grade.png";
import bananaGrade from "./Img/banana-grade.png";

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

export const gradeList = [
  {
    grade: "씨앗 등급",
    detail:
      "나눔을 시작하는 씨앗 등급으로 나눔 글 작성이 하루 당 1회로 제한됩니다",

    icon: nuts,
  },
  {
    grade: "새싹 등급",
    detail:
      "나눔 5회 이상 시 나무 등급으로 등업하며 나눔 글 작성이 하루 당 3회로 제한됩니다",

    icon: sprout,
  },
  {
    grade: "나무 등급",
    detail:
      "나눔 10회 이상 시 나무 등급으로 등업하며 나눔 글 작성이 하루 당 5회로 제한됩니다",

    icon: treeGrade,
  },
  {
    grade: "바나나 등급",
    detail:
      "나눔 20회 이상 시 바나나 등급으로 등업하며 무제한으로 글을 작성할 수 있습니다. ",
    icon: bananaGrade,
  },
];
const EachGradeDiv = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 16px;
  margin-top: 5px;
  padding-left: 10px;
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

export const GradeIcon = styled.img`
  width: 25px;
  height: 25px;
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
          <GradeIcon src={grade.icon} />
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
