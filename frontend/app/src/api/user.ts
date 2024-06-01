import { AxiosError } from "axios";

import axiosInstance from "@/http/axiosInstance";
import { User } from "@/types/global";

// ユーザー詳細取得API
export const fetchUserDataById = async (userId: string): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>(`/api/users/${userId}/`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error fetching user data: ",
      axiosError.response ? axiosError.response.data : axiosError.message
    );
    throw axiosError;
  }
};

// ユーザー編集API
export const updateUserData = async (
  userId: string,
  userData: Partial<User>
): Promise<User> => {
  try {
    const response = await axiosInstance.patch<User>(
      `/api/users/${userId}/`,
      userData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error updating user data: ",
      axiosError.response ? axiosError.response.data : axiosError.message
    );
    throw axiosError;
  }
};
