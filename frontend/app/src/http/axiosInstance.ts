// http通信の設定
import axios from "axios";
import { getLoginAccessToken } from "@/utils/userAuth";

// 現在のフロントエンドのホスト名とポートを取得
const currentHost = window.location.hostname;
const currentPort = window.location.port;

const apiBaseUrl = `http://${currentHost}:${currentPort || 8000}`;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
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
