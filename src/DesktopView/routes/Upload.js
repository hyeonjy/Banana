import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { BackGround } from "./Gruop";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { itemsGroup } from "../../Data/ItemGroup";
import area from "../../Data/Area";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "../../useAxio";
import axios from "axios";

const Container = styled.div`
  margin: 157px auto;
  flex-direction: column;
  align-items: space-evenly;
  display: flex;
  width: 900px; /**900 */
  z-index: 1;
  position: relative;
  background-color: white;
  border-radius: 21px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 25px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 25px 60px -30px;
  margin-bottom: 100px;
  padding: 50px;
`;

// 게시글 (메인 글씨)
const KeySubject = styled.h1`
  font-size: 30px;
  font-weight: 600;
  border-bottom: 1px solid #e9ecef;
  padding: 10px;
  width: 850px; /**850 */
  margin-left: 10px;
`;

// 폼 전체
const CreateForm = styled.form`
  padding: 10px 20px;
`;

// space-between을 위한 column Box
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 850px; /**850 */
  margin: 10px 0;
  ${(props) =>
    props.primary &&
    css`
      padding-bottom: 10px;
      border-bottom: 1px solid #e9ecef;
    `}
`;

// 카테고리 or 지역의 select를 합친 Box
const CategoryBox = styled.div`
  display: flex;
  align-items: center;
`;

// 카테고리, 지역 title
const SelectTitle = styled.h1`
  font-size: 20px;
  margin-right: 5px;
  color: gray;
`;

const Select = styled.select.attrs({ required: true })`
  height: 30px;
  width: 100px;
  border-radius: 8px;
  margin-left: 5px;
`;

const Option = styled.option`
  font-size: 15px;
`;

// 제목과 내용 input
const TextInput = styled.textarea.attrs({ required: true })`
  font-size: 15px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 830px; /**830 */
  resize: none;
  border-radius: 5px;
  height: 150px;
  &:focus {
    outline-color: rgb(255, 230, 0);
  }
  ${(props) =>
    props.titletext &&
    css`
      line-height: 28px;
      height: 30px;
      margin: 10px 0;
    `}
`;

const CameraLabel = styled.label`
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9fa;
  padding: 5px 2px;
  border-radius: 8px;
  font-size: 13px;
`;

const CameraIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  margin-bottom: 3px;
`;

const ImgInput = styled.input.attrs({ required: true })`
  opacity: 0;
  position: absolute;
  left: 60px;
`;

// 미리보기 이미지 전체 div
const PreviewBox = styled.div`
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 8px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    height: 12px; /* 스크롤바의 길이 */
    background: orange; /* 스크롤바의 색상 */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(121, 121, 121, 0.3); /*스크롤바 뒷 배경 색상*/
    border-radius: 12px;
  }
`;

const ImgBox = styled.div`
  position: relative;
  span {
    position: absolute;
    top: 13px;
    left: 3px;
    background-color: green;
    padding: 5px 10px;
    color: white;
    border-radius: 5px;
  }
`;

const ImgPreview = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  margin: 10px;
  margin-left: 0;
`;

// submit 버튼
const SubmitBtn = styled.button`
  font-size: 16px;
  padding: 3px 12px;
  border-radius: 6px;
  line-height: 32px;
  border-radius: 1px solid tomato;
  background-color: rgb(255, 230, 0);
  border: none;
  font-weight: 700;
  cursor: pointer;
`;

const Xbtn = styled(FontAwesomeIcon)`
  font-size: 12px;
  padding: 9px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 5;
  color: white;
  background: black;
`;
const LetterCount = styled.div`
  float: right;
  margin: 10px;
  position: absolute;
  bottom: 8px;
  right: 12px;
  color: #aaaaaa;
  font-size: 15px;
