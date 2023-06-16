import { faCamera, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import MUploadImgFull from "../routes/MUploadImgFull";
import { useState } from "react";
import { useRef } from "react";

const ImgDiv = styled.div`
  padding-bottom: 10px;
  width: 100%;
`;

//----업로드 input
const CameraIcon = styled(FontAwesomeIcon)`
  width: 25px;
  height: 22px;
  //color: rgba(255, 192, 78, 0.83);
`;
const ImgInput = styled.input``;
const ImgLabel = styled.label`
  width: 38px;
  height: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: whitesmoke;
  border-radius: 10px;
  border: 1px solid gray;
  flex-shrink: 0;
  cursor: pointer;

  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 0;
    height: 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0.5em;
    transform: translateY(-50%);
    font-size: 1.5em;
    color: #333;
    z-index: 1;
  }
  span {
    display: block;
    font-size: 12px;
  }
`;

//--- 이미지 썸네일 목록
const ImgList = styled.div`
  display: flex;
  overflow: auto;
  margin-left: 10px;
  flex-grow: 1;
  height: 73px;
  align-items: flex-end;
  border-radius: 10px;

  /* hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* hide scrollbar for Firefox */
  scrollbar-width: none;

  /* hide scrollbar for IE, Edge, and other browsers */
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
`;
const EachImgDiv = styled.div`
  width: 60px;
  flex-shrink: 0;
  margin-right: 13px;
  position: relative;
  border-radius: 7px;
  height: 60px;
`;
const EachImg = styled.img`
  width: 100%;
  height: 60px;
  object-fit: cover;
  border-radius: 7px;
`;
const XIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(50%, -50%);
  color: white;
  background-color: black;
  border-radius: 50%;
  padding: 5px;
  width: 11px;
  height: 11px;
  z-index: 3px;
`;
const Represent = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 20px;
  line-height: 20px;
  background-color: orange;
  color: white;
  opacity: 0.7;
  font-size: 10px;
  text-align: center;
  font-weight: 800;
  border-radius: 0 0 7px 7px;
`;

//이미지 업로드 fn
function ImgUpload({ imgFile, setImgFile }) {
  // 이미지 저장 함수
  const [imgURLs, setImgURLs] = useState([]); /**이미지 URL */
  const imgRef = useRef();

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

  const [imgFull, setImgFull] = useState(false); // 업로드 이미지 클릭 -> full screen(toggle)
  const [idx, setIndex] = useState(0); // MUploadingImgFull 컴포넌트에 넘겨줄 index value

  return (
    <>
      <ImgDiv>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            height: "78px",
          }}
        >
          <ImgLabel htmlFor="input-file" onChange={saveImgFile}>
            <CameraIcon icon={faCamera} />
            <span>{imgFile.length} / 10</span>
            <ImgInput
              id="input-file"
              type="file"
              accept="image/*"
              onChange={saveImgFile}
              ref={imgRef}
              multiple
              required
            />
          </ImgLabel>

          <ImgList>
            {imgURLs.map((image, id) => (
              <EachImgDiv key={id}>
                <EachImg
                  onClick={() => {
                    setIndex(id);
                    setImgFull(true);
                  }}
                  src={image}
                  alt={`${image}-${id}`}
                />
                {id === 0 && <Represent>대표사진</Represent>}
                <XIcon
                  icon={faX}
                  onClick={(event) => {
                    event.preventDefault();
                    handleDelete(id);
                  }}
                ></XIcon>
              </EachImgDiv>
            ))}
          </ImgList>
        </div>
      </ImgDiv>

      {/* Full screen  */}
      {imgFull && (
        <MUploadImgFull
          showImages={imgURLs}
          setImgFull={setImgFull}
          idx={idx}
        />
      )}
    </>
  );
}

export default ImgUpload;
