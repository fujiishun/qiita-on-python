// http通信の設定
import axios from "axios";
import { getLoginAccessToken } from "@/utils/userAuth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getLoginAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
