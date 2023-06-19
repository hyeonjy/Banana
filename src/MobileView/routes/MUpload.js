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
import useAxios from "../../useAxio";
import { useMutation, useQueryClient } from "react-query";
import { postUpdateApi, postWriteApi } from "../../Api";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
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
  const [minor, setMinor] = useState(["선택하세요"]); /**옷 소분류 */
  const [imgFile, setImgFile] = useState([]); /**이미지 파일 */
  const [imgURLs, setImgURLs] = useState([]); /**이미지 URL */
  // const imgRef = useRef();
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      console.log(state.item);

      setValue("title", state.item.title);
      setValue("contents", state.item.content);
      setValue("area", state.item.area);
      setValue("major", state.item.main_category);
      const main = itemsGroup.find(
        (item) => state.item.main_category === item.main
      );
      setMinor(main.sub);
      console.log("minor: " + minor);
      let imgurls = [];
      for (let i = 0; i < state.item.imgs.length; i++) {
        imgurls.push(state.item.imgs[i].data);
      }
      setImgURLs(imgurls);
      let imgfiles = [];
      for (let i = 0; i < state.item.imgs.length; i++) {
        imgfiles.push(state.item.imgs[i].file);
      }
      setImgFile(imgfiles);
    }
  }, [state]);

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  // option 값이 바뀌면 실행
  const optionChange = (e) => {
    const item = itemsGroup.find((item) => e.target.value === item.main);
    setMinor(item.sub);
    setValue(item.sub[0]);
    console.log("minor option: " + minor);
    console.log("minor option: " + item.sub[0]);
  };

  const history = useHistory();
  const queryClient = useQueryClient();

  const [btnClick, setBtnClick] = useState(false); // 등록 버튼을 누른 후에 error 출력

  useEffect(() => {
    if (imgFile.length === 0 && btnClick) {
      setError("imgEmpty", { message: "이미지를 1장 이상 업로드 해주세요" });
    } else {
      clearErrors("imgEmpty");
    }
  }, [imgFile, btnClick]);

  const { mutate: writeMutate } = useMutation(
    (formdata) => postWriteApi(formdata),
    {
      onSuccess: (postId) => {
        queryClient.invalidateQueries({ exact: false });

        alert("등록되었습니다");
        history.push(`/post/${postId}`); // 쓴 글 페이지로 이동
      },
      onError: () => {
        alert("Error!");
      },
    }
  );

  const { mutate: updateMutate } = useMutation(
    (formdata) => postUpdateApi(formdata),
    {
      onSuccess: (postId) => {
        queryClient.invalidateQueries({ exact: false });
        alert("수정되었습니다");
        history.push(`/post/${postId}`); // 쓴 글 페이지로 이동
      },
      onError: () => {
        alert("Error!");
      },
    }
  );

  //form 유효할 때 실행
  const onValid = (data) => {
    console.log(data);

    //data: title, content, major, minor
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("contents", data.contents);
    formdata.append("area", data.area);
    formdata.append("major", data.major);
    formdata.append("minor", data.minor);

    imgFile.forEach((image) => {
      formdata.append(`images`, image);
    });
    formdata.append("userId", 1);
    if (state?.mode === "edit") {
      console.log("edit in!!!");
      formdata.append("postId", state.postId);
      formdata.append("deletePost[]", []);
      updateMutate(formdata);
    } else writeMutate(formdata);
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
              name="major"
              {...register("major", {
                required: "카테고리를 선택은 필수입니다",
              })}
              onChange={optionChange}
            >
              {itemsGroup.map((area, index) => (
                <Option key={index}>{area.main}</Option>
              ))}
            </SelectCategory>

            {/* 서브 카테고리 */}
            <SelectCategory
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
          <ImgUpload
            imgFile={imgFile}
            setImgFile={setImgFile}
            imgURLs={imgURLs}
            setImgURLs={setImgURLs}
          />

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
