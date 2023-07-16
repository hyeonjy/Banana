import axios from "axios";
import protectedAPI from "./Refresh"; //로그인 제한된 api -> protectedAPI

const BASE_URL = "http://localhost:8080";

export function LastDataApi() {
  return axios.get(`${BASE_URL}/data/last`).then((response) => response.data);
}

export function HitsDataApi() {
  return axios.get(`${BASE_URL}/data/hits`).then((response) => response.data);
}

export function SearchDataApi(searchValue, currentQuery) {
  return axios
    .get(`${BASE_URL}/searchdata/${searchValue}/${currentQuery}`)
    .then((response) => response.data);
}

export function mypageApi() {
  return protectedAPI
    .get(`${BASE_URL}/mypage`)
    .then((response) => response.data);
}

export function userPageHeartListaApi() {
  return protectedAPI
    .get(`${BASE_URL}/mypage/heart`)
    .then((response) => response.data);
}

export function postPageApi({ postId, currentUserId }) {
  return axios
    .get(`${BASE_URL}/postdata/${postId}/${currentUserId}`)
    .then((response) => response.data);
}

export function deletePostApi(postId) {
  return axios
    .delete(`${BASE_URL}/posts/${postId}`)
    .then((response) => response.data);
}

export function postStateChangeApi(state) {
  return axios
    .post(`${BASE_URL}/stateChange`, state)
    .then((response) => response.data);
}

export function heartChangeApi(heart) {
  return axios
    .post(`${BASE_URL}/heartclick`, heart)
    .then((response) => response.data);
}
export function userPageApi(userId) {
  return axios
    .get(`${BASE_URL}/userpage/data/${userId}`)
    .then((response) => response.data);
}
export function postWriteApi(formdata) {
  return protectedAPI
    .post(`${BASE_URL}/postwrite`, formdata)
    .then((response) => response.data);
}

export function postUpdateApi(formdata) {
  return axios
    .post(`${BASE_URL}/postupdate`, formdata)
    .then((response) => response.data);
}
export function RegionDataApi(region) {
  return axios
    .get(`${BASE_URL}/regiondata/${region}`)
    .then((response) => response.data);
}
export function categoryPostApi(main, sub) {
  return axios
    .get(`${BASE_URL}/categorydata/${main}/${sub}`)
    .then((response) => response.data);
}
export function mainPostApi(main, sort) {
  return axios
    .get(`${BASE_URL}/main/${main}/${sort}`)
    .then((response) => response.data);
}

export function subPostApi(sub, sort) {
  return axios
    .get(`${BASE_URL}/sub/${sub}/${sort}`)
    .then((response) => response.data);
}

//카카오 로그인
export function KaKaoAuthorization(URL) {
  return axios
    .post(
      `${URL}`,
      {},
      {
        headers: {
          "	Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    )
    .then((response) => {
      const { data } = response;
      const { access_token } = data;
      if (access_token) {
        axios
          .post(`${BASE_URL}/kakao/user`, { access_token: access_token })
          .then((res) => {
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem("expiresAt", res.data.expiresIn);
            localStorage.setItem("refreshExpiresAt", res.data.refreshExpiresAt);
            window.location.href = "/";
          });
      } else {
        console.log("토큰 XX");
      }
    });
}

//구글 로그인
export function GoogleLogin(code) {
  return axios
    .post(
      `${BASE_URL}/google/user`,
      { code },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("expiresAt", res.data.expiresIn);
      localStorage.setItem("refreshExpiresAt", res.data.refreshExpiresAt);
      window.location.href = "/";
    });
}

//일반 회원가입
export function signUpApi(formdata) {
  return axios
    .post(`${BASE_URL}/signup`, formdata, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
}
//일반 로그인
export function loggedInApi(formdata) {
  return axios
    .post(`${BASE_URL}/login`, formdata, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
}

export function ProfileEdit(formdata) {
  return axios
    .post(`${BASE_URL}/profile/edit`, formdata)
    .then((res) => res.data);
}
