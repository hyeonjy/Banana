import axios from "axios";
const BASE_URL = "http://localhost:8080";
const protectedAPI = axios.create();

protectedAPI.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refreshToken");
    const expirationTime = localStorage.getItem("expiresAt"); //액세스 토큰 만료시간
    const refreshExpirationTime = localStorage.getItem("refreshExpiresAt"); //리프레시 토큰 만료시간
    const currentTime = Math.floor(Date.now() / 1000);

    if (refreshExpirationTime) {
      if (currentTime >= refreshExpirationTime) {
        //리프레시 토큰이 만료된 경우 -> 로그아웃
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiresAt");
        window.location.href = "/";
        alert("재로그인이 필요합니다");
        window.location.reload();
        return;
      }
    }
    if (expirationTime) {
      if (currentTime >= expirationTime && refresh) {
        //액세스 토큰이 만료된 경우 : 리프레시 토큰으로 액세스 토큰 요청
        await axios
          .post(
            `${BASE_URL}/refreshtoken`,
            { refresh },
            {
              headers: {
                "	Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem("expiresAt", res.data.expiresIn);
            localStorage.setItem("refreshExpiresAt", res.data.refreshExpiresAt);
            config.headers["Authorization"] = `Bearer ${res.data.access_token}`;
          })
          .catch((error) => {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("expiresAt");
            window.location.href = "/";
            alert("로그아웃되었습니다");
            window.location.reload();
            return;
          });
      } else {
        //유효시간 지나지 않은 경우
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default protectedAPI;
