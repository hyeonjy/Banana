import { useRef, useState } from "react";
import styled from "styled-components";
import { itemsGroup } from "../ItemGroup";
import { faC, faCamera, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  padding-top: 140px; /**header와 nav의 fixed 때문에 겹치는 문제 해결 */
  /* background-color: yellow; */
  width: 100%;
  margin: 0 auto;
  max-width: 850px;
`;

const KeySubject = styled.h1`
  font-size: 35px;
  font-weight: 600;
  border-bottom: 1px solid #e9ecef;
  padding: 10px;
  width: 850px;
  margin-left: 10px;
`;

const CreateForm = styled.form`
  padding: 10px 20px;
`;

const TitleInput = styled.textarea`
  font-size: 15px;
  height: 30px;
  padding: 10px;
  width: 830px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  resize: none;
  line-height: 28px;
  /* margin: 10px; */
  /* margin-left: 20px; */
  margin: 10px 0;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 850px;
  margin: 10px 0;
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const SelectTitle = styled.h1`
  font-size: 25px;
  margin-right: 10px;
  color: gray;
`;

const MajorSelect = styled.select`
  height: 30px;
  width: 200px;
`;

const MinorSelect = styled.select`
  height: 30px;
  margin-left: 10px;
  width: 200px;
`;

const MajorOption = styled.option`
  font-size: 15px;
`;

const MinorOption = styled.option`
  font-size: 15px;
`;

const AreaBox = styled.div`
  display: flex;
  align-items: center;
`;

const AreaSelect = styled.select`
  height: 30px;
  width: 200px;
`;

const AreaOption = styled.option`
  font-size: 15px;
`;

const ContentInput = styled.textarea`
  font-size: 15px;
  height: 300px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  resize: none;
  width: 830px;
`;

const Box2 = styled.div``;

const CameraIcon = styled(FontAwesomeIcon)`
  font-size: 35px;
`;

const ImgInput = styled.input``;

const PreviewBox = styled.div`
  display: flex;
  margin-bottom: 100px;
`;

const ImgPreview = styled.img`
  width: 250px;
  height: 150px;
  margin: 10px;
  margin-left: 0;
`;

const SubmitBtn = styled.button`
  font-size: 16px;
  padding: 3px 12px;
  border-radius: 6px;
  line-height: 32px;
  border-radius: 1px solid tomato;
  color: rgb(252 147 67);
  background-color: rgb(252 248 219);
  border: none;
  font-weight: 700;
  cursor: pointer;
`;

function Upload() {
  const [minor, setMinor] = useState(["선택하세요"]);
  const [imgFile, setImgFile] = useState([]);
  const imgRef = useRef();

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

  const optionChange = (e) => {
    const searchItem = itemsGroup.find((item) => e.target.value === item.main);
    if (e.target.value === "") {
      setMinor(["선택하세요"]);
    } else {
      setMinor(searchItem.sub);
    }
  };

  const saveImgFile = (e) => {
    // const imageLists = e.target.files;
    // let imageUrlLists = [...imgFile];

    // for (let i = 0; i < imageLists.length; i++) {
    //   const currentImageUrl = URL.createObjectURL(imageLists[i]);
    //   imageUrlLists.push(currentImageUrl);
    // }

    // if (imageUrlLists.length > 10) {
    //   imageUrlLists = imageUrlLists.slice(0, 10);
    // }

    // setImgFile(imageUrlLists);
    const fileArr = e.target.files;

    let fileURLs = [];

    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        fileURLs[i] = reader.result;
        setImgFile([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(imgFile);

  return (
    <Container>
      <KeySubject>게시글 올리기</KeySubject>
      <CreateForm>
        <Box>
          <CategoryBox>
            <SelectTitle>카테고리</SelectTitle>
            <MajorSelect onChange={optionChange}>
              {itemsGroup.map((item, index) => {
                return (
                  <>
                    {index === 0 && (
                      <MajorOption value="">선택하세요</MajorOption>
                    )}
                    <MajorOption value={item.main}>{item.main}</MajorOption>
                  </>
                );
              })}
            </MajorSelect>
            <MinorSelect>
              {minor.map((item, index) => {
                return <MinorOption value={item}>{item}</MinorOption>;
              })}
            </MinorSelect>
          </CategoryBox>

          <AreaBox>
            <SelectTitle>지역</SelectTitle>
            <AreaSelect>
              {area.map((item, index) => {
                return <AreaOption value={item}>{item}</AreaOption>;
              })}
            </AreaSelect>
          </AreaBox>
        </Box>

        <TitleInput type="text" placeholder="제목을 입력해주세요." />
        <ContentInput type="text" placeholder="내용을 입력해주세요." />

        <Box>
          {/* <label for="file">
            <CameraIcon icon={faCamera} />
            <h6> 사진</h6>
          </label> */}
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
        <PreviewBox>
          {imgFile.map((item, index) => {
            return (
              <ImgPreview
                src={imgFile ? item : `../../Img/banana.png`}
                alt="프로필 이미지"
              />
            );
          })}
        </PreviewBox>
      </CreateForm>
    </Container>
  );
}

export default Upload;
