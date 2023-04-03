import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { itemsGroup } from "../ItemGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { BackGround } from "./Gruop";
import { useEffect } from "react";

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
  width: 850px; /**850 */
  overflow-x: auto;
`;

const ImgBox = styled.div`
  position: relative;
  button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
  }
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

function Upload() {
  const [minor, setMinor] = useState(["선택하세요"]); /**옷 소분류 */
  const [imgFile, setImgFile] = useState([]); /**이미지 파일 */
  const imgRef = useRef();
  const [object, setObject] = useState({}); /**제출시 등록되는 item-object */

  const area = [
    "전체",
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];

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
    const files = e.target.files;

    let fileURLs = [];
    let filesLength = files.length;

    if (files.length > 5) {
      alert("최대 5장까지만 업로드 합니다.");
      filesLength = 5;
    }

    for (let i = 0; i < filesLength; i++) {
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setImgFile([...fileURLs]);
      };
      reader.readAsDataURL(files[i]);
    }
  };

  // 이미지 삭제시 실행되는 함수
  const handleDelete = (index) => {
    setImgFile(imgFile.filter((itme, idx) => idx !== index));
  };

  // 폼 제출시 실행되는 함수 (object를 저장)
  const handleSubmit = (event) => {
    event.preventDefault();
    setObject({
      imgUrl: [...imgFile],
      title: event.target.title.value,
      detail: event.target.area.value,
      view: "0",
      main: event.target.major.value,
      sub: event.target.minor.value,
      id: "77777",
      content: event.target.content.value,
    });
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
          behavior: "smooth",
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
        <CreateForm onSubmit={handleSubmit}>
          <Box>
            {/* 카테고리 SELECT */}
            <CategoryBox>
              <SelectTitle>카테고리</SelectTitle>
              {/* 옷 대분류 */}
              <Select name="major" onChange={optionChange}>
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
              <Select name="minor">
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
              <Select name="area">
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
            maxLength={35}
            name="title"
            titletext={"true"}
          />
          <TextInput
            type="text"
            placeholder="내용을 입력해주세요."
            maxLength={255}
            name="content"
          />

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
            />
            <SubmitBtn type="submit">등록</SubmitBtn>
          </Box>

          {/* 사진 미리보기 */}
          <PreviewBox ref={previewBox}>
            {imgFile.map((item, index) => {
              return (
                <ImgBox key={index}>
                  {index === 0 && <span>대표</span>}
                  <ImgPreview
                    src={imgFile ? item : `../../Img/banana.png`}
                    alt="프로필 이미지"
                  />
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      handleDelete(index);
                    }}
                  >
                    x
                  </button>
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
