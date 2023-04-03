import { faCamera, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import MUploadImgFull from "../routes/MUploadImgFull";
import { useState } from "react";

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

  flex-shrink: ;
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

function ImgUpload({ showImages, setShowImages }) {
  //이미지 업로드 fn
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  };
  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
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
          <ImgLabel htmlFor="input-file" onChange={handleAddImages}>
            <CameraIcon icon={faCamera} />
            <span>{showImages.length} / 10</span>
            <ImgInput type="file" multiple accept="image/*" id="input-file" />
          </ImgLabel>

          <ImgList>
            {showImages.map((image, id) => (
              <EachImgDiv key={id}>
                <EachImg
                  onClick={() => {
                    setIndex(id);
                    setImgFull(true);
                  }}
                  src={image}
                  alt={`${image}-${id}`}
                />
                <XIcon icon={faX} onClick={() => handleDeleteImage(id)}></XIcon>
              </EachImgDiv>
            ))}
          </ImgList>
        </div>
      </ImgDiv>

      {/* Full screen  */}
      {imgFull && (
        <MUploadImgFull
          showImages={showImages}
          setImgFull={setImgFull}
          idx={idx}
        />
      )}
    </>
  );
}

export default ImgUpload;
