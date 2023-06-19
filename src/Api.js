import axios from "axios";

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

export function userPageaApi() {
  return axios
    .get(`${BASE_URL}/userpage/data/1`)
    .then((response) => response.data);
}

export function userPageHeartListaApi() {
  return axios
    .get(`${BASE_URL}/userpage/heartdata/1`)
    .then((response) => response.data);
}

export function postPageApi(postId) {
  return axios
    .get(`${BASE_URL}/postdata/${postId}`)
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
  return axios
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

export function Authorization(URL) {
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
      console.log(access_token);
      if (access_token) {
        axios
          .post(`${BASE_URL}/kakao/user`, { access_token: access_token })
          .then((res) => {
            console.log("Success");
            console.log(res);
          });
      } else {
        console.log("토큰 XX");
      }
    });
}
