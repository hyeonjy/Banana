import styled from "styled-components";
import { NavTitle, PageContainer } from "../components/MypageContents";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ErrorP } from "./Login";
import { useMutation, useQueryClient } from "react-query";
import { ProfileEdit } from "../../Api";
import Skeleton from "react-loading-skeleton";

const ProfileImg = styled.img`
  border-radius: 100%;
  background-color: white;
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const CameraIcon = styled(FontAwesomeIcon)``;
const ImgLable = styled.label`
  position: absolute;
  right: 8px;
  bottom: 8px;
  background-color: #ffdf00;
  border-radius: 50%;
  border: 3px solid white;
  padding: 8px;
  cursor: pointer;
  ${CameraIcon} {
    font-size: 18px;
    color: white;
  }
`;
const ImgInput = styled.input`
  display: none;
`;

const ImgDiv = styled.div`
  margin: 10px;
  position: relative;
`;

const ProfileInput = styled.input`
  background-color: white;
  padding: 7px 7px 7px 10px;
  border-radius: 8px;
  border: 1px solid gray;
  margin-bottom: 5px;
  height: 23px;
`;
const ProfileLabel = styled.label`
  font-size: 17px;
  font-weight: 700;
  display: block;
  margin-bottom: 8px;
`;

const SubmitBtn = styled.button`
  width: 75px;
  height: 40px;
  background-color: #ffdf00;
  font-weight: 600;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
`;
const ProfileForm = styled.form`
  min-height: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

function ProfileSet({ user }) {
  const [init, setInit] = useState(true);
  const [img, setImg] = useState();
  const [imgFile, setImgFile] = useState();
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (user) setValue("nickname", user.nickname);
  }, [user]);
  useEffect(() => {
    if (watch("nickname") && watch("nickname").length === 0) {
      setError("nickname", { message: "닉네임은 1자 이상 작성해 주세요" });
    } else {
      clearErrors("nickname");
    }
  }, [watch("nickname")]);

  const imgUpload = (e) => {
    setInit(false);
    setImgFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result;
      const dataWithoutPrefix = base64Data.split(",")[1];
      setImg(dataWithoutPrefix);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation((formdata) => ProfileEdit(formdata), {
    onSuccess: () => {
      alert("수정되었습니다");
      queryClient.invalidateQueries("mypage");
    },
  });
  const onValid = (data) => {
    const nickname = data.nickname;
    const formdata = new FormData();
    formdata.append("nickname", nickname);
    formdata.append("profile", imgFile);
    formdata.append("userId", user.user_id);
    mutate(formdata);
  };

  return (
    <PageContainer>
      <NavTitle>프로필 변경</NavTitle>
      <ProfileForm onSubmit={handleSubmit(onValid)}>
        {user ? (
          <>
            <ImgDiv>
              <ProfileImg
                src={`data:image/jpeg;base64,${
                  init ? user.profile.data : img ? img : null
                }`}
                alt={user.profile.filename}
              />
              <ImgLable htmlFor="profile">
                <CameraIcon icon={faCamera} />
              </ImgLable>
              <ImgInput
                id="profile"
                accept="image/*"
                type="file"
                multiple={false}
                onChange={imgUpload}
              />
            </ImgDiv>
            <div>
              <ProfileLabel>아이디</ProfileLabel>
              <ProfileInput value={user.email} disabled />
            </div>
            <div>
              <ProfileLabel>닉네임</ProfileLabel>
              <ProfileInput {...register("nickname")} />
            </div>
            <div>
              {errors?.nickname && (
                <ErrorP style={{ marginTop: "0px" }}>
                  {errors.nickname.message}
                </ErrorP>
              )}
            </div>
            <SubmitBtn type="submit">수정하기</SubmitBtn>
          </>
        ) : (
          <>
            <ImgDiv>
              <Skeleton
                style={{ borderRadius: "100%" }}
                height={150}
                width={150}
              />
            </ImgDiv>
            <div>
              <Skeleton
                style={{ marginBottom: "8px", borderRadius: "5px" }}
                width={50}
                height={30}
              />

              <Skeleton
                style={{ borderRadius: "10px" }}
                width={200}
                height={40}
              />
            </div>
            <div>
              <Skeleton
                style={{ marginBottom: "8px", borderRadius: "5px" }}
                width={50}
                height={30}
              />
              <Skeleton
                style={{ borderRadius: "10px" }}
                width={200}
                height={40}
              />
            </div>
            <Skeleton width={75} height={40} />
          </>
        )}
      </ProfileForm>
    </PageContainer>
  );
}
export default ProfileSet;