`;

function Upload() {
  const [minor, setMinor] = useState(["선택하세요"]); /**옷 소분류 */
  const [imgFile, setImgFile] = useState([]); /**이미지 파일 */
  const [imgURLs, setImgURLs] = useState([]); /**이미지 URL */
  const imgRef = useRef();

  // option 값이 바뀌면 실행되는 함수
  const optionChange = (e) => {
    const searchItem = itemsGroup.find((item) => e.target.value === item.main);
    if (e.target.value === "") {
      setMinor(["선택하세요"]);
    } else {
      setMinor(searchItem.sub);
    }
  };

  // 이미지 저장 함수
  const saveImgFile = (e) => {
    const imageLists = e.target.files;

    let imageFileLists = [...imgFile, ...imageLists];
    let imageUrlLists = [...imgURLs];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    if (imageUrlLists.length > 5) {
      alert("최대 5장까지만 업로드 합니다.");
      imageUrlLists = imageUrlLists.slice(0, 5);
    }
    setImgFile(imageFileLists);
    setImgURLs(imageUrlLists);
  };

  // 이미지 삭제시 실행되는 함수
  const handleDelete = (index) => {
    setImgFile(imgFile.filter((itme, idx) => idx !== index));
    setImgURLs(imgURLs.filter((itme, idx) => idx !== index));
  };
  const { watch, register, handleSubmit } = useForm();

  const { executePost } = useAxios({
    method: "post",
    url: `http://localhost:8080/postwrite`,
  });
  //form 유효할 때 실행
  const onValid = async (data) => {
    console.log("onValid");
    console.log(data); // form 데이터

    //data: title, content, major, minor
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("contents", data.contents);
    formdata.append("area", data.area);
    formdata.append("major", data.major);
    formdata.append("minor", data.minor);

    imgFile.forEach((image, index) => {
      formdata.append(`images`, image);
    });
    formdata.append("userId", 1);

    executePost({
      data: formdata,
      url: `http://localhost:8080/postwrite`,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });

    alert("등록되었습니다"); // 따로 cumstom ????
    //해당 post 페이지로 이동
    //history.push("");
  };

  // 이미지 썸네일 가로 스크롤
  const previewBox = useRef();
  useEffect(() => {
    const el = previewBox.current;
    const onWheel = (event) => {
      if (el && event.deltaY !== 0) {
        event.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + event.deltaY,
          behavior: "auto",
        });
      } else return;
    };
    el.addEventListener("wheel", onWheel);
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  return (
    <div style={{ position: "relative" }}>
      {/* 노란색 그라데이션 배경 */}
      <BackGround />

      <Container>
        <KeySubject>게시글</KeySubject>
        {/* 폼 시작 */}
        <CreateForm
          // encType="multipart/form-data"
          onSubmit={handleSubmit(onValid)}
        >
          <Box>
            {/* 카테고리 SELECT */}
            <CategoryBox>
              <SelectTitle>카테고리</SelectTitle>
              {/* 옷 대분류 */}
              <Select
                name="major"
                {...register("major", {
                  required: "카테고리를 선택은 필수입니다",
                })}
                onChange={optionChange}
              >
                <Option value="">선택하세요</Option>
                {itemsGroup.map((item, index) => {
                  return (
                    <Option key={index} value={item.main}>
                      {item.main}
                    </Option>
                  );
                })}
              </Select>
              {/* 옷 소분류 */}
              <Select
                name="minor"
                {...register("minor", {
                  required: "하위 카테고리를 선택해주세요",
                })}
              >
                {minor.map((item, index) => {
                  return (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </CategoryBox>

            {/* 지역 SELECT */}
            <CategoryBox>
              <SelectTitle>지역</SelectTitle>
              <Select
                name="area"
                {...register("area", { required: "지역을 선택해주세요" })}
              >
                {area.map((item, index) => {
                  return (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </CategoryBox>
          </Box>

          {/* 제목과 내용 */}
          <TextInput
            type="text"
            placeholder="제목을 입력해주세요."
            name="title"
            required
            titletext={"true"}
            {...register("title", {
              required: "제목을 작성해주세요",
              maxLength: {
                value: 30,
                message: "제목은 30자 이하로 작성해주세요",
              },
            })}
          />
          <div style={{ position: "relative" }}>
            <TextInput
              type="text"
              placeholder="내용을 입력해주세요."
              maxLength={300}
              required
              name="contents"
              {...register("contents", {
                required: "내용을 작성하세요",
              })}
              style={{ position: "relative" }}
            />
            {watch("content") && (
              <LetterCount>{watch("content").length} / 300</LetterCount>
            )}
          </div>

          {/* 카메라 아이콘과 등록 버튼 */}
          <Box primary>
            <CameraLabel>
              <CameraIcon icon={faImage} />
              <span>사진</span>
            </CameraLabel>
            <ImgInput
              id="file"
              type="file"
              accept="image/*"
              onChange={saveImgFile}
              ref={imgRef}
              multiple
              required
            />
            <SubmitBtn type="submit">등록</SubmitBtn>
          </Box>

          {/* 사진 미리보기 */}
          <PreviewBox ref={previewBox}>
            {imgURLs.map((item, index) => {
              return (
                <ImgBox key={index}>
                  {index === 0 && <span>대표</span>}
                  <ImgPreview
                    src={imgURLs ? item : `../../Img/banana.png`}
                    alt="프로필 이미지"
                  />
                  <Xbtn
                    onClick={(event) => {
                      event.preventDefault();
                      handleDelete(index);
                    }}
                    icon={faX}
                  />
                </ImgBox>
              );
            })}
          </PreviewBox>
        </CreateForm>
        {/* 폼 끝 */}
      </Container>
    </div>
  );
}

export default Upload;
