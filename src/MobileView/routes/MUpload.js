import styled, { css } from "styled-components";

import {
  faChevronLeft,
  faCamera,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import area from "../../Data/Area";

import { itemsGroup } from "../../Data/ItemGroup";

import { useState } from "react";
import ImgUpload from "../components/ImgUpload";
import { useEffect } from "react";
const UploadContainer = styled.div`
  font-size: 14px;
`;
export const BackIcon = styled(FontAwesomeIcon)`
  width: 20px;
  height: 23px;
  color: black;
`;
export const Header = styled.header`
  height: 25px;
  line-height: 25px;
  /* padding: 12.5px 4%; */
  padding: 15px 5%;
  width: 90%;
  text-align: center;
  background: white;
  position: relative;
  span {
    display: inline-block;
    height: 100%;
    font-weight: 600;
  }
  /* top: ${(props) => (props.activeGrade ? "-60px" : "0")}; */
  ${BackIcon} {
    left: 5%;
    top: 50%;
    position: absolute;
    transform: translate(0, -50%);
  }
`;

//--------- Form ------ //
const Title = styled.input`
  margin-bottom: 10px;
`;
const Contents = styled.textarea`
  height: 200px;
  border: 1px solid black;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid gray;
`;
const SelectArea = styled.select`
  font-size: 13px;
  background: white;

  &:focus {
    outline: 3px solid rgba(255, 192, 78, 0.83);
  }
`;
const SelectCategory = styled(SelectArea)`
  flex-grow: 1;
  margin-bottom: 10px;
  &:nth-of-type(1) {
    margin-right: 8px;
  }
`;
const Option = styled.option`
  width: fit-content;
  font-size: 12px;
`;
const SubmitBtn = styled.button`
  border: 0px;
  background-color: #ffc04ed4;
  padding: 15px 0;
  border-radius: 10px;
  font-weight: 700;
  font-size: 16px;
  color: white;
  width: 100%;
  margin-top: 15px;
`;
export const ErrorDiv = styled.div`
  height: 30px;
  p {
    line-height: 30px;
    font-size: 14px;
    color: #f92f60;
    font-weight: 700;
    display: inline-block;
    margin-left: 5px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  ${Title}, ${SelectArea} {
    height: 45px;
    border-radius: 10px;
    padding: 0 10px;
    border: 1px solid gray;
  }
`;

function MUpload() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const [currentCate, setCurrentCate] = useState();
  const [showImages, setShowImages] = useState([]); // 업로드 이미지 url 배열 - react-hook-formr과 분리(추가 업로드 문제)
  const [btnClick, setBtnClick] = useState(false); // 등록 버튼을 누른 후에 error 출력

  useEffect(() => {
    if (showImages.length === 0 && btnClick) {
      setError("imgEmpty", { message: "이미지를 1장 이상 업로드 해주세요" });
    } else {
      clearErrors("imgEmpty");
    }
  }, [showImages, btnClick]);

  //form 유효할 때 실행
  const onValid = (data) => {
    console.log("onValid");
    console.log(data); // form 데이터
    console.log(showImages); //img url 데이터
    alert("등록되었습니다"); // 따로 cumstom ????
    //해당 post 페이지로 이동
  };

  return (
    <UploadContainer>
      <Header>
        <BackIcon
          icon={faChevronLeft}
          onClick={() => {
            history.goBack();
          }}
        />
        <span>글쓰기</span>
      </Header>
      <div style={{ padding: "25px" }}>
        <Form onSubmit={handleSubmit(onValid)}>
          <Title
            placeholder="제목"
            {...register("title", {
              required: "제목을 작성해주세요",
              maxLength: {
                value: 30,
                message: "제목은 30자 이하로 작성해주세요",
              },
            })}
          />
          {/* 메인 카테고리 */}
          <div style={{ display: "flex" }}>
            <SelectCategory
              {...register("categoryMain", {
                required: "카테고리를 선택은 필수입니다",
              })}
              onChange={(e) => {
                setCurrentCate(itemsGroup[Number(e.target.selectedIndex) - 1]);
              }}
              defaultValue=""
            >
              <Option value="" disabled>
                카테고리 선택
              </Option>
              {itemsGroup.map((area, index) => (
                <Option key={index}>{area.main}</Option>
              ))}
            </SelectCategory>

            {/* 서브 카테고리 */}
            <SelectCategory
              {...register("categorySub", {
                required: "하위 카테고리를 선택해주세요",
              })}
              defaultValue=""
            >
              <Option value="" disabled style={{ fontSize: "8px" }}>
                하위 카테고리
              </Option>
              {currentCate &&
                currentCate.sub.map((sub, index) => (
                  <Option key={index}>{sub}</Option>
                ))}
            </SelectCategory>
          </div>

          {/* 지역 선택 */}
          <SelectArea
            {...register("area", { required: "지역을 선택해주세요" })}
            defaultValue=""
          >
            <Option value="" disabled>
              지역 선택
            </Option>
            {area.map((area, index) => (
              <Option key={index}>{area}</Option>
            ))}
          </SelectArea>

          {/* 사진 업로드 */}
          <ImgUpload showImages={showImages} setShowImages={setShowImages} />

          {/* 글 내용 */}
          <Contents
            placeholder="내용을 작성하세요"
            {...register("contents", {
              required: "내용을 작성하세요",
              maxLength: {
                value: 300,
                message: "내용은 400자 이하로 작성해주세요",
              },
            })}
          ></Contents>

          {/*form valid ERROR 메세지 */}
          {Object.keys(errors).length > 0 && (
            <ErrorDiv>
              <span>❌</span>
              {errors.title?.message ? (
                <p>{errors.title?.message}</p>
              ) : errors.categoryMain ? (
                <p>{errors.categoryMain.message}</p>
              ) : errors.categorySub ? (
                <p>{errors.categorySub.message}</p>
              ) : errors.area ? (
                <p>{errors.area.message}</p>
              ) : errors.contents ? (
                <p>{errors.contents.message}</p>
              ) : errors.imgEmpty ? (
                <p>{errors.imgEmpty.message}</p>
              ) : null}
            </ErrorDiv>
          )}

          <SubmitBtn
            onClick={() => {
              setBtnClick(true);
            }}
            type="submit"
          >
            등록하기
          </SubmitBtn>
        </Form>
      </div>
    </UploadContainer>
  );
}
export default MUpload;
