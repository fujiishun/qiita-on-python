import { AxiosError } from "axios";

import { LoginData, RegisterData } from "@/types/auth";
import { Error } from "@/types/global";
import axiosInstance from "@/http/axiosInstance";

// ログインAPI
export const login = async (
  loginData: LoginData
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await axiosInstance.post("/api/login", loginData);
    localStorage.setItem("userData", JSON.stringify(response.data));
    return { success: true };
  } catch (error) {
    const axiosError = error as AxiosError<Error>;
    if (axiosError.response && axiosError.response.data) {
      const errorMessage = axiosError.response.data.message;
      return { success: false, message: errorMessage };
    } else {
      return {
        success: false,
        message: axiosError.message || "ログインに失敗しました。",
      };
    }
  }
};

// サインアップAPI
export const register = async (
  registerData: RegisterData
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await axiosInstance.post("/api/register", registerData);
    return { success: true };
  } catch (error) {
    const axiosError = error as AxiosError<Error>;
    if (axiosError.response && axiosError.response.data) {
      const errorMessage = axiosError.response.data.message;
      return { success: false, message: errorMessage };
    } else {
      return {
        success: false,
        message: axiosError.message || "登録に失敗しました。",
      };
    }
  }
};
